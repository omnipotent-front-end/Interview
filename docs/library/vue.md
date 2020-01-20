# Vue

## 应用

### 为什么子组件不能修改父组件传入的props？

首先从设计原则上来说，为了**保证数据的单向流动**，便于对数据进行追踪，避免数据混乱。

其次从代码实现上来说，**每当父组件属性值修改时，该值都将被覆盖**。

至于Vue如何限制并警告，就是通过Object.defineProperty这个API来拦截该属性的修改。

参考地址：

[一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/60)

### 为什么Vuex的mutation和Redux的reducer只能用纯函数而不能用异步的？

**异步操作是成功还是失败不可预测，什么时候进行异步操作也不可预测**；当异步操作成功或失败时，如果不 commit(mutation) 或者 dispatch(action)，Vuex 和 Redux 就不能捕获到异步的结果从而进行相应的操作。

要在reducer中加入异步的操作，如果你只是单纯想执行异步操作，不会等待异步的返回，那么在reducer中执行的意义是什么。如果想把异步操作的结果反应在state中，首先整个应用的状态将变的不可预测，违背Redux的设计原则。

参考地址：

[一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65)

### 父子组件间生命周期执行顺序是怎么样的？

加载渲染过程
**父beforeCreate->父created->父beforeMount->子beforeCreate->子created**->子beforeMount->**子mounted->父mounted**

子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated

父组件更新过程
父beforeUpdate->父updated

销毁过程
父beforeDestroy->子beforeDestroy->**子destroyed->父destroyed**

### Vue.nextTick()有什么用？使用场景是？如何实现的？

官方文档的解释是：**为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。**

所以说在这么几个场景下，要用到：

- 在Vue生命周期的**created()钩子函数进行的DOM操作**一定要放在Vue.nextTick()的回调函数中
- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。

至于nextTick是如何实现的？首先需要理解[js的任务队列机制](/language/javascript.html#任务队列机制)，每一次执行的主线程，就是一个tick。

在Vue中，nextTick中声明了microTimerFunc 和 macroTimerFunc 2 个变量，它们分别对应的是 micro task 的函数和 macro task 的函数。**对于 macro task 的实现，优先检测是否支持原生 setImmediate，这是一个高版本 IE 和 Edge 才支持的特性，不支持的话再去检测是否支持原生的 MessageChannel，如果也不支持的话就会降级为 setTimeout 0**；而**对于 micro task 的实现，则检测浏览器是否原生支持 Promise，不支持的话直接指向 macro task 的实现**。

nextTick函数的逻辑，就是将传入的回调函数 cb 压入 callbacks 数组，最后一次性地根据 useMacroTask 条件执行 macroTimerFunc 或者是 microTimerFunc，**useMacroTask条件的判断依据就是传入的回调函数中是否有操作state的行为，如果有就认为ture**。


[参考](https://ustbhuangyi.github.io/vue-analysis/reactive/next-tick.html#vue-%E7%9A%84%E5%AE%9E%E7%8E%B0)


### computed 和 watch 有什么区别及运用场景?

区别

computed 计算属性 : 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。

watch 侦听器 : 更多的是「观察」的作用,**无缓存性**,类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作。

运用场景：

当我们需要进行数值计算,并且**依赖于其它数据**时,应该使用 computed,因为可以利用 computed 的缓存特性,**避免每次获取值时,都要重新计算**。

当我们需要**在数据变化时执行异步或开销较大的操作时,应该使用 watch**,使用  watch  选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率,并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。


## 原理

### Vue框架本身的生命周期是什么样子的？

一张图总结：

![](https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200103155422.png)


首先是[Vue的初始化](https://github.com/FunnyLiu/vue/tree/readsource#%E7%BB%84%E4%BB%B6%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)，在其生命周期过程中，对[数据进行监听](https://github.com/FunnyLiu/vue/tree/readsource#%E6%95%B0%E6%8D%AE%E8%A7%82%E5%AF%9F)，对[模板进行编译](https://github.com/FunnyLiu/vue/tree/readsource#%E6%A8%A1%E6%9D%BF%E7%9A%84%E7%BC%96%E8%AF%91%E8%BF%87%E7%A8%8B)生成给render函数的字符串。通过render函数，进入patch阶段，进行[VNode的diff](https://github.com/FunnyLiu/vue/tree/readsource#vnode%E7%9A%84%E6%9B%B4%E6%96%B0%E6%B5%81%E7%A8%8B)以及生成真正的dom进行挂载。


### virtual DOM有什么用？

我们知道，Vue是数据驱动视图的，数据发生变化视图就要随之更新，在更新视图的时候难免要操作DOM,而操作真实DOM又是非常耗费性能的，这是因为浏览器的标准就把 DOM 设计的非常复杂，所以一个真正的 DOM 元素是非常庞大的。

我们可以用JS模拟出一个DOM节点，称之为虚拟DOM节点。当数据发生变化时，我们对比变化前后的虚拟DOM节点，通过DOM-Diff算法计算出需要更新的地方，然后去更新需要更新的视图。

这就是虚拟DOM产生的原因以及最大的用途。


### Vue2.x中的virtual DOM到底是什么？如何实现的？

Vue的virtual DOM参考了开源库[snabbdom](https://github.com/snabbdom/snabbdom)的实现。

#### VNode的定义

在vue中，vitrual dom是通过VNode这个class去描述的：[VNode Class](https://github.com/vuejs/vue/blob/v2.6.10/src/core/vdom/vnode.js)

VNode 是对真实 DOM 的一种抽象描述，它的核心定义无非就几个关键属性，标签名、数据、子节点、键值等，其它属性都是都是用来扩展 VNode 的灵活性以及实现一些特殊 feature 的。

由于 VNode 只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法，因此它是**非常轻量和简单的**。

Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程。那么在 Vue.js 中，VNode 的 create 是通过createElement 方法创建的，我们接下来分析这部分的实现。

#### VNode的创建

Vue.js 利用 createElement 方法创建 VNode，它定义在 [src/core/vdom/create-elemenet.js](https://github.com/vuejs/vue/blob/v2.6.10/src/core/vdom/create-element.js) 中。

每个 VNode 有 children，children 每个元素也是一个 VNode，这样就形成了一个 VNode Tree，它很好的描述了我们的 DOM Tree。

回到 mountComponent 函数的过程，我们已经知道 vm._render 是如何创建了一个 VNode，接下来就是要**把这个 VNode 渲染成一个真实的 DOM 并渲染出来**。

#### VNode的渲染更新

Vue 的 _update 是实例的一个私有方法，它被调用的时机有 2 个，一个是首次渲染，一个是数据更新的时候；**_update 方法的作用是把 VNode 渲染成真实的 DOM**，它的定义在 [src/core/instance/lifecycle.js](https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/lifecycle.js#L59) 中。

其实就是**调用原生 DOM 的 API 进行 DOM 操作**。

在 createElm 过程中，如果 vnode 节点不包含 tag，则它有可能是一个注释或者纯文本节点，可以直接插入到父元素中。

再回到 patch 方法，首次渲染我们调用了 createElm 方法，这里传入的 parentElm 是 oldVnode.elm 的父元素。

实际上**整个过程就是递归创建了一个完整的 DOM 树并插入到 Body 上**。
最后，我们根据之前递归 createElm 生成的 vnode 插入顺序队列，执行相关的 insert 钩子函数

---

### Vue中的key有什么用？为什么会优化diff算法的速度？

首先我们要明白key的作用是什么：

**key是给每一个vnode的唯一id,可以依靠key,更准确, 更快的拿到oldVnode中对应的vnode节点。**

接下来看看Vue的diff算法。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710144357.png"/>

组件更新的过程**核心就是新旧 vnode diff**，对新旧节点相同以及不同的情况分别做不同的处理。

**新旧节点不同**的更新流程是**创建新节点->更新父占位符节点->删除旧节点**；而**新旧节点相同**的更新流程是去获取它们的 children，根据不同情况做不同的更新逻辑。最复杂的情况是新旧节点相同且它们都存在子节点，那么会执行 updateChildren 逻辑。updateChildren的逻辑在[vdom/patch.js](https://github.com/vuejs/vue/blob/v2.6.10/src/core/vdom/patch.js#L404)。

我们看看updateChildren具体的示例：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710144727.png"/>

oldCh和newCh各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，**如果设置了key，就会用key进行比较**，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明oldCh和newCh至少有一个已经遍历完了，就会结束比较。

**这里就是设置key的关键了，不设key，newCh和oldCh只会进行头尾两端的相互比较，设key后，除了头尾两端的比较外，还会从用key生成的对象oldKeyToIdx中查找匹配的节点，所以为节点设置key可以更高效的利用dom。**

首先看看**不带key的情况**：

第一步，oldCh和newCh的起点和终点都不相同，故而newCh的第一个被放到oldCh的前面，然后newStartIndex后移一位。
<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710151322.png"/>
第二步，发现newStartIndex和oldStartIndex一样，故而A保持不变位置，oldStartIndex和newStartIndex均后移一位。
<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710151347.png"/>
第三步，发现oldEndIndex和newStartIndex一样，故而将oldCh的D直接移动到A后面，然后oldStartIndex和newStartIndex均后移一位，oldEndIndex向前移动一位。
<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710151412.png"/>
第四步，发现oldEndIndex和newStartIndex一样，故而将oldCh的C直接移动到D后面，然后oldStartIndex和newStartIndex均后移一位，oldEndIndex向前移动一位。
<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710151849.png"/>
第五步，oldCh和newCh的起点和终点都不相同，故而newCh的F被放到了oldCh的C后面。
<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710152025.png"/>
第六步，newStartIndex已经超过了newEndIndex，说明oldCh存在多余节点，将其后面的删除即可。
<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710152201.png"/>

再来看看**带有key的情况**：

第一步，oldCh和newCh的起点和终点都不相同，但newStartIndex通过key找到了oldCh里的B，故而newCh的第一个被放到oldCh的前面，然后newStartIndex后移一位，并将oldCh中的B进行删除。
<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710152519.png"/>

第二步和原来一致
<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710152711.png"/>

后面都和原来一致了。

这样就可以**通过key来有效的缩短更新所需要花费的耗时**。

### Vue.use使用插件，是如何实现的？

首先插件是需要提供一个install方法的，而`Vue.use`在调用的时候就会去执行其install方法，也会把Vue原型提供进去供插件使用。其核心代码在[src/core/global-api/use.js](https://github.com/vuejs/vue/blob/v2.6.10/src/core/global-api/use.js#L6):

``` js
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
```

Vue.use 接受一个 plugin 参数，并且维护了一个 _installedPlugins 数组，它存储所有注册过的 plugin；接着又会判断 plugin 有没有定义 install 方法，如果有的话则调用该方法，并且该方法执行的第一个参数是 Vue；最后把 plugin 存储到 installedPlugins 中。

可以看到 Vue 提供的插件注册机制很简单，每个插件都需要实现一个静态的 install 方法，当我们执行 Vue.use 注册插件的时候，就会执行这个 install 方法，并且在这个 install 方法的第一个参数我们可以拿到 Vue 对象，这样的好处就是作为插件的编写方不需要再额外去import Vue 了。

### Vue中的数据响应式如何实现的？

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200116113829.png"/>

通过Observer，对需要的object，通过defineProperty递归的建立可观察对象；对需要的数组，通过array.js提供的方法对数组原型进行hack复写，并植入观察逻辑。

Dep用来负责依赖的收集。

watcher 中实例化了 dep 并向 dep.subs 中添加了订阅者,dep 通过 notify 遍历了 dep.subs 通知每个 watcher 更新。


参考[源码解读](https://github.com/FunnyLiu/vue/tree/readsource#%E6%95%B0%E6%8D%AE%E8%A7%82%E5%AF%9F)。


### Vue的响应式用Proxy和Object.defineProperty有什么区别？

Object.defineProperty有如下缺陷：

- 无法监听数组变化，vue之所以可以监听部分数组变化，是hack过去的。
- 只能劫持对象的属性，因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历

而Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。

这也是为什么Vue3会基于Proxy的原因。

如果要自己实现，可以参考：[基于object-defineproperty实现双向绑定](/language/javascript.html#%E5%9F%BA%E4%BA%8Eobject-defineproperty%E5%AE%9E%E7%8E%B0%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A)和[基于proxy实现双向绑定](/language/javascript.html#%E5%9F%BA%E4%BA%8Eproxy%E5%AE%9E%E7%8E%B0%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A)。

### 为什么Vue的模板必须要有一个根元素？

这个问题可以参考[github上尤雨溪自己的回答](https://github.com/vuejs/vue/issues/7088#issuecomment-348252040)。
也就是现有diff算法的限制导致的。而React在16.2推出的[React v16.2.0: Improved Support for Fragments – React Blog](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html)，其实是在重写diff算法的同时进行了支持。

至于Vue的diff算法具体逻辑，可以参考[vue中的key有什么用？为什么会优化diff算法的速度？](/library/vue.html#vue%E4%B8%AD%E7%9A%84key%E6%9C%89%E4%BB%80%E4%B9%88%E7%94%A8%EF%BC%9F%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E4%BC%98%E5%8C%96diff%E7%AE%97%E6%B3%95%E7%9A%84%E9%80%9F%E5%BA%A6%EF%BC%9F)

### Vue是如何实现事件系统的？

Vue中的事件有Dom事件和Vue事件（自定义事件）两种，所以可将事件的绑定总结为一下几种类型：

- 类型一：在模板中通过v-on指令绑定的Dom事件
- 类型二：在模板中通过v-on指令绑定的自定义事件
- 类型三：在vue options中通过events绑定的自定义事件
- 类型四：通过$on方法绑定的自定义事件

Vue中为DOM元素绑定事件是采用DOM2级事件的处理方式，也就是addEventListener，因为Vue服务的是IE9以上的现代浏览器，他们也都是支持DOM2级事件。

而自定义事件是为组件间通信设计，自定义事件提供了 $on、$off、$once、$emit、$broadcast、$dispatch 几个 api，非常简洁。[实现源码在此](https://github.com/FunnyLiu/vue/blob/readsource/src/core/instance/events.js#L2)

首先提两个vm的私有变量，**vm._events 和 vm._eventCount**。**每个vm实例所有的自定义事件都将存储在 vm._events，而 vm._eventsCount 存储的是执行事件广播后子组件触发自定义事件处理程序的数量**，这是为了事件广播优化而来的，如果 vm._eventsCount[event] 数量为零，当事件广播时则可断定子组件没有该事件的监听器，就没必要向子组件层层捕获该事件监听器了。




参考：

[Vue源码解读-方法与事件绑定 | 滴滴商业FED](https://defed.github.io/Vue%E6%BA%90%E7%A0%81%E8%A7%A3%E8%AF%BB-%E6%96%B9%E6%B3%95%E4%B8%8E%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A/)

[Vue 的事件系统 - 前端 - 掘金](https://juejin.im/entry/577ce6b88ac2470061c2fcce)


---


### Vue中的keep-alive是怎么实现的？越具体越好。

首先看下使用方法：

``` html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

include定义缓存白名单，keep-alive会缓存命中的组件；exclude定义缓存黑名单，被命中的组件将不会被缓存；max定义缓存组件上限，超出上限使用**LRU的策略**置换缓存数据。


简单的说，就是切换组件时不销毁它，而是**将其缓存至内存**中；等切回来时再将其激活，不再走原来的生命周期了。

其原理就是：被包含在 keep-alive 中创建的组件，会增加额外的vnode属性和逻辑如[keepalive](https://github.com/FunnyLiu/vue/blob/readsource/src/core/components/keep-alive.js#L133 )，而在vue框架生命周期的[patch阶段，对其做了处理](https://github.com/FunnyLiu/vue/blob/readsource/src/core/vdom/patch.js#L215)。

查看patch.js逻辑。在首次加载被包裹组件时，由`keep-alive.js`中的render函数可知，`vnode.componentInstance`的值是undefined，keepAlive的值是true，因为keep-alive组件作为父组件，它的render函数会先于被包裹组件执行。所以逻辑断掉了。

再次访问被包裹组件时，`vnode.componentInstance`的值就是已经缓存的组件实例，那么会执行`insert(parentElm, vnode.elm, refElm)`逻辑，这样就直接把上一次的DOM插入到了父元素中。

参考：

[彻底揭秘keep-alive原理 - 掘金](https://juejin.im/post/5cce49036fb9a031eb58a8f9)
