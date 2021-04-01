# 前端架构

## 前端路由

### 什么是前端路由?

前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据 url 的不同返回不同的页面实现的。

### 什么时候使用前端路由?

在单页面应用，大部分页面结构不变，只改变部分内容的使用

### 前端路由有什么优点和缺点?

优点:用户体验好，不需要每次都从服务器全部获取，快速展现给用户。

缺点:单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置。


前端路由一共有两种实现方式，一种是通过 hash 的方式，一种是通过使用 pushState 的方 式。

### 实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案

1. 利用 location.hash 来实现

hash 属性是Javascript原生的属性，是一个可读写的字符串，该字符串是 URL 的锚部分（从 # 号开始的部分）。比如 location.href = "http://blog.chenxu.me/post/#1"，那么  location.hash = "#1"。通过设置 hash 可以操作浏览器的历史记录（即前进、后退）。



2、利用 history.pushState API

pushState 是 Html5 中引入的新特性，用来修改浏览器的历史记录。通过 pushState 把记录保存到浏览器的历史数据中，然后通过windows.onpopstate事件来响应浏览器的前进、后退操作。

通过使用 pushState + ajax 实现浏览器无刷新前进后退，当一次 ajax 调用成功后我们将一 条 state 记录加入到 history对象中。一条 state 记录包含了 url、title 和 content 属性，在 popstate 事件中可以 获取到这个 state 对象，我们可以使用 content 来传递数据。最后我们通过对 window.onpopstate 事件监听来响应浏览器 的前进后退操作。

使用 pushState 来实现有两个问题，一个是打开首页时没有记录，我们可以使用 replaceState 来将首页的记录替换，另一个问题是当一个页面刷新的时候，仍然会向服务器端请求数据，因此如果请求的 url 需要后端的配 合将其重定向到一个页面。




参考：

[pushState + ajax 实现浏览器无刷新前进后退 - Charley Blog](http://blog.chenxu.me/post/detail?id=ed4f0732-897f-48e4-9d4f-821e82f17fad)


### window.open打开页面会被浏览器拦截问题解决


> `window.open`是 javascript 函数，该函数的作用是打开一个新窗口或改变原窗口, 如果你直接在 js 中调用`window.open()`去打开一个新窗口，浏览器会拦截。 （注意：`window.open(url,'_self')`在原窗口打开，不会被拦截）。

普通情况下 window.open 不会拦截，但若是在 ajax 的回调里面进行 window.open，会拦截！因为浏览器会认为这是一个骚扰用户的行为。 在网上找到一些解决方案，总结如下。其中只有方案 1、方案 2 个人验证过有效。其他未知 orz...

#### 方案 1： 先 window.open('_blank')，再赋值 location 跳转链接

```
var  tempWin  = window.open("_blank"); 
$.ajax({
            type: "post",
            url: xxx,
            data: data,
            contentType: "application/json;charset=UTF-8",
            success: function (response) {
                   
                  tempWin.kk = "www.baidu.com";  
            }
        });

```

这种情况有个缺陷：

1.  若你的新页面需要从 sessionStorage 取值，那这种方式是取不到的。 **解决方法：**采用 url 传参方式。比如`tempWin.kk = "www.baidu.com?id=xxxx";`. 然后通过以下 `getParam`方法获取 url 参数：

```
function getParam(a) {
            var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(b);
            if (r != null) return unescape(r[2]);
            return ""
        }

```

1.  若你在 ajax 请求成功后还有业务判断，判断后决定是否要跳转。这时候预先打开一个空页签就很鸡肋。 **解决方法**：参考网上方案，只能采用**方案 2**

#### 方案 2：设置 ajax 请求为`async:false`——同步模式。

```
$.ajax({
        type: "post",
        url: "/xxxx/xxxx",
        async: false，
        data: data,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if(xxx){
                window.open(url);
            }
        }
    });

```

异步当然有异步的好处，全部同步那就呵呵哒了，所以局部使用吧。

_（接下来的方案，各自看看试试，不保证管用，只是搜集来 mark 下）_

#### 方案 3：采用 a 标签

```
 <a href="" target="_blank">click me</a>

 # 点击这个超链接，浏览器会认为它是打开一个新的链接，就不会拦截。
 <a href="javascript:void(0)" onclick="window.open()"></a>

```

**缺陷**：有时候需要点击时候，进行一些其他设置或操作，再跳转。所以需要在 js 中完成。

#### 方案 4：笨笨的 setTimeout

使用 setTimeout 包装一下，也可以防止被浏览器拦截。注意这里的超时时间不能太短，否则也会被拦截。

```
 setTimeout('window.open(url);', 500);

```

#### 方案 5：创建 form 标签，js 代码进行提交

创建一个 form 新元素，并赋予响应属性，然后手动代码进行 submit(); 注意：若需传递参数`?id=1`类似这种，需要指定 POST 方法。默认是 GET 方法，无法传递参数。

```
var form = document.createElement('form');
form.action = 'www.baidu.com?id=1';
form.target = '_blank';
form.method = 'POST';

document.body.appendChild(form);
form.submit();

```

#### 方案 6：巧用 a 标签的特性：创建一个 a 标签，手动代码进行 click 触发。

```
function newWin(url, id) {
      var a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
      a.setAttribute('id', id);
      
      if(!document.getElementById(id)) {         
        document.body.appendChild(a);
      }
      a.click();
}

```



参考：

[window.open打开页面会被浏览器拦截问题解决 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1743495)




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

基于以上区别,我们可以简单得分析一下两者的不同使用场景.

mobx更适合数据不复杂的应用: mobx难以调试,很多状态无法回溯,面对复杂度高的应用时,往往力不从心.
redux适合有回溯需求的应用: 比如一个画板应用、一个表格应用，很多时候需要撤销、重做等操作，由于redux不可变的特性，天然支持这些操作.

mobx适合短平快的项目: mobx上手简单,样板代码少,可以很大程度上提高开发效率.

当然mobx和redux也并不一定是非此即彼的关系,你也可以在项目中用redux作为全局状态管理,用mobx作为组件局部状态管理器来用.


参考：

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904#heading-3)




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

### 前端埋点打点系统相关设计

整体流程：

1、写一段 js 脚本，前端通过 script 标签引入这段 js；
2、通过页面的用户行为，触发相应 js 事件，并拿到数据；
3、通过请求 nginx 上某一个静态资源的形式，将数据进行拼接发送到 nginx；
4、nginx 产生一条日志，云端拿到数据进行清洗、分析。

关于js上报部分3中方式实现埋点：

1、代码埋点

代码埋点需要开发者在埋点的节点处插入埋点代码，例如点击事件的回调、元素的展示回调方法、页面的生命周期函数等等。业务场景不能通过 dom 代码埋点方式获取，js 为此提供了 track 方法，并挂在 window 上，供开发者调用。

2、可视化圈选埋点

通俗的讲就是无需开发者在代码中加入埋点逻辑代码，只需要通过 UI 点点点的方式就能埋好一个点，有效避免了埋点代码污染问题。被点击到的 dom 元素都赋予唯一标识，这里采用 dom 元素唯一的 xpath 当作唯一标识。

说白了，可视化圈选埋点就是制定一套规则，云端利用这套规则去海量的数据里清洗出需要的数据，而规则中就包含了 xpath。

3、无痕埋点

无痕埋点也叫 “全埋点”，有了以上两种方式埋点，无痕埋点自然也就简单了，点击到任何 dom 时都进行上报，然后再获取 dom 的 xpath 作为唯一标识，就可以轻松实现全埋点上报了，剩下的就交给数仓获取、清洗数据吧

关于云端如何采集数据：

数据采集分为 实时数据 和 离线数据。

实时数据 采集的数据流向的两种方式，主要经历的过程是：

第一种方式：目前应用场景主要是客户端实时校验。nginx 日志通过 filebeat 收集统一上报到 日志kafka，日志kafka 会接收到来自很多其它应用的日志数据，所以通过 flink 过滤出哪些数据是需要的数据（埋点数据）再上报到 数据kafka ，然后 Java应用 去消费这些数据，通过 websocket 把这些实时数据给 web 端。

第二种方式：主要是提供各种应用容器日志的数据查询，也就是 ELK 模型。nginx 日志通过 logstash 收集，logstash 和 filebeat 同样都可以做数据收集，它们的区别主要是，filebeat 是一个轻量型日志采集器，主要的能力是数据 收集；而 logstash 更多的能力是体现在数据的过滤和转换上。logstash 收集到数据后，将数据统一往 ES 中存，然后在 kibana 中建一个索引就可以看数据啦。



参考：

[如何搭建一套 “无痕埋点” 体系？ - 知乎](https://zhuanlan.zhihu.com/p/313016178)

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

### Websocket相比http有什么优势？

客户端与服务器只需要一个TCP连接，比http长轮询使用更少的连接

webSocket服务端可以推送数据到客户端

更轻量的协议头，减少数据传输量

参考：

[Node.js 有难度的面试题，你能答对几个？ - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1514668)



### 请求资源的时候不要让它带 cookie 怎么做？

网站向服务器请求的时候，会自动带上 cookie 这样增加表头信息量，使请求变慢。

如果静态文件都放在主域名下，那静态文件请求的时候都带有的 cookie 的数据提交给 server 的，非常浪费流量，所以不如隔离开
，静态资源放 CDN。

因为 cookie 有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就 不会带有 cookie 数据，这样可以降低请 求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

同时这种方式不会将 cookie 传入 WebServer，也减少了 WebServer 对 cookie 的处理分析环节， 提高了 webserver 的
http 请求的解析速度。


### 一个接口在什么情况下会cancel，怎么解决？

1、手动通过js取消比如AbortController，或者promise.race失败，或者配合路由钩子来手动cancel，防止SPA切换后接口继续发。

2、接口还没有发出去，页面就跳转了或者刷新了。解决方案是改为同步接口。

3、表单提交submit时部分浏览器会刷新页面（即使看不出来），也会触发刷新流程，偶现cancel。解决方案是submit时vent.preventDefault()


参考：

[vue路由切换时取消上个页面的异步请求_zmmfjy的博客-CSDN博客](https://blog.csdn.net/zmmfjy/article/details/105572681)

---

## 性能优化

### 首屏和白屏时间怎么定义？如何计算？

白屏时间：从浏览器输入地址并回车后到页面开始有内容的时间；

首屏时间：从浏览器输入地址并回车后到首屏内容渲染完毕的时间；


白屏时间节点指的是从用户进入网站（输入url、刷新、跳转等方式）的时刻开始计算，一直到页面有内容展示出来的时间节点。
这个过程包括dns查询、建立tcp连接、发送首个http请求（如果使用https还要介入TLS的验证时间）、返回html文档、html文档head解析完毕。

首屏时间 = 白屏时间 + 首屏渲染时间

通过window.performance来计算。

具体的逻辑实现可以参考我写的[brizer/web-monitor-sdk: SDK for web monitor, a simple web data collection tool for performance, exceptions, etc.](https://github.com/brizer/web-monitor-sdk)



参考：

[前端性能监控方案（首屏、白屏时间等） - 掘金](https://juejin.im/post/5df4294d518825128306cd5c)



### 无限滚动列表

首先了解[如何判断dom在视窗范围内？](/language/javascript.html#%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%ADdom%E5%9C%A8%E8%A7%86%E7%AA%97%E8%8C%83%E5%9B%B4%E5%86%85%EF%BC%9F)
1.保证DOM数量不会溢出

元素太多会影响页面性能，主要原因有两重：一是浏览器占用内存过多（1000张 50KB 的图片需要50MB 内存，10000张就会占用 0.5GB 内存，足以让 Chrome 崩溃）；我们认为没有必要一次性把所有的图片都加载进页面，而是监听用户对页面的操作，当滚动页面时，再显示出对应位置上的图片。
有些图片虽然之前可见，但现在由于页面滚动，已经被移出了视口，那就把它们拿出来。
即使用户已经在页面上浏览过成百上千张照片，但由于视口的限制，每次需要渲染的图片却都不会超过50张。这样的策略下，用户的交互总能得到及时的响应，浏览器也不容易发生崩溃。

2.数据的懒加载以及进一步判断速度决定图片质量

首先要检查页面滚动方向，要预加载的是用户即将看到的内容；还会根据用户滚动页面的速度识别是否要加载高清原图，如果发现用户只是在飞速地浏览图片，那加载原图也就没有必要了；甚至当页面滚动速度快到一定程度，连低分辨率的占位图都不用加载了。
无论加载的是原图还是低分辨率的占位图，都会有缩放图片的场景。现在的显示屏基本都是高清屏，常见的做法是加载一张两倍于占位尺寸大小的图片，然后缩小一半放到对应位置上（这样做，实际一个像素就能承载两倍的信息量）。对于低分辨占位图来说，我们可以请求非常小且压缩率很高（比如压缩率75%）的资源，然后放大它们。

参考：

[见微知著，Google Photos Web UI 完善之旅 - 知乎](https://zhuanlan.zhihu.com/p/50280008)


### 大量 DOM 操作，应该如何优化？

最简单的，使用 document，fragment

```js
var fragment = document.createDocumentFragment();
fragment.appendChild(elem);
```

如果是需要 diff，比对替换，则需要 Virtualdom；如果还是遇到性能瓶颈，则需要类似 React 的 Fiber 一样，通过 requestIdleCallback 和 requestAnimationFrame 来进一步通过任务调度的方式来优化。

### 浏览器端大数据问题，两万个小球记住信息，进行最优检索和存储？

如果你仅仅只是答用数组对象存储了 2 万个小球信息，然后用 for 循环去遍历进行索引，那是远远不够的。

这题要往深一点走，用特殊的数据结构和算法进行存储和索引。

然后进行存储和速度的一个权衡和对比，最终给出你认为的最优解。

我提供几个思路：

用 ArrayBuffer 实现极致存储

哈夫曼编码 + 字典查询树实现更优索引

用 bit-map 实现大数据筛查

用 hash 索引实现简单快捷的检索

用 IndexedDB 实现动态存储扩充浏览器端虚拟容量

用 iframe 的漏洞实现浏览器端 localStorage 无限存储，实现 2 千万小球信息存储

[参考地址](https://github.com/airuikun/Weekly-FE-Interview/issues/16)

### 两万个小球，做流畅的动画效果？

这题考察对大数据的动画显示优化，当然方法有很多种。

但是你有没有用到浏览器的高级 api？

你还有没有用到浏览器的专门针对动画的引擎？

或者你对 3D 的实践和优化，都可以给面试官展示出来。

提供几个思路：

使用 GPU 硬件加速

使用 webGL

使用 assembly 辅助计算，然后在浏览器端控制动画帧频

用 web worker 实现 javascript 多线程，分块处理小球

用单链表树算法和携程机制，实现任务动态分割和任务暂停、恢复、回滚，动态渲染和处理小球


### 了解 SPA 的懒加载么？（todo）


### 图片的懒加载和预加载怎么做？

懒加载也叫延迟加载，指的是在长网页中延迟加载图片的时机，当用户需要访问时，再去加载， 这样可以提高网站的首屏加载速度，提升用户的体验，并且可以减少服务器的压力。它适用于图 片很多，页面很长的电商网站的场景。懒加载的实现原理是，将页面上的图片的 src 属性设置 为空字符串，将图片的真实路径保存在一个自定义属性中，当页面滚动的时候，进行判断，如果 图片进入页面可视区域内，则从自定义属性中取出真实路径赋值给图片的 src 属性，以此来实 现图片的延迟加载。

预加载指的是将所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源。 通过预加载能够减少用户的等待时间，提高用户的体验。我了解的预加载的最常用的方式是使用 js 中的 image 对象，通过为 image 对象来设置 src 属性，来实现图片的预加载。

这两种方式都是提高网页性能的方式，两者主要区别是一个是提前加载，一个是迟缓甚至不加载。 懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。

图片预加载的实现可以参考[FunnyLiu/preloader at readsource](https://github.com/FunnyLiu/preloader/tree/readsource#%E8%BF%90%E8%90%A5%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F)以及[@tomato-js](https://github.com/tomato-js/tomato/blob/master/packages/preload/src/Preload.ts)我的实现。

参考：

[懒加载和预加载](https://juejin.cn/post/6844903614138286094)



---




## 异常

### 怎么做异常监控？

私有化部署sentry。

### 能聊一聊Script error出现的原因么？

跨域脚本的异常是捕获不到的，只是抛出来Script error，增加crossorigin="anonymous"属性就好了，当然脚本cdn那边跨域请求头也是需要的

参考：

[“Script error.”的产生原因和解决办法_“Script error.”的产生原因和解决办法_前端监控_应用实时监控服务ARMS - 阿里云](https://help.aliyun.com/knowledge_detail/88579.html)



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
border-style: solid;
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


### 逻辑像素和物理像素的区别？

相同问题：[设备像素、css-像素、设备独立像素、dpr、ppi-之间的区别](/language/css.html#设备像素、css-像素、设备独立像素、dpr、ppi-之间的区别)


**物理像素**：设备屏幕实际拥有的像素点。

> 比如iPhone 6的屏幕在宽度方向有750个像素点，高度方向有1334个像素点，所以iPhone 6 总共有750\*1334个物理像素。

**逻辑像素**：也叫“设备独立像素”（Device Independent Pixel, DIP），可以理解为反映在CSS/JS代码里的像素点数。

**设备像素比**（Device Pixel Ratio, DPR）：一个设备的宽或高方向上，物理像素与逻辑像素之比，即：

DPR = width物理 / width逻辑 = height物理 / height逻辑。


> 举个例子，iPhone 6的物理像素上面已经说了，是750\*1334，那它的逻辑像素呢？我们只需在iPhone 6的Safari里打印一下screen.width和screen.height就知道了，结果是 375\*667，这就是它的逻辑像素，据此很容易计算出DRP为2。当然，我们还可以直接通过window.devicePixelRatio这个值来获取DRP，打印结果是2，符合我们的预期。

**“设计像素”**：(奇葩的iPhone 6 Plus)

现象：以iPhone 6 Plus为例，它的实际物理像素点个数是1080\*1920，但如果你截个屏，你会发现截屏图片的宽高是1242\*2208；浏览器的screen对象会告诉你，6 Plus的逻辑像素是414\*736，正好是截屏宽度的三分之一，DPR值也为3。

原因：iPhone 6 Plus系统定义的屏幕像素就是1242*2208，系统会自动把这些像素点塞进1080*1920个实际像素点来渲染。对于前端来说，可以直接把1242视为6 Plus的 **“物理像素”**，包括UE小姐姐们出图也是以1242为标准的，因此不妨把1242*2208称为6 Plus的 **“设计像素”**。

> 苹果这是要闹那样？
> 其实，当初苹果公司在确定6 Plus的DRP时，纠结了半天：选2吧，同样的字号在6 Plus上看起来比6更小，不好；选3吧，字又显得太大了，导致一屏能展示的内容还没有6多；最适合视觉的DRP值是2.46，但这样一个数字能把设计师和程序员们逼疯。最后就想出了引入“设计像素”这样一个两全其美的方案，既让开发者开心，又让用户爽，岂不美哉？

**PPI**：每英寸拥有的物理像素的数量

[一张便于理解上述名词的图](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)

参考：

[CSS中的px与物理像素、逻辑像素、1px边框问题 - 大唐西域都护 - 博客园](https://www.cnblogs.com/leegent/p/9404572.html)

### 为什么会出现1px的边框问题？怎么解决？

首先了解[逻辑像素和物理像素的区别？](/web/fed.html#%E9%80%BB%E8%BE%91%E5%83%8F%E7%B4%A0%E5%92%8C%E7%89%A9%E7%90%86%E5%83%8F%E7%B4%A0%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F)。

在苹果的带动下，Retina技术在移动设备上已经成了标配，所以前端攻城狮必须直面如下事实：

1. 你想画个1px的下边框，但屏幕硬是塞给你一条宽度为2—3个物理像素的线，看起来比较粗。
2. 你没法像安卓或iOS的同事那样直接操纵物理像素点。

这就是初级前端面试必考题之“1px边框问题”的由来。

1px边框问题的解法千奇百怪，各显神通，但以我的实践经验，最推崇的方法还是利用CSS3的transform: scale，因为简单直接、适用性和兼容性好。

你不是给我两个物理像素点吗？加个transform: scale(0.5)，只剩一个点了~

三个物理像素点？那就scale(0.33)！

使用CSS的-webkit-min-device-pixel-ratio媒体查询可以针对不同的DPR做出处理

``` css
@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){
    .border-bt-1px(@color) {
        position: relative;
        &::after {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: @color;
            transform: scaleY(0.5);
        }
    }
}
```


参考：

[CSS中的px与物理像素、逻辑像素、1px边框问题 - 大唐西域都护 - 博客园](https://www.cnblogs.com/leegent/p/9404572.html)




### 使用rem布局的优缺点是什么？

优点:

在屏幕分辨率千差万别的时代，只要将 rem 与屏幕分辨率关联起来就可以实现页面的整体 缩放，使得在设备上的展现都统一起来了。
而且现在浏览器基本都已经支持 rem 了，兼容性也非常的好。

缺点:

(1)在奇葩的 dpr 设备上表现效果不太好，比如一些华为的高端机型用 rem 布局会出现错乱。

(2)使用 iframe 引用也会出现问题。

(3)rem 在多屏幕尺寸适配上与当前两大平台的设计哲学不一致。即大屏的出现到底是为 了看得又大又清楚，还是为了看的更多的问
题。

### 视觉视口（visual viewport）和布局视口（layout viewport）的区别

移动端出现这两个viewport的原因：

移动端的viewport比桌面的viewport小，导致移动端的网页显示有问题。（桌面浏览器上viewport是严格等于浏览器的窗口）现实中很少会有网站去特别迎合移动端。所以就出现这两个viewport

**visual viewport:**

visual viewport是当前显示在屏幕上的页面的一部分。用户可以滚动来改变他看到的页面部分，或者缩放来改变visual viewport的大小。

**layout viewport:**

CSS布局，尤其是百分比宽度，是相对于layout viewport计算的，layout viewport可以比visual viewport宽得多。

`<html>`元素最初采用layout viewport的宽度（不用style指定的话），而您的CSS被解释为屏幕明显比手机屏幕宽。这可以确保你的网站布局和在桌面浏览器上一样。

> layout viewport有多宽?每个浏览器的情况都不一样。Safari iPhone使用980px, Opera 850px, Android WebKit 800px, IE 974px。


**缩放**

这两个viewport单位都是CSS像素。visual viewport的尺寸会随着缩放而改变，但layout viewport的尺寸保持不变。(如果改变，页面会重排，因为百分比宽度需重新计算)


**layout viewport大小**

`document.documentElement.clientWidth`和`-Height`为layout viewport的尺寸。
`document.documentElement.offsetWidth/Height`是HTML的尺寸。
`document.documentElement`实际上就是`<html>`元素。

> 在pc端`document. documentElement. clientWidth/Height`只会给出viewport的尺寸，而不管`<html>`元素尺寸如何改变

**visual viewport大小**

visual viewport为`window.innerWidth/innerHeight`。当用户缩小或缩小时，测量值会发生变化，因为屏幕上的CSS像素大小不同。**不幸的是，它的兼容性没有得到很好的支持。**


**指定layout viewport的大小**

添加标签：
```
<!-- 1.设为设备大小 -->
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<!-- 2.确定的大小 -->
<meta name="viewport" content="width=320">
```

*如果指定html的大小，而这个大小若小于layout viewport，会导致初始时界面上有很大一块空白。所以大小需设在layout viewport*

参考

[viewports剖析](https://www.w3cplus.com/css/viewports.html)

[Difference between visual viewport and layout viewport?](https://stackoverflow.com/questions/6333927/difference-between-visual-viewport-and-layout-viewport)

[A tale of two viewports — part two](https://www.quirksmode.org/mobile/viewports2.html)


### Flexible方案

* 使用一款 postcss 插件[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)将px单位转化为rem（依据配置的rootValue）
* 用[lib-flexible](https://github.com/amfe/lib-flexible) 判断设备设置 rem 基准值，做的事如下：
  * 动态改写`<meta>`标签
  * 给`<html>`元素添加data-dpr属性，并且动态改写data-dpr的值
  * 给`<html>`元素添加font-size属性，并且动态改写font-size的值

> 将视觉稿宽度分为100份（主要为了以后能更好的兼容vh和vw），总宽为100a=10rem。375px的视觉稿就设置rootValue为37.5px（即1rem的大小）

参考
[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)

[vue-h5-template](https://github.com/sunniejs/vue-h5-template)

[Rem 布局适配配置](https://youzan.github.io/vant/#/zh-CN/advanced-usage#rem-bu-ju-gua-pei)

rem方案的配置[如这次提交](https://github.com/codeless-js/vue-h5-flexible/commit/299ce65c1e6bbc4e2beeab67c4f8f9ff4da4202e)

### viewport方案


使用一款 PostCSS 插件[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)将 px 单位转化为 vw/vh 单位。（依据配置的viewportWidth）


参考

[再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)

[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

[Viewport布局配置](https://youzan.github.io/vant/#/zh-CN/advanced-usage#viewport-bu-ju)

viewport方案的配置[如这次提交](https://github.com/codeless-js/vue-h5-viewport/commit/60e6fc985e193e41625559a7fe61c7edb12c486c)


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


### 你有做过Hybrid APP开发吗？说说你的经验（todo）

在公司移动端和PC端都做过相应的开发，然后就介绍了移动端开发的一些东西，然后说了下H5是如何和客户端进行交互的，最后说了下自己参与的一些weex开发项目，说了下weex与H5的区别。


### Hybrid离线方案你们是怎么做

可以通过把整个前端资源加载到app内去，由app渲染，最后h5只发请求数据即可、jscsshtml均存在与app内。

也可以通过前端打包提供元数据，在app启动时去预加载来映射。

离线化技术可以将网页的网络加载时间变为 0，在离线化的选型上美团点评内部有很多选择，我们也在不同的方向进行尝试。其中我们的选择包括：

标准技术：

Application Cache：实现上各个平台各个浏览器有一些差异，即使把“无法更新的坑”踩过还是会有很多“无法离线”的坑，PASS

Service Workers：Service Workers 是团队一直跟进的技术，目前在测试已经接近正式发布，只是在 iOS 上还无法大范围使用，长期看好，暂时 PASS
借助 Native 能力的自有技术：

美团平台技术团队的类 Service Workers 的被动离线化技术

美团旅行技术团队的离线包技术

留下来的只剩下两个自有技术，这两个技术的最大区别是，是否解决了首次加载问题？离线化方案的首次加载问题是一个很难的技术领域，我认为其最核心的问题是何时加载，提前加载会不会用户在很长一段时间内都不会用到导致浪费流量？使用包含首次加载优化的离线化技术的项目多了会不会造成加载拥塞？是不是需要分析用户行为数据去更精准的进行离线包的提前加载？这当中存在太多不确定性，不过我相信我们的技术团队一定能够想出优美的解决方案去解决这个问题。

另外基于 Native 能力的离线化技术还存在一些来自平台的限制，如 iOS 的 WKWebView 不支持请求拦截，而请求拦截是离线化的关键技术，这个原因导致在 WKWebView 上无法实现离线化。

WKWebView 的优势是：运行和渲染速度更快，与 Safari 内核一致 Apple 重点迭代跟进问题；劣势是：启动速度慢，无法拦截请求进而使用自有的离线化技术。

权衡离线化所带来的巨大优势和 WKWebView 的速度优势，我们选择继续使用 UIWebView。（曾经在 iOS 11 发布前业界一度认为 Apple 会在 iOS 11 中支持 WKWebView 的请求拦截）

参考：

[Hybrid App 离线包方案实践 · Issue #63 · mcuking/blog](https://github.com/mcuking/blog/issues/63)

### 唤起app的原理

1、URL Scheme

就像给服务器资源分配一个 URL，以便我们去访问它一样，我们同样也可以给手机APP分配一个特殊格式的 URL，用来访问这个APP或者这个APP中的某个功能(来实现通信)。APP得有一个标识，好让我们可以定位到它，它就是 URL 的 Scheme 部分。

2、Universal Link

Universal Link 是苹果在 WWDC2015 上为 iOS9 引入的新功能，通过传统的 HTTP 链接即可打开 APP。如果用户未安装 APP，则会跳转到该链接所对应的页面。

通过iframe/a/window.top.location.href等多种方式来尝试赋值唤起。具体实现可以参考：[callapp-lib的实现](https://github.com/FunnyLiu/callapp-lib/blob/readsource/src/index.ts#L92)




### 如何判断唤起是否成功

通过判断当前页面是否被激活页面来判断，至于如何判断当前页面被激活状态，APP 如果被唤起的话，页面就会进入后台运行，setInterval 在 ios 中不会停止运行，在 android 中停止运行。

每 20ms 执行一次，执行 100次 在页面中实际耗费与 2000 ms 不会相差多少。

我们的判断条件比预期时间多设置了 500ms，所以如果安卓中 setInterval 内的函数执行 100 次以内所费时间超过 2500ms，则说明 APP 唤起成功，反之则代表失败。

我们通过 document.hidden 和 document.webkitHidden 属性来判断 APP 在 ios 中是否被正常唤起，2000ms 内，页面转入后台运行，document.hidden 会返回 true，代表唤端成功，反之则代表失败。




参考：

[H5唤起APP指南 | 拾壹小筑](https://suanmei.github.io/2018/08/23/h5_call_app/)

### h5怎么和app通信的

JavaScript 调用 Native 的方式，主要有两种：注入 API 和 拦截 URL SCHEME。

注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。

拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。


参考：

[JSBridge的原理](https://juejin.cn/post/6844903585268891662#heading-11)






### webview请求预加载（todo）

---

## 框架选型


### Vue和React的区别是什么？

### React相比Vue的优势在哪里？

### Vue相比React的优势在哪里？

### 什么时候用Vue，什么时候用React？

---


## 组件库建设

### 介绍一下组件库的建设

先说了组件库之前用create-react-app搭建但是觉得太臃肿，然后自己搭建了一个，介绍了组件库用到的的技术栈，支持的三种模块方式，按需加载功能，自定义主题色功能，tsconfig的配置,commit规范和代码格式规范等等

参考：

[金九银十：一年前端的字节三面面经 - SegmentFault 思否](https://segmentfault.com/a/1190000037513493)

### 组件库怎么支持多个模块规范依赖？我引入import组件的时候怎么知道引入哪种模块化方式的组件？

package.json的main字段的commonjs的规范入口，module是esmodule的规范入口。打包则是通过打包工具打包成不同的规范dist。

### 你组件库用了ts，那么我使用组件库的时候是怎么引用你的声明文件的？

package.json的typings字段

参考：

[金九银十：一年前端的字节三面面经 - SegmentFault 思否](https://segmentfault.com/a/1190000037513493)

### 组件怎么按需加载？

通过支持es模块，这个模块就是简单babel编译成es5语法，但是对import export字段不进行编译，然后package.json声明sideEffect字段来声明副作用文件，防止被tree-shaking掉，项目中我们可以利用打包工具的tree-shaking功能做到按需加载

参考：

[金九银十：一年前端的字节三面面经 - SegmentFault 思否](https://segmentfault.com/a/1190000037513493)

### 组件样式怎么按需加载？

babel-import-plugin,这时候才想起来，跟面试官解释了自己的组件内不会引入样式，而是基于glup流式构建单独处理less文件，这样做的好处就是支持babel-import-plugin

参考：

[金九银十：一年前端的字节三面面经 - SegmentFault 思否](https://segmentfault.com/a/1190000037513493)

### 组件规范怎么保持？

介绍了eslint,(顺便说了不选择tslint的原因)，prettier,以及commit规范，另外说到了git-hook，提交前会进行检查并且格式化(format)

参考：

[金九银十：一年前端的字节三面面经 - SegmentFault 思否](https://segmentfault.com/a/1190000037513493)



### 组件包版本是怎么维护的，3位数分别代表什么？

一般是通过[语义化版本 2.0.0 | Semantic Versioning](https://semver.org/lang/zh-CN/)，这套规范来维护的。

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

主版本号：当你做了不兼容的 API 修改，

次版本号：当你做了向下兼容的功能性新增，

修订号：当你做了向下兼容的问题修正。

先行版本号及版本编译元数据可以加到“主版本号.次版本号.修订号”的后面，作为延伸。


### 业务组件的单元测试一般需要测试什么内容？

可以参考[FunnyLiu/element at readsource](https://github.com/FunnyLiu/element/tree/readsource)，也就是elementui的单元测试部分。

主要通过不同的参数传递后、或者执行了组件的不同api后，组件dom是否有对应的class或text来判断流程是否正确。




---



## 兼容性

### 什么是 Polyfill ?

Polyfill 指的是用于实现浏览器并不支持的原生 API 的代码。

比如说 querySelectorAll 是很多现代浏览器都支持的原生 Web API，但是有些古老的浏览 器并不支持，那么假设有人写了一段代码来实现这个功能使这些浏览器也支持了这个功能，那么 这就可以成为一个 Polyfill。

一个 shim 是一个库，有自己的 API，而不是单纯实现原生不支持的 API。

### 如何检测浏览器所支持的最小字体大小？

用 JS 设置 DOM 的字体为某一个值，然后再取出来，如果值设置成功，就说明支持。



---


## 命令行工具

### 有哪些常见的用到过的命令行交互包？

yargs或者commander来控制命令的注册和转发；

chalk来控制字体的颜色；

inquirer来控制一些选择或者提问；

ora来控制一些加载等状态


### 自己写的mock服务是怎么实现的，为什么不在webpack里用相关插件？

[brizer/http-mocker: A tool for mock local requests or proxy remote requests. Support GUI and cross domain requests.](https://github.com/brizer/http-mocker)

有好几个特性，首先是

它拥有以下功能：

1、通过配置文件.httpmockrc.json或者package.json文件中的httpmock字段来进行mock映射关系；

2、支持mockjs语法,灵活配置动态化的mock返回值;

3、基于path-to-regexp识别express风格的url

4、基于http-mockjs-ui，通过可视化的方式管理配置文件和mock文件内容，提高效率。

5、方便的初始化和GUI编辑体验。

6、支持mock和proxy跨域的接口，通过service worker

7、支持js定制复杂的规则。

8、支持对body参数的校验。

其中通过service worker进行跨域，对fetch进行拦截。

通过GUI完成快速的编辑。这些都是比较定制化的需求。再者就是为了锻炼开源的一些实践。

其实现原理就是将传入的app对象，进行app.all('/*')，进行拦截并进行mock等一系列判断。serviceworker的跨域支持则是通过注入sdk，注入sw.js来完成遥相呼应的。


## SSR


### SSR解决了什么问题？

首屏时间与SEO，SSR 本质上是用服务端压力换取首屏体验的提升。客户端渲染和服务器端渲染的结合，在服务器端执行一次，用于实现服务器端渲染（首屏直出），在客户端再执行一次，用于接管页面交互 (绑定事件)，核心解决 SEO 和首屏渲染慢的问题。

### SSR为啥在服务端执行一次，在客户端还需要执行一次？

原因很简单，服务端使用 renderToString 渲染页面，而 react-dom/server 下的 renderToString 并没有做事件相关的处理，因此返回给浏览器的内容不会有事件绑定，渲染出来的页面只是一个静态的 HTML 页面。只有在客户端渲染 React 组件并初始化 React 实例后，才能更新组件的 state 和 props，初始化 React 的事件系统，执行虚拟 DOM 的重新渲染机制，让 React 组件真正“ 动” 起来。

参考：

[谈谈我对服务端渲染(SSR)的理解](https://juejin.cn/post/6890810591968477191)

### 服务器端已经渲染了一次 React 组件，如果在客户端中再渲染一次 React 组件，会不会渲染两次 React 组件？


答案是不会的。秘诀在于 data-react-checksum 属性，如果使用 renderToString 渲染组件，会在组件的第一个 DOM 带有 data-react-checksum 属性，这个属性是通过 adler32 算法算出来：如果两个组件有相同的 props 和 DOM 结构时，adler32 算法算出的 checksum 值会一样，有点类似于哈希算法。

所以当客户端渲染 React 组件时，首先计算出组件的 checksum 值，然后检索 HTML DOM 看看是否存在数值相同的data-react-checksum属性，如果存在，则组件只会渲染一次，如果不存在，则会抛出一个 warning 异常。也就是说，

当服务器端和客户端渲染具有相同的 props 和相同 DOM 结构的组件时，该 React 组件只会渲染一次。

参考：

[谈谈我对服务端渲染(SSR)的理解](https://juejin.cn/post/6890810591968477191)



### SSR会有哪些坑以及如何解决？

cpu/memory 可能爆了，出现异常不好定位调试，带权限接口与非权限接口有可能需要剥离(为了缓存)，TTFB慢了(如果不加缓存，以前可能是骨架屏，现在直接白屏)，由于需要起http服务工程上也复杂了很多

### SSR双端是怎么构建的？有什么区别?

为了解决node端引入前端组件的问题，webpack配置需要指定target为node。

且服务端不太需要路由分隔，客户端则需要且带hash。

另外客户端需要混淆最小化静态文件代码。

且两端打包入口及出口均不同。

客户端需要打包引入的第三方包，而服务端打包则可以将其排除掉。

### node端怎么加载前端组件的？

node环境既不支持jsx也不支持es module。是通过babel、webpack吗？如果是，怎么打包，是只打包前端组件还是说连nodejs一起打包？

如果是前端和node一起打包，由于引入babel，会导致加载模块数量变得巨大，而且不方便调试。

所以最好的方式是只处理前端组件。

通过webpack的配置，设置target为node。

通过webpack的配置，设置externals，来排除对node_modules的打包，将范围限制在前端组件部分。




### 组件在客户端和服务端分别怎么获取数据？

如何在客户端切换路由时，获取组件数据。
next.js是魔改react-router,⾃⼰封装了了⼀套router，监听你的各种路路由跳转动作。

可以通过封装高阶组件[笔记内容](https://github.com/FunnyLiu/ssr/blob/readsource/packages/hoc-react/src/wrapComponent.tsx#L18)

默认从全局变量里拿数据，在**客户端切换路由，或者csr模式情况下刷新页面**的时候，就走fetch拿远程数据。

``` js


const fetch = async (WrappedComponent: FC, dispatch: React.Dispatch<Action>, props: RouteComponentProps) => {
  //执行请求方法，并拿到结果返回
  const asyncData = WrappedComponent.fetch ? await WrappedComponent.fetch(props) : {}
  await dispatch({
    type: 'updateContext',
    payload: asyncData
  })
}
// HOC 
// 用于在路由切换和csr模式下通过fetch拿到数据给客户端组件
function wrapComponent (WrappedComponent: FC) {
  return withRouter(props => {
    const { dispatch } = useContext(window.STORE_CONTEXT)

    useEffect(() => {
      didMount()
    }, [])

    const didMount = async () => {
      if (routerChanged || !window.__USE_SSR__) {
        // ssr 情况下只有路由切换的时候才需要调用 fetch
        // csr 情况首次访问页面也需要调用 fetch
        // 调用fetch
        await fetch(WrappedComponent, dispatch, props)
      }
      if (!routerChanged) {
        // routerChanged 为 true 代表已经进行过切换路由的操作
        routerChanged = true
      }
    }

    return <WrappedComponent {...props}></WrappedComponent>
  })
}
```

服务端则是在服务端直接fetch拿到数据，如果是csr则不渲染组件，只给客户端去渲染即可。[笔记内容](https://github.com/FunnyLiu/ssr/blob/readsource/packages/plugin-react/src/entry/server-entry.tsx#L52)


### Next服务端渲染和同构的原理是什么？

这里以react的框架next为例。

**getInitialProps()能够在服务端运行，也能够在client运行**。当页面第一次加载时，服务器收到请求，getInitialProps()会执行，getInitialProps()返回的数据，会序列化后添加到 `window.__NEXT_DATA__.props`上，写入HTML源码里，类似于`<script>window.__NEXT_DATA__={props:{xxx}}</script>`。

这样服务端的getInitialProps()就**实现了把数据传送给了客户端**。

客户端的收到了HTML源码，有了数据，想做什么都可以。比如可以拿着`window.__NEXT_DATA__.props`的数据来**初始化React组件的props属性**。

具体过程如下：
当页面是用户通过超链接跳转过去，而不是用户输入网址或刷新来访问的，这时候是纯客户端的行为，没有HTTP请求发出去。用户如果通过超链接跳转回这个页面，客户端的getInitialProps()开始起作用了，它会自动读取HTML源码里 window.__NEXT_DATA__.props里的数据并作为React组件的props。


### 怎么降级为客户端渲染？

每次打包两端的代码。

通过url参数csr来进行标识，服务端不再渲染组件。

``` js
    <StaticRouter>
      <Context.Provider value={{ state: fetchData }}>
        <Layout ctx={ctx} config={config} staticList={staticList}>
          {/* //如果是csr模式，则服务端不渲染组件 */}
          {isCsr ? <></> : <Component />}
        </Layout>
      </Context.Provider>
    </StaticRouter>
```

而客户端需要手动去fetch数据，而不是等服务端给过来：

``` js
// HOC 
// 用于在路由切换和csr模式下通过fetch拿到数据给客户端组件
function wrapComponent (WrappedComponent: FC) {
  return withRouter(props => {
    const { dispatch } = useContext(window.STORE_CONTEXT)
    //利用useEffect只在客户端执行
    useEffect(() => {
      didMount()
    }, [])

    const didMount = async () => {
      if (routerChanged || !window.__USE_SSR__) {
        // ssr 情况下只有路由切换的时候才需要调用 fetch
        // csr 情况首次访问页面也需要调用 fetch
        // 调用fetch
        await fetch(WrappedComponent, dispatch, props)
      }
      if (!routerChanged) {
        // routerChanged 为 true 代表已经进行过切换路由的操作
        routerChanged = true
      }
    }

    return <WrappedComponent {...props}></WrappedComponent>
  })
}
```


### 服务端路由和客户端路由在处理上有什么区别？

以react-router为例，服务端路由需要用StaticRouter，客户端需要用BrowserRouter。

因为服务器端渲染是一种无状态的渲染。将服务器上接收到的URL传递给StaticRouter路由用来匹配，同时支持传入context特性。当在浏览器上渲染一个`<Redirect>`时，浏览器历史记录会改变状态，同时将屏幕更新。在静态的服务器环境中，无法直接更改应用程序的状态。在这种情况下，可以在context特性中标记要渲染的结果。如果出现了context.url，就说明应用程序需要重定向。从服务器端发送一个恰当的重定向链接即可。

而BrowserRouter则是通过history API来管理的客户端路由。所以a标签的都是走的SSR，而自由pushState的才会走CSR。

总体来看就是在服务端通过redirect来跳转走SSR，客户端通过pushState来跳转走CSR。



参考：

[Disqus 评论](https://disqus.com/embed/comments/?base=default&f=testudy&t_i=%2Ftech%2F2017%2F11%2F24%2Freact-router-server-rendering&t_u=https%3A%2F%2Ftestudy.cc%2Ftech%2F2017%2F11%2F24%2Freact-router-server-rendering.html&t_e=React%20Router%201%20-%20%E6%8C%87%E5%8D%97%EF%BC%9A%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93%EF%BC%88Server%20Rendering%EF%BC%89&t_d=React%20Router%201%20-%20%E6%8C%87%E5%8D%97%EF%BC%9A%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93%EF%BC%88Server%20Rendering%EF%BC%89&t_t=React%20Router%201%20-%20%E6%8C%87%E5%8D%97%EF%BC%9A%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93%EF%BC%88Server%20Rendering%EF%BC%89&s_o=default#version=a658a7c16140d8728cc859daf581cbbc)

### 如何高效稳定的部署


打通serverless

[笔记内容](https://github.com/FunnyLiu/ssr/blob/readsource/packages/plugin-midway/src/deploy.ts#L12)

使用阿里云和腾讯云等平台，将打包的文件部署

云函数的yml如下所示：

``` yml
service:
  name: serverless-ssr
provider:
  name: aliyun

aggregation: # 聚合成一个函数发布
  ssr: # 聚合函数的名称
    deployOrigin: false
    functionsPattern:
      - '*'

package:
  include:
    - build
  exclude:
    - package-lock.json
  artifact: code.zip

deployType: egg       ## 部署的应用类型

```

### 有做过哪些SSR性能方面的优化？

#### 1、缓存

一般分为页面级别缓存和组件级别缓存.

页面级别缓存: 对于相同的页面的请求, 其内容也相同(不考虑个性化页面情况), 所以将路由与对应页面缓存下来可以很有效命中缓存, 降低性能开销.

``` js
// 使用 LRU 
const microCache = LRU({
  max: 100,
  maxAge: 1000 // 重要提示：条目在 1 秒后过期。
})

...
// 命中缓存
const hit = microCache.get(req.url)
if (hit) {
  return res.end(hit)
}
...

// 缓存下来
microCache.set(req.url, html)
```

组件缓存在组件渲染过程进行命中判断, 所以会影响组件渲染结果, 所以要确保组件不依赖上下文状态且无副作用, 换句话说缓存的是不会改变内容的展示型组件。


#### 2、优化异步


将各个promise通过合并到promise.all再await来解决。



``` js
         }, 'coursedetail');
       });
 
-      // 获取用户登陆信息
-      await store.dispatch(userCenterFetch())
-      await store.dispatch(fetchLoginInfo())
+      // // 获取用户登陆信息
+      // await store.dispatch(userCenterFetch())
+      // await store.dispatch(fetchLoginInfo())
 
+      let fromItemId = ''
       const courseState = store.getState().course
       const courseInfo = courseState.course.baseCourseInfo
       const courseId = courseInfo ? `${courseInfo.courseId}` : null;


```


``` js
       }
       if (!courseId || courseId !== params.courseid) {
         if (query.fromCourseId) {
-          await store.dispatch(courseFetch(params.courseid, query.fromCourseId))
+          // await store.dispatch(courseFetch(params.courseid, query.fromCourseId))
+          fromItemId = query.fromCourseId
         } else if (query.fromItemId) {
           // 续费课详情页接口
-          await store.dispatch(courseFetch(params.courseid, query.fromItemId))
+          // await store.dispatch(courseFetch(params.courseid, query.fromItemId))
+          fromItemId = query.fromItemId
         } else {
-          await store.dispatch(courseFetch(params.courseid))
+          // await store.dispatch(courseFetch(params.courseid))
+          fromItemId = ''
         }
       }
+
+      await Promise.all([
+        // 获取用户登陆信息
+        store.dispatch(userCenterFetch()),
+        store.dispatch(fetchLoginInfo()),
+        store.dispatch(courseFetch(params.courseid, fromItemId))
+      ])
+
       const dialogShow = courseState.dialog.willShow
       if (dialogShow && courseId !== params.courseid) { // 调到其他课程需要干掉弹窗
         await store.dispatch(hideCourseDialog())

```


参考

[Vue.js服务端渲染(SSR)不完全指北 - 知乎](https://zhuanlan.zhihu.com/p/84835469)


#### 3、SSR相关渲染链路使用最合适的API

比如在服务端渲染react组件为html时，可以使用renderToNodeStream通过stream的方式来优化，再降级为renderToString。参考：[笔记内容](https://github.com/FunnyLiu/ssr/blob/readsource/packages/core-react/src/render.ts#L26)，就是vue也提供了一样的api：[笔记内容](https://github.com/FunnyLiu/ssr/blob/readsource/packages/core-vue/src/render.ts#L28)

在客户端，如果是全客户端渲染则通过react dom的render来渲染组件，如果是注水模式，则通过react dom 的hydrate来注水，从而只增加事件绑定，而不是完全渲染。参考：[笔记内容](https://github.com/FunnyLiu/ssr/blob/readsource/packages/plugin-react/src/entry/client-entry.tsx#L19)

## 可视化搭建CMS


### 编辑预览区域怎么做？

通过iframe进行样式和逻辑的隔离，通过postmessage进行通信

或者通过react的renderToSting、vue的renderToString等方法进行预览，配合shadow dom进行隔离。

### 模块组件的最佳配置

模块组件的模块信息和需要用户填入的信息json遥相呼应。
其中将模块组件和交互组件进行分割，同一个模块可以选择不同的交互形式，从而得到不同的交互组合效果。比如分页+卡片A/下拉更多+卡片B等等。

``` json
{
    "chineseName" : "轮播图组件",
    "content" : "<ux-cms-vue-slider list={list}></ux-cms-vue-slider>",
    "dataTemplate" : "c2_vue_slider",
    "dependence" : "pool/component-cms/src/vue-slider/web/ui",
    "description" : "轮播图组件",
    "name" : "m_vue_slider",
    "previewImg" : "//edu-image.nosdn.127.net/24d973af6c7d4acd9f7307955e2a535b.jpg?imageView&quality=100",
    "style" : "",
    "type" : 1,
    "viewType" : 1,
    "cdn": "vue,swiperCss,swiperJs,vueAwesomeSwiper"
  }
```

### 如何兼容多技术栈

每个页面模板可以自由组合头部和底部初始化模块，整个页面为ftl。可视化编辑仅仅决定中间部分的模块。即使如此，各模块也有一个cdn参数提供，用于引入各自需要的独特资源，在打工时统一去重加载。

### 不同的页面怎么设计插件化

不同页面模块的内容由插件定制组装而成，插件有：

分享插件、数据埋点插件、导航插件、SSR插件、异常监控插件、ABTest插件等等。

插件参考webpack使用tapable，在页面不同的生命周期进行不同的钩子处理。

具体插件功能

#### 数据插件

写一段 js 脚本，前端通过 script 标签引入这段 js；

通过页面的用户行为，触发相应 js 事件，并拿到数据；

通过请求 nginx 上某一个静态资源的形式，将数据进行拼接发送到 nginx；

nginx 产生一条日志，云端拿到数据进行清洗、分析

可视化圈选埋点，通俗的讲就是无需开发者在代码中加入埋点逻辑代码，只需要通过 UI 点点点的方式就能埋好一个点，有效避免了埋点代码污染问题。被点击到的 dom 元素都赋予唯一标识，这里采用 dom 元素唯一的 xpath 当作唯一标识。说白了，可视化圈选埋点就是制定一套规则，云端利用这套规则去海量的数据里清洗出需要的数据，而规则中就包含了 xpath。

仅仅web端的话通过css选择器也可以，网易哈勃基于此


#### 导航插件

支持各种切换方式，如上下滚动、左右tab切换等等。

#### SSR插件

整体逻辑变为SSR模式，不再是CSR打包结果集合。


#### ABTest插件

在专题后台录入两套不同的组件。分别是A和B组。每个组会自己的起始值和终止值如 0-5 6-10.

然后页面初始化时会生成一个随机数在这个区间之内，比如说8，并记录到cookie中。cookie名带上专题的key。

这样这个用户对于这个专题就永远走到b组件了。

### 如何让开发去中心化

通过scope包对不同团队不同插件进行npm包区分管理。

### 如何保证性能？


每次制作完成，上线或准备就绪，都会通知lighthouse-apm 对页面进行性能评估，并发送邮件给相关负责人，影响到对应前端的相关绩效分数。

模块组件懒加载


### 模块怎么开发？

提供cli统一开发模块组件，并上报内容等等。模块缩略图由本地puppeteer对应的demo来生成，确保本地demo可启动。

### 模块间怎么通信？

通过全局规约发布订阅消息总线来完成跨模块的通信

### 那些数据大盘建设？

模块组件使用计算、各个营销活动打点计数、自动化埋点点击区域热图显示等等，ABtest效果展示。


## 其他
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



### 简单介绍下怎么实现一套前端水印系统

明水印的生成方式主要可以归为两类，一种是 纯 html 元素(纯div)，另一种则为背景图（canvas/svg）。

div实现的话，可以通过shadow dom来隔离和优化性能，通过mutationObserver来防止删除。

canvas的实现很简单，主要是利用canvas 绘制一个水印，然后将它转化为 base64 的图片，通过canvas.toDataURL() 来拿到文件流的 url ， 然后将获取的 url 填充在一个元素的背景中，然后我们设置背景图片的属性为重复。

一个业界比较好的明水印实现：[watermark-dom源码分析](https://github.com/FunnyLiu/watermark-dom/tree/readsource)

明水印的破解方案为：

如果没有MutationObserver，则直接删除；

如果有MutationObserver，可以先通过浏览器设置disable javascript再控制台手动delete dom;

或者复制一个 body 元素，然后将原来 body 元素的删除；

或者直接通过charles拦截将水印相关的逻辑去除。


暗水印是指一种肉眼不可见的水印方式，可以保持图片美观的同时，保护你的资源版权。通过微小的改动RGB，RGB 分量值的小量变动，是肉眼无法分辨的，不影响对图片的识别。

配合加密解密算法来完成用户的识别。

实例demo可以参考：[pageDemo/blackWater at main · FunnyLiu/pageDemo](https://github.com/FunnyLiu/pageDemo/tree/main/blackWater)





参考：

[从破解某设计网站谈前端水印(详细教程) - 前端开发博客 - OSCHINA - 中文开源技术交流社区](https://my.oschina.net/frontendblog/blog/4779797)

[不能说的秘密——前端也能玩的图片隐写术 | AlloyTeam](http://www.alloyteam.com/2016/03/image-steganography/)





### 设计一套插件系统，或者说业界的插件系统都是基于什么方案模式的？

首先了解[是否写过-plugin？简单描述一下编写-plugin-的思路？](/library/webpack.html#%E6%98%AF%E5%90%A6%E5%86%99%E8%BF%87-plugin%EF%BC%9F%E7%AE%80%E5%8D%95%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E7%BC%96%E5%86%99-plugin-%E7%9A%84%E6%80%9D%E8%B7%AF%EF%BC%9F)，和[有没有写过babel插件，是什么模式解析的？](/library/babel.html#%E6%9C%89%E6%B2%A1%E6%9C%89%E5%86%99%E8%BF%87babel%E6%8F%92%E4%BB%B6%EF%BC%8C%E6%98%AF%E4%BB%80%E4%B9%88%E6%A8%A1%E5%BC%8F%E8%A7%A3%E6%9E%90%E7%9A%84%EF%BC%9F)，[vue-use使用插件，是如何实现的？](/library/vue.html#vue-use%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6%EF%BC%8C%E6%98%AF%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84%EF%BC%9F)。

webpack的基于tapable完成一套有序的可拓展的事件系统，也就是发布订阅模式；

babel是基于访问者模式，来隔离对AST的直接遍历；

egg是基于事件完成生命周期的通知，和通过规约拿到原型注入；

vue是简单的注入原型。


---


## 微信相关

### 了解微信小程序开发么，能说一说么，和常规的Hybrid有什么区别吗

参考官方文档：[小程序简介 | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%AE%80%E4%BB%8B)

网页开发渲染线程和脚本线程是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应，而在小程序中，二者是分开的，分别运行在不同的线程中。网页开发者可以使用到各种浏览器暴露出来的 DOM API，进行 DOM 选中和操作。而如上文所述，小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。


### 简单描述下小程序的原理

1. 微信小程序采用 JavaScript、WXML、WXSS 三种技术进行开发,本质就是一个单页面应用，所有的页面渲染和事件处理，都在一个页面内进行，但又可以通过微信客户端调用原生的各种接口

2. 微信小程序的架构，是数据驱动的架构模式，它的 UI 和数据是分离的，所有的页面更新，都需要通过对数据的更改来实现

3. 小程序分为两个部分 webview和 appService 。其中 webview 主要用来展现UI ，appService 有来处理业务逻辑、数据及接口调用。它们在两个进程中运行，通过系统层 JSBridge 实现通信，实现 UI 的渲染、事件的处理

参考：

[13. 微信小程序 - 前端高频面试题 - 尚硅谷](http://www.atguigu.com/mst/html/gp/17642.html)



---


## 微前端



### 有没有了解过微前端，谈谈实现思路？

微前端本身就是**集合大多数不同技术栈的前端项目**。

做的好的有[single-spa](https://github.com/CanopyTax/single-spa)，通过**路由来激活不同的项目**，再接上**不同项目的自己的子路由系统**。但是并没有做应用隔离。

阿里出品的[qiankun](https://github.com/umijs/qiankun)，路由方面依赖了single-spa，**应用隔离**使用了jsSandbox的思想。
jsSandbox就是隔离js运行时环境，举个例子，我们可以对window创建一个全局代理：
``` js
const p = new Proxy(window,{});
```
然后让js 的执行上下文变成p:
``` js
(function(){}).bind(p);
```
这时候的p就是一个沙箱。

参考：

[网易严选企业级微前端解决方案与落地实践 - 知乎](https://zhuanlan.zhihu.com/p/97226980)



### 乾坤框架怎么实现的沙盒机制？


针对 javascript：


 qiankun 沙箱的实现里，我们会有两个环境：一个代表的是外部的部分，就是我们的全局环境 Global Env，指的是你框架应用所运行的全局环境。而子应用加载的时候，实际上是应该跑在一个内部的沙箱环境里面。

 沙箱实现思路有两条：其中最经典的实践思路其实是快照沙箱。

快照沙箱就是在应用沙箱挂载和卸载的时候记录快照，在应用切换的时候依据快照恢复环境

快照怎么打？其实也有两种思路：

一种是直接用 windows diff。把当前的环境和原来的环境做一个比较，我们跑两个循环，把两个环境作一次比较，然后去全量地恢复回原来的环境。

另一种思路其实是借助 ES6 的 proxy 就是代理。通过劫持 window ，我们可以劫持到子应用对全局环境的一些修改。当子应用往 window 上挂东西、修改东西和删除东西的时候，我们可以把这个操作记录下来。当我们恢复回外面的全局环境的时候，我们只需要反向执行之前的操作即可。比如我们在沙箱内部设了一个新的变量 window.a = 123 。那在离开的时候，我们只需要把 a 变量删了即可。

快照沙箱这个思路也正是 qiankun1.0 所使用的思路，它相对完善，但是缺点在于无法支持多个实例，也就是说我两个沙箱不可能同时激活，我不能同时挂载两个应用，不然的话这两个沙箱之间会打架，导致错误。


所以说我们把目光又投向了另一条思路，我们让子应用里面的环境和外面的环境完全隔离。就如图所示，我们的 A 应用就活在 A 应用的沙箱里面，B 应用就活在 B 应用的沙箱里面，两者之间要不发生干扰，这个沙箱的实现思路其实也是通过 ES6 的 proxy，也通过代理特性实现的。

针对css：


qiankun 所做的第一件事情其实是动态样式表。当你从子应用 A 切换到子应用 B 的时候，这个时候需要把子应用的样式表 A 的样式给删除，把子应用 B 的样式表给挂载。这样就避免了子应用 A 的样式和子应用 B 的样式同时存在于这个项目中，就做到了最基本的隔离。

来到 qiankun2.0 之后，我们追加了一个新的选项，叫作严格样式隔离，其实严格样是隔离代表 Shadow DOM。Shadow DOM 是可以真正的做到 CSS 之间完全隔离的。




参考：

[听说你还不了解微前端？[收藏=学会]](https://mp.weixin.qq.com/s/17RZjQE-UiXvu4jRHdKetA)


### 乾坤框架子应用间如何通信的？

基于URL：

其实有一种最朴素的通讯方案，就是基于 URL。前端有一种设计叫做 URL 中心设计，就是说你的 URL 完全决定了你页面展示出来是什么样子。

假如我的应用里有一个列表，有一个分页，当你点下一页的时候，是不是就产生了一个在第二页的 query 参数？你可能会把这个参数同步到路由上，这样你把这个链接分享给别人的时候，别人就能看到跟你一样的页面。

我们其实完全可以把这种路由翻译成看作是一个函数调用，比如说这里的路由 b/function-log，query 参数 data 是 aaa ，我们可以把这个路由 URL 理解为我在调用 B 应用的 log 函数，这就像一次函数调用一样。当我们从应用 A 跳去应用 B，对应路由发生变化的时候，就是触发了一次函数调用，触发了一次通信。

所以路由实际上也有通信的功能。这种通信方式是完全解耦的，但是缺点就是比较弱。

基于发布订阅：

另一种应用间通信的模型就是我们可以挂一个事件总线。应用之间不直接相互交互，我都统一去事件总线上注册事件、监听事件，通过这么一个发布订阅模型来做到应用之间的相互通信。

有趣的是，我们什么框架都不需要引入，什么第三方库都不需要引入，这里我们有一个天然的事件总线：window 的 CustomEvent 。我们可以在 window 上监听一个自定义事件，然后在任意地方派发一个自定义事件，我们可以天然的通过自定义事件来做到应用之间相互通信。


基于props：

qiankun 本身在 2.0 的时候提供了最简单的基于 props 通信的 API。

在我们提供 API 之前，就有非常多的同学来问我们应该应用和应用之间怎么通信？我们当时都没有给出具体的解决方案，给出具体的 API 或者给出具体的实践和引导。实际上在你的应用需求、复杂度不同的时候，你应该相应的自己挑选自己适合的应用间通信方案。




参考：

[听说你还不了解微前端？[收藏=学会]](https://mp.weixin.qq.com/s/17RZjQE-UiXvu4jRHdKetA)


### 路由级别的微前端有哪些难点？

包括路由的处理、应用加载的处理和应用入口的选择


#### 路由处理

在 qiankun 这里，我们就直接选用了社区成熟的方案 Single-SPA。Single-SPA 已经劫持的路由，帮我们做好了加载这件事情，也帮我们做好了路由切换这件事情，在这个方面我们就没有自己造轮子了。

首先我们来看应用路由的问题。在微前端体系结构下，路由的划分往往是如图这个样子的，这也是一种比较简单的方案。

我们主应用加载了应用 A 和应用 B。这个时候对于主应用来讲，我就有两个路由 /a/* 和 /b/* 。在路由 A 下我会加载应用 A，在另一个路由 B 下加载应用 B。

那当我在路由 /b/list 下重刷页面的时候会发生什么过程？实际上我需要先加载我的主应用，我的主应用检测到这是一个 /b/ 打头的路由，于是它知道我应该去加载应用 B，随后去加载了应用 B。到了此时应用 B 接管了路由，它发现后面的路由是 /list ，于是它显示出 /list 的正确页面，总体上就是这么一个过程。


#### 应用加载的处理

什么样的一个应用能够成为子应用，能够接入到我们的框架应用里？由于我们需要技术栈无关，所以我们希望接入是一个 协议接入。只要你的应用实现了 bootstrap 、mount 和 unmount 三个生命周期钩子，有这三个函数导出，我们的框架应用就可以知道如何加载这个子应用

这三个钩子也正好是子应用的生命周期钩子。当子应用第一次挂载的时候，我们会执行 bootstrap 做一些初始化，然后执行 mount 将它挂载。如果你是一个 React 技术栈的子应用，你可能就在 mount 里面写 ReactDOM.render ，把你的 ReactNode 挂载到真实的节点上，把应用渲染出来。当你应用切换走的时候，我们会执行 unmount 把应用卸载掉，当它再次回来的时候（典型场景：你从应用 A 跳到应用 B，过了一会儿又跳回了应用 A），这个时候我们是不需要重新执行一次所有的生命周期钩子的，我们不需要从 bootstrap 开始，我们会直接从 mount 阶段继续，这就也做到了应用的缓存。

#### 应用入口的选择

qiankun 的第一选择其实是 HTML 入口，就是提供一份 HTML 文件。因为这份 HTML 中其实包含了子应用的所有信息。它包含网页的结构，包含了一些元信息。大家可以看到在这份 HTML 里我们有 CSS、JS 链接、有应用要挂载的根路由 root 的 DOM。这些信息是非常全面的，比单纯你拿 JS 和 CSS 组成一份资源列表作为入口，要清晰和完整得多。同时 HTML Entry 这样的设计，也使得我们在接入一些老旧应用的时候，更加简单。



#### 应用的隔离与通信

#### js的隔离

qiankun 沙箱的实现里，我们会有两个环境：一个代表的是外部的部分，就是我们的全局环境 Global Env，指的是你框架应用所运行的全局环境。而子应用加载的时候，实际上是应该跑在一个内部的沙箱环境里面。

沙箱实现思路有两条：其中最经典的实践思路其实是快照沙箱。这就是说当我应用挂载了又卸载了，这个过程走了一遍之后，我当前整个 Windows 运行环境恢复成原来的样子，应用内部所做的修改，在它卸载的时候就会被恢复，这是快照沙箱思路。

快照怎么打？其实也有两种思路：

一种是直接用 windows diff。把当前的环境和原来的环境做一个比较，我们跑两个循环，把两个环境作一次比较，然后去全量地恢复回原来的环境。

另一种思路其实是借助 ES6 的 proxy 就是代理。通过劫持 window ，我们可以劫持到子应用对全局环境的一些修改。当子应用往 window 上挂东西、修改东西和删除东西的时候，我们可以把这个操作记录下来。当我们恢复回外面的全局环境的时候，我们只需要反向执行之前的操作即可。

快照沙箱这个思路也正是 qiankun1.0 所使用的思路，它相对完善，但是缺点在于无法支持多个实例，也就是说我两个沙箱不可能同时激活，我不能同时挂载两个应用，不然的话这两个沙箱之间会打架，导致错误。

所以说我们把目光又投向了另一条思路，我们让子应用里面的环境和外面的环境完全隔离。就如图所示，我们的 A 应用就活在 A 应用的沙箱里面，B 应用就活在 B 应用的沙箱里面，两者之间要不发生干扰，这个沙箱的实现思路其实也是通过 ES6 的 proxy，也通过代理特性实现的。

#### 样式隔离

最基本的是规约，类似BEM

工程化手段则是：

当前 css module 其实非常成熟一种做法，就是通过编译生成不冲突的选择器名。你只要把你想要避免冲突的应用，通过 css module （在构建工具里加一些 css 预处理器即可实现）就能很简单的做到。css module 构建打包之后，应用之间的选择器名就不同了，也就不会相互冲突了。

css-in-js 也是一种流行的方案，通过这种方式编码的样式也不会冲突，这几个方案实现起来都不复杂，而且都非常行之有效。所以绝大部分情况下，大家手动用工程化手段处理一下主子应用之间的样式冲突，就可以解决掉样式隔离的问题。

还可以shadom DOM，可是会有一些全局弹框的风险，基本还是工程化方案为主。

#### 应用通信

1、基于url

路由实际上也有通信的功能。这种通信方式是完全解耦的，但是缺点就是比较弱。

2、发布订阅

另一种应用间通信的模型就是我们可以挂一个事件总线。应用之间不直接相互交互，我都统一去事件总线上注册事件、监听事件，通过这么一个发布订阅模型来做到应用之间的相互通信。

有趣的是，我们什么框架都不需要引入，什么第三方库都不需要引入，这里我们有一个天然的事件总线：window 的 CustomEvent 。我们可以在 window 上监听一个自定义事件，然后在任意地方派发一个自定义事件，我们可以天然的通过自定义事件来做到应用之间相互通信。

3、基于prop

我们把 state 和 onGlobalStateChange （就是监听函数），还有我们的 onChange （就是 setGlobalState ）三个都传给子应用。我们基于 props 也就可以实现一个简单的主子应用之间通信。

那当我们这样子实现了主子应用之间通信之后，我们子应用与子应用之间通信怎么做？让大家都跟主应用通信就行了。子应用和子应用之间就不要再多加一条通信链路了，我们大家都基于 props 和主应用通信，这样也能解通信问题。


参考：

[听说你还不了解微前端？[收藏=学会]](https://mp.weixin.qq.com/s/17RZjQE-UiXvu4jRHdKetA)

### 同一路由下不同dom的微前端怎么解决？

1、简单方案

通过roll 语法树改造，参与原始打包和启动，方便开发

2、通过独立出来，打包为umd、在原始逻辑处注入dom

3、通过动态模块下发系统，sdk json生成html局部渲染。这个可以参考云课堂微前端解决方案文字版。

简单说下云课堂微前端解决方案文字版：

1、前端页面植入SDK。

SDK根据DOM拿到组件的key及版本。如果有版本指定，就直接从crcdn请求请求js。如果没有指定版本，就去后端接口拿到组件可以及环境标识及对应应该加载的版本号，然后回来组装js加载。

2、组件库monorepo，开发各个不同的组件，各组件基于不同的技术栈，最终打包成name_version.js文件。 通过模块组件管理平台的接口，将name_version.js文件，发布到平台内。

3、模块组件管理平台，对模块的基本管理、预览。以及不同模块在不同环境标识下当前使用的版本号进行控制，控制完成后发布，线上即使小。

通信通过全局总线


### 如何组装大型前端项目模块群

整体思路就是各个不同站点的前端工程其实就是壳，由无数个模块组成，每个模块可以独立启动和进行复用。类似在网易云课堂经历的nej module和大众的atom。

后端也是一样。


#### vue方案

针对于vue而言，可以通过vue插件的模式，将子module的内容注入到vue的原型中，不论是接口、组件还是state亦或是router。


#### react方案

暂时无解。暂时思考是umi这种从规约生成真正执行文件的框架过程中可行。在规约步骤中去完成注入，最后生成工程代码。


#### egg方案

针对egg而言，需要定义一套自己的loader，来实现对其ctx的写入和修改。


#### nest方案

nest天然支持了module，所以相对会简单，后端暴露独立的module，进行组装即可。