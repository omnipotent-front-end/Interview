# Webpack

---

## 应用

### loader和plugin有什么区别？具体举一些常用的和其作用。

- loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时**预处理文件**。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！ 因为 webpack 本身只能处理 JavaScript，如果要处理其他类型的文件，就需要使用 loader 进行转换，**loader 本身就是一个函数，接受源文件为参数，返回转换的结果**。

- Plugin 是用来扩展 Webpack 功能的，通过在**构建流程里注入钩子实现**，它给 Webpack 带来了很大的灵活性。 通过plugin（插件）webpack可以实 loader 所不能完成的复杂功能，使用 plugin 丰富的自定义 API 以及生命周期事件，可以控制 webpack 打包流程的每个环节，实现对 webpack 的自定义功能扩展。


常用的及作用可以参考：[Webpack | Awesome-url](https://brizer.github.io/urls/zh/webpack_zh.html)


### loader和plugin的执行顺序是怎么样的？

loader的执行顺序是从后往前的，而plugin是作用于webpack整个生命周期，通过hook来决定执行顺序的，所以每一个都不一样。


### 如何优化webpack构建速度？

*   使用`高版本`的 Webpack 和 Node.js
    
*   `多进程/多实例构建`：HappyPack(不维护了)、thread-loader
    
*   `压缩代码`
    

*   webpack-paralle-uglify-plugin
    
*   uglifyjs-webpack-plugin 开启 parallel 参数 (不支持 ES6)
    
*   terser-webpack-plugin 开启 parallel 参数
    

*   多进程并行压缩
    
*   通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。
    

*   `图片压缩`
    

*   使用基于 Node 库的 imagemin (很多定制选项、可以处理多种图片格式)
    
*   配置 image-webpack-loader
    

*   `缩小打包作用域`：
    

*   exclude/include (确定 loader 规则范围)
    
*   resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)
    
*   resolve.mainFields 只采用 main 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)
    
*   resolve.extensions 尽可能减少后缀尝试的可能性
    
*   noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
    
*   IgnorePlugin (完全排除模块)
    
*   合理使用 alias
    

*   `提取页面公共资源`：
    

*   使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
    
*   使用 SplitChunksPlugin 进行 (公共脚本、基础包、页面公共文件) 分离(Webpack4 内置) ，替代了 CommonsChunkPlugin 插件
    

*   基础包分离：
    

*   `DLL`：
    

*   使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
    
*   HashedModuleIdsPlugin 可以解决模块数字 id 问题
    

*   `充分利用缓存提升二次构建速度`：
    

*   babel-loader 开启缓存
    
*   terser-webpack-plugin 开启缓存
    
*   使用 cache-loader 或者 hard-source-webpack-plugin
    

*   `Tree shaking`
    

*   purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用 (建议)
    

*   打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉 (只能对 ES6 Modlue 生效) 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
    
*   禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
    
*   使用 PurifyCSS(不在维护) 或者 uncss 去除无用 CSS 代码
    

*   `Scope hoisting`
    

*   构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
    
*   必须是 ES6 的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法
    

*   `动态Polyfill`
    

*   建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护。(部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 polyfill)
    
参考：

[再来一打webpack面试题](https://mp.weixin.qq.com/s/neC8lKFQeaVOEuhgzOytLw)


### 是否写过loader？简单说明下原理？

是否写过 Loader？简单描述一下编写 loader 的思路？
------------------------------------

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
    


---

## 原理

### webpack热替换的原理是什么？

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190712133058.png"/>

分步介绍:
1、第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。

2、第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。

3、第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。

4、第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间**建立一个 websocket 长连接**，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的**最主要信息还是新模块的 hash 值**，后面的步骤根据这一 hash 值来进行模块热替换。

5、webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。

6、HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime **向 server 端发送 Ajax 请求**，服务端返回一个 json，**该 json 包含了所有要更新的模块的 hash 值**，获取到更新列表后，该模块**再次通过 jsonp 请求，获取到最新的模块代码**。这就是上图中 7、8、9 步骤。

7、而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。

8、最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。

**所以简单来说就是建立socket，修改文件后服务端算出要更新的模块hash，客户端请求到hash后，再去给服务端发送一个jsonp请求，拿到真正的更新模块的具体代码。**



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

