# Vue

## 应用

### 为什么子组件不能修改父组件传入的props？

首先从设计原则上来说，为了**保证数据的单向流动**，便于对数据进行追踪，避免数据混乱。

其次从代码实现上来说，**每当父组件属性值修改时，该值都将被覆盖**。

至于Vue如何限制并警告，就是通过Object.defineProperty这个API来拦截该属性的修改。

> 需要特别注意的是，当你从子组件修改的prop属于基础类型时会触发提示。 这种情况下，你是无法修改父组件的数据源的， 因为基础类型赋值时是值拷贝。你直接将另一个非基础类型（Object, array）赋值到此key时也会触发提示(但实际上不会影响父组件的数据源)， 当你修改object的属性时不会触发提示，并且会修改父组件数据源的数据。

参考地址：

[一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/60)

### 为什么Vuex的mutation和Redux的reducer只能用纯函数而不能用异步的？

**异步操作是成功还是失败不可预测，什么时候进行异步操作也不可预测**；当异步操作成功或失败时，如果不 commit(mutation) 或者 dispatch(action)，Vuex 和 Redux 就不能捕获到异步的结果从而进行相应的操作。

要在reducer中加入异步的操作，如果你只是单纯想执行异步操作，不会等待异步的返回，那么在reducer中执行的意义是什么。如果想把异步操作的结果反应在state中，首先整个应用的状态将变的不可预测，违背Redux的设计原则。

参考地址：

[一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65)


### Vue的完整生命周期

Vue 一共有 8 个生命阶段，分别是创建前、创建后、加载前、加载后、更新前、更新后、销毁 前和销毁后，每个阶段对应了一个生命周期的钩子函数。

(1)beforeCreate 钩子函数，在实例初始化之后，在数据监听和事件配置之前触发。因此在 这个事件中我们是获取不到 data 数据的。

(2)created 钩子函数，在实例创建完成后触发，此时可以访问 data、methods 等属性。但 这个时候组件还没有被挂载到页面中去，所以这个时候访问不到 $el 属性。一般我们可以在这 个函数中进行一些页面初始化的工作，比如通过 ajax 请求数据来对页面进行初始化。

(3)beforeMount 钩子函数，在组件被挂载到页面之前触发。在 beforeMount 之前，会找 到对应的 template，并编译成 render 函数。

(4)mounted 钩子函数，在组件挂载到页面之后触发。此时可以通过 DOM API 获取到页面中 的 DOM 元素。

(5)beforeUpdate 钩子函数，在响应式数据更新时触发，发生在虚拟 DOM 重新渲染和打补 丁之前，这个时候我们可以对可能会被移除的元素做一些操作，比如移除事件监听器。

(6)updated 钩子函数，虚拟 DOM 重新渲染和打补丁之后调用。

(7)beforeDestroy 钩子函数，在实例销毁之前调用。一般在这一步我们可以销毁定时器、 解绑全局事件等。

(8)destroyed 钩子函数，在实例销毁之后调用，调用后，Vue 实例中的所有东西都会解除 绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

当我们使用 keep-alive 的时候，还有两个钩子函数，分别是 activated 和 deactivated 。 用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

> 需要修改能重新render的数据后才会触发update相关生命周期，其他数据不会触发。

参考：

[vue 生命周期深入 - 前端](https://juejin.cn/entry/6844903602356502542)



### 父子组件间生命周期执行顺序是怎么样的？

加载渲染过程
**父beforeCreate->父created->父beforeMount->子beforeCreate->子created**->子beforeMount->**子mounted->父mounted**

子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated

父组件更新过程
父beforeUpdate->父updated

销毁过程
父beforeDestroy->子beforeDestroy->**子destroyed->父destroyed**


### vue 在 created 和 mounted 这两个生命周期中请求数据有什么区别呢？

看实际情况，一般在created（或beforeRouter） 里面就可以，如果涉及到需要页面加载完成之后的话就用mounted。

在created 的时候，视图中的 html 并没有渲染出来，所以此时如果直接去操作 html 的dom节点，一定找不到相关的元素

而在mounted 中，由于此时html 已经渲染出来了，所以可以直接操作 dom 节点，（此时document.getElementById 即可生效了）。




### Vue.nextTick()有什么用？使用场景是？如何实现的？

官方文档的解释是：**为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。**

所以说在这么几个场景下，要用到：

- 在Vue生命周期的**created()钩子函数进行的DOM操作**一定要放在Vue.nextTick()的回调函数中
- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。

至于nextTick是如何实现的？首先需要理解[js的任务队列机制](/language/javascript.html#任务队列机制)，每一次执行的主线程，就是一个tick。

在Vue中，nextTick中声明了microTimerFunc 和 macroTimerFunc 2 个变量，它们分别对应的是 micro task 的函数和 macro task 的函数。**对于 macro task 的实现，优先检测是否支持原生 setImmediate，这是一个高版本 IE 和 Edge 才支持的特性，不支持的话再去检测是否支持原生的 MessageChannel，如果也不支持的话就会降级为 setTimeout 0**；而**对于 micro task 的实现，则检测浏览器是否原生支持 Promise，不支持的话直接指向 macro task 的实现**。

nextTick函数的逻辑，就是将传入的回调函数 cb 压入 callbacks 数组，最后一次性地根据 useMacroTask 条件执行 macroTimerFunc 或者是 microTimerFunc，**useMacroTask条件的判断依据就是传入的回调函数中是否有操作state的行为，如果有就认为ture**。


具体源码位于[笔记内容](https://github.com/FunnyLiu/vue/blob/readsource/src/core/util/next-tick.js#L78)

[参考](https://ustbhuangyi.github.io/vue-analysis/reactive/next-tick.html#vue-%E7%9A%84%E5%AE%9E%E7%8E%B0)

[参考](https://juejin.cn/post/6875492931726376974#comment)


### computed 和 watch 有什么区别及运用场景?

区别

computed 计算属性 : 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。computed不能进行异步操作。

watch 侦听器 : 更多的是「观察」的作用,**无缓存性**,类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作。watch可以进行异步操作。

运用场景：

当我们需要进行数值计算,并且**依赖于其它数据**时,应该使用 computed,因为可以利用 computed 的缓存特性,**避免每次获取值时,都要重新计算**。

当我们需要**在数据变化时执行异步或开销较大的操作时,应该使用 watch**,使用  watch  选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率,并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。

参考：

[做面试的不倒翁：浅谈 Vue 中 computed 实现原理](https://juejin.cn/post/6844903678533451783)

[深入理解Vue的watch实现原理及其实现方式](https://juejin.cn/post/6844903605485436941)



### vue2怎么深度监听对象变化

watch的deep属性设为true即可。

``` js
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
  }
```


### v-model是什么？有什么用？

一则语法糖，相当于 v-bind:value="xxx" 和 @input，意思是绑定了一个 value 属性的值，子组件可对value 属性监听，通过$emit('input', xxx)的方式给父组件通讯。自己实现model 方式的组件也是这样的思路。




### vue2组件通信方式

#### 父子组件之间：

- props和$emit

父组件通过v-bind绑定数据，子组件通过props接收父组件传过来的数据，利用$emit触发指定事件，父组件通过$on监听子组件触发的对应事件

- v-model

本质是v-bind和v-on的语法糖，在一个组件上使用v-model，默认会为组件绑定名为value的属性和名为input的事件

- .sync

.sync修饰符它的本质和v-model类似，它的本质也是v-bind和v-on的语法糖


- $parent、$children和ref

直接得到组件实例，可以实现父子组件、兄弟组件、跨级组件等数据通信


#### 跨级组件通信

- $attrs

将父组件直接传递给孙组件

- inheritAttrs

默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。

- $listeners

上面讲了$attrs是为了跨组件传递数据，那如果想通过孙子组件来给父组件传递数据呢？之前的做法也是一层一层的向上传递，比如用$emit方法，但是子组件如果用不到，只是想改变父组件的数据，这时候我们就可以使用$listeners。

- provide和inject

允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件嵌套的层次有多深，并在起上下游关系成立的时间里始终有效。一言以蔽之：祖先组件中通过provider来提供变量，然后在子孙组件中通过inject来注入变量。

- 通过中央事件总线（Event Bus）

- 全局状态管理vuex



### vue中常用的修饰符

.prevent: 提交事件不再重载页面;

.stop: 阻止单击事件冒泡;

.self: 当事件发生在该元 素本身而不是子元素的时候会触发;

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210914093208.png"/>


### vue中常用的内部指令

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210914093249.png"/>


### v-if和v-show区别？

1.v-if是通过控制dom元素的删除和生成来实现显隐，每一次显隐都会使组件重新跑一遍生命周期，因为显隐决定了组件的生成和销毁

2.v-show是通过控制dom元素的css样式来实现显隐，不会销毁

3.频繁或者大数量显隐使用v-show，否则使用v-if

参考：

[熬夜总结50个Vue知识点，全都会你就是神！！！](https://mp.weixin.qq.com/s/h2H-36iVeoyXsorZChwxyQ)

### vue 中 mixin 和 mixins 区别?
 
mixin 用于全局混入，会影响到每个组件实例。

mixins 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以 将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。另外需 要注意的是 mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时 候也会有选择性的进行合并

参考：

[混入 — Vue.js](https://cn.vuejs.org/v2/guide/mixins.html)


### vue-router 中的导航钩子函数
 
(1)全局的钩子函数 beforeEach 和 afterEach。beforeEach 有三个参数，to 代表要进入的路由对象，from 代表离开的路由对象。next 是一 个必须要执行的函数，如果不传参数，那就执行下一个钩子函数，如果传入 false，则终止跳 转，如果传入一个路径，则导航到对应的路由，如果传入 error ，则导航终止，error 传入错 误的监听函数。

(2)单个路由独享的钩子函数 beforeEnter，它是在路由配置上直接进行定义的。 

(3)组件内的导航钩子主要有这三种:beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。它们是直接在路由组件内部直接进行定义的。

### $route和$router的区别？

$route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。而 $router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。



参考：

[导航守卫 | Vue Router](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)




### 用 Vue 的时候有没有遇到过难以解决的问题？（todo）


- slot事件监听

- 组件库无法高阶组件套用，从而达到修改模板的目的

- vue中透传参数，需要一个个在模板中传递，或者$attrs全部透传；而React则可以通过扩展运算符来解决

- vue中动态组件需要提前在使用的组件内注册，而React则可以通过动态import直接引入，提高加载性能


### 怎么让弹框了再加载相应代码

下面PublicForm的引入方式会单独构建成一个js文件，模板中通过v-if来动态载入。PickPublicModal会和当前组件打包在一起。

```js
/*组件*/
import PickPublicModal from '@/components/common/pick-public-modal.vue';
export default {
  components: {
    PublicForm: () => import('@/components/public-assets/public/public-form/new-form'),
    PickPublicModal,
  },
}
```

### 不需要响应式的数据怎么处理？

在我们的Vue开发中，会有一些数据，从始至终都未曾改变过，这种死数据，既然不改变，那也就不需要对他做响应式处理了，不然只会做一些无用功消耗性能，比如一些写死的下拉框，写死的表格数据，这些数据量大的死数据，如果都进行响应式处理，那会消耗大量性能。

``` js

// 方法一：将数据定义在data之外
data () {
    this.list1 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    this.list2 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    this.list3 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    this.list4 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    this.list5 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    return {}
 }
    
// 方法二：Object.freeze()
data () {
    return {
        list1: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
        list2: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
        list3: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
        list4: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
        list5: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
    }
 }
```

参考：

[熬夜总结50个Vue知识点，全都会你就是神！！！](https://mp.weixin.qq.com/s/h2H-36iVeoyXsorZChwxyQ)


### 对象新属性无法更新视图，删除属性无法更新视图，为什么？怎么办？

原因：Object.defineProperty没有对对象的新属性进行属性劫持

对象新属性无法更新视图：使用Vue.$set(obj, key, value)，组件中this.$set(obj, key, value)

删除属性无法更新视图：使用Vue.$delete(obj, key)，组件中this.$delete(obj, key)

参考：

[熬夜总结50个Vue知识点，全都会你就是神！！！](https://mp.weixin.qq.com/s/h2H-36iVeoyXsorZChwxyQ)


### prop怎么自定义校验？

``` js
props: {
    num: {
      default: 1,
      validator: function (value) {
          // 返回值为true则验证不通过，报错
          return [
            1, 2, 3, 4, 5
          ].indexOf(value) !== -1
    }
    }
  }
```



## 原理

### Vue框架本身的生命周期是什么样子的？

一张图总结：

![](https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200103155422.png)


首先是[Vue的初始化](https://github.com/FunnyLiu/vue/tree/readsource#%E7%BB%84%E4%BB%B6%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)，在其生命周期过程中，对[数据进行监听](https://github.com/FunnyLiu/vue/tree/readsource#%E6%95%B0%E6%8D%AE%E8%A7%82%E5%AF%9F)，对[模板进行编译](https://github.com/FunnyLiu/vue/tree/readsource#%E6%A8%A1%E6%9D%BF%E7%9A%84%E7%BC%96%E8%AF%91%E8%BF%87%E7%A8%8B)生成给render函数的字符串。通过render函数，进入patch阶段，进行[VNode的diff](https://github.com/FunnyLiu/vue/tree/readsource#vnode%E7%9A%84%E6%9B%B4%E6%96%B0%E6%B5%81%E7%A8%8B)以及生成真正的dom进行挂载。


### new Vue 发生了什么？

Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。具体源码位于[笔记内容](https://github.com/FunnyLiu/vue/blob/readsource/src/core/instance/init.js#L54)

参考：

[new Vue 发生了什么 | Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/data-driven/new-vue.html#%E6%80%BB%E7%BB%93)




### virtual DOM有什么用？

我们知道，Vue是数据驱动视图的，数据发生变化视图就要随之更新，在更新视图的时候难免要操作DOM,而操作真实DOM又是非常耗费性能的，这是因为浏览器的标准就把 DOM 设计的非常复杂，所以一个真正的 DOM 元素是非常庞大的。

我们可以用JS模拟出一个DOM节点，称之为虚拟DOM节点。当数据发生变化时，我们对比变化前后的虚拟DOM节点，通过DOM-Diff算法计算出需要更新的地方，然后去更新需要更新的视图。

这就是虚拟DOM产生的原因以及最大的用途。

我认为 Virtual DOM 这种方法对于我们需要有大量的 DOM 操作的时候，能够很好的提高我们 的操作效率，通过在操作前确定需要做的最小修改，尽可能的减少 DOM 操作带来的重流和重绘 的影响。其实 Virtual DOM 并不一定比我们真实的操作 DOM 要快，这种方法的目的是为了提 高我们开发时的可维护性，在任意的情况下，都能保证一个尽量小的性能消耗去进行操作。

参考文档：

[理解 Virtual DOM · Issue #5 · y8n/blog](https://github.com/y8n/blog/issues/5)


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


### 自己如何实现一个简单的virtual Dom系统？

参考[million](https://github.com/FunnyLiu/million/tree/readsource)的实现。一个极简的virtual dom库。

#### 基本工作流程

提供3个方法m、createElement和patch。

m用来创建虚拟dom，createElement用来将虚拟dom变为现实dom，patch用来比较和diff老的和新的两个虚拟dom并返回改变后的虚拟dom。

从下面一个例子可以看出3个函数分别在做什么？

``` js
import { m, createElement, patch } from 'https://unpkg.com/million?module';

let clicks = 0;
const app = createElement(
  m(
    'button',
    {
      id: 'app',
      onclick: () => {
        patch(app, m('button', { id: 'app' }, [String(++clicks)]));
      },
    },
    [String(clicks)],
  ),
);
document.body.appendChild(app);
```

#### 创建虚拟dom

m函数位于[笔记内容](https://github.com/FunnyLiu/million/blob/readsource/src/m.ts#L53)

三个参数，标签、属性对象、子dom


主要实现如下

``` js
export const m = (tag: string, props?: VProps, children?: VNode[], flag?: VFlags): VElement => {
  let key;
  if (props?.key) {
    key = <string | undefined>props.key;
    delete props.key;
  }
  return {
    tag,
    props,
    children,
    key,
    flag,
  };
};
```

就是返回了一个对象而已

#### 将虚拟dom转为真实dom

createElement实现[笔记内容](https://github.com/FunnyLiu/million/blob/readsource/src/createElement.ts#L9)

创建dom、属性、递归子dom

``` js
export const createElement = (vnode: VNode, attachField = true): HTMLElement | Text => {
  if (typeof vnode === 'string') return document.createTextNode(vnode);
  //创建dom
  const el = document.createElement(vnode.tag);
  //赋予dom属性
  if (vnode.props) {
    for (const name of Object.keys(vnode.props)) {
      el[name] = vnode.props[name];
    }
  }
  //如果有子节点则递归创建子dom
  if (vnode.children) {
    for (let i = 0; i < vnode.children.length; i++) {
      el.appendChild(createElement(vnode.children[i]));
    }
  }

  if (attachField) el[OLD_VNODE_FIELD] = vnode;

  return el;
};

```


#### diff新老虚拟dom

patch实现在此：[笔记内容](https://github.com/FunnyLiu/million/blob/readsource/src/patch.ts#L74)

实现流程如下：

判断key不一致才diff，如果tag不同则直接替换。

如果rag相同，就挨个排查prop。

对于children则递归再patch来diff

``` js
export const patch = (
  el: HTMLElement | Text,
  newVNode: VNode,
  prevVNode?: VNode,
): HTMLElement | Text => {
  //没有新dom则直接移除老dom
  if (!newVNode) {
    // 删除当前dom本身
    // [Element.remove() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove)
    el.remove();
    return el;
  }

  const oldVNode: VNode | undefined = prevVNode ?? el[OLD_VNODE_FIELD];
  const hasString = typeof oldVNode === 'string' || typeof newVNode === 'string';
  //如果是字符串类型，直接替换
  if (hasString && oldVNode !== newVNode) return replaceElementWithVNode(el, newVNode);
  if (!hasString) {
    if (
      (!(<VElement>oldVNode)?.key && !(<VElement>newVNode)?.key) ||
      (<VElement>oldVNode)?.key !== (<VElement>newVNode)?.key
    ) {
      //都有key且key不同才进行diff

      /* istanbul ignore if */
      if (
        (<VElement>oldVNode)?.tag !== (<VElement>newVNode)?.tag &&
        !(<VElement>newVNode).children &&
        !(<VElement>newVNode).props
      ) {
        //如果标签不同，直接全部替换
        // newVNode has no props/children is replaced because it is generally
        // faster to create a empty HTMLElement rather than iteratively/recursively
        // remove props/children
        return replaceElementWithVNode(el, newVNode);
      }
      //如果标签相同，则替换属性
      if (oldVNode && !(el instanceof Text)) {
        patchProps(el, (<VElement>oldVNode).props || {}, (<VElement>newVNode).props || {});

        /* istanbul ignore next */
        switch (<VFlags>(<VElement>newVNode).flag) {
          case VFlags.NO_CHILDREN:
            el.textContent = '';
            break;
          case VFlags.ONLY_TEXT_CHILDREN:
            el.textContent = <string>(<VElement>newVNode).children!.join('');
            break;
          default:
            //再替换子dom
            //本质还是递归patch
            patchChildren(el, (<VElement>oldVNode).children, (<VElement>newVNode).children!);
            break;
        }
      }
    }
  }

  if (!prevVNode) el[OLD_VNODE_FIELD] = newVNode;

  return el;
};
```




### Vue模板的编译过程介绍下？

参考[笔记内容](https://github.com/FunnyLiu/vue/blob/readsource/src/compiler/index.js#L24)


<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200113110026.png"/>

编译compiler(src/compiler/index.js) 分为三个阶段：

1.模板解析阶段(src/compiler/parser/index.js)：将一堆模板字符串用正则等方式解析成抽象语法树AST；

2.优化阶段(src/compiler/optimizer.js)：遍历AST，找出其中的静态节点，并打上标记；方便Patch阶段的diff算法直接跳过静态节点；

3.代码生成阶段(src/compiler/codegen/index.js)：将AST转换成渲染函数；直接生成render函数需要的函数字符串

核心实现：


``` js
//模板编译器的入口文件
//总体流程为：
//将一堆字符串模板解析成抽象语法树AST后，我们就可以对其进行各种操作处理了，
//处理完后用处理后的AST来生成render函数。其具体流程可大致分为三个阶段：
//1.模板解析阶段：将一堆模板字符串用正则等方式解析成抽象语法树AST；
//2.优化阶段：遍历AST，找出其中的静态节点，并打上标记；
//3.代码生成阶段：将AST转换成渲染函数；
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  //1.模板解析阶段
  //通过解析html、text、过滤器等等，拿到了AST
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    //2.优化阶段
    //针对静态节点：有一种节点一旦首次渲染上了之后不管状态再怎么变化它都不会变了，这种节点叫做静态节点
    //为了提高虚拟DOM中patch过程的性能。
    //在优化阶段将所有静态节点都打上标记，这样在patch过程中就可以跳过对比这些节点。
    //进行优化
    optimize(ast, options)
  }
  //3.代码生成阶段
  //最终生成的内容是render函数字符串
  //所谓代码生成其实就是根据模板对应的抽象语法树AST生成一个函数，通过调用这个函数就可以得到模板对应的虚拟DOM
  const code = generate(ast, options)
  //将生成的render函数字符串外传
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```

### Vue中的key有什么用？为什么会优化diff算法的速度？

首先我们要明白key的作用是什么：

**key是给每一个vnode的唯一id,可以依靠key,更准确, 更快的拿到oldVnode中对应的vnode节点。**

key的作用可参考 [一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/1#issue-401165995)

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

参考 [一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/90)

[官方解释](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%A6%82%E4%BD%95%E8%BF%BD%E8%B8%AA%E5%8F%98%E5%8C%96)

每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

### 聊聊 Vue 的响应式，Model 如何改变 View，View 又是如何改变 Model 的

参考 [一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/34#issuecomment-519823665)

此题和上题同样可参考 [一题](https://juejin.im/post/5e93e1ea51882573cb72277a#heading-7) 


### vue哪些配置会做数据绑定

vue源码中观察数据的方法有[defineReactive](https://github.com/FunnyLiu/vue/blob/c8c89c9fbc6d4243cf55a8aaddabfff395af0587/src/core/observer/index.js#L149)、[observe](https://github.com/FunnyLiu/vue/blob/c8c89c9fbc6d4243cf55a8aaddabfff395af0587/src/core/observer/index.js#L123) 使用在如下vue配置上
* props：[源码1](https://github.com/FunnyLiu/vue/blob/readsource/src/core/util/props.js#L51) [源码2](https://github.com/FunnyLiu/vue/blob/readsource/src/core/instance/state.js#L101)
* data [源码](https://github.com/FunnyLiu/vue/blob/readsource/src/core/instance/state.js#L169) ，
* computed [源码](https://github.com/FunnyLiu/vue/blob/readsource/src/core/instance/state.js#L231)，
* inject [源码](https://github.com/FunnyLiu/vue/blob/readsource/src/core/instance/inject.js#L16)
* [$attrs](https://github.com/FunnyLiu/vue/blob/readsource/src/core/instance/render.js#L43)
* [$listeners](https://github.com/FunnyLiu/vue/blob/readsource/src/core/instance/render.js#L46)
* [set](https://github.com/FunnyLiu/vue/blob/readsource/src/core/observer/index.js#L222) 给响应式对象加新的响应式property

[参考](https://github.com/theydy/notebook/issues/39)

### vue.set到底在做什么？

Vue.set( target, propertyName/index, value )向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property。

* target是数组。设置数组长度防止index取不到，使用splice方法，将value赋给index。return value;
* target上有这个propertyName，直接赋值。 return value;
* target不能是Vue实例，或者Vue实例的根数据对象，否则报错。return value;
* target不是响应式对象，赋值。return value;
* target使用object.defineProperty，赋值，建立监听，然后触发dep的notify方法。

[源码地址](https://github.com/FunnyLiu/vue/blob/readsource/src/core/observer/index.js#L222)

``` js
function set(target, key, val) {
    // 判断是否是数组
    if (Array.isArray(target)) {
        // 判断谁大谁小
        target.length = Math.max(target.length, key)
        // 执行splice
        target.splice(key, 1, val)
        return val
    }

    const ob = target.__ob__

    // 如果此对象没有不是响应式对象，直接设置并返回
    if (key in target && !(key in target.prototype) || !ob) {
        target[key] = val
        return val
    }

    // 否则，新增属性，并响应式处理
    defineReactive(target, key, val)
    return val
}

```


### Vue.delete的原理

``` js
function del (target, key) {
    // 判断是否为数组
    if (Array.isArray(target)) {
        // 执行splice
        target.splice(key, 1)
        return
    }

    const ob = target.__ob__

    // 对象本身就没有这个属性，直接返回
    if (!(key in target)) return


    // 否则，删除这个属性
    delete target[key]

    // 判断是否是响应式对象，不是的话，直接返回
    if (!ob) return
    // 是的话，删除后要通知视图更新
    ob.dep.notify()
}

```

### Vue的响应式用Proxy和Object.defineProperty有什么区别？

Object.defineProperty有如下缺陷：

1、Object.defineProperty 无法一次性监听对象所有属性，必须遍历或者递归来实现。

``` js
   let girl = {
     name: "marry",
     age: 22
   }
   /* Proxy 监听整个对象*/
   girl = new Proxy(girl, {
     get() {}
     set() {}
   })
   /* Object.defineProperty */
   Object.keys(girl).forEach(key => {
     Object.defineProperty(girl, key, {
       set() {},
       get() {}
     })
   })
```

2、Object.defineProperty 无法监听新增加的属性

Proxy 可以监听到新增加的属性，而 Object.defineProperty 不可以，需要你手动再去做一次监听。因此，在 Vue 中想动态监听属性，一般用 Vue.set(girl, "hobby", "game") 这种形式来添加。

``` js
   let girl = {
     name: "marry",
     age: 22
   }
   /* Proxy 监听整个对象*/
   girl = new Proxy(girl, {
     get() {}
     set() {}
   })
   /* Object.defineProperty */
   Object.keys(girl).forEach(key => {
     Object.defineProperty(girl, key, {
       set() {},
       get() {}
     })
   });
   /* Proxy 生效，Object.defineProperty 不生效 */
   girl.hobby = "game"; 
```

3、Object.defineProperty 无法响应数组操作

Object.defineProperty 可以监听数组的变化，Object.defineProperty 无法对 push、shift、pop、unshift 等方法进行响应。

``` js
   const arr = [1, 2, 3];
   /* Proxy 监听数组*/
   arr = new Proxy(arr, {
     get() {},
     set() {}
   })
   /* Object.defineProperty */
   arr.forEach((item, index) => {
     Object.defineProperty(arr, `${index}`, {
       set() {},
       get() {}
     })
   })

   arr[0] = 10; // 都生效
   arr[3] = 10; // 只有 Proxy 生效
   arr.push(10); // 只有 Proxy 生效
```

对于新增加的数组项，Object.defineProperty 依旧无法监听到，如果想要监听到 push、shift、pop、unshift等方法，该怎么做呢？在 Vue 和 Mobx 中都是通过重写原型实现的。

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
- 类型三：在vue options中通过events绑定的自定义事件（[events被废弃了](https://cn.vuejs.org/v2/guide/migration.html#events-选项移除))
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


### Vue的mixin模式怎么实现的？

组件调用mixin的方式有两种：

Vue.mixin()：直接调用组件构造函数上的mixin静态方法。

vue options->{ mixins: [] }：在组件的配置对象中挂载mixins的成员。

无论以上使用了哪种方式，最终调用的都是mergeOptions这个工具方法。

这个方式的实现参考：[vue/options.js at readsource · FunnyLiu/vue](https://github.com/FunnyLiu/vue/blob/readsource/src/core/util/options.js#L401)，针对不同的类型，进行不同的策略进行merge。

比如生命周期，就是通过[mergeHook](https://github.com/FunnyLiu/vue/blob/readsource/src/core/util/options.js#L147)，将父子的函数concat为数组来完成。

具体每一种类型的实现不一一展开了。

参考：

[Vue探究：精读mixin与mergeOptions - 掘金](https://juejin.im/post/5d37de4ee51d45590a445c19)



### Vue3做了哪些优化？

生 成 Block tree

Vue.js 2.x 的数据更新并触发重新渲染的粒度是组件级的，单个组件内部 需要遍历该组件的整个 vnode 树。在 2.0 里，渲染效率的快慢与组件大小成正相关：组件越大，渲染效率越慢。并且，对于一些静态节点，又无数据更新，这些遍历都是性能浪费。Vue.js 3.0 做到了通过编译阶段对静态模板的分析，编译生成了 Block tree。 

Block tree是一个将模版基于动态节点指令切割的嵌套区块，每个 区块内部的节点结构是固定的， 每个区块只需要追踪自身包含的动态节点。所以，在 3.0 里，渲染效率不再与模板大小成正相关，而是与模板中动态节点的数量成正相关。

slot 编译优化

Vue.js 2.x 中，如果有一个组件传入了 slot，那么每次父组件更新的时候，会强制使子组件update，造成性能的浪费。

Vue.js 3.0 优化了 slot 的生成，使得非动态 slot 中属性的更新只会触发子组件的更新。动态 slot 指的是在 slot 上面使用 v-if，v-for，动态slot 名字等会导致 slot 产生运行时动态变化但是又无法被子组件 track 的操作。

diff 算法优化

Vue2.x 中的虚拟dom 是进行全量的对比。

Vue3.0 中新增了静态标记（PatchFlag）：在与上次虚拟结点进行对比的时候，值对比带有patch flag 的节点，并且可以通过 flag 的信息得知当前节点要对比的具体内容化。


cacheHandlers 事件侦听器缓存

默认情况下onClick 会被视为动态绑定，所以每次都会去追踪它的变化但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可。


### vue3的hook和React的区别？

React hook 底层是基于链表实现，调用的条件是每次组件被 render 的时候都会顺序执行所有的hooks。

Vue hook 只会被注册调用一次，Vue 能避开这些麻烦的问题，原因在于它对数据的响应是基于proxy 的，对数据直接代理观察。（这种场景下，只要任何一个更改 data 的地方，相关的 function 或者 template 都会被重新计算，因此避开了 React 可能遇到的性能上的问题）。

React 中，数据更改的时候，会导致重新 render，重新 render 又会重新把 hooks 重新注册一次，所以React 复杂程度会高一些。


### vue的re-render和React的re-render的区别？

Vue2通过主动记录数据依赖，可以精确到某个组件开始及其子组件的re-render;

Vue3进一步优化到模板中区分静态节点和动态节点，只re-render动态节点；

而React则是每次改变状态后对整个APP进行重新diff并查到需要render的组件，重新执行render。


### data为什么是个函数

因为组件的data是一个对象，而对象是引用类型的，若不是函数，多个组件实例的data会指向同一个对象的堆，导致对象的内容互相影响。所以需要用函数使每个组件实例返回一个新的data。

data之所以只一个函数，是因为一个组件可能会多处调用，而每一次调用就会执行data函数并返回新的数据对象，这样，可以避免多处调用之间的数据污染。

参考：

[熬夜总结50个Vue知识点，全都会你就是神！！！](https://mp.weixin.qq.com/s/h2H-36iVeoyXsorZChwxyQ)


### v-if和v-for为什么不能在同一个标签？

在Vue2中，v-for优先级是高于v-if的，咱们来看例子

``` html
<div v-for=item in [1, 2, 3, 4, 5, 6, 7] v-if=item !== 3>
    {{item}}
</div>
```

上面的写法是v-for和v-if同时存在，会先把7个元素都遍历出来，然后再一个个判断是否为3，并把3给隐藏掉，这样的坏处就是，渲染了无用的3节点，增加无用的dom操作，建议使用computed来解决这个问题：

```
<div v-for=item in list>
    {{item}}
</div>

computed() {
    list() {
        return [1, 2, 3, 4, 5, 6, 7].filter(item => item !== 3)
    }
  }
```

参考：

[熬夜总结50个Vue知识点，全都会你就是神！！！](https://mp.weixin.qq.com/s/h2H-36iVeoyXsorZChwxyQ)

## 编码

### 实现一个vue的懒加载指令（todo）

