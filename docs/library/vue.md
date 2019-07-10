# Vue

## 应用

## 原理

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