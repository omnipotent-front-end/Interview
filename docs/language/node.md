# Nodejs

## 进程相关

### 进程和线程有什么区别？

进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础，进程是线程的容器（来自百科）。我们启动一个服务、运行一个实例，就是开一个服务进程，例如 Java 里的 JVM 本身就是一个进程，Node.js 里通过 node app.js 开启一个服务进程，**多进程就是进程的复制（fork）**，fork 出来的每个进程都拥有自己的独立空间地址、数据栈，一个进程无法访问另外一个进程里定义的变量、数据结构，**只有建立了 IPC 通信，进程之间才可数据共享**。

**线程是操作系统能够进行运算调度的最小单位**，首先我们要清楚线程是隶属于进程的，被包含于进程之中。**一个线程只能隶属于一个进程，但是一个进程是可以拥有多个线程的**。
同一块代码，可以根据系统CPU核心数启动多个进程，每个进程都有属于自己的独立运行空间，进程之间是不相互影响的。同一进程中的多条线程将共享该进程中的全部系统资源，如虚拟地址空间，文件描述符和信号处理等。但同一进程中的多个线程有各自的调用栈（call stack），自己的寄存器环境（register context），自己的线程本地存储（thread-local storage)，线程又有单线程和多线程之分，具有代表性的 JavaScript、Java 语言.


---


### Nodejs单线程的优缺点

Node.js的单线程指的是主线程是“单线程”，由主要线程去按照编码顺序一步步执行程序代码，假如遇到同步代码阻塞，主线程被占用，后续的程序代码执行就会被卡住。但由于有事件驱动，其效率又非常高。

单线程的好处在于：

1、多线程占用内存高

2、多线程间切换使得CPU开销大

3、多线程由内存同步开销

4、编写单线程程序简单

5、线程安全

单线程的缺点在于：

1、CPU密集型任务占用CPU时间长（可通过cluster方式解决）

2、无法利用CPU的多核（可通过cluster方式解决）

3、单线程抛出异常使得程序停止（可通过try catch方式或自动重启机制解决）


---

### 什么是孤儿进程？

父进程创建子进程之后，父进程退出了，但是父进程对应的一个或多个子进程还在运行，这些子进程会被系统的 init 进程收养，**对应的进程 ppid 为 1**，这就是孤儿进程。

[此处有demo](https://github.com/FunnyLiu/nodeDemo#fork_orphan)

---

### 如何fork多进程,执行在同一端口，如`app.listen(3000)`,而不冲突？


如果只是普通的fork，是会报端口占用冲突的，这个时候需要使用句柄，当父子进程之间建立 IPC 通道之后，通过子进程对象的 send 方法发送消息。

[demo示例](https://github.com/FunnyLiu/nodeDemo#fork_multiprocess_sameport)

---

### 什么是IPC？IPC的使用场景？Node中如何实现IPC？

IPC (Inter-process communication) ，即进程间通信技术，由于每个进程创建之后都有自己的独立地址空间，实现 IPC 的目的就是为了进程之间资源共享访问，实现 IPC 的方式有多种：**管道、消息队列、信号量、Domain Socket**，Node.js 通过 **pipe** 来实现。

[demo](https://github.com/FunnyLiu/nodeDemo#ipc_pipe)

---

### 守护进程是什么？Node中如何实现？

守护进程（Daemon）是**运行在后台的一种特殊进程**。 它独立于控制终端并且周期性地执行某种任务或等待处理某些发生的事件。

打个比方，当我们打开终端执行 node app.js 开启一个服务进程之后，这个终端就会一直被占用，如果关掉终端，服务就会断掉，即前台运行模式。如果采用守护进程进程方式，这个终端我执行 node app.js 开启一个服务进程之后，我还可以在这个终端上做些别的事情，且不会相互影响。

Node界有一些常用的守护进程库如forever/pm2/nodemon/Egg-Cluster等。

[实现一个简单的守护进程](https://github.com/FunnyLiu/nodeDemo/blob/master/readme.md#daemon)

[forever的原理也是类似](https://github.com/foreversd/forever-monitor/blob/master/lib/forever-monitor/monitor.js#L229)



---
---

## 底层原理

### 整体架构

Nodejs源码的整体架构如下：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190701094137.png"/>

各模块说明：

**V8**：Google 开源的高性能 JavaScript 引擎，以 C++ 实现。这也是集成在 Chrome 中的 JS 引擎。V8 将你写的 JavaScript 代码编译为机器码（所以它超级快）然后执行。

**libuv**：提供异步功能的 C 库。它在运行时负责一个事件循环（Event Loop）、一个线程池、文件系统 I/O、DNS 相关和网络 I/O，以及一些其他重要功能。
**每个操作系统对于事件多路复用器有其自身的接口**，Linux是epoll，Mac OSX是kqueue，Windows的IOCP API。除外，即使在相同的操作系统中，每个I/O操作对于不同的资源表现不一样。例如，在Unix下，普通文件系统不支持非阻塞操作，所以，为了模拟非阻塞行为，需要使用在事件循环外用一个独立的线程。所有这些平台内和跨平台的不一致性需要在事件多路复用器的上层做抽象。这就是为什么Node.js为了兼容所有主流平台而编写C语言库libuv，目的就是为了使得Node.js兼容所有主流平台和规范化不同类型资源的非阻塞行为。libuv今天作为Node.js的I/O引擎的底层。

**其他 C/C++ 组件和库**：如 c-ares、crypto (OpenSSL)、http-parser 以及 zlib。这些依赖提供了对系统底层功能的访问，包括网络、压缩、加密等。

**应用/模块（Application/Modules）**：这部分就是**所有的 JavaScript 代码**：你的应用程序、Node.js 核心模块、任何 npm install 的模块，以及你写的所有模块代码。你花费的主要精力都在这部分。

**绑定（Bindings）**：Node.js 用了这么多 C/C++ 的代码和库的原因很简单：它们性能上佳。不过，JavaScript 代码最后是怎么跟这些 C/C++ 代码互相调用的呢？这不是三种不同的语言吗？确实如此，而且通常不同语言写出来的代码也不能互相沟通，没有 binding 就不行。Binding 是一些胶水代码，能够把不同语言绑定在一起使其能够互相沟通。在 Node.js 中，**binding 所做的就是把 Node.js 那些用 C/C++ 写的库接口暴露给 JS 环境**。这么做的目的之一是代码重用：这些功能已经有现存的成熟实现，没必要只是因为换个语言环境就重写一遍，如果桥接调用一下就足够的话。另一个原因是性能：C/C++ 这样的系统编程语言通常都比其他高阶语言（Python、JavaScript、Ruby 等等）性能更高。所以把主要消耗 CPU 的操作以 C/C++ 代码来执行更明智些。

**C/C++ Addons**：Binding 仅桥接 Node.js 核心库的一些依赖，zlib、OpenSSL、c-ares、http-parser 等。如果你想在应用程序中包含其他第三方或者你自己的 C/C++ 库的话，需要自己完成这部分胶水代码。你写的这部分胶水代码就称为 Addon。可以把 Binding 和 Addon 视为连接 JavaScript 代码和 C/C++ 代码的桥梁。


### 事件驱动

为什么node效率可以这么高，同时处理数万级的并发而不会造成阻塞呢？

这完全依靠事件驱动：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190701100810.png"/>

1、每个Node.js进程只有一个主线程在执行程序代码，形成一个执行栈（execution context stack)。

2、主线程之外，还维护了一个"事件队列"（Event queue）。当用户的网络请求或者其它的异步操作到来时，node都会把它放到Event Queue之中，此时并不会立即执行它，代码也不会被阻塞，继续往下走，直到主线程代码执行完毕。

3、主线程代码执行完毕完成后，然后通过Event Loop，也就是事件循环机制，开始到Event Queue的开头取出第一个事件，从线程池中分配一个线程去执行这个事件，接下来继续取出第二个事件，再从线程池中分配一个线程去执行，然后第三个，第四个。主线程不断的检查事件队列中是否有未执行的事件，直到事件队列中所有事件都执行完了，此后每当有新的事件加入到事件队列中，都会通知主线程按顺序取出交EventLoop处理。当有事件执行完毕后，会通知主线程，主线程执行回调，线程归还给线程池。

4、主线程不断重复上面的第三步。

---

