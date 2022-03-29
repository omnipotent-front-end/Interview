# React Native

## 应用



## 原理


### 说下react-native的原理？

react-native 运行了一个带js引擎的线程，线程负责js和原生的通信， 最后通过调用原生渲染从而实现跨平台的能力，react-native的产物是一个js文件，所以可通过更新js文件即可实现热更新。


<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20211229162927.png"/>

绿色的是我们应用开发的部分，我们写的代码基本上都是在这一层。

蓝色代表公用的跨平台的代码和工具引擎，一般我们不会动蓝色部分的代码。

黄色代表平台相关的 bridge 代码，做定制化的时候会添加修改代码。

红色代表系统平台的功能，另外红色上面有一个虚线，表示所有平台相关的东西都通过 bridge 隔离开来了，红色部分是独立于 React Native 的。

参考：

[React Native 原理与实践 - 知乎](https://zhuanlan.zhihu.com/p/343519887)

### 原生端和js端是怎么通信的？

旧架构通过bridge，App启动时，原生侧会将原生模块（module）注册到js的映射表，原生模块包括方法（method），即一个module对应多个method的key-value形式。js在调用的时候，通过module + method的方式进行序列化发送到原生，原生解析module得到具体的原生对象，再通过method找到对应的方式，和JSBridge的本质一样，只是做了一层封装。并且，js端自行维护了消息队列实现调用回调。

新架构采用JavaScript Interface (JSI)。

JSI 移除了原生代码和JavaScript代码之间的桥接（bridge），同时也省去了两端相互调用时大量的JSON序列化和反序列化操作。JSI为原生和JS交互打开了新的大门。

不同于之前直接将 JavaScript 代码输入给 JSC，JSI屏蔽 JavaScript 引擎的差异，允许换用不同的 JavaScript 引擎，同时JSI 所在的 C++层也可以作为复用 Native 代码的一种方式。

参考：

[React Native 原理与实践 - 知乎](https://zhuanlan.zhihu.com/p/343519887)
