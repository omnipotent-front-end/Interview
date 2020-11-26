# 软件工程

## 设计模式

### 如何实现集群下的单例模式？

我们需要把这个单例对象序列化并存储到外部共享存储区(比如文件、或者第三方中间件如redis)。

进程在使用这个单例对象的时候，需要先从外部共享存储区中将它读取到内存，并反序列化成对象，然后再使用，使用完成之后还需要再存储回外部共享存储区。

为了保证任何时刻在进程间都只有一份对象存在，一个进程在获取到对象之后，需要对对象加锁，避免其他进程再将其获取。在进程使用完这个对象之后，需要显式地将对象从内存中删除，并且释放对对象的加锁。


### 享元模式和对象池有什么区别？

对象池、连接池(比如数据库连接池)、线程池等也是为了复用，那它们跟享元模式有什么
区别呢?

对象池是指像 C++ 这样的编程语言，内存的管理是由程序员负责的。为了避免频繁地进行对象创 建和释放导致内存碎片，我们可以预先申请一片连续的内存空间，也就是这里说的对象池。 每次创建对象时，我们从对象池中直接取出一个空闲对象来使用，对象使用完成之后，再放 回到对象池中以供后续复用，而非直接释放掉。。

池化技术中的“复用”可以理解为“重复使用”，主要目的是节省时间(比如从数据库池中
取一个连接，不需要重新创建)。在任意时刻，每一个对象、连接、线程，并不会被多处使
用，而是被一个使用者独占，当使用完成之后，放回到池中，再由其他使用者重复利用。享
元模式中的“复用”可以理解为“共享使用”，在整个生命周期中，都是被所有使用者共享
的，主要目的是节省空间。

### 观察者和发布订阅的区别是？

观察者模式中主体和观察者是互相感知的，发布-订阅模式是**借助第三方来实现调度**的，发布者和订阅者之间互不感知：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710190123.png"/>

### 平常在哪些地方有使用到观察者或发布 / 订阅模式？（todo）


### 适配器模式是什么？

适配器模式是一种结构型设计模式， 它能使接口不兼容的对象能够相互合作。

具体的应用场景可以参考：[design - 设计模式（以Typescript描述）](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/adapter/index?id=%e5%ba%94%e7%94%a8%e5%9c%ba%e6%99%af)


### 中介者模式了不了解？

中介者是一种行为设计模式，能让你减少对象之间混乱无序的依赖关系。该模式会限制对象之间的直接交互，迫使它们通过一个中介者对象进行合作。

具体应用场景可以参考：[design - 设计模式（以Typescript描述）](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/mediator/index?id=_1%e3%80%81%e6%95%b0%e6%8d%ae%e7%8a%b6%e6%80%81%e7%ae%a1%e7%90%86)

### 代理模式了解不？

代理是一种结构型设计模式，让你能够提供对象的替代品或其占位符。代理控制着对于原对象的访问，并允许在将请求提交给对象前后进行一些处理。

具体应用场景可以参考：[design - 设计模式（以Typescript描述）](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/proxy/index?id=%e5%ba%94%e7%94%a8%e5%9c%ba%e6%99%af)


### 单例模式了解不？

单例模式是一种创建型设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。

具体应用场景可以参考：[design - 设计模式（以Typescript描述）](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/singleton/index?id=%e5%ba%94%e7%94%a8%e5%9c%ba%e6%99%af)



## 编程模型

### 了解 MVC / MVP / MVVM 的区别吗？

MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结 构，优化我们的开发效率。

MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的 显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应 用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互 的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然 后 Model 层再去通知 View 层更新。

MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中我们使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代 码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层 的解耦。MVC 中的
Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此我们可以在 Presenter 中将 Model 的变化和 View 的 变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。

MVVM 模式中的 VM，指的是 ViewModel，它和 MVP 的思想其实是相同的，不过它通过双向的 数据绑定，将 View 和 Model 的同步更新给自动化了。当 Model 发生变化的时候，ViewModel 就会自动更新;ViewModel 变化了，View 也会更新。这样就将 Presenter 中的工作给自动化了。我了解过一点双向数据绑定的原理，比如 vue 是通过使用数据劫持和发布订阅者模式来 实现的这一功能。


参考：

[浅析前端开发中的 MVC/MVP/MVVM 模式](https://juejin.cn/post/6844903480126078989)

