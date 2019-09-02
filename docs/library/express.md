# express

## 原理

### 有没有看过express源码？大致怎么工作的？

[源码解析和模块图](https://github.com/FunnyLiu/express/tree/readsource)

最核心的是Router，Layer和Route之间的关系。
Router和Route都有stack属性来存放各种的中间件，而Layer则是中间件模型。

当请求到来时，处理过程是app.handle → router.handle，事实上，app.handle调用了router.handle，而router.handle的过程，则是依次对router.stack中存放的中间件进行调用。

router.stack中存的是一个个的Layer对象，用来管理中间件。如果Layer对象表示的是一个路由中间件，则其route属性会指向一个Route对象，而route.stack中存放的也是一个个的Layer对象，用来管理路由处理函数。

因此，当一个请求到来的时候，会依次通过router.stack中的Layer对象，如果遇到路由中间件，则会依次通过route.stack中的Layer对象。

对于router.stack中的每个Layer对象，会先判断是否匹配请求路径，如果不匹配，则跳过，继续下一个。在路径匹配的情况下，如果是非路由中间件，则执行该中间件函数；如果是路由中间件，则继续判断该中间件的路由对象能够处理请求的HTTP方法，如果不能够处理，则跳过继续下一个，如果能够处理则对route.stack中的Layer对象（与请求的HTTP方法匹配的）依次执行。

