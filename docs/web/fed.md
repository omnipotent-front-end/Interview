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

## 通信相关

### 跨浏览器Tab通信有哪些解决方案？

1. window.open配合句柄postmessage

缺点是只能与自己打开的页面完成通讯，应用面相对较窄；但优点是在跨域场景中依然可以使用该方案。

``` js
// parent.html
const childPage = window.open('child.html', 'child')

childPage.onload = () => {
	childPage.postMessage('hello', location.origin)
}

// child.html
window.onmessage = evt => {
	// evt.data
}

```

2. localStorage

API简单直观，兼容性好，除了跨域场景下需要配合其他方案(如iframe跨域postmessage)，无其他缺点

``` js
// A.html
localStorage.setItem('message', 'hello')

// B.html
window.onstorage = evt => {
  // evt.key, evt.oldValue, evt.newValue
}
```

3. BroadcastChannel

和localStorage方案没特别区别，**都是同域、API简单**，BroadcastChannel方案兼容性差些（chrome > 58），但**比localStorage方案生命周期短（不会持久化），相对干净些**。

``` js
// A.html
const channel = new BroadcastChannel('tabs')
channel.onmessage = evt => {
	// evt.data
}

// B.html
const channel = new BroadcastChannel('tabs')
channel.postMessage('hello')
```

4. SharedWorker

SharedWorker本身并不是为了解决通讯需求的，它的设计初衷应该是类似总控，将一些通用逻辑放在SharedWorker中处理。不过因为也能实现通讯。相较于其他方案没有优势，此外，API复杂而且调试不方便。

``` js
// A.html
var sharedworker = new SharedWorker('worker.js')
sharedworker.port.start()
sharedworker.port.onmessage = evt => {
	// evt.data
}

// B.html
var sharedworker = new SharedWorker('worker.js')
sharedworker.port.start()
sharedworker.port.postMessage('hello')

// worker.js
const ports = []
onconnect = e => {
	const port = e.ports[0]
	ports.push(port)
	port.onmessage = evt => {
		ports.filter(v => v!== port) // 此处为了贴近其他方案的实现，剔除自己
		.forEach(p => p.postMessage(evt.data))
	}
}

```

5. 服务端支持

socket、cookie等等



参考：

[跨页面通信的各种姿势 - 掘金](https://juejin.im/post/59bb7080518825396f4f5177)



### 前端如何实时获取版本更新信息从而提示用户？


- 使用WebSocket， 当发布的时候推送到前端，前端收到通知进行更新操作
- 前端设计一套算法， 不定时地去服务端询问有没有最新的版本，有的话则进行更新

这里有几个点：

1、我们可以直接让后端写一个接口

2、我们写一个node层做这个事情，毕竟这个逻辑后端不care.

3、我们可以直接将当前最新版本的信息放到CDN中，然后将更新最新版本信息的功能加入到构建中。 比如我们静态资源访问路径为: cdn.lucifer.ren/pageA/index.html, 我们可以把这个文件放到 cdn.lucifer.ren/pageA/manifest.json
``` json
{
  version : '1.0.2'
}
```
我们访问这个路径，解析JSON，拿到version字段，通过和本地的version比较，本地version记录方法就很多了， 可以加入构建，也可以放到url中。
关于这个算法，大家可以发挥自己的脑洞。我这里想了一个。 就是根据用户的交互信息和时间来设计一个延迟查询。 如果用户发生了交互行为，比如点击，我就会延迟n秒发送一个查询。如果用户没有任何交互，我就不发送。 当然这个n是可变的，并且如果用户交互比较频繁，也要做一个截流的功能， 比如60秒只会发送一次。


参考：

[大前端面试宝典 - 图解前端](https://lucifer.ren/fe-interview/#/./topics/design/auto-update)

### H5和APP怎么通信？原理是什么？


因为 app 是宿主，可以直接访问 h5，所以这种调用比较简单，就是在 h5 中曝露一些全局对象（包括方法），然后在原生 app 中调用这些对象。


因为 h5 不能直接访问宿主 app，所以这种调用就相对复杂一点。

这种调用常用有两种方式：

1、由 app 向 h5 注入一个全局 js 对象，然后在 h5 直接访问这个对象

2、由 h5 发起一个自定义协议请求，app 拦截这个请求后，再由 app 调用 h5 中的回调函数

参考：

[h5 与原生 app 交互的原理 - 前端小站 - SegmentFault 思否](https://segmentfault.com/a/1190000016759517)

---

## 性能优化

### 无限滚动列表

1.保证DOM数量不会溢出

元素太多会影响页面性能，主要原因有两重：一是浏览器占用内存过多（1000张 50KB 的图片需要50MB 内存，10000张就会占用 0.5GB 内存，足以让 Chrome 崩溃）；我们认为没有必要一次性把所有的图片都加载进页面，而是监听用户对页面的操作，当滚动页面时，再显示出对应位置上的图片。
有些图片虽然之前可见，但现在由于页面滚动，已经被移出了视口，那就把它们拿出来。
即使用户已经在页面上浏览过成百上千张照片，但由于视口的限制，每次需要渲染的图片却都不会超过50张。这样的策略下，用户的交互总能得到及时的响应，浏览器也不容易发生崩溃。

2.数据的懒加载以及进一步判断速度决定图片质量

首先要检查页面滚动方向，要预加载的是用户即将看到的内容；还会根据用户滚动页面的速度识别是否要加载高清原图，如果发现用户只是在飞速地浏览图片，那加载原图也就没有必要了；甚至当页面滚动速度快到一定程度，连低分辨率的占位图都不用加载了。
无论加载的是原图还是低分辨率的占位图，都会有缩放图片的场景。现在的显示屏基本都是高清屏，常见的做法是加载一张两倍于占位尺寸大小的图片，然后缩小一半放到对应位置上（这样做，实际一个像素就能承载两倍的信息量）。对于低分辨占位图来说，我们可以请求非常小且压缩率很高（比如压缩率75%）的资源，然后放大它们。

参考：

[见微知著，Google Photos Web UI 完善之旅 - 知乎](https://zhuanlan.zhihu.com/p/50280008)

---

## 应用服务方面

### 十万条数据插入数据库，怎么去优化和处理高并发情况下的DB插入

首先是优化方面，对于十万条数据，如果处理每条数据时构建一个实例化对象，处理具体业务逻辑，然后进行一次io操作，十万条数据要构建十万个对象，操作十万次io，对于内存和io方面来说这显然是不现实的。整体的思路可以考虑**构建一个生产消费者模式，即一个生产队列，一个消费队列**。十万条数据可以到生产队列中依次排队，每条数据出队列时先到**实例享元池**中进行过滤（每条数据在处理完成后进行一次对象回收，回收到享元池中，下一条数据发现享元池中已经存在该对象就不重新构建而是拿来直接使用，可以**避免在两次gc之间瞬时内存过大的情况**）。假设这十万条数据可能分属十张表中，那么在每张表之前构建一个消费队列，从生产队列出来的数据到各自的消费队列中依次进行业务处理，处理完的数据归属到各个表的内存中（如果只考虑插入数据的话基本包括添加、更新、删除这几个操作，对于一些异常情况，例如后面的操作先进入了队列，可以将该数据放入队列尾部重新排队。

如果考虑高并发的情况，也就是在**插入数据时同时要读取数据，那么需要构建两个消费队列，即一个读取队列，一个插入队列**，两个队列为互斥的，对于这种情况处理就会更加复杂）。当每张表的数据处理完成后，将该表进行一次io操作，把内存中的数据同步更新到数据库中。**当然如果考虑一些容灾或者宕机的场景，可以将内存中的数据每隔一段时间进行一次redis备份**。


### 有哪些应用服务的部署方式？分别有什么优缺点？

#### 单主机多服务实例模式
这种部署是比较传统的方式。

优点：

资源使用率相对较高。多个服务实例共享服务器及其操作系统。
部署服务实例相对较快。

缺点 :

服务之间很少或者没有隔离。**一个行为不当的服务实例可能会占用掉主机的所有内存或CPU**。
部署服务的运维团队必须了解执行此操作的具体细节。这种复杂加大了部署过程中的错误风险。
由于这些明显的缺点所以我们尽量不采用这种方式。

#### 单虚拟机单服务实例
这种方式将每个服务打包成一个虚拟机（VM）镜像。每个服务实例都是一个使用该VM镜像启动的VM。

优点 ：

**每个服务实例是完全隔离的**。他有固定的CPU和内存，且不能从其他服务窃取资源。
可以利用成熟的云基础架构，包括负载均衡和自动扩展。
部署更加简单/可靠。虚拟机封装了服务的技术实现。一旦服务被打包成虚拟机他就成为一个黑盒子。VM的管理API成为部署服务的API, 运维团队只需要掌握VM的管理API即可。

缺点：

资源利用率较低。每个服务实例都有一整个VM开销，包括操作系统。
版本部署时间通常很慢。由于大小原因，VM镜像通常构建很慢，实例化也很慢，而且操作系统启动也需要一定的时间。

#### 单容器单服务实例
每个服务实例都在自己的容器中运行。**容器是一个操作系统级虚拟化机制比如Docker**。从进程的角度来看，他们有自己的端口命名空间和根文件系统。可以限制容器的内存和CPU资源，甚至可以限制I/O速率。每个服务打包成容器镜像，通常每个物理主机上运行多个容器。

优点 ：

隔离性，每个服务彼此隔离。可以轻松的监控每个容器所消耗的资源。
部署简单，不需要了解服务技术细节，主要掌握容器管理API即可。
快速构建。容器是轻量级技术，可以非常快速的构建。容器启动页很快，因为没有繁琐的操作系统引导机制。

缺点 ：

容器技术还没有虚拟机技术那么成熟，**不像VM那么安全，因为容器彼此共享了主机的OS内核**。
需要自己管理容器基础架构以及可能运行的VM基础架构。


#### Serverless部署
AWS Lambda就是一个serveless部署技术示例。要部署微服务，请将其打包成ZIP文件上传给AWS Lambda。
还有对应的元数据，其中包括了被调用来处理请求的函数的名称。
AWS Lambda自动运行足够的微服务实例来处理请求。只需要根据每个请求所用时间和内存消耗来计费。
开发人员无需担心服务器、虚拟机或容器的任何方面。

该模式的优势
1、便捷，不需要对IT基础架构负任何责任，可以专注于开发应用程序。

该模式的缺点
1、不适用于部署长时间运行的服务，例如消耗第三方消息代理消息的服务。必须在300秒内完成。服务必须是无状态的，因为理论上，AWS Lambda可能为每个请求运行一个单独的实例。

参考：


[如何部署微服务](https://zhuanlan.zhihu.com/p/43832944)

