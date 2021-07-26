# redux


## 应用




### redux有哪些原则？


1、单一数据源。

整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

2、state只读。

唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

3、纯函数执行。

为了描述 action 如何改变 state tree ，你需要编写 reducers。

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state

参考：

[三大原则 · GitBook](https://cn.redux.js.org/docs/introduction/ThreePrinciples.html)



### 说一下redux的基本工作流程

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20201224105428.png"/>


首先，我们看下几个核心概念：

 - Store：保存数据的地方，你可以把它看成一个容器，整个应用只能有一个Store。

 - State：Store对象包含所有数据，如果想得到某个时点的数据，就要对Store生成快照，这种时点的数据集合，就叫做State。

 - Action：State的变化，会导致View的变化。但是，用户接触不到State，只能接触到View。所以，State的变化必须是View导致的。Action就是View发出的通知，表示State应该要发生变化了。

 - Action Creator：View要发送多少种消息，就会有多少种Action。如果都手写，会很麻烦，所以我们定义一个函数来生成Action，这个函数就叫Action Creator。

 - Reducer：Store收到Action以后，必须给出一个新的State，这样View才会发生变化。这种State的计算过程就叫做Reducer。Reducer是一个函数，它接受Action和当前State作为参数，返回一个新的State。

 - dispatch：是View发出Action的唯一方法。

然后我们过下整个工作流程：

1、首先，用户（通过View）发出Action，发出方式就用到了dispatch方法。

2、然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State

3、State一旦有变化，Store就会调用监听函数，来更新View。

到这儿为止，一次用户交互流程结束。可以看到，在整个流程中数据都是单向流动的，这种方式保证了流程的清晰。


### redux的基本用法

可以配合[reduxDemo/todolist at master · FunnyLiu/reduxDemo](https://github.com/FunnyLiu/reduxDemo/tree/master/todolist)来查看其用法：

``` js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
   </Provider>,
  document.getElementById('app')
)
```

其中reducer为：

``` js
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'


//联结所有的reducers
export default combineReducers({
  todos,
  visibilityFilter
})
```

其子reducer为：

``` js
const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      case 'TOGGLE_TODO':
        return state.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      default:
        return state
    }
  }
  
  export default todos
```


### redux中间件做什么的，什么流程？

中间件提供第三方插件的模式，自定义拦截 action -> reducer 的过程。变为 action -> middlewares -> reducer 。这种机制可以让我们改变数据流，实现如异步 action ，action 过滤，日志输出，异常报告等功能。


### redux有哪些常用的中间件?

[redux-thunk源码分析](https://github.com/FunnyLiu/redux-thunk/tree/readsource)

[redux-saga源码分析](https://github.com/FunnyLiu/redux-saga/tree/readsource)



redux-thunk优点:

体积小: redux-thunk的实现方式很简单,只有不到20行代码

使用简单: redux-thunk没有引入像redux-saga或者
redux-observable额外的范式,上手简单

redux-thunk缺陷:

样板代码过多: 与redux本身一样,通常一个请求需要大量的代码,而且很多都是重复性质的

耦合严重: 异步操作与redux的action偶合在一起,不方便管理

功能孱弱: 有一些实际开发中常用的功能需要自己进行封装

redux-saga优点:

异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中

action摆脱thunk function: dispatch 的参数依然是一个纯粹的 action (FSA)，而不是充满 “黑魔法” thunk function
异常处理: 受益于 generator function 的 saga 实现，代码异常/请求失败 都可以直接通过 try/catch 语法直接捕获处理

功能强大: redux-saga提供了大量的Saga 辅助函数和Effect 创建器供开发者使用,开发者无须封装或者简单封装即可使用

灵活: redux-saga可以将多个Saga可以串行/并行组合起来,形成一个非常实用的异步flow
易测试，提供了各种case的测试方案，包括mock task，分支覆盖等等

redux-saga缺陷:

额外的学习成本: redux-saga不仅在使用难以理解的 generator function,而且有数十个API,学习成本远超redux-thunk,最重要的是你的额外学习成本是只服务于这个库的,与redux-observable不同,redux-observable虽然也有额外学习成本但是背后是rxjs和一整套思想

体积庞大: 体积略大,代码近2000行，min版25KB左右

功能过剩: 实际上并发控制等功能很难用到,但是我们依然需要引入这些代码

ts支持不友好: yield无法返回TS类型

redux-observable优点:

功能最强: 由于背靠rxjs这个强大的响应式编程的库,借助rxjs的操作符,你可以几乎做任何你能想到的异步处理

背靠rxjs: 由于有rxjs的加持,如果你已经学习了rxjs,redux-observable的学习成本并不高,而且随着rxjs的升级redux-observable也会变得更强大

redux-observable缺陷:

学习成本奇高: 如果你不会rxjs,则需要额外学习两个复杂的库

社区一般: redux-observable的下载量只有redux-saga的1/5,社区也不够活跃,在复杂异步流中间件这个层面redux-saga仍处于领导地位


参考：

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904#heading-3)



### redux的缺点是什么？

一个组件所需要的数据，必须由父组件传过来，而不能像flux 中直接从store 取。

当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新render，可能会有效率影响，或者需要写复杂的 shouldComponentUpdate 进行判断。





### dva解决了redux-saga什么问题？

Dva 是基于 React + Redux + Saga 的最佳实践沉淀, 做了 3 件很重要的事情, 大大提升了编码体验:


1、把 store 及 saga 统一为一个 model 的概念, 写在一个 js 文件里面

2、增加了一个 Subscriptions, 用于收集其他来源的 action, eg: 键盘操作

3、model 写法很简约, 类似于 DSL 或者 RoR, coding 快得飞起


参考：

[Dva 图解 | DvaJS](https://dvajs.com/guide/fig-show.html#%E5%9B%BE%E8%A7%A3%E4%B8%89-%E5%8A%A0%E5%85%A5-saga)



## 原理


### redux源码读过没？

参考[FunnyLiu/redux at readsource](https://github.com/FunnyLiu/redux/tree/readsource)


### react-redux是做什么的，工作原理？

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210301150309.png"/>

[react-redux源码分析](https://github.com/FunnyLiu/react-redux/tree/readsource)

Provider: Provider的作用是从最外部封装了整个应用，并向connect模块传递store

connect: 负责连接React和Redux

  - 获取state: connect通过context获取Provider中的store，通过store.getState()获取整个store tree 上所有state

  - 包装原组件: 将state和action通过props的方式传入到原组件内部wrapWithConnect返回一个ReactComponent对象Connect，Connect重新render外部传入的原组件WrappedComponent，并把connect中传入的mapStateToProps, mapDispatchToProps与组件上原有的props合并后，通过属性的方式传给WrappedComponent

  - 监听store tree变化: connect缓存了store tree中state的状态,通过当前state状态和变更前state状态进行比较,从而确定是否调用this.setState()方法触发Connect及其子组件的重新渲染



参考：

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904#heading-3)
