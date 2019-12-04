# Docker

## 应用

### docker 部署有什么好处?（todo）



## 原理

### docker 的底层原理是什么（todo）

namespace 和 cgroups，一个隔离环境，一个控制资源配额。

### 隔离环境主要隔离什么环境（todo）

根据我对 docker 的映像说了网络，memory，进程，volume。回去之后看了看才知道是在问 linux namespcaces 有哪些..


### 有没有了解过 ufs（todo）
没有...回去之后发现这就是 docker 的分层存储，虽然一直知道它是分层存储，但不知道叫 ufs

