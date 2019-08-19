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

## 移动适配

### 移动端高清屏解决方案是什么样子？

- 移动端适配：flexible

原理就是在不同机型下给body挂不同字体大小，页面样式通过rem对应来完成。

- 多倍图

视口不缩放：使用@2x两倍图

视口缩放：根据不同的dpr，加载不同尺寸的图片（图片处理服务器）

- 1px边框问题

多种解决方案，参考[codepen](https://codepen.io/brizer/pen/bGbEyZv)

使用box-shadow
``` css
-webkit-box-shadow:0 1px 1px -1px rgba(0, 0, 0, 0.5);
```

缺点：颜色不便控制，太淡，有虚边

使用background-image
``` css
background-image:
  linear-gradient(180deg, red, red 50%, transparent 50%),
  linear-gradient(270deg, red, red 50%, transparent 50%),
  linear-gradient(0deg, red, red 50%, transparent 50%),
  linear-gradient(90deg, red, red 50%, transparent 50%);
  background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;
  background-repeat: no-repeat;
  background-position: top, right top,  bottom, left top;
```
缺点：不能实现圆角1px效果，css需要做兼容处理

使用border-image

``` css
border-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAYAAABP2FU6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5JREFUeNpiPnH8zH/G////MzAxAAHTyRNn/wMEGABpvQm9g9TJ1QAAAABJRU5ErkJggg==") 2 0 stretch;
border-width:0px 0px 1px;
```

缺点：边框颜色不便修改

伪类:after & transform: scale(0.5)

``` css
.box4
  position relative
  &:after
    content ''
    display block
    position absolute
    top -50%
    left -50%
    bottom -50%
    right -50%
    border 1px solid red
    -webkit-transform scale(0.5)
    transform scale(0.5)
```

缺点：占用了伪类，容易和原样式冲突

使用0.5px适配ios8以上的iPhone机型

``` css
@media (-webkit-min-device-pixel-ratio:2){
 .box5 {border-width:.5px}
}
```
缺点：只适用于ios8+以上的iOS系统，安卓机不支持0.5px

参考：

[移动端高清屏适配方案 - 前端 - 掘金](https://juejin.im/entry/585b653061ff4b0058026ca4)


### 移动web为什么有300ms延迟，怎么解决？

300ms的原因在于：由于移动端会有**双击缩放**的这个操作，因此浏览器在**click之后要等待300ms，看用户有没有下一次点击**，也就是这次操作是不是双击。

解决方案：

1、禁用缩放

由于是缩放导致的延迟判断逻辑，所以在meta中声明禁止缩放，浏览器就可以放弃这段识别逻辑了。

``` html
<meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="initial-scale=1,maximum-scale=1">
```

2、touch-action

`touch-action`这个CSS属性。这个属性指**定了相应元素上能够触发的用户代理（也就是浏览器）的默认行为**。如果将该属性值设置为`touch-action: none`，那么表示在该元素上的操作**不会触发用户代理的任何默认行为**，就无需进行300ms的延迟判断，可惜目前safari还不支持。

3、第三方库手动判断

比如fastclick，实现原理是在**检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉**。


参考：

[移动端300ms点击延迟和点击穿透 - 掘金](https://juejin.im/post/5b3cc9836fb9a04f9a5cb0e0)

### 什么是点透问题，如何解决呢？

先理解了[移动web为什么有300ms延迟，怎么解决？](/web/fed.html#%E7%A7%BB%E5%8A%A8web%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89300ms%E5%BB%B6%E8%BF%9F%EF%BC%8C%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3%EF%BC%9F)，既然click点击有300ms的延迟，那对于触摸屏，我们直接监听touchstart事件不就好了吗？

使用touchstart去代替click事件有两个不好的地方。

第一：touchstart是手指触摸屏幕就触发，有时候用户只是想滑动屏幕，却触发了touchstart事件，这不是我们想要的结果；

第二：使用touchstart事件在某些场景下可能会出现点击穿透的现象。


点透就是说：

假如页面上有两个元素A和B。B元素在A元素之上。我们在B元素的touchstart事件上注册了一个回调函数，该回调函数的作用是隐藏B元素。我们发现，当我们点击B元素，B元素被隐藏了，随后，A元素触发了click事件。

这是因为在移动端浏览器，事件执行的顺序是touchstart > click。**而click事件有300ms的延迟**，当touchstart事件把B元素隐藏之后，隔了300ms，浏览器触发了click事件，但是**此时B元素不见了，所以该事件被派发到了A元素身上**。如果A元素是一个链接，那此时页面就会意外地跳转。

参考：[移动端浏览器点击事件触发顺序](/cp/browser.html#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%B5%8F%E8%A7%88%E5%99%A8%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91%E9%A1%BA%E5%BA%8F)。
移动浏览器事件触发顺序为：

touchstart --> mouseover(有的浏览器没有实现) --> mousemove(一次) -->mousedown --> mouseup --> click -->touchend

解决方案：

1、只用touch

最简单的解决方案，完美解决点击穿透问题**把页面内所有click全部换成touch事件（touchstart、’touchend’、’tap’）**，需要特别注意a标签，**a标签的href也是click**，需要去掉换成js控制的跳转，或者直接改成span + tap控制跳转。如果要求不高，不在乎滑走或者滑进来触发事件的话，span + touchend就可以了，毕竟tap需要引入第三方库。

2、只用click

会带来300ms延迟，页面内任何一个自定义交互都将增加300毫秒延迟。
不用touch就不会存在touch之后300ms触发click的问题，如果交互性要求不高可以这么做。

3、使用第三方库

比如fastclick，实现原理是在**检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉**。

参考：

[移动端300ms点击延迟和点击穿透 - 掘金](https://juejin.im/post/5b3cc9836fb9a04f9a5cb0e0)



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


### Node应用如何容灾？

1.动态降频
wormhole主要消耗性能的地方就在模板引擎渲染这部分，在并发访问量大的情况下，频繁的模板渲染会导致系统负载急剧飙升，导致响应延迟。判断是否到达阀值，然后不走服务端渲染，全部客户端渲染。

2.CDN兜底
动态降频能够保证大部分情况下的快速响应；但是，如果集群全部宕机，则也无能为了。所以需要通过CDN来兜底。

3.限流

在应用层计数，超过阀值直接限流

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190816135521.png"/>

4.多进程模型

是否采用多进程可以综合考虑：[node应用的单进程和多进程模型有什么优缺点？](/language/node.html#node%E5%BA%94%E7%94%A8%E7%9A%84%E5%8D%95%E8%BF%9B%E7%A8%8B%E5%92%8C%E5%A4%9A%E8%BF%9B%E7%A8%8B%E6%A8%A1%E5%9E%8B%E6%9C%89%E4%BB%80%E4%B9%88%E4%BC%98%E7%BC%BA%E7%82%B9%EF%BC%9F)。如果部署方式为虚拟机，可以考虑用多进程模型充分利用CPU数量；如果部署方式为docker配k8s，建议单进程，把稳定性保障交给k8s。部署方式的区别：[有哪些应用服务的部署方式？分别有什么优缺点？](/web/fed.html#%E6%9C%89%E5%93%AA%E4%BA%9B%E5%BA%94%E7%94%A8%E6%9C%8D%E5%8A%A1%E7%9A%84%E9%83%A8%E7%BD%B2%E6%96%B9%E5%BC%8F%EF%BC%9F%E5%88%86%E5%88%AB%E6%9C%89%E4%BB%80%E4%B9%88%E4%BC%98%E7%BC%BA%E7%82%B9%EF%BC%9F)

5.多集群部署

健康检查，要求每个节点实现一个健康检查的 http 接口，然后 Nginx Server 会定时地轮训这个 URL 来做检查，当返回的 status_code 非 200 时，认为节点宕机，不再导流到这台 Node 服务器。

6.各种监控

异常监控、性能报警等等。


参考：

[天猫双11前端分享系列(二)：天猫双11页面服务容灾方案大揭秘 · Issue #26 · tmallfe/tmallfe.github.io](https://github.com/tmallfe/tmallfe.github.io/issues/26)

---

## 其他

### 服务端渲染和同构的原理是什么？

这里以react的框架next为例。

**getInitialProps()能够在服务的运行，也能够在client运行**。当页面第一次加载时，服务器收到请求，getInitialProps()会执行，getInitialProps()返回的数据，会序列化后添加到 `window.__NEXT_DATA__.props`上，写入HTML源码里，类似于`<script>window.__NEXT_DATA__={props:{xxx}}</script>`。

这样服务端的getInitialProps()就**实现了把数据传送给了客户端**。

客户端的收到了HTML源码，有了数据，想做什么都可以。比如可以拿着`window.__NEXT_DATA__.props`的数据来**初始化React组件的props属性**。

具体过程如下：
当页面是用户通过超链接跳转过去，而不是用户输入网址或刷新来访问的，这时候是纯客户端的行为，没有HTTP请求发出去。用户如果通过超链接跳转回这个页面，客户端的getInitialProps()开始起作用了，它会自动读取HTML源码里 window.__NEXT_DATA__.props里的数据并作为React组件的props。


### 怎么实现草稿，多终端同步，以及冲突问题

**草稿和正式资源的区别无非在于多存储一份**。

**至于多终端同步，则是在多端都用相同接口即可**。

如果需要考虑多人协作的冲突问题，则需要引入版本的概念，在保存定档后进行编辑的版本，对不同人的操作，进行diff算法，并将冲突内容显示出来，问题解决后，再定为下一个版本。

**具体的版本管理方式可以采用乐观锁的方式**。

举一个乐观锁版本的简单例子：

假设数据库中帐户信息表中有一个 version 字段，当前值为 1 ；而当前帐户余额字段（ balance ）为 $100 。

操作员 A 此时将其读出（ version=1 ），并从其帐户余额中扣除 $50（ $100-$50 ）。

在操作员 A 操作的过程中，操作员B 也读入此用户信息（ version=1 ），并从其帐户余额中扣除 $20 （ $100-$20 ）。

操作员 A 完成了修改工作，将数据版本号加一（ version=2 ），连同帐户扣除后余额（ balance=$50 ），提交至数据库更新，此时由于提交数据版本大于数据库记录当前版本，数据被更新，数据库记录 version 更新为 2 。

操作员 B 完成了操作，也将版本号加一（ version=2 ）试图向数据库提交数据（ balance=$80 ），但此时比对数据库记录版本时发现，操作员 B 提交的数据版本号为 2 ，数据库记录当前版本也为 2 ，不满足 “ 提交版本必须大于记录当前版本才能执行更新 “ 的乐观锁策略，因此，操作员 B 的提交被驳回。

这样，就避免了操作员 B 用基于 version=1 的旧数据修改的结果覆盖操作员A 的操作结果的可能。

**至于针对文件内容的diff，可以使用git的diff，myers算法**，其原理可以参考[git的diff操作是基于什么算法的（myers）？简单说下原理。](/cp/algorithm.html#git%E7%9A%84diff%E6%93%8D%E4%BD%9C%E6%98%AF%E5%9F%BA%E4%BA%8E%E4%BB%80%E4%B9%88%E7%AE%97%E6%B3%95%E7%9A%84%EF%BC%88myers%EF%BC%89%EF%BC%9F%E7%AE%80%E5%8D%95%E8%AF%B4%E4%B8%8B%E5%8E%9F%E7%90%86%E3%80%82)


参考：

[面试必备之乐观锁与悲观锁 - 掘金](https://juejin.im/post/5b4977ae5188251b146b2fc8)

[一种diff算法：Myers](http://mcll.top/2019/05/23/diff%E7%AE%97%E6%B3%95/)
