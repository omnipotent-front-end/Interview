# Docker

## 应用

### docker 部署有什么好处?

从应用架构角度，随着功能越来越多，你的应用依赖也会越来越多…总之，你的应用架构只会越来越复杂。不同的组件的安装，配置与运行步骤各不相同，于是你不得不写一个很长的文档给新同事，只为了让他搭建一个开发环境。使用Docker的话，你可以为不同的组件逐一编写Dockerfile，分别构建镜像，然后运行在各个容器中。这样做，将复杂的架构统一。

从应用部署角度，使用Docker的话，开发、构建、测试、生产将全部在Docker容器中执行，你需要为不同步骤编写不同的Dockerfile。Dockerfile将Docker镜像描述得非常精准，能够保证很强的一致性。比如，操作系统的版本，Node.js的版本，NPM模块的版本等。这就意味着，在本地开发环境运行成功的镜像，在构建、测试、生产环境中也没有问题。还有，不同的Docker容器是依赖于不同的Docker镜像，这样他们互不干扰。比如，两个Node.js应用可以分别使用不同版本的Node.js。

从集群管理角度，每次新增节点的时候，你就不得不花大量时间进行安装与配置，这其实是一种低效的重复劳动。下载Docker镜像之后，Docker容器可以运行在集群的任何一个节点。一方面，各个组件可以共享主机，且互不干扰；另一方面，也不需要在集群的节点上安装和配置任何组件。至于整个Docker集群的管理，业界有很多成熟的解决方案，例如Mesos，Kubernetes与Docker Swarm。这些集群系统提供了调度，服务发现，负载均衡等功能，让整个集群变成一个整体。

参考链接：

[当Node.js遇见Docker](https://blog.fundebug.com/2017/03/27/nodejs-docker/)




## 原理

### docker 的底层原理是什么？

Docker将不同应用的进程隔离了起来，这些被隔离的进程就是一个个容器。隔离是基于两个Linux内核机制实现的，Namesapce和Cgroups，一个隔离环境，一个控制资源配额。

Namespace可以从UTD、IPC、PID、Mount，User和Network的角度隔离进程。比如，不同的进程将拥有不同PID空间，这样容器中的进程将看不到主机上的进程，也看不到其他容器中的进程。这与Node.js中模块化以隔离变量的命名空间的思想是异曲同工的。

通过Cgroups，可以**限制进程对CPU，内存等资源的使用**。简单地说，我们可以通过Cgroups指定容器只能使用1G内存。

从进程角度理解Docker，那每一个Docker容器就是被隔离的进程及其子进程。


参考：

[当Node.js遇见Docker](https://blog.fundebug.com/2017/03/27/nodejs-docker/)


### 隔离环境主要隔离什么环境？

Namespace可以从UTD、IPC、PID、Mount，User和Network的角度隔离进程。比如，不同的进程将拥有不同PID空间，这样容器中的进程将看不到主机上的进程，也看不到其他容器中的进程。这与Node.js中模块化以隔离变量的命名空间的思想是异曲同工的。

参考：

[当Node.js遇见Docker](https://blog.fundebug.com/2017/03/27/nodejs-docker/)

[理解Docker（3）：Docker 使用 Linux namespace 隔离容器的运行环境 - SammyLiu - 博客园](https://www.cnblogs.com/sammyliu/p/5878973.html)

### 有没有了解过 ufs？

所谓UnionFS就是把不同物理位置的目录合并mount到同一个目录中。UnionFS的一个最主要的应用是，把一张CD/DVD和一个硬盘目录给联合 mount在一起，然后，你就可以对这个只读的CD/DVD上的文件进行修改。

AUFS是一种Union File System，关于docker的分层镜像，除了aufs，docker还支持btrfs, devicemapper和vfs，你可以使用 -s 或 –storage-driver= 选项来指定相关的镜像存储。

下图来自Docker的官方文档Layer，其很好的展示了Docker用UnionFS搭建的分层镜像：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200221115423.png"/>

参考：

[Docker基础技术：AUFS | | 酷 壳 - CoolShell](https://coolshell.cn/articles/17061.html)

[理解Docker（7）：Docker 存储 - AUFS - SammyLiu - 博客园](https://www.cnblogs.com/sammyliu/p/5931383.html)

