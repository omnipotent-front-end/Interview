# React Native

## 应用

### 怎么做到真正的跨三端？

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20220104173642.png"/>


让我们自顶向下的来看看。首先我们的项目需要同时具备在app内和浏览器内使用的能力，这样才是真正的跨了三端。

我们需要做到基于react做平行扩展，这样未来小程序内无论是webview嵌h5的方式还是小程序原生的方式，都存在可以想象和优化的空间。

```
那么问题来了，如何做到h5和app内通用呢？
```

这里我们需要分析两个容器的异同点：

#### 原生能力

App内的react native是通过nativeModule来通信；而hybird、h5、小程序等均是其他的实现，比如说jsbridge、后端接口、小程序API等等。

针对这个点，我们通过适配器模式来解决。

我们通过一个简单的模块来保存引用：

``` js

let bridge = null;

export const setBridge = bge => {
  bridge = bge;
};

export {bridge};
```

然后在不同的入口文件（h5、app入口文件区分开来），塞入不同的bridge即可：

``` js
// react native 入口
const {YktNativeModule} = NativeModules;
bridge.init({bridge: YktNativeModule});
setBridge(bridge);

// h5入口
bridge.init({yktlog: window.YktTracker});
setBridge(bridge);
```


#### UI跨端

我们书写的react-native组件，比如说View、Text等，需要通过react-native-web来变成react-dom可以识别的节点：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20220105193144.png"/>

它的原理就是把react-native这个库所有暴露的api，都实现了一遍，然后配合webpack的alias，在打包的时候别名替换一下即可。


```  js
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
```


### 如何进行拆包？

答案就是拆包：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20220105104340.png"/>


左上角的图片是整体的思路，可以看到左边是之前的现状，就是每个rn业务模块，都依赖了一些公共的代码，比如说react、react-native，我们想把这些公共的代码抽出来，不让每个业务包都含有大量重复代码，影响app的尺寸，同时客户端也可以预加载公共包的逻辑，从而降低白屏时间。

```
metro是Facebook出品的react native专用打包工具
```

整个流程分为3步。

第一步是找到公共包依赖了哪些js文件。这里我们通过metro的api，在公共包打包的createModuleFactory的阶段，拿到每个参与打包的js模块路径，然后通过md5文件路径的方式生成唯一的id。

第二步是把依赖列表保持到文件里，具体内容可以看右上角的图片，主要是文件路径和对应的模块id。

第三步是在业务包打包的时候，通过metro的api，在processModuleFilter阶段，基于第二步生成的文件，将这些模块排除在打包过程之外，从而得到纯粹的业务包内容。

这样即使日后公共包内容变多了，也可以自动计算出依赖列表，并通过唯一id去重。

一起看看拆包对bundle尺寸大小的降低：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20220105191611.png"/>


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



### Hermes引擎相比javascriptCore的优势

关于hermes做了哪些优化，以及生产环境使用后效果提升如何，可以参考头条这篇文章[ReactNative在游戏营销场景中的实践和探索-Hermes引擎 - 掘金](https://juejin.cn/post/7000632245824258079)

这里我们只看两点，一个是hermes可以直接运行字节码；一个是大大降低的内存占用和启动时间。

可以看到启用了hermes和提供字节码后，TTI（可交互时间降低了一半左右）：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20220105102841.png"/>

