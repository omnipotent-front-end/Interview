# redux


## 应用


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


### redux有哪些常用的中间件（todo）


### dva解决了redux-saga什么问题（todo）


## 原理


### redux源码读过没？

参考[FunnyLiu/redux at readsource](https://github.com/FunnyLiu/redux/tree/readsource)
