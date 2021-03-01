# Nodejs

## 进程相关

### 进程和线程有什么区别？

进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础，进程是线程的容器（来自百科）。我们启动一个服务、运行一个实例，就是开一个服务进程，例如 Java 里的 JVM 本身就是一个进程，Node.js 里通过 node app.js 开启一个服务进程，**多进程就是进程的复制（fork）**，fork 出来的每个进程都拥有自己的独立空间地址、数据栈，一个进程无法访问另外一个进程里定义的变量、数据结构，**只有建立了 IPC 通信，进程之间才可数据共享**。

**线程是操作系统能够进行运算调度的最小单位**，首先我们要清楚线程是隶属于进程的，被包含于进程之中。**一个线程只能隶属于一个进程，但是一个进程是可以拥有多个线程的**。
同一块代码，可以根据系统CPU核心数启动多个进程，每个进程都有属于自己的独立运行空间，进程之间是不相互影响的。同一进程中的多条线程将共享该进程中的全部系统资源，如虚拟地址空间，文件描述符和信号处理等。但同一进程中的多个线程有各自的调用栈（call stack），自己的寄存器环境（register context），自己的线程本地存储（thread-local storage)，线程又有单线程和多线程之分，具有代表性的 JavaScript、Java语言


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


### 创建子进程的方式有哪些？有什么区别？

创建子进程的方法大致有：

spawn()：启动一个子进程来执行命令

exec(): 启动一个子进程来执行命令，与spawn()不同的是其接口不同，它有一个回调函数获知子进程的状况

execFlie(): 启动一个子进程来执行可执行文件

fork(): 与spawn()类似，不同点在于它创建Node子进程需要执行js文件

spawn()与exec()、execFile()不同的是，后两者创建时可以指定timeout属性设置超时时间，一旦创建的进程超过设定的时间就会被杀死

exec()与execFile()不同的是，exec()适合执行已有命令，execFile()适合执行文件。



参考：

[Node.js 有难度的面试题，你能答对几个？ - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1514668)

### 请问你知道spawn在创建子进程的时候，第三个参数有一个stdio选项吗，这个选项的作用是什么，默认的值是什么。

选项用于配置在父进程和子进程之间建立的管道。

默认情况下，子进程的 stdin、 stdout 和 stderr 会被重定向到 ChildProcess 对象上相应的 subprocess.stdin、subprocess.stdout 和 subprocess.stderr 流。

这相当于将 options.stdio 设置为 ['pipe', 'pipe', 'pipe']。


参考：

[Node.js 有难度的面试题，你能答对几个？ - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1514668)

### 请问实现一个node子进程被杀死，然后自动重启代码的思路

在创建子进程的时候就让子进程监听exit事件，如果被杀死就重新fork一下

``` js
var createWorker = function(){
    var worker = fork(__dirname + 'worker.js')
    worker.on('exit', function(){
        console.log('Worker' + worker.pid + 'exited');
        // 如果退出就创建新的worker
        createWorker()
    })
}
```

[Node.js 有难度的面试题，你能答对几个？ - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1514668)

## npm

### npm install的流程到底是什么样子的？越具体越好
输入 npm install 命令并敲下回车后，会经历如下几个阶段（以 npm 5.5.1 为例）：

1、执行工程自身 preinstall

当前 npm 工程如果定义了 preinstall 钩子此时会被执行。

2、确定首层依赖模块

首先需要做的是确定工程中的首层依赖，也就是 dependencies 和 devDependencies 属性中直接指定的模块（假设此时没有添加 npm install 参数）。

工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。

3、获取模块

获取模块是一个递归的过程，分为以下几步：

获取模块信息。在下载一个模块之前，首先要确定其版本，这是因为 package.json 中往往是 semantic version（semver，语义化版本）。此时如果版本描述文件（npm-shrinkwrap.json 或 package-lock.json）中有该模块信息直接拿即可，如果没有则从仓库获取。

npm 会用此地址检查本地缓存（根目录的.npm文件存有所有的模块压缩包），缓存中有就直接拿，如果没有则从仓库下载。

查找该模块依赖，如果有依赖则回到第1步，如果没有则停止。

4、模块扁平化（dedupe）

上一步获取到的是一棵完整的依赖树，其中可能包含大量重复模块。比如 A 模块依赖于 loadsh，B 模块同样依赖于 lodash。在 npm3 以前会严格按照依赖树的结构进行安装，因此会造成模块冗余。

从 npm3 开始默认加入了一个 dedupe 的过程。它会遍历所有节点，逐个将模块放在根节点下面，也就是 node-modules 的第一层。当发现有重复模块时，则将其丢弃。

这里需要对重复模块进行一个定义，它指的是模块名相同且 semver 兼容。每个 semver 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，那么就可以得到一个兼容版本，而不必版本号完全一致，这可以使更多冗余模块在 dedupe 过程中被去掉。

依据 semver 的规则判断是否仍保留在依赖树里。


5、安装模块


这一步将会更新工程中的 node_modules，并执行模块中的生命周期函数（按照 preinstall、install、postinstall 的顺序）。

6、执行工程自身生命周期

当前 npm 工程如果定义了钩子此时会被执行（按照 install、postinstall、prepublish、prepare 的顺序）。

最后一步是生成或更新版本描述文件，并将新的包的压缩包放入.npm文件，方便下次取用，npm install 过程完成。

### npm run script的原理如何？是如何能够识别当前局部安装的库的？

参考[npm run **原理](https://github.com/FunnyLiu/cli/tree/readsource#npm-run--%E5%8E%9F%E7%90%86)，npm run 的时候是执行子shell命令的实现，基于npm-lifecycle这个模块。[npm-lifecycle源码分析](https://github.com/FunnyLiu/npm-lifecycle/tree/readsource)，主要负责npm包真正执行命令时的shell进程，需要注意的是，执行npm run时是在当前目录的 node_modules/.bin 子目录**加入到 PATH 变量**（从而实现识别当前局部安装的bin），执行结束后，再将 PATH 变量恢复原样（相关处理在lifecycle_函数中），然后真正执行shell是通过child_process模块开启子进程来完成。

我们每次在运行 scripts 中的一个属性时候(npm run),**实际系统都会自动新建一个shell(一般是Bash)，在这个shell里面执行指定的脚本命令。

参考：

[【Node进阶】你应该知道的NPM知识都在这！](https://mp.weixin.qq.com/s/h4uYa1BW7bUQCpt3iGqWUA)

### 自己写的npm包需要调试，怎么办？

一般会在需要调试的地方，通过npm link 包名来进行软连接的处理。

### npm link相关原理

参考[npm link原理分析](https://github.com/FunnyLiu/cli/tree/readsource#npm-link-%E5%8E%9F%E7%90%86)，

npm link 主要做了两件事：

为目标 npm 模块创建软链接，将其链接到全局 node 模块安装路径 /usr/local/lib/node_modules/。

为目标 npm 模块的可执行 bin 文件创建软链接，将其链接到全局 node 命令安装路径 /usr/local/bin/。

而 npm link ** 则是将全局的**再软链回自己的依赖下面。

以上具体逻辑在link.js中。

npm unlink的本质就是 npm uninstall，没有单独文件，直接指向uninstall.js文件


### node模块缓存是否了解？

所有缓存的模块保存在require.cache之中。

[有没有办法取消 node.js 对 require 模块的缓存？ - CNode技术社区](https://cnodejs.org/topic/52aa6e78a9526bff2232aaa9)

### require文件时，希望文件内容变化后，下一次不需要重启应用就生效。

如果是require会走到node对模块的缓存里，所以直接通过fsapi来读取文件内容，从而绕过这个缓存。

### 在node里怎么实现一个单例

参考：[design - 设计模式（以Typescript描述）](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/singleton/index?id=node%e6%a8%a1%e5%9d%97%e4%b8%ad%e7%9a%84%e5%8d%95%e4%be%8b)

利用require时会去读取module的cache这一流程，来实现了以模块出口为class实例的单例模式。

``` js
class A {
}
module.exports = new A();
```





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

### 一次EventLoop的具体阶段

首先了解[事件驱动](/language/node.html#%E4%BA%8B%E4%BB%B6%E9%A9%B1%E5%8A%A8)，和[任务队列机制](/language/javascript.html#%E4%BB%BB%E5%8A%A1%E9%98%9F%E5%88%97%E6%9C%BA%E5%88%B6)。

``` bash
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘

```

事件循环必须跑完这六个阶段才算一个轮回。

每个阶段都有一个回调函数FIFO（先进先出）队列。
EL进入一个阶段会执行里面所有的操作，然后执行回调函数，直到队列消耗尽，或是回调函数执行数量达到最大限制。
清理nextTickQueue/microtasks 之后进入下一个阶段。

#### timers(定时器)

这个阶段执行setTimeout()和setInterval()设定的回调。

一个timer指定一个下限时间而不是准确时间，在达到这个下限时间后执行回调。在指定时间过后，timers会尽可能早地执行回调，但系统调度或者其它回调的执行可能会延迟它们。

注意：技术上来说，poll 阶段控制 timers 什么时候执行。

注意：这个下限时间有个范围：[1, 2147483647]，如果设定的时间不在这个范围，将被设置为1。

#### I/O callbacks(I/O回调) 

 执行被推迟到下一个iteration的 I/O 回调。

举个例子, 如果一个TCP socket在尝试连接时收到 ECONNREFUSED 错误, 一些 *nix 系统会等待报告该错误. 这些操作会被添加到队列并在 I/O callbacks 阶段执行。


#### idle(空转), prepare

此阶段只在内部使用

#### poll(轮询) 

获取新的I/O事件；node会在适当条件下阻塞在这里。这个阶段执行几乎所有的回调，除了close回调，timer的回调，和setImmediate()的回调。

poll 阶段有两个主要功能:

1、执行下限时间已经达到的timers的回调，然后

2、处理 poll 队列里的事件。

#### check(检查) 

执行setImmediate()设定的回调。

这个阶段允许在 poll 阶段结束后立即执行回调。如果 poll 阶段空闲，并且有被setImmediate()设定的回调，event loop会转到 check 阶段而不是继续等待。

setImmediate()实际上是一个特殊的timer，跑在event loop中一个独立的阶段。它使用libuv的API
来设定在 poll 阶段结束后立即执行回调。



#### close callbacks(关闭事件的回调)

如果一个 socket 或 handle 被突然关掉（比如 socket.destroy()），close事件将在这个阶段被触发，否则将通过process.nextTick()触发。


process.nextTick()会把回调塞入nextTickQueue，nextTickQueue将在当前操作完成后处理，不管目前处于event loop的哪个阶段。

**process.nextTick()不管在任何时候调用，都会在所处的这个阶段最后**，在event loop进入下个阶段前，处理完所有nextTickQueue里的回调。

参考：

[浏览器和NodeJS中不同的Event Loop · Issue #234 · kaola-fed/blog](https://github.com/kaola-fed/blog/issues/234)

### require的模块查找顺序是怎么样的？

当 Node 遇到 require(X) 时，按下面的顺序处理。

(1)如果 X 是内置模块(比如 require('http')) 

a. 返回该模块。

b. 不再继续执行。

(2)如果 X 以 "./" 或者 "/" 或者 "../" 开头

a.   根据 X 所在的父模块，确定 X 的绝对路径。

b.   将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续 执行。

```
X
X.js
X.json
X.node
```

c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续 执行。

```
X/package.json(main 字段) X/index.js
X/index.json
X/index.node
```

(3)如果 X 不带路径

a. 根据 X 所在的父模块，确定 X 可能的安装目录。

b. 依次在每个目录中，将 X 当成文件名或目录名加载。

(4)抛出 "not found"


参考：

[require() 源码解读 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/05/require.html)

### cluster模块主要是做什么的？有哪些应用场景？

主要作用就是**以master-worker模式启动多个应用实例**，来解决js代码执行在单线程中的脆弱问题。pm2，egg-cluster均基于此实现。

### 为什么cluster的fork，不会出现端口号冲突？ 

端口仅由master进程中的内部TCP服务器监听了一次。

不会出现端口被重复监听报错，是由于，worker进程中，最后执行监听端口操作的方法，已被cluster模块主动hack，**起一个内部TCP服务器，来承担监听该端口/描述符的职责，随后在master中记录下该worker。**

参考地址：

[通过源码解析Node.js中的cluster模块的主要功能实现](https://cnodejs.org/topic/56e84480833b7c8a0492e20c)


### Node中对异步IO的工作原理。

首先理解：[对操作系统异步i-o操作的理解？](/cp/os.html#%E5%AF%B9%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%BC%82%E6%AD%A5i-o%E6%93%8D%E4%BD%9C%E7%9A%84%E7%90%86%E8%A7%A3%EF%BC%9F)，其中提到，在Linux平台下，暂不支持理想的异步IO模型。

所幸的是，**libev** 的作者 Marc Alexander Lehmann 重新实现了一个**异步 I/O 的库：libeio**。libeio 实质依然是**采用线程池与阻塞 I/O 模拟出来的异步 I/O**。

Windows 有一种独有的内核异步 IO 方案：IOCP。IOCP 的思路是真正的异步 I/O 方案，调用异步方法，然后等待 I/O 完成通知。IOCP 内部依旧是通过线程实现，不同在于这些线程由系统内核接手管理。IOCP 的异步模型与 Node.js 的异步调用模型已经十分近似。

以上两种方案则正是 Node.js 选择的异步 I/O 方案。由于 Windows 平台和 *nix 平台的差异，Node.js 提供了 libuv 来作为抽象封装层，使得所有平台兼容性的判断都由这一层次来完成，保证上层的 Node.js 与下层的 libeio/libev 及 IOCP 之间各自独立。Nodejs的整体架构参见：[整体架构](/language/node.html#%E6%95%B4%E4%BD%93%E6%9E%B6%E6%9E%84)




参考：

[深入浅出Node.js（五）：初探Node.js的异步I/O实现](https://www.infoq.cn/article/nodejs-asynchronous-io/)


### libev底层的线程池原理

首先理解：[node中对异步io的工作原理。](/language/node.html#node%E4%B8%AD%E5%AF%B9%E5%BC%82%E6%AD%A5io%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E3%80%82)

本质就是**每个io在libev层面都是有单独线程来做的**。默认线程池大小为4，最大可以设置为128，并且使用一个队列来管理对线程池的访问 – 结果是，如果你有5个长时间运行的DB查询全部同时进行，其中一个(和任何其他依赖线程池的异步动作)将等待这些查询在开始之前完成。可以自己设置线程池大小。



参考：

[Node.js 异步原理-线程池 - 奇乐汪汪汪 - SegmentFault 思否](https://segmentfault.com/a/1190000019111942)

[node.js – 什么时候使用线程池？ - 代码日志](https://codeday.me/bug/20170804/51540.html)

---

## 应用

### setImmediate和setTimeout有什么区别？

如果你把这两个函数放入一个 I/O 循环内调用，setImmediate 总是被优先调用
``` js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

结果为：
``` bash
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```



使用 setImmediate() 而不是 setTimeout() 的主要优点是 **setImmediate() 在任何计时器（如果在 I/O 周期内）都将始终执行，而不依赖于存在多少个计时器。**

---

### process.nextTick和setImmediate的区别是什么？

process.nextTick() 在同一个阶段立即执行。

setImmediate() 在下一个迭代或 ‘tick’ 上触发事件循环。

一个可以形象对比的图：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190711142337.png"/>

### 什么情况下需要用到process.nextTick?

某些代码的执行可能先于它们所需要的条件完成之前，所以将这些需要先置条件的代码放入到一个回调函数中，然后放入到下一个事件循环的顶层。那么这些代码就不会被立刻执行了，而是在下一轮事件启动之前等待，启动后在进行执行。

比如：

在一次循环区间内无法满足需求的大量操作，比如[操作大量数据导致mongo内存溢出](https://stackoverflow.com/questions/23672873/maximum-call-stack-size-exceeded-on-insert-10000-documents)

又或者是[事件触发和监听](https://stackoverflow.com/questions/8112914/what-are-the-proper-use-cases-for-process-nexttick-in-node-js)。


Node源码内也有大量用到，比如说[实现util-callbackify和util-promisify](/language/node.html#%E5%AE%9E%E7%8E%B0util-callbackify%E5%92%8Cutil-promisify)中的util.callbackify。

### 遇到过Nodejs中的内存泄漏吗？怎么排查呢？怎么避免呢？

Node.js 使用 V8 作为 JavaScript 的执行引擎，所以**讨论 Node.js 的 GC 情况就等于在讨论 V8 的 GC**。在 V8 中一个对象的内存是否被释放，是看程序中是否还有地方持有该对象的引用。[谈谈v8中的gc策略](/cp/browser.html#谈谈v8中的gc策略)


**内存泄漏的几种情况**

一、全局变量
``` js
a = 10;
//未声明对象。

global.b = 11;
//全局变量引用
```
这种比较简单的原因，全局变量直接挂在 root 对象上，不会被清除掉。

二、闭包
``` js
function out() {
  const bigData = new Buffer(100);
  inner = function () {
    void bigData;
  }
}
```
闭包会引用到父级函数中的变量，如果闭包未释放，就会导致内存泄漏。上面例子是 inner 直接挂在了 root 上，从而导致内存泄漏（bigData 不会释放）。

需要注意的是，这里举得例子只是简单的将引用挂在全局对象上，实际的业务情况可能是挂在某个可以从 root 追溯到的对象上导致的。


三、事件监听

Node.js 的事件监听也可能出现的内存泄漏。例如**对同一个事件重复监听**，忘记移除（removeListener），将造成内存泄漏。这种情况很容易在复用对象上添加事件时出现，所以事件重复监听可能收到如下警告：

(node:2752) Warning: Possible EventEmitter memory leak detected。11 haha listeners added。Use emitter。setMaxListeners() to increase limit

例如，Node.js 中 Agent 的 keepAlive 为 true 时，可能造成的内存泄漏。当 Agent keepAlive 为 true 的时候，将会复用之前使用过的 socket，如果在 socket 上添加事件监听，忘记清除的话，因为 socket 的复用，将导致事件重复监听从而产生内存泄漏。

原理上与前一个添加事件监听的时候忘了清除是一样的。在使用 Node.js 的 http 模块时，不通过 keepAlive 复用是没有问题的，复用了以后就会可能产生内存泄漏。所以，你需要了解添加事件监听的对象的生命周期，并注意自行移除。


**如何排查内存泄漏**呢？和浏览器端一样，使用chromedevtools进行heapdump快照，对比。

想要定位内存泄漏，通常会有两种情况：

对于只要正常使用就可以重现的内存泄漏，这是很简单的情况只要在测试环境模拟就可以排查了。

对于偶然的内存泄漏，一般会与特殊的输入有关系。想稳定重现这种输入是很耗时的过程。如果不能通过代码的日志定位到这个特殊的输入，那么推荐去生产环境打印内存快照了。

需要注意的是，打印内存快照是很耗 CPU 的操作，可能会对线上业务造成影响。快照工具推荐使用 heapdump 用来保存内存快照，使用 devtool 来查看内存快照。

使用 heapdump 保存内存快照时，只会有 Node.js 环境中的对象，不会受到干扰(如果使用 node-inspector 的话，快照中会有前端的变量干扰)。

PS：安装 heapdump 在某些 Node.js 版本上可能出错，建议使用 npm install heapdump -target=Node.js 版本来安装。

**如何避免内存泄漏**呢？

ESLint 检测代码检查非期望的全局变量。

使用闭包的时候，得知道闭包了什么对象，还有引用闭包的对象何时清除闭包。最好可以避免写出复杂的闭包，因为复杂的闭包引起的内存泄漏，如果没有打印内存快照的话，是很难看出来的。

绑定事件的时候，一定得在恰当的时候清除事件。在编写一个类的时候，推荐使用 init 函数对类的事件监听进行绑定和资源申请，然后 destroy 函数对事件和占用资源进行释放。


参考：

[如何分析 Node.js 中的内存泄漏](https://zhuanlan.zhihu.com/p/25736931)

### Buffer模块做什么的？对于初始化的buffer，可以增加长度吗？

[Buffer](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array)的官方介绍。在[TypedArray](https://interactive-examples.mdn.mozilla.net/pages/js/typedarray-constructor.html)出现前，javascript并没有能够处理二进制的能力。但是在处理像TCP流或文件流时，必须使用到二进制数据。

故而Node增加了一个Buffer模块，用来创建一个专门存放二进制数据的缓存区，主要用于操作字节，处理二进制数据。

**Buffer的长度一旦确定了，就不能再变化了**。

Buffer是一个典型的javascript与C++结合的模块，与性能有关的用C++来实现，javascript 负责衔接和提供接口。**Buffer所占的内存不是V8分配的，是独立于V8堆内存之外的内存，通过C++层面实现内存申请、javascript 分配内存**。值得一提的是，每当我们使用Buffer.alloc(size)请求一个Buffer内存时，**Buffer会以8KB为界限来判断分配的是大对象还是小对象，小对象存入剩余内存池，不够再申请一个8KB的内存池**；**大对象直接采用C++层面申请的内存**。因此，对于一个大尺寸对象，申请一个大内存比申请众多小内存池快很多。



参考：

[Node.js Buffer(缓冲区)](https://juejin.im/post/5b5a85b4e51d45162679d20a)

[认识node核心模块--从Buffer、Stream到fs](https://juejin.im/post/5a07bdfc51882531bb6c4ad0)


### 新建Buffer会占用V8分配的内存吗？
不会，Buffer属于堆外内存，不是V8分配的。

### Buffer.alloc和Buffer.allocUnsafe的区别？

Buffer.allocUnsafe创建的 Buffer 实例的底层内存是未初始化的。新创建的 Buffer 的内容是未知的，可能包含敏感数据。使用 Buffer.alloc() 可以创建以零初始化的 Buffer 实例。

### Buffer的内存分配机制

为了高效的使用申请来的内存，Node采用了slab分配机制。slab是一种动态的内存管理机制。Node以8kb为界限来来区分Buffer为大对象还是小对象，如果是小于8kb就是小Buffer，大于8kb就是大Buffer。

例如第一次分配一个1024字节的Buffer，Buffer.alloc(1024),那么这次分配就会用到一个slab，接着如果继续Buffer.alloc(1024),那么上一次用的slab的空间还没有用完，因为总共是8kb，1024+1024 = 2048个字节，没有8kb，所以就继续用这个slab给Buffer分配空间。

如果超过8bk，那么直接用C++底层地宫的SlowBuffer来给Buffer对象提供空间。



### Nodejs为什么不适合CPU密集型操作？如果遇到了，需要怎么处理呢？

首先理解[事件驱动](/language/node.html#%E4%BA%8B%E4%BB%B6%E9%A9%B1%E5%8A%A8)和[libev底层的线程池原理](/language/node.html#libev%E5%BA%95%E5%B1%82%E7%9A%84%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%8E%9F%E7%90%86)。

如果遇到CPU密集型，libuv中线程会阻塞，导致eventloop无法返回。加上node是单线程，[nodejs单线程的优缺点](/language/node.html#nodejs%E5%8D%95%E7%BA%BF%E7%A8%8B%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9)，默认只能使用一个CPU。

解决方案：

- 使用子进程，child_process.fork()
- 使用其他服务来完成比如c
- 使用node12的[Worker Threads](https://nodejs.org/api/worker_threads.html)，通过子线程来完成

参考：

[Node.js软肋之CPU密集型任务](https://www.infoq.cn/article/nodejs-weakness-cpu-intensive-tasks)


### node应用的单进程和多进程模型有什么优缺点？

首先理解[nodejs单线程的优缺点](/language/node.html#nodejs%E5%8D%95%E7%BA%BF%E7%A8%8B%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9)，一个健壮的node应用是需要守护进程的。[守护进程是什么？node中如何实现？](/language/node.html#%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9Fnode%E4%B8%AD%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%EF%BC%9F)。

一些工具如PM2，和egg均提供了相应的功能：

[pm2的fork模式和cluster模式的有什么区别？](/library/pm2.html#pm2%E7%9A%84fork%E6%A8%A1%E5%BC%8F%E5%92%8Ccluster%E6%A8%A1%E5%BC%8F%E7%9A%84%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F)

[egg-cluster和pm2有什么区别？](/library/egg.html#egg-cluster%E5%92%8Cpm2%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F)

简单来说多进程的优点如下：

1. 充分利用CPU和服务器性能
2. 提供平衡重启的机会

缺点也有：

1. 增加了服务器损耗
2. 多进程共同操作文件资源时出现冲突，需要额外解决方案，这也是egg推出agent模型

参考：

[探索 PM2 Cluster 模式下 Log4js 日志丢失 - 呆恋小喵的学习之旅 - SegmentFault 思否](https://segmentfault.com/a/1190000016127574)

[Logs not working when app is ran in cluster mode · Issue #3215 · Unitech/pm2](https://github.com/Unitech/pm2/issues/3215)

[log4js+pm2 在cluster模式下，不发输出日志问题，求解答 - CNode技术社区](https://cnodejs.org/topic/5aa90887f5dfc27d7ad987ce)

### node中回调模式和promise如何互转？

通过util模块的两个方法`util.callbackify`和`util.promisify`:

``` js
const fs = require('fs');
const util = require('util');

const readFilePromsise = util.promisify(fs.readFile); // promise
const readFileCallback = util.callbackify(readFilePromise); // callback

```


参考：

[你可能不知道的 Node.js util 模块 - 知乎](https://zhuanlan.zhihu.com/p/75532713?utm_source=wechat_session&utm_medium=social&utm_oi=41809770184704&from=singlemessage&isappinstalled=0&wechatShare=1&s_r=0)



### nodejs如何做热更新？

首先说明，require 会有一个 cache, 有这个 cache 在, 即使你更新了 .js 文件, 在代码中再次 require 还是会拿到之前的编译好缓存在 v8 内存 (code space) 中的的旧代码. 但是如果只是单纯的清除掉 require 中的 cache, 再次 require 确实能拿到新的代码, 但是这时候很容易碰到各地维持旧的引用依旧跑的旧的代码的问题。而且会带来额外的内存泄漏问题，比如[记录一次由一行代码引发的“血案” - CNode技术社区](https://cnodejs.org/topic/5aaba2dc19b2e3db18959e63)。

或者最好通过zookeeper或数据库等第三方组件来做这个事情。


参考：

[Node.js Interview](https://elemefe.github.io/node-interview/#/sections/zh-cn/module?id=%e7%83%ad%e6%9b%b4%e6%96%b0)


### 如果你要读取一个特别大的文件应该如何做

通过readline模块来完成逐行的操作，通过stream来完成大文件的分布pipe操作。因为v8默认内存大小是有上限的，所以大文件不能直接fs.readFile来读取。



参考：

[NodeJs-stream操作大文件 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1588579?from=information.detail.node.js+%E5%A4%A7%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD)

### 如何查看v8内存占用？

搞懂[如何查看一个node的服务端应用的内存和cpu](/web/deploy.html#%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E4%B8%80%E4%B8%AAnode%E7%9A%84%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%BA%94%E7%94%A8%E7%9A%84%E5%86%85%E5%AD%98%E5%92%8Ccpu)

使用process.memoryUsage(),返回如下
``` json
{
  rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472,
  external: 49879
}
```
heapTotal 和 heapUsed 代表V8的内存使用情况。 external代表V8管理的，绑定到Javascript的C++对象的内存使用情况。 rss, 驻留集大小, 是给这个进程分配了多少物理内存(占总分配内存的一部分) 这些物理内存中包含堆，栈，和代码段。

参考：

[Node.js 有难度的面试题，你能答对几个？ - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1514668)


### vm模块是否安全？举例几种逃逸方式？你能否封装一个安全的vm模块？（todo）


---

## 编码

### 实现util.callbackify和util.promisify?

首先理解其用法：[node中回调模式和promise如何互转？](/language/node.html#node%E4%B8%AD%E5%9B%9E%E8%B0%83%E6%A8%A1%E5%BC%8F%E5%92%8Cpromise%E5%A6%82%E4%BD%95%E4%BA%92%E8%BD%AC%EF%BC%9F)

针对promisify：

tomato-js实现，
[@tomato-js/async | @tomato-js](https://tomato-js.github.io/tomato/modules/_tomato_js_async.html#promisify)


promisify执行完后返回的是一个新的函数，新的函数的执行结果是一个promise，新函数内部会调用original原有的方法并且会自动追加error-first类型的callback，**根据original的执行结果判断是resolve还是reject**，简易版本的代码如下：

``` js
function promisify(original) {
  function fn(...args) {

    return new Promise((resolve, reject) => {
      original.call(this, ...args, (err, ...values) => {
        if (err) {
          return reject(err);
        } else {
          resolve(values);
        }
      });
    });
  }
  return fn
}
```

针对callbackify：

[@tomato-js/async | @tomato-js](https://tomato-js.github.io/tomato/modules/_tomato_js_async.html#callbackify)


调用原始函数original通过then方法，在同一阶段process.nextTick调用callback方法，简化版本如下：

``` js
function callbackifyOnRejected(reason, cb) {
  if (!reason) {
    const newReason = new ERR_FALSY_VALUE_REJECTION();
    newReason.reason = reason;
    reason = newReason;
    Error.captureStackTrace(reason, callbackifyOnRejected);
  }
  return cb(reason);
}

function callbackify(original) {
  function callbackified(...args) {
    const maybeCb = args.pop();
    const cb = (...args) => { Reflect.apply(maybeCb, this, args); };
    Reflect.apply(original, this, args)
      .then((ret) => process.nextTick(cb, null, ret),
            (rej) => process.nextTick(callbackifyOnRejected, rej, cb));
  }
  return callbackified;
}

```



参考：

[Node.js util模块解读 - 彩色代码 - SegmentFault 思否](https://segmentfault.com/a/1190000015115159)



### 如何判断是在node还是浏览器端？

可以参考tomato：

浏览器通过window和document对象来区分：
``` js
/**
 * 判断是否在浏览器环境
 *
 *
 * 脚本举例
 * ```javascript
 *   import { isBrowser } from '@tomato-js/env'
 *   isBrowser();//true
 * ```
 *
 * @returns 是否存在window上
 */
export const isBrowser = () => ![typeof window, typeof document].includes("undefined");
```

Node则通过process对象的toString为`[object process]`来区分：

``` js
/**
 * 判断是否在Node环境
 *
 *
 * 脚本举例
 * ```javascript
 *   import { isNode } from '@tomato-js/env'
 *   isNode();//false
 * ```
 *
 * @returns 是否存在global上
 */
const toString = Object.prototype.toString;

export function isType<T>(value: unknown, type: string): value is T {
  return toString.call(value) === "[object " + type + "]";
}
export const isNode = () => typeof process !== "undefined" && isType(process, "process");

```