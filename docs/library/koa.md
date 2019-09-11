# koa

## 原理

### 有没有看过koa源码？大致怎么工作的？

[源码解析和模块图](https://github.com/FunnyLiu/koa/tree/readSource)

application.js为入口文件。

application对象继承于原生event模块的EventEmitter。

当我们使用app.use时，其实是给app.middleware中间件列表中增加中间件函数。

在app.listen时，调用了app.callback函数，执行了以下几步：

1、合并中间件

通过koa-compose模块，对中间件列表进行合并处理。该模块也是koa的中间件引擎部分。

2、创建ctx对象

通过app.createContext方法创建ctx对象，其中app.context来自context.js文件，底层通过delegates模块将request，response的一些属性原型指向，从而实现别名挂载。app.context.req和app.context.res分别来自原生http模块的IncomingMessage和ServerResponse，并在其上层封装了app.context.request和app.context.response。

3、处理响应

通过app.handleRequest方法处理响应，底层基于ServerResponse.end方法。

至于request和response文件，很多底层属性的封装基于第三方模块，这些选型和express非常类似，这里就不一一描述了。可以参考[express源码解析](https://github.com/FunnyLiu/express/tree/readsource#%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B)


### koa的洋葱模型是怎么理解的？

首先看下koa的洋葱模型代表用例：

``` js
const Koa = require('koa')

const app = new Koa()

app.use(async function m1 (ctx, next) {
  console.log('m1')
  await next()
  console.log('m1 end')
})

app.use(async function m2 (ctx, next) {
  console.log('m2')
  await next()
  console.log('m2 end')
})

app.use(async function m3 (ctx) {
  console.log('m3')
  ctx.body = 'hello'
})

app.listen(8080)

```

返回结果为
``` bash
m1
m2
m3
m2 end
m1 end

```

然后看下express的

``` js
const express = require("express");

const app = express()

app.use(function m1 (req, res, next) {
  console.log('m1')
  next()
  console.log('m1 end')
})

app.use(function m2 (req, res, next) {
  console.log('m2')
  next()
  console.log('m2 end')
})

app.use(function m3 (req, res, next) {
  console.log('m3')
  res.end('hello')
})

app.listen(8080)

```
结果为
``` bash
m1
m2
m3
m2 end
m1 end
```

其实在同步状态下，结果是一致的。

所以如果仅仅是考虑可以前后置执行简单的逻辑，是不足以体现koa洋葱模型的优势的。

最关键的不是这些中间的执行顺序，而是响应的时机。Express 是基于 layer 的，每次进入 handle 都会拿到匹配的一个然后执行，也就是基于路由的匹配，使用 res.end() 立即返回。

koa的设计中，router也是一个中间件而已。Koa 是在所有中间件中使用 ctx.body 设置响应数据，在所有中间件执行结束后，再调用 res.end(ctx.body) 进行响应，这样就为响应前的操作预留了空间，所以是请求与响应都在最外层，中间件处理是一层层进行，所以被理解成洋葱模型。



参考：

[再谈express与koa的对比 - 掘金](https://juejin.im/post/5a6739f56fb9a01cb139498a)

[express中间件和koa中间件的区别 - CNode技术社区](https://cnodejs.org/topic/59a90638ea0aea6b0c64e6ed)

[koa/koa-vs-express.md at master · koajs/koa](https://github.com/koajs/koa/blob/master/docs/koa-vs-express.md)



### koa和express到底有什么区别？

1、路由
两者创建一个基础的 Web 服务都非常简单，写法也基本相同，最大的区别是路由处理 Express 是自身集成的，而 Koa 需要引入中间件。

2、views
Express 自身集成了视图功能，提供了 consolidate.js 功能，支持几乎所有 JavaScript 模板引擎，并提供了视图设置的便利方法。
Koa 需要引入 koa-views 中间件。

3、中间件模型
Koa 的中间件采用了洋葱圈模型，参考：[koa的洋葱模型是怎么理解的？](/library/koa.html#koa%E7%9A%84%E6%B4%8B%E8%91%B1%E6%A8%A1%E5%9E%8B%E6%98%AF%E6%80%8E%E4%B9%88%E7%90%86%E8%A7%A3%E7%9A%84%EF%BC%9F)，所有的请求在经过中间件的时候都会执行两次，能够非常方便的执行一些后置处理逻辑。
而在 Express 中，响应返回时代码执行并不会回到原来的中间件，需要额外方式，参考：[express中间件怎么对响应进行拦截](/library/express.html#express%E4%B8%AD%E9%97%B4%E4%BB%B6%E6%80%8E%E4%B9%88%E5%AF%B9%E5%93%8D%E5%BA%94%E8%BF%9B%E8%A1%8C%E6%8B%A6%E6%88%AA)

4、异常处理
Express 使用 Node 约定的 "error-first 回调" 处理异常，并通过中间件传播。
Koa 通过同步方式编写异步代码，可以通过 try catch 处理异常，非常自然。

5、Context
Koa 新增了一个 Context 对象，用来代替 Express 中的 Request 和 Response，作为请求的上下文对象。
Context 上除了 Request 和 Response 两个对象之外，还有 Node.js 原生提供的 req 、res、socket 等对象。


参考：


[koa/koa-vs-express.md at master · koajs/koa](https://github.com/koajs/koa/blob/master/docs/koa-vs-express.md)



