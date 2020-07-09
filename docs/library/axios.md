# Axios

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


## 实现

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