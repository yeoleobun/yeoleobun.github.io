---
title: "REUSEPORT 负载均衡"
pubDatetime: 2024-03-10T15:42:19+08:00
tags: [linux]
---

我一直以为开启`SO_REUSEPORT`之后，只有第一个绑定的`socket`可以`accept`到新的连接。最近看`gen_tcp`文档，其中有一个选项是`reuseport_lb`，显然这个选项说明新的连接可以负载均衡（load balance）到绑定同一个端口的多个socket。

> SO_REUSEPORT (since Linux 3.9)
>
> Permits multiple AF_INET or AF_INET6 sockets to be bound to an identical socket address.  
>
> For TCP sockets, this option allows accept(2) load distribution in a multi-threaded server to be improved by using a distinct listener socket for each thread.  This provides improved load distribution as compared to traditional techniques such using a single accept(2)ing thread that distributes connections, or having multiple threads that compete to accept(2) from the same socket.
>
> For UDP sockets, the use of this option can provide better distribution of incoming datagrams to multiple processes (or threads) as compared to the traditional technique of having multiple processes compete to receive datagrams on the same socket.

这个选项目前只对`Linux`生效（3.9以上版本）。

测试程序服务端：

```c
#include <netinet/in.h>
#include <pthread.h>
#include <stdio.h>
#include <unistd.h>
void *run(void *par) {
  int n = *(int *)par;
  int server = socket(AF_INET, SOCK_STREAM, 0);
  int enable = 1;
  setsockopt(server, SOL_SOCKET, SO_REUSEPORT, &enable, sizeof(int));

  struct sockaddr_in addr;
  addr.sin_family = AF_INET;
  addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
  addr.sin_port = htons(3000);

  int ret = bind(server, (struct sockaddr *)&addr, sizeof(addr));
  listen(server, 1);
  while (1) {
    int client = accept(server, (struct sockaddr *)NULL, NULL);
    printf("acceptor %d\n", n);
    close(client);
  }
  return NULL;
}

int main(void) {
  int thread_num = 3;
  pthread_t thread[thread_num];
  int args[thread_num];
  for (int i = 0; i < thread_num; i++) {
    args[i] = i;
  }
  for (int i = 0; i < thread_num; i++) {
    pthread_create(&thread[i], NULL, run, &args[i]);
  }
  void *result[thread_num];
  for (int i = 0; i < thread_num; i++) {
    pthread_join(thread[i], &result[i]);
  }
  return 0;
}
```

客户端：

```python
#!/usr/bin/env python3
import socket
for _ in range(10):
    with socket.socket(socket.AF_INET,socket.SOCK_STREAM) as s:
        s.connect(("localhost",3000))
```

结果：

```shell
acceptor 2
acceptor 0
acceptor 0
acceptor 2
acceptor 1
acceptor 2
acceptor 2
acceptor 0
acceptor 1
acceptor 1
```