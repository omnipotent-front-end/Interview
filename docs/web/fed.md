# 前端架构

## 数据状态管理

### 前端常见数据状态管理方案有哪些？它们各有什么优缺点？

目前优秀的状态管理库有Vuex、Flux、Redux、MobX等等。所有的状态管理要做的事情，最核心的是：

**把组件之间需要共享的状态抽取出来，遵循特定的约定，统一来管理，让状态的变化可以预测。**

#### Flux

Flux是一种思想，所有库都可以根据这种思想来做自己的实现。
Flux有四个关键概念：View、Action、Dispatcher、Store

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190711092900.png"/>

**View即展示层**，比如Vue组件或者React组件。

**Store就是Vue展示所需要的数据，存储的地方**。可以把Store都放在一起，也可以分开放。Store改变后，View需要对应改变（这里不同的库可以有自己不同的实现方式）

View如果要通过用户操作或其他交互形式，改变Store的话，必须要经过Dispatcher来Dispatch一个action。**Dispatcher的作用就是接收所有的Action，并分发给所有的Store**。

#### Redux

Redux在Flux思想的基础上，做了自己的实现。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190711093656.png"/>

**Redux中只有一个Store**，这个Store里的State变化了后，View层自动渲染。

Store 允许使用 store.subscribe 方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。这样不管 View 是用什么实现的，只要把 View 的更新函数 subscribe 一下，就可以实现 State 变化之后，View 自动渲染了。比如在 React 里，把组件的render方法或setState方法订阅进去就行。

**Action的就是View发出的通知**，Action必须有type属性，代表其名称。

**Reducer类似于Dispatcher，Reducer 是一个纯函数，对于相同的输入，永远都只会有相同的输出**。Redux 有很多的 Reducer，对于大型应用来说，State 必然十分庞大，导致 Reducer 函数也十分庞大，所以**需要做拆分**。Redux 里每一个 Reducer 负责维护 State 树里面的一部分数据，多个 Reducer 可以通过 combineReducers 方法合成一个根 Reducer，这个根 Reducer 负责维护整个 State。

Redux和Flux在都是单向数据流的基础上，**有以下几点区别**：
- Redux单一数据源，而Flux允许多个数据源；
- Redux的state是只读的，Flux的state可以随便改；
- Redux的Reducer一定是纯函数，而Flux的Action不一定

另外Redux中存在一个**中间件**的概念。在Action到Reducer的过程中，给Reducer包装了一层。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190711100235.png"/>

中间件可以用过做日志分析，也可以做异步处理，等等。用 Redux 处理异步，可以自己写中间件来处理，当然大多数人会选择一些现成的支持异步处理的中间件。比如 redux-thunk 或 redux-promise。

[一个基于Redux和todolist](https://github.com/FunnyLiu/reduxDemo/blob/master/todolist/app.js#L8)

[realworld](https://github.com/FunnyLiu/react-redux-realworld-example-app/blob/master/src/reducer.js)

#### Vuex

Vuex主要是和Vue绑定的，思想类似于Redux和Flux。

主要概念是Action、Mutations和Store。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190711101349.png"/>

每一个Vuex里有一个全局的Store，包含应用中的状态State。Vuex将state植入了整个应用，挂载在Vue的原型上，方便通过`this.$store`直接取用。

State改变后，View层也会随之改动。

Mutations类似于Redux的Reducer，必须是同步的。但是Vuex不要求每次搞一个新的state，而是可以直接修改state，这一点又和Flux类似。

Action就好比Reducer的中间件，可以用来处理异步。

[Vuex的使用demo](https://github.com/FunnyLiu/vueDemo/blob/master/vueCliDemo/vueCliBase/front-data/src/store/index.ts#L7)

#### MobX

MobX的理念是状态变化后，其他用到状态的地方就自动变化。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190711105137.png"/>

Redux更多的是遵循函数式编程（Functional Programming, FP）思想，而Mobx则更多**从面相对象角度考虑问题**。

store是应用管理数据的地方，在Redux应用中，我们总是将所有共享的应用数据集中在一个大的store中，而**Mobx则通常按模块将应用状态划分，在多个独立的store中管理**。


---

### 为什么在React中使用Redux需要用到React-redux？这个到底是做什么的？

首先了解Redux和Flux类似，只是一种思想和规范，它和React之间没有任何关系。Redux可以直接各种库，甚至是Fultter、Dart。

React-redux是React官方出品的，处理Redux和React UI的绑定。

React的组件化思路中，有容器组件和展示组件的区分：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190711102811.png"/>

react-redux 就是多了个 connect 方法连接容器组件和UI组件，这里的“连接”就是一种映射：

mapStateToProps 把容器组件的 state 映射到UI组件的 props 

mapDispatchToProps 把UI组件的事件映射到 dispatch 方法

[realworld](https://github.com/FunnyLiu/react-redux-realworld-example-app/blob/master/src/components/Article/CommentInput.js#L58)


---

## 数据收集

### 前端数据埋点时，为什么使用1*1像素的透明gif图片而不是接口？

为什么用图片不用接口或者js、css，是因为：
- 没有跨域问题
- 不会阻塞页面的加载

为什么用gif，是因为：
GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）

至于信息，可以用encode后放在url上给后端解析。

参考：

[为什么前端监控要用GIF打点](https://mp.weixin.qq.com/s/v6R2w26qZkEilXY0mPUBCw?utm_source=tuicool&utm_medium=referral)



---

## SEO

### 有哪些需要注意的SEO的点？

合理的title、description、keywords：搜索对着三项的权重逐个减小，title值强调重点即可；description把页面内容高度概括，不可过分堆砌关键词；keywords列举出重要关键词。

语义化的HTML代码，符合W3C规范：语义化代码让搜索引擎容易理解网页

重要内容HTML代码放在最前：搜索引擎抓取HTML顺序是从上到下，保证重要内容一定会被抓取

重要内容不要用js输出：爬虫不会执行js获取内容

少用iframe：搜索引擎不会抓取iframe中的内容

非装饰性图片必须加alt

提高网站速度：网站速度是搜索引擎排序的一个重要指标

前后端分离的项目使用服务端同构渲染，既提高了访问速度，同时重要关键内容首次渲染不通过 js 输出

友情链接，好的友情链接可以快速的提高你的网站权重

外链，高质量的外链，会给你的网站提高源源不断的权重提升

向各大搜索引擎登陆入口提交尚未收录站点

### SPA如果不做SSR，如何做SEO？

先去 `www.baidu.com/robots.txt` 找出常见的爬虫，然后在nginx上判断来访问页面用户的User-Agent是否是爬虫，如果是爬虫，就用nginx方向代理到我们自己用nodejs + puppeteer实现的爬虫服务器上，然后用你的爬虫服务器爬自己的前后端分离的前端项目页面，增加扒页面的接收延时，保证异步渲染的接口数据返回，最后得到了页面的数据，返还给来访问的爬虫即可。

参考地址：

[前后端分离的项目如何seo](https://github.com/airuikun/Weekly-FE-Interview/issues/13)

---

## 应用服务方面

### 十万条数据插入数据库，怎么去优化和处理高并发情况下的DB插入

首先是优化方面，对于十万条数据，如果处理每条数据时构建一个实例化对象，处理具体业务逻辑，然后进行一次io操作，十万条数据要构建十万个对象，操作十万次io，对于内存和io方面来说这显然是不现实的。整体的思路可以考虑**构建一个生产消费者模式，即一个生产队列，一个消费队列**。十万条数据可以到生产队列中依次排队，每条数据出队列时先到**实例享元池**中进行过滤（每条数据在处理完成后进行一次对象回收，回收到享元池中，下一条数据发现享元池中已经存在该对象就不重新构建而是拿来直接使用，可以**避免在两次gc之间瞬时内存过大的情况**）。假设这十万条数据可能分属十张表中，那么在每张表之前构建一个消费队列，从生产队列出来的数据到各自的消费队列中依次进行业务处理，处理完的数据归属到各个表的内存中（如果只考虑插入数据的话基本包括添加、更新、删除这几个操作，对于一些异常情况，例如后面的操作先进入了队列，可以将该数据放入队列尾部重新排队。

如果考虑高并发的情况，也就是在**插入数据时同时要读取数据，那么需要构建两个消费队列，即一个读取队列，一个插入队列**，两个队列为互斥的，对于这种情况处理就会更加复杂）。当每张表的数据处理完成后，将该表进行一次io操作，把内存中的数据同步更新到数据库中。**当然如果考虑一些容灾或者宕机的场景，可以将内存中的数据每隔一段时间进行一次redis备份**。

