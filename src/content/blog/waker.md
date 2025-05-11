---
title: Waker 和 Continuation
pubDatetime: 2025-05-10T15:52:15+08:00
description: "Waker 和 Continuation 的关系"
tags: [Rust]
---

## 什么是 Waker
> A Waker is a handle for waking up a task by notifying its executor that it is ready to be run. [^1]

正如 `Waker` 的名字一样，它是用来告诉调度器任务已经就绪。在实际使用中 `Waker` 被包装成 `Context`，传递到 `Future` 的 `poll` 方法中：

```rust
pub trait Future {
    type Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
```

关于 `Waker API` 为什么不是一个回调函数或者一个对象，而是一个结构体包着虚函数表，withoutboats 在他的博客中这样解释：

> The only requirement that the poll phase introduces is **dynamism**: because it needs to be passed through arbitrary futures, **the waker type cannot be generic**. This means that every requirement introduced by the other two phases needs to be dynamically dispatched.
> 
> Rust has support for relatively easy dynamic dispatch using trait objects, but because of the rules of object safety, this easy form of dynamic dispatch is often quite limited. Indeed, we’ll find its too limited to support our use case, which is why all of the API proposals have a “Waker” type, instead of just using references to dyn Wake trait objects. [^2]

## ThreadNotify

`#[tokio::main]` 是 `tokio` 提供的过程宏，它会初始化 `Runtime` 然后调用 `block_on`，`block_on` 以 `ThreadNotify` 作为 `Waker`，用它 `poll` `main` 函数生成的 `Future` ：

```rust
let waker = waker_ref(thread_notify);
let mut cx = Context::from_waker(&waker);
loop {
    if let Poll::Ready(t) = f(&mut cx) {
        return t;
    }

    // Park the thread until it is woken up.
    while !thread_notify.unparked.swap(false, Ordering::Acquire) {
        thread::park();
    }
}
```

而 `ThreadNotify` 的 `wake_by_ref` 方法是唤醒对应的线程：

```rust
impl ArcWake for ThreadNotify {
    fn wake_by_ref(arc_self: &Arc<Self>) {
        let unparked = arc_self.unparked.swap(true, Ordering::Release);
        if !unparked {
            arc_self.thread.unpark();
        }
    }
}
```

`Waker` 由运行时创建，当阻塞时（比如等待 I/O），它又传递到运行时中，在适当的时候（比如对应的 I/O 已经就绪）调用 `wake` 方法。

## Continuation

在如下代码中：表达式 `1 + 2` (红色部分) 的 continuation 是 剩下的绿色部分。

![continuaion.png](@assets/images/continuation.png)

> https://www.lambdadays.org/static/upload/media/1686844310148436alexiskingkeynotedelimitedcontinuationsdemystified.pdf

注意图中的 ⚫, 当表达式求值完成会将值代入其中。如果用 lambda 来表示，`1 + 2` 的 continuation 是:

```rust
|x| {
    let y = 3 + 4;
    x * y
}
```

需要注意的是， 回调是 continuation 的一种表示，而不是 continuation 本身。

## Waker 和 Continuation 的联系

如果我们以 Conitnuation 的视角来看 Waker, 保存 Waker 并且在适当的时候调用，就如同保存 continuation 并且在适当的时候调用。

比如：

```rust
    let (tx, rx) = tokio::sync::oneshot::channel();

    let fut = async move {
        let mut tx = Some(tx);
        let x = poll_fn(move |cx: &mut Context<'_>| {
            if let Some(tx) = tx.take() {
                tx.send(cx.waker().clone()).unwrap();
                Poll::Pending
            } else {
                Poll::Ready(1 + 2)
            }
        })
        .await;

        let y = 3 + 4;
        x * y
    };

    let handle = std::thread::spawn(move || {
        let res = block_on(fut);
        println!("{}", res);
    });

    let waker = rx.blocking_recv().unwrap();
    waker.wake();
    handle.join().unwrap();
```

`poll_fn` 创建的 `Future` 在第一次 `poll` 时，会把 `Waker` 发送到 `channel` 中，主线程接收到 `Waker` 之后，调用 `wake` 方法，`poll` 第二次。

对比 `racket` 代码：

```racket
(define cont '())

(let ((x (call/cc (lambda (k)
                    (set! cont k) 0)))
      (y (+ 3 4)))
    (if (not (= x 0)) (* x y) 0))

(cont (+ 1 2))
```

在这里 `poll_fn` 的功能和 `call/cc` 非常相似，`poll_fn` 传入的是当前的 `Waker`，而 `call/cc` 传入的是当前的 `continuation`。
区别是 `Waker` 的 `wake` 方法不带参数，需要通过 Future 的返回值 Poll::Ready 完成类似 continuation 的传参。 同时 `wake` 也不能直接获取返回值。


[^1]: https://doc.rust-lang.org/stable/std/task/struct.Waker.html
[^2]: https://without.boats/blog/wakers-i