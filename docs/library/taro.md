# Taro


## 原理


### taro的工作原理

Taro 当前的架构主要分为：编译时 和 运行时。

其中编译时主要是将 Taro 代码通过 Babel 转换成 小程序的代码，如：JS、WXML、WXSS、JSON。

运行时主要是进行一些：生命周期、事件、data 等部分的处理和对接。


对babel不了解可以参考[babel的完整工作流程](/library/babel.html#babel%E7%9A%84%E5%AE%8C%E6%95%B4%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)


Taro 当前架构只是在开发时遵循了 React 的语法，在代码编译之后实际运行时，和 React 并没有关系。

因此，整个 Taro 当前架构的特点是：

重编译时，轻运行时：这从两边代码行数的对比就可见一斑。
编译后代码与 React 无关：Taro 只是在开发时遵循了 React 的语法。
直接使用 Babel 进行编译：这也导致当前 Taro 在工程化和插件方面的羸弱。


### taro和其他解决方案架构的对比


1、mpvue

mpvue 的实现同样分为：编译时和运行时。

其中编译时做的事情和 Taro 很类似：将 Vue SFC 写法的代码编译成 小程序代码文件（JS、WXML、WXSS、JSON）。

最大的区别是 Taro 将 JSX 编译成 小程序模版，而 mpvue 是将 Vue 模版编译成 小程序模版。但是由于 Vue 模版和 小程序模版的相似性，mpvue 在这一块的工作量比 Taro 少得多。

mpvue、uni-app 框架基于 Vue.js 核心，通过修改 Vue.js 的 runtime 和 compiler，实现了在小程序端的运行。

mpvue 的运行时和 Vue 的运行时是强关联的。而 mpvue 的运行时，会首先将 patch 阶段的 DOM 操作相关方法置空，也就是什么都不做。其次，在创建 Vue 实例的同时，还会偷偷的调用 Page() 用于生成了小程序的 page 实例。然后 运行时的 patch 阶段会直接调用 $updateDataToMp() 方法，这个方法会获取挂在在 page 实例上维护的数据 ，然后通过 setData 方法更新到视图层。

不同于 Taro 运行时和 React 无关，mpvue 本质上还是将 Vue 运行在了小程序，且实现了 Vue@2.4.1 绝大部分特性（只有极少数特性由于小程序模版的限制未能实现，如 ：filter、slot、v-html）

2、uniapp

uni-app是一个比较传统的小程序框架，包括编译器+运行时。

小程序是视图和逻辑层分开的双线程架构，视图和逻辑的加载和运行互不阻塞，同时，逻辑层数据更新会驱动视图层的更新，视图的事件响应，会触发逻辑层的交互。
uni-app的源码主要包括三方面:


webpack。webpack是前端常用的一个模块打包器，uni-app构建过程中，会将Vue SFC的template、script、style三段式的结构，编译成小程序四段式结构，以字节小程序为例，会得到ttml、ttss、js、json四种文件。

编译器。uni-app的编译器本质是把Vue 的视图编译成小程序的视图，即把template语法编译成小程序的ttml语法，之后，uni-app不会维护视图层，视图层的更新完全交给小程序自身维护。但是uni-app是使用Vue进行开发的，那Vue跟小程序是怎么交互的呢？这就依赖于uni-app的运行时。

运行时。运行时相当于一个桥梁，打通了Vue和小程序。小程序视图层的更新，比如事件点击、触摸等操作，会经过运行时的事件代理机制，然后到达Vue的事件函数。而Vue的事件函数触发了数据更新，又会重新经过运行时，触发setData，进一步更新小程序的视图层。

