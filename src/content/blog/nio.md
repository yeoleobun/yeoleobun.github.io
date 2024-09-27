---
title: "Java NIO 和 epoll 的关系"
pubDatetime: 2020-08-27T17:23:48+08:00
tags: [java]
---

Java NIO 在 linux 对应的实现是 epoll。epoll 包含三个函数，分别是：

* `epoll_create`：创建一个 epoll 实例，对应 `Selector`。
* `epoll_ctl`：注册 I/O 事件，对应 `SelectableChannel.register()`。
* `epoll_wait`：等待 I/O 事件，没有则阻塞，`对应 Selector.select()`。

epoll 的事件有 `EPOLLIN`，`EPOLLOUT`，`EPOLLHUP`，`EPOLLRDHUP`，`EPOLLPRI`，`EPOLLERR`。可以简单分为输入、输出和异常。

NIO 的事件有 `OP_READ`,`OP_WRITE`,`OP_CONNECT`,`OP_ACCEPT`。READ、WRITE 分别和 IN、OUT 对应，多了 `OP_CONNECT` 和 `OP_ACCEPT`，少了异常。

## OP_CONNECT 和 OP_ACCEPT 

`OP_ACCEPT` 等于 `POLLIN`：

```java
public int translateInterestOps(int ops) {
    int newOps = 0;
    if ((ops & SelectionKey.OP_ACCEPT) != 0)
        newOps |= Net.POLLIN;
    return newOps;
}
```

`ServerSocket` 只关心 `OP_ACCEPT`，所以这里并不区分 `OP_ACCEPT` 和 `OP_READ`。

`OP_CONNECT` 等于 `POLLOUT`：

```c++
JNIEXPORT jshort JNICALL
Java_sun_nio_ch_Net_pollconnValue(JNIEnv *env, jclass this)
{
    return (jshort)POLLOUT;
}
```

`Sokcet` 通过连接状态来区分 `OP_CONNECT` 和 `OP_WRITE`。

```java
if (((ops & Net.POLLCONN) != 0) &&
    ((intOps & SelectionKey.OP_CONNECT) != 0) && isConnectionPending())
    newOps |= SelectionKey.OP_CONNECT;

if (((ops & Net.POLLOUT) != 0) &&
    ((intOps & SelectionKey.OP_WRITE) != 0) && connected)
    newOps |= SelectionKey.OP_WRITE;
```

这里有一个非常容易混淆的地方，假如理解成：`Socket` 调用 `connect`，`ServerSocket` 触发 `OP_ACCEPT` 事件调用 `accept`，`Socket` 触发 `OP_CONNECT` 事件调用 `finishConnect`。看上去和三次握手完全一致，但完全不是这样。`ServerSocket` 调用 `accept` 时三次握手已经完成了。

`OP_CONNECT` 就是 `POLLOUT`，代表缓冲区可写（隐含连接已经建立），而 `finishConnect` 只是检查缓冲区是否可写。 

```java
public boolean finishConnect() throws IOException {
    ...
        boolean polled = Net.pollConnectNow(fd);
        if (blocking) {
            while (!polled && isOpen()) {
                park(Net.POLLOUT);
                polled = Net.pollConnectNow(fd);
            }
        }
        connected = polled && isOpen();
    ...
}
```

```c++
JNIEXPORT jboolean JNICALL
Java_sun_nio_ch_Net_pollConnect(JNIEnv *env, jobject this, jobject fdo, jlong timeout)
{
    ...
    poller.fd = fd;
    poller.events = POLLOUT;
    poller.revents = 0;
    if (timeout < -1) {
        timeout = -1;
    } else if (timeout > INT_MAX) {
        timeout = INT_MAX;
    }

    result = poll(&poller, 1, (int)timeout);
    ...
}

```

## 异常

需要特别注意的是，NIO 中没有单独的异常事件，而出现异常时，会触发所有的事件。

```java
public boolean translateReadyOps(int ops, int initialOps, SelectionKeyImpl ski) {
    int intOps = ski.nioInterestOps();
    int oldOps = ski.nioReadyOps();
    int newOps = initialOps;
    ...
    if ((ops & (Net.POLLERR | Net.POLLHUP)) != 0) {
        newOps = intOps;
        ski.nioReadyOps(newOps);
        return (newOps & ~oldOps) != 0;
    }
    ...
}
```

