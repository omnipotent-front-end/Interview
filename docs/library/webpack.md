# Webpack

---

## 应用

### webpack中打包文件名的hash/chunkhash/contenthask有什么区别？

hash 所有文件哈希值相同； chunk hash 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值； contenthash 计算与文件内容本身相关，主要用在css抽取css文件时。

在webpack中有三种hash可以配置，分别是hash、chunk hash、contenthash他们是不对的可以针对不同的配置，首相要搞清楚这三种的hash的区别，什么场景下，适合用哪种。

hash

所有文件哈希值相同，只要改变内容跟之前的不一致，所有哈希值都改变，没有做到缓存意义

chunk hash

当有多个chunk，形成多个bundle时，如果只有一个chunk和一个bundle内容变了，其他的bundle的hash都会发生变化，因为大家都是公用的一个hash，这个时候chunk hash的作用就出来了。它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。

contenthash

在打包的时候我们会在js中导入css文件，因为他们是同一个入口文件，如果我只改了js得代码，但是他的css抽取生成css文件时候hash也会跟着变换。这个时候contenthash的作用就出来了。


参考：

[webpack中的hash、chunkhash、contenthash分别是什么](https://juejin.cn/post/6844903935812059144)

### loader和plugin有什么区别？具体举一些常用的和其作用。

- loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时**预处理文件**。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！ 因为 webpack 本身只能处理 JavaScript，如果要处理其他类型的文件，就需要使用 loader 进行转换，**loader 本身就是一个函数，接受源文件为参数，返回转换的结果**。

- Plugin 是用来扩展 Webpack 功能的，通过在**构建流程里注入钩子实现**，它给 Webpack 带来了很大的灵活性。 通过plugin（插件）webpack可以实 loader 所不能完成的复杂功能，使用 plugin 丰富的自定义 API 以及生命周期事件，可以控制 webpack 打包流程的每个环节，实现对 webpack 的自定义功能扩展。


常用的及作用可以参考：[Webpack | Awesome-url](https://brizer.github.io/urls/zh/webpack_zh.html)


### loader和plugin的执行顺序是怎么样的？

loader的执行顺序是从后往前的，而plugin是作用于webpack整个生命周期，通过hook来决定执行顺序的，所以每一个都不一样。

但是有一个情况需要注意，就是**在实际（从右到左）执行 loader 之前，会先 从左到右 调用 loader 上的 pitch 方法**。


参考：

[Loader Interface | webpack 中文文档 | webpack 中文文档 | webpack 中文网](https://www.webpackjs.com/api/loaders/#pitching-loader)

### 如何优化webpack构建速度？

* 使用`高版本`的 Webpack 和 Node.js
    
* `多进程/多实例构建`：HappyPack(不维护了)、thread-loader

* `压缩代码`

    * webpack-paralle-uglify-plugin
        
    * uglifyjs-webpack-plugin 开启 parallel 参数 (不支持 ES6)
        
    * terser-webpack-plugin 开启 parallel 参数

    * 多进程并行压缩

    * 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。

* `图片压缩`

    * 使用基于 Node 库的 imagemin (很多定制选项、可以处理多种图片格式)

    * 配置 image-webpack-loader

* `缩小打包作用域`：

    * exclude/include (确定 loader 规则范围)

    * resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)

    * resolve.mainFields 只采用 main 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)

    * resolve.extensions 尽可能减少后缀尝试的可能性

    * noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)

    * IgnorePlugin (完全排除模块)

    * 合理使用 alias

* `提取页面公共资源`：

    * 使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
        
    * 使用 SplitChunksPlugin 进行 (公共脚本、基础包、页面公共文件) 分离(Webpack4 内置) ，替代了 CommonsChunkPlugin 插件

    * 基础包分离：

* `DLL`：

    * 使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。

    * HashedModuleIdsPlugin 可以解决模块数字 id 问题

* `充分利用缓存提升二次构建速度`：

    * babel-loader 开启缓存

    * terser-webpack-plugin 开启缓存

    * 使用 cache-loader 或者 hard-source-webpack-plugin
    

* `Tree shaking`

    * purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用 (建议)

    * 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉 (只能对 ES6 Modlue 生效) 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率

    * 禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking

    * 使用 PurifyCSS(不在维护) 或者 uncss 去除无用 CSS 代码

* `Scope hoisting`

    * 构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突

    * 必须是 ES6 的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法

* `动态Polyfill`

    * 建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护。(部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 polyfill)
    
参考：

[再来一打webpack面试题](https://mp.weixin.qq.com/s/neC8lKFQeaVOEuhgzOytLw)


### terser-webpack-plugin等插件的多进程压缩是什么原理？

terser-webpack-plugin是基于[jest-worker](https://www.npmjs.com/package/jest-worker)来完成多进程压缩的。其在node高版本会通过worker_thread来完成多线程工作，而低版本则通过child_process来完成多进程工作。


### hard-source-webpack-plugin 是怎么做缓存的？修改文件后会怎么样？


[源码分析](https://github.com/FunnyLiu/hard-source-webpack-plugin/tree/readsource)

其本质就是在webpack各个生命周期中，将需要的内容缓存到node_modules/.cache/hard-source下，然后第二次的时候会去取。

修改文件后，.cache文件中的内容会越来越多，会去diff想要的。


### 使用多进程压缩时，各个进程是怎么通信的？


参考[node中子进程、子线程是如何通信？](/language/node.html#node%E4%B8%AD%E5%AD%90%E8%BF%9B%E7%A8%8B%E3%80%81%E5%AD%90%E7%BA%BF%E7%A8%8B%E6%98%AF%E5%A6%82%E4%BD%95%E9%80%9A%E4%BF%A1%EF%BC%9F)

### 是否写过loader？简单说明下原理？



Loader 支持链式调用，所以开发上需要严格遵循 “单一职责”，每个 Loader 只负责自己需要负责的事情。

Loader 的 API 可以去官网查阅

https://www.webpackjs.com/api/loaders

*   Loader 运行在 Node.js 中，我们可以调用任意 Node.js 自带的 API 或者安装第三方模块进行调用
    
*   Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串，当某些场景下 Loader 处理二进制文件时，需要通过 exports.raw = true 告诉 Webpack 该 Loader 是否需要二进制数据
    
*   尽可能的异步化 Loader，如果计算量很小，同步也可以
    
*   Loader 是无状态的，我们不应该在 Loader 中保留状态
    
*   使用 loader-utils 和 schema-utils 为我们提供的实用工具
    
*   加载本地 Loader 方法
    

*   Npm link
    
*   ResolveLoader

参考：

[Follow @gwuhaolin on GitHub](https://ghbtns.com/github-btn.html?user=gwuhaolin&type=follow&count=false&size=small)


### loader支持异步的吗，异步loader怎么处理？

loader既可以是同步的，也可以是异步的。

异步 loader 需要调用 webpack 的 async() 生成一个 callback，它的第一个参数是 error，这里可设为 null，第二个参数就是处理后的源码。当你异步处理完源码后，调用 callback 即可

``` js
module.exports = function (source) {
    const callback = this.async()

    // 由于有 3 秒延迟，所以打包时需要 3+ 秒的时间
    setTimeout(() => {
        callback(null, `${source.replace(/;/g, '')}`)
    }, 3000)
}
```

参考：

[实现一个 webpack loader 和 webpack plugin - SegmentFault 思否](https://segmentfault.com/a/1190000024431022)

### loader是一种什么设计模式？

职责链模式。参考[职责链模式应用场景](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/chain/index?id=%e5%ba%94%e7%94%a8%e5%9c%ba%e6%99%af)


由于 Webpack 是运行在 Node.js 之上的，一个 Loader 其实就是一个 Node.js 模块，这个模块需要导出一个函数。 这个导出的函数的工作就是获得处理前的原内容，对原内容执行处理后，返回处理后的内容。

一个最简单的 Loader 的源码如下：


``` js
module.exports = function(source) {
  // source 为 compiler 传递给 Loader 的一个文件的原内容
  // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换
  return source;
};
```

由于 Loader 运行在 Node.js 中，你可以调用任何 Node.js 自带的 API，或者安装第三方模块进行调用：

``` js
const sass = require('node-sass');
module.exports = function(source) {
  return sass(source);
};
```

Loader 就像是一个翻译员，能把源文件经过转化后输出新的结果，并且一个文件还可以链式的经过多个翻译员翻译。

以处理 SCSS 文件为例：

1、SCSS 源代码会先交给 sass-loader 把 SCSS 转换成 CSS；

2、把 sass-loader 输出的 CSS 交给 css-loader 处理，找出 CSS 中依赖的资源、压缩 CSS 等；

3、把 css-loader 输出的 CSS 交给 style-loader 处理，转换成通过脚本加载的 JavaScript 代码；

可以看出以上的处理过程需要有顺序的链式执行，先 sass-loader 再 css-loader 再 style-loader

这就是职责链模式的一种体现。


### 是否写过 Plugin？简单描述一下编写 Plugin 的思路？
------------------------------------

webpack 在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在特定的阶段钩入想要添加的自定义功能。Webpack 的 Tapable 事件流机制保证了插件的有序性，使得整个系统扩展性良好。

Plugin 的 API 可以去官网查阅

https://www.webpackjs.com/api/plugins

*   compiler 暴露了和 Webpack 整个生命周期相关的钩子
    
*   compilation 暴露了与模块和依赖有关的粒度更小的事件钩子
    
*   插件需要在其原型上绑定 apply 方法，才能访问 compiler 实例
    
*   传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件
    
*   找出合适的事件点去完成想要的功能
    

*   emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改 (emit 事件是修改 Webpack 输出资源的最后时机)
    
*   watch-run 当依赖的文件发生变化时会触发
    

*   异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住
    

关于tapable可以参考demo：[FunnyLiu/tapableDemo: tapableDemo](https://github.com/FunnyLiu/tapableDemo)，及其源码[FunnyLiu/tapable at readsource](https://github.com/FunnyLiu/tapable/tree/readsource)。

整个tapable的插件模式是基于发布订阅模式来完成的，也就是说在整个生命周期中会触发不同的事件，而插件则对这些事件的进行监听，从而回调。


参考：

[design - 设计模式（以Typescript描述）](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/observer/index?id=_2%e3%80%81%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f%e7%ad%89%e8%ae%be%e8%ae%a1)


### plugin中有异步请求会阻塞后面的plugin吗？

webpack的插件是基于tapable的发布订阅模式，如果是在同步的hooks里去发异步请求，是不会阻塞的。

而异步的hooks也是可以通过tap或者tapAsync等api的区分，来实现到底是异步并行还是异步串行的。可以参考[tapableDemo/index.js at master · FunnyLiu/tapableDemo](https://github.com/FunnyLiu/tapableDemo/blob/master/AsyncParallelHook/index.js)

所以这个问题是答案是不一定的。


### tapable中的异步串行事件，通过tap注册会阻塞吗？

不会的，没有做额外的处理。所以是并行的。


### tapable中的异步串行事件，通过tapAsync注册为什么会阻塞？

用的时候需要通过callback来确定完成，比如：

``` js
let queue2 = new AsyncParallelHook(['name']);
console.time('cost1');
//一步步阻塞
queue2.tapAsync('1', function (name, cb) {
    setTimeout(() => {
        console.log(name, 1);
        cb();
    }, 1000);
});
queue2.tapAsync('2', function (name, cb) {
    setTimeout(() => {
        console.log(name, 2);
        cb();
    }, 2000);
});
queue2.tapAsync('3', function (name, cb) {
    setTimeout(() => {
        console.log(name, 3);
        cb();
    }, 3000);
});

queue2.callAsync('webpack', () => {
    console.log('over');
    console.timeEnd('cost1');
});
```

只有执行了cb才会进行队列中下一个任务。本质上还是个队列。



---

## 原理

### webpack热替换的原理是什么？

首先掌握[除了websocket，还有哪些服务端主动push的方法？](/cp/network.html#%E9%99%A4%E4%BA%86websocket%EF%BC%8C%E8%BF%98%E6%9C%89%E5%93%AA%E4%BA%9B%E6%9C%8D%E5%8A%A1%E7%AB%AF%E4%B8%BB%E5%8A%A8push%E7%9A%84%E6%96%B9%E6%B3%95%EF%BC%9F)

首先通过查看代码 webpack-hot-middleware/client 发现通信是用 window.EventSource 实现,那 EventSource 是什么东西呢？EventSource 是 HTML5 中 Server-sent Events 规范的一种技术实现。EventSource 接口用于接收服务器发送的事件。它通过HTTP连接到一个服务器，以text/event-stream 格式接收事件, 不关闭连接。通过 EventSource 服务端可以主动给客户端发现消息，使用的是 HTTP协议，单项通信，只能服务器向浏览器发送； 与 WebSocket 相比轻量，使用简单，支持断线重连。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210716103651.png"/>

1、Webpack编译期，为需要热更新的 entry 注入热更新代码(EventSource通信)

2、页面首次打开后，服务端与客户端通过 EventSource 建立通信渠道，把下一次的 hash 返回前端

3、客户端获取到hash，这个hash将作为下一次请求服务端 hot-update.js 和 hot-update.json的hash

4、修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端

5、客户端获取到hash，成功后客户端构造hot-update.js script链接，然后插入主文档

6、hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload方法，获取到 Vue 组件的 render方法，重新 render 组件， 继而实现 UI 无刷新更新。


参考：

[Webpack 热更新实现原理分析 - 知乎](https://zhuanlan.zhihu.com/p/30623057)



### 整体工作流程是什么样子的？


核心概念：
- entry 一个可执行模块或库的入口文件。
- chunk **多个文件组成的一个代码块**，例如把一个可执行模块和它所有依赖的模块组合和一个 chunk 这体现了webpack的打包机制。
- loader **文件转换器**，例如把es6转换为es5，scss转换为css。
- plugin 插件，用于扩展webpack的功能，**在webpack构建生命周期的节点上加入扩展hook为webpack加入功能**。


构建流程：

从启动webpack构建到输出结果经历了一系列过程，它们是：

1、解析webpack配置参数，合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。

2、注册所有配置的插件，好让插件监听webpack构建生命周期的事件节点，以做出对应的反应。

3、从配置的entry入口文件开始解析文件构建AST语法树，找出每个文件所依赖的文件，递归下去。

4、在解析文件递归的过程中根据文件类型和loader配置找出合适的loader用来对文件进行转换。

5、递归完后得到每个文件的最终结果，根据entry配置生成代码块chunk。

6、输出所有chunk到文件系统。

需要注意的是，在构建生命周期中有一系列插件在合适的时机做了合适的事情，比如UglifyJsPlugin会在loader转换递归完后对结果再使用UglifyJs压缩覆盖之前的结果。

如图：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190815092046.png"/>

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190815092115.png"/>


参考：

[webpack系列之一总览 · Issue #36 · DDFE/DDFE-blog](https://github.com/DDFE/DDFE-blog/issues/36)

[Webpack揭秘——走向高阶前端的必经之路 - 腾讯Web前端 IMWeb 团队社区 | blog | 团队博客](https://imweb.io/topic/5baca58079ddc80f36592f1a)



### 使用webpack tree shaking有什么限制条件

1、使用 ES2015 模块语法（即 import 和 export），注意不要export default 和直接import所有。

2、在项目 package.json 文件中，添加一个 "sideEffects" 入口。

3、引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）

至于tree shaking是什么，可以参考[模块依赖管理-import，import-from-和-require-等的区别？](/language/javascript.html#%E6%A8%A1%E5%9D%97%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86-import%EF%BC%8Cimport-from-%E5%92%8C-require-%E7%AD%89%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F)

参考：

[tree shaking | webpack 中文网](https://www.webpackjs.com/guides/tree-shaking/)

### 简单说下treeshaking的原理

ES6 Module引入进行静态分析，故而编译的时候正确判断到底加载了那些模块，

静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码。

至于tree shaking是什么，可以参考[模块依赖管理-import，import-from-和-require-等的区别？](/language/javascript.html#%E6%A8%A1%E5%9D%97%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86-import%EF%BC%8Cimport-from-%E5%92%8C-require-%E7%AD%89%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F)

参考：

[小红书面试官：介绍一下 tree shaking 及其工作原理](https://mp.weixin.qq.com/s?__biz=Mzg3MTU4NTI3OA==&mid=2247488667&idx=1&sn=dd80743749694b7c32d31524edada740&source=41#wechat_redirect)

