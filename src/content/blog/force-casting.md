---
title: "真の强制转型"
pubDatetime: 2017-04-16T18:23:35+08:00
description: "真正的强制转型可以转换任何类型"
tags: [java]
---

在 Java 中，任何时候都可以向上转型（即将子类型值转换成父类型）。但从父类型转换为子类型需要运行时类型检查。

两个没有继承关系的类 `A` 和 `B`，将类 `A` 的对象 `a` 先转换成 `Object` 类型，再从 `Object` 类型转换成类型 `B`，会报 `ClassCastException` 异常。

## 如何检查

对象的类型信息存储在对象头的第二段中，偏移量为 8 字节。开启 `UseCompressedClassPointers` 选项（默认）占 4 字节，关闭这一选项则占 8 字节。

```c++
class oopDesc {
  ...
 private:
  volatile markWord _mark; // 8字节
  union _metadata {
    Klass*      _klass; // 8字节
    narrowKlass _compressed_klass; //4字节
  } _metadata;
  ...
}
```

通过对比对象的类型和要转换的类型，便可以完成检查。

## 如何绕过

如果要将类 `A` 的对象 a，转换成类型 `B`, 将对象 `a` 的 `Klass` 指针改成 `B` 的 `Klass` 即可。

```java
import sun.misc.Unsafe;

import java.lang.reflect.Field;
class A{}
class B{}

public class Main {

    public static void main(String[] args) {
        B b = new B();
        int klass = unsafe.getInt(b,8);

        Object a = new A();
        unsafe.putInt(a,8,klass);
        B a_1 = (B) a;
    }

    static Unsafe unsafe;
    static {
        Field unsafeField;
        try {
            unsafeField = Unsafe.class.getDeclaredField("theUnsafe");
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
        }
        unsafeField.setAccessible(true);
        try {
            unsafe = (Unsafe) unsafeField.get(null);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
```

## 压缩指针

压缩指针默认是开启的，可以通过 `-XX:-UseCompressedOops -XX:-UseCompressedClassPointers `\
选项关闭，分别对应普通对象的指针（ordinary object pointer）和 `Klass` 指针。

当对象地址按 8 字节对齐时，低三位都是 0。因此可以通过右移 3 位压缩，左移 3 位还原。只需要右移 3 位之后的地址可以放进 4 字节中，也就是堆内存要小于 32G。

指针压缩等于指针减去堆基地址再右移 3 位，这里假设基地址是0。

```java
static int compress(long p){
    return (int)(p >> 3);
}

static long decompress(int p){
    long m = 1L << 32;
    return ((long) p + m) % m << 3;
}
```

## 如何获取 `Klass` 指针

注意，上面B的 `Klass` 指针是从 B 的对象中获得的。如果从 `B.class` 中获取，各版本的偏移量几乎都不同，是否开启压缩指针和指针的大小之间的关系也难以捉摸。

* java 8: 开启压缩指针偏移量是 72，此时指针仍然占 8 字节，关闭压缩指针偏移量是 128。
* java 11: 开启压缩指针偏移量为 80，关闭压缩指针偏移量为 152。
* java 21: 偏移量为 16。

其他的版本我没有尝试。