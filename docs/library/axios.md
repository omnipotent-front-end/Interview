# Axios


## 应用

### axios能够用于浏览器端和node端吗？这是什么设计模式？

可以的，是基于适配器模式，能使接口不兼容的对象能够相互合作。参考[design - 设计模式（以Typescript描述）](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/adapter/index)。

其实现：

[在浏览器端如何实现的](/library/axios.html#%E5%9C%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E7%AB%AF%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84)

[在nodejs端如何实现的](/library/axios.html#%E5%9C%A8nodejs%E7%AB%AF%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84)



### axios怎么取消请求

axios 如何取消一个请求提供了两种使用模式：

第一种 调用CancelToken的静态方法source

```
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})
source.cancel('Operation canceled by the user.');

```
第二种 自己实例化:

```
let cancel;
axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});
cancel();
```

OK，可以看到使用非常简单，两种使用方式道理是一样的，分两步：

获取cancelToken实例，注入请求的配置参数

需要取消的时候，调用 提供的cancel方法.

参考：

[axios的cancelToken取消机制原理 - SegmentFault 思否](https://segmentfault.com/a/1190000039028389)

### 页面切换后，需要将当前页面中的接口都取消，应该怎么做？

在vuex中维护一个请求队列

``` js
export default {
    state: {
        cancelTokenArr:[] // 存储cancel token
    },
    mutations: {
        addCancelToken({cancelTokenArr},data){
            cancelTokenArr.push(data)
        },
        clearCancelToken(state){
            state.cancelTokenArr.map(item => {
                item.cancel(`${item.url}---路由切换取消请求`)
            })
            state.cancelTokenArr = []
        }
    }
}

```

请求发出前，利用拦截器将取消的cancel函数与当次url利用addCancelToken存储到内存(vuex)中

``` js
import axios from 'axios'
import store from '../store'

// 请求拦截器
axios.interceptors.request.use(config => {
   // 请求发出时，添加到cancelTokenArr中
   config.cancelToken = new axios.CancelToken(e => {
       store.commit('addCancelToken', {
           cancel: e,
           url: location.host + config.url
       })
    })
  })
  return config
}, error => {
  Message.error('未知错误')
  return Promise.reject(error)
}）

```

请求发出后，利用响应拦截器处理取消请求

``` js
axios.interceptors.response.use(response => {...},error => {
  // 这里判断异常情况，如果axios.isCancel 为 true时，说明请求被取消
  if (axios.isCancel(error)) {
    // 请求取消
    console.warn(error)
    console.table([error.message.split('---')[0]], 'cancel')
  } else {...}
}
```

利用router.beforeEach切换路由时取消当前pending中的请求

``` js
// 切换路由时取消正在pending的请求
router.beforeEach((to, from, next) => {
   store.commit('clearCancelToken')
   next()   
}

```


参考:

[Axios利用拦截器取消页面切换pending中的请求_一只路过的小码农-CSDN博客](https://blog.csdn.net/Vue2018/article/details/105124922)


## 原理

### 拦截器执行顺序是怎么样的？原理是什么？


拦截器执行顺序如图：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200618135442.png"/>


首先axios会通过InterceptorManager类来管理拦截器：

``` js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  // 拦截器
  // 为request和response分别定义一个InterceptorManager
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
```

我们使用use时，会将回调传入handler数组
``` js
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  // 注册拦截器到handlers数组中，将正常和异常回调函数传入
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
```

最后执行时通过职责链模式，以拦截器组装职责链：

``` js
// 职责链模式
// 执行链的第一条就是dispatchRequest，通过适配器取到当前环境的请求方法
var chain = [dispatchRequest, undefined];
var promise = Promise.resolve(config);
// 将请求拦截器一个个的加到执行链的前面，所以请求拦截器2在请求拦截器1前面执行
this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
  chain.unshift(interceptor.fulfilled, interceptor.rejected);
});
// 将响应拦截器一个个的加到执行链的后面，所以响应拦截器1在响应拦截器2前面执行
this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
  chain.push(interceptor.fulfilled, interceptor.rejected);
});
// 前置执行promise
while (chain.length) {
  promise = promise.then(chain.shift(), chain.shift());
}
```

参考：

[FunnyLiu/axios at readsource](https://github.com/FunnyLiu/axios/tree/readsource#%E6%8B%A6%E6%88%AA%E5%99%A8%E7%9B%B8%E5%85%B3%E5%8E%9F%E7%90%86)

### 在浏览器端如何实现的

主要是使用`XMLHttpRequest`对象

1. 创建XMLHttpRequest对象,也就是创建一个异步调用对象.
2. 创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.
3. 设置响应HTTP请求状态变化的函数.
4. 发送HTTP请求.
5. 获取异步调用返回的数据.
6. 使用JavaScript和DOM实现局部刷新.

### 在nodejs端如何实现的

主要是通过http模板实现的


### cancelToken的原理是什么？

最底层还是基于XmlHttpRequest实例的abort方法，如果是fetch的话则是AboutController。

参考：

[axios的cancelToken取消机制原理 - SegmentFault 思否](https://segmentfault.com/a/1190000039028389)