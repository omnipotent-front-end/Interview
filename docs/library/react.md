# React

## 应用

### React中的key是用来做什么的？（todo）


### 使用JSX时有那些基本技巧？
#### 传递多参数

利用解构、剩余参数和展开运算符
``` js
function Greeting({ name, ...platformProps }) {
  return <div {...platformProps}>Hi {name}!</div>;
}
```

#### 合并参数
利用默认参数、展开运算符，
在操作className时非常常见

``` js
function MyButton({ className = "", ...props }) {
  let classNames = ["btn", className].join(" ");

  return <button className={classNames} {...props} />;
}
```

#### 条件判断

if：
``` js
{
  condition && <span>Rendered when `truthy`</span>;
}
```

unless：
``` js
{
  condition || <span>Rendered when `falsy`</span>;
}

```
if-else
``` js
{
  condition ? (
    <span>Rendered when `truthy`</span>
  ) : (
    <span>Rendered when `falsy`</span>
  );
}
```

#### children内容
可以为字符串，也可以是数组：
``` js
<div>Hello World!</div>

<div>{["Hello ", <span>World</span>, "!"]}</div>
```

#### list
使用map
``` js
<ul>
  {["first", "second"].map(item => (
    <li>{item}</li>
  ))}
</ul>
//等同于
<ul>{[<li>first</li>, <li>second</li>]}</ul>
```


### React有哪些生命周期？

目前React 16.8 +的生命周期分为三个阶段,分别是挂载阶段、更新阶段、卸载阶段

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20211104161247.png"/>


挂载阶段:

constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this

getDerivedStateFromProps: static getDerivedStateFromProps(nextProps, prevState),这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps

render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容

componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnMount中取消订阅

更新阶段:

getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用

shouldComponentUpdate: shouldComponentUpdate(nextProps, nextState),有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能
render: 更新阶段也会触发此生命周期

getSnapshotBeforeUpdate: getSnapshotBeforeUpdate(prevProps, prevState),这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用

componentDidUpdate: componentDidUpdate(prevProps, prevState, snapshot),该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。

卸载阶段:

componentWillUnmount: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

参考：

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904#heading-3)





### Ajax 请求放在 componentDidMount 里进行处理还是放在componentWillMount 里进行处理比较合适？（todo）


React的异步请求到底应该放在哪个生命周期里,有人认为在componentWillMount中可以提前进行异步请求,避免白屏,其实这个观点是有问题的.
由于JavaScript中异步事件的性质，当您启动API调用时，浏览器会在此期间返回执行其他工作。当React渲染一个组件时，它不会等待componentWillMount它完成任何事情 - React继续前进并继续render,没有办法“暂停”渲染以等待数据到达。

而且在componentWillMount请求会有一系列潜在的问题,首先,在服务器渲染时,如果在 componentWillMount 里获取数据，fetch data会执行两次，一次在服务端一次在客户端，这造成了多余的请求,其次,在React 16进行React Fiber重写后,componentWillMount可能在一次渲染中多次调用.

目前官方推荐的异步请求是在componentDidmount中进行.

如果有特殊需求需要提前请求,也可以在特殊情况下在constructor中请求:

react 17之后componentWillMount会被废弃,仅仅保留UNSAFE_componentWillMount



参考

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904#heading-3)


### 函数组件和类组件有什么区别？



class组件特点：

有组件实例

有生命周期

有 state 和 setState

函数组件特点：

没有组件实例

没有生命周期

没有 state 和 setState，只能接收 props

函数组件是一个纯函数，执行完即销毁，无法存储 state

class 组件存在的问题：

大型组件很难拆分和重构，变得难以测试

相同业务逻辑分散到各个方法中，可能会变得混乱

复用逻辑可能变得复杂，如 HOC 、Render Props

React 中更提倡函数式编程，因为函数更灵活，更易拆分，但函数组件太简单，所以出现了hook，hook就是用来增强函数组件功能的。

参考：

[React 函数组件和class组件区别 - 知乎](https://zhuanlan.zhihu.com/p/339547131)



### 为什么要使用Hooks，解决了class什么问题？

class组件经历了`React.createClass`，`React.Component`,也经历了constructor的super，bind this到class filed的坑。

生命周期的设计也越来越复杂多变，**为了复用生命周期的逻辑，class组件是通过HOC来完成**。但是HOC的滥用会带来额外的维护性，和不可理解性。

而hooks的扁平处理可以完美解决这些问题。


参考：

[Why React Hooks? - DEV Community](https://dev.to/tylermcginnis/why-react-hooks-51lj)

[Why React Hooks? - YouTube](https://www.youtube.com/embed/eX_L39UvZes)

### React中高阶组件的应用场景

1、权限控制

利用高阶组件的 条件渲染 特性可以对页面进行权限控制，权限控制一般分为两个维度：页面级别 和 页面元素级别。这里以页面级别来举一个栗子：

``` js
// HOC.js
function withAdminAuth(WrappedComponent) {
    return class extends React.Component {
        state = {
            isAdmin: false,
        }
        async componentWillMount() {
            const currentRole = await getCurrentUserRole();
            this.setState({
                isAdmin: currentRole === 'Admin',
            });
        }
        render() {
            if (this.state.isAdmin) {
                return <WrappedComponent {...this.props} />;
            } else {
                return (<div>您没有权限查看该页面，请联系管理员！</div>);
            }
        }
    };
}

```

2、组件渲染性能追踪

借助父组件子组件生命周期规则捕获子组件的生命周期，可以方便的对某个组件的渲染时间进行记录：

``` js
class Home extends React.Component {
    render() {
        return (<h1>Hello World.</h1>);
    }
}
function withTiming(WrappedComponent) {
    return class extends WrappedComponent {
        constructor(props) {
            super(props);
            this.start = 0;
            this.end = 0;
        }
        componentWillMount() {
            super.componentWillMount && super.componentWillMount();
            this.start = Date.now();
        }
        componentDidMount() {
            super.componentDidMount && super.componentDidMount();
            this.end = Date.now();
            console.log(`${WrappedComponent.name} 组件渲染时间为 ${this.end - this.start} ms`);
        }
        render() {
            return super.render();
        }
    };
}

export default withTiming(Home);
```

withTiming 是利用 反向继承 实现的一个高阶组件，功能是计算被包裹组件（这里是 Home 组件）的渲染时间。

3、页面复用

部分公共逻辑的抽取，比如fetch：

``` js
const withFetching = fetching => WrappedComponent => {
    return class extends React.Component {
        state = {
            data: [],
        }
        async componentWillMount() {
            const data = await fetching();
            this.setState({
                data,
            });
        }
        render() {
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    }
}

// pages/page-a.js
export default withFetching(fetching('science-fiction'))(MovieList);
// pages/page-b.js
export default withFetching(fetching('action'))(MovieList);
// pages/page-other.js
export default withFetching(fetching('some-other-type'))(MovieList);
```

参考：

[React 中的高阶组件及其应用场景](https://juejin.cn/post/6844903782355042312#heading-23)

### 使用 React Hooks 的同时为什么需要使用高阶组件？（todo）

### 完全用 Hooks 的写法是否可以摒弃高阶组件的写法？（todo）

### 怎么使用 Hooks 替代高阶组件？（todo）



### useEffect对标哪些生命周期？

你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

具体的对应表可以参考：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210510111644.png"/>

具体的实例：

``` js

import React, { useState, useEffect, useRef, memo } from 'react';

// 使用 React.memo 实现类似 shouldComponentUpdate 的优化， React.memo 只对 props 进行浅比较
const UseEffectExample = memo((props) => {
    console.log("===== UseStateExample render=======");
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [fatherCount, setFatherCount] = useState(props.fatherCount)

    console.log(props);

    // 模拟 getDerivedStateFromProps
    useEffect(() => {
        // props.fatherCount 有更新，才执行对应的修改，没有更新执行另外的逻辑
        if(props.fatherCount == fatherCount ){
            console.log("======= 模拟 getDerivedStateFromProps=======");
            console.log(props.fatherCount, fatherCount);
        }else{
            setFatherCount(props.fatherCount);
            console.log(props.fatherCount, fatherCount);
        }
    })

    // 模拟DidMount
    useEffect(() => {
        console.log("=======只渲染一次(相当于DidMount)=======");
        console.log(count);
    }, [])

    // 模拟DidUpdate
    const mounted = useRef();
    useEffect(() => {
        console.log(mounted);
        if (!mounted.current) {
            mounted.current = true;
          } else {
            console.log("======count 改变时才执行(相当于DidUpdate)=========");
            console.log(count);
          }
    }, [count])

    // 模拟 Didmount和DidUpdate 、 unmount
    useEffect(() => {
    	// 在 componentDidMount，以及 count 更改时 componentDidUpdate 执行的内容
        console.log("======初始化、或者 count 改变时才执行(相当于Didmount和DidUpdate)=========");
        console.log(count);
        return () => {
        	
            console.log("====unmount=======");
            console.log(count);
        }
    }, [count])

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>

            <button onClick={() => setCount2(count2 + 1)}>
                Click me2
            </button>
        </div>
    );
});

export default UseEffectExample;

```

参考：

[使用 Effect Hook – React](https://zh-hans.reactjs.org/docs/hooks-effect.html)

[React Hooks 介绍及与传统 class 组件的生命周期函数对比_诗渊的博客-CSDN博客](https://blog.csdn.net/u014607184/article/details/109744910)

### React合成事件和原生事件的区别是？

React事件绑定时，发现React绑定时间有其自身的一套机制，那就是合成事件。

``` js
<div className="testDom" onClick={this.testDomClick()}><div>
```

React合成事件一套机制：React并不是将click事件直接绑定在dom上面，而是采用事件冒泡的形式冒泡到document上面，然后React将事件封装给正式的函数处理运行和处理。

React合成事件理解

如果DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用，同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层——SyntheticEvent。


当用户在为onClick添加函数时，React并没有将Click时间绑定在DOM上面。
而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装交给中间层SyntheticEvent（负责所有事件合成）
所以当事件触发的时候，对使用统一的分发函数dispatchEvent将指定函数执行。



参考：

[React 合成事件和原生事件的区别 - 简书](https://www.jianshu.com/p/8d8f9aa4b033)



### React中state和props的区别？


Props是一个从外部传进组件的参数，主要作用就是父组件向子组件传递数据，但是props对于使用它的组件来说是只读的，一旦赋值不能修改，只能通过外部组件主动传入新的props来重新渲染子组件

State一个组件的显示形态可以由数据状态和外部参数决定，外部参数是props，数据状态就是state，首先，在组件初始化的时候，用this.state给组件设定一个初始的state，在第一次渲染的时候就会用这个数据来渲染组件，state不同于props一点时，state可以修改，通过this.setState()方法来修改state



### React 中的 setState 是同步还是异步？

首先搞懂[react合成事件和原生事件的区别是？](/library/react.html#react%E5%90%88%E6%88%90%E4%BA%8B%E4%BB%B6%E5%92%8C%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%EF%BC%9F)

setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。

setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。

参考：

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904#heading-3)

### React 中 setState 后想要拿到更新的state值应该怎么处理？

可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。


### setState为何设计成异步的？如何实现的？

为什么react大部分情况setState是异步的呢？假如所有setState是同步的，意味着每执行一次setState时（有可能一个同步代码中，多次setState），都重新vnode diff + dom修改，这对性能来说是极为不好的。如果是异步，则可以把一个同步代码中的多个setState合并成一次组件更新。

具体实现可以参考：[FunnyLiu/react-1 at readsource](https://github.com/FunnyLiu/react-1/tree/readsource#thissetstate%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88)


核心代码实现：

``` js
ReactComponent.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

enqueueSetState: function(publicInstance, partialState) {
    // 找到需渲染组件
    var internalInstance = getInternalInstanceReadyForUpdate(
      publicInstance,
      'setState',
    );

    if (!internalInstance) {
      return;
    }

    // 每次都把新的state，push到队列中。
    // 方便后面一次性更新组件时，聚合成最新的state
    var queue =
      internalInstance._pendingStateQueue ||
      (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    // 更新
    enqueueUpdate(internalInstance);
  },
```

``` js
//代码位于ReactUpdateQueue.js
function enqueueUpdate(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}
//代码位于ReactUpdates.js
function enqueueUpdate(component) {
  ensureInjected();

  // 未开启事务流程：开启事务 + 更新组件
  // 在生命周期以及合成事件情况下，isBatchingUpdates=true
  // 在setTimeout以及原生DOM事件情况下，isBatchingUpdates=false
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 已开启事务流程：放到脏数组中（组件不更新 + this.state不变），等待更新
  dirtyComponents.push(component);

  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}

```

以上是setState的关键代码，batchingStrategy.batchedUpdates里面用到了事务机制。 setState 本身的方法调用是同步的，但是调用了setState不标志这react的 state 立即更新，这个更新是要根据当前环境执行上下文来判断的，如果处于batchedUpdate的情况下，那么state的不是当前立马更新的，而不处于batchedUpdate的情况下，那么他就有可能立马更新的。

参考：

[React setState是异步吗 | springleo's blog](https://lq782655835.github.io/blogs/react/react-code-3.setState.html)







### React 中受控组件和非受控组件的区别？

在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。

举个例子，非受控组件：

``` js
class Form extends Component {
  /** 提交时候获取数据 */  
  handleSubmitClick = () => {
    const name = this._name.value;
    // 检测数据提示然后
  }
  render() {
    return  (
      <div>
        <input type="text" ref={input => this._name = input} />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
}
```

受控组件：

``` js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

非受控组件更方便快捷，代码量小，但是控制能力比较弱。受控组件的控制能力强，但是代码量会比较多，在开发中应该权衡需求，进度进行相应的选择。

参考：

[漫谈受控与非受控组件 - SegmentFault 思否](https://segmentfault.com/a/1190000022925043)

[表单 – React](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)

[非受控组件 – React](https://zh-hans.reactjs.org/docs/uncontrolled-components.html)

### 在哪些场景应该使用非受控组件？

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210510110650.png"/>

非受控组件更方便快捷，代码量小，但是控制能力比较弱，一些简单的功能场景下可以使用，但是还是建议使用受控组件。

参考

[Controlled and uncontrolled form inputs in React don't have to be complicated - Gosha Arinich](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/?spm=a2c6h.12873639.0.0.1a7665266cJt7d)

### React组件之间怎么通信？

父组件向子组件通讯: 父组件可以向子组件通过传 props 的方式，向子组件进行通讯

子组件向父组件通讯: props+回调的方式,父组件向子组件传递props进行通讯，此props为作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中

兄弟组件通信: 找到这两个兄弟节点共同的父节点,结合上面两种方式由父节点转发信息进行通信

跨层级通信: Context设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言,对于跨越多层的全局数据通过Context通信再适合不过

发布订阅模式: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引入event模块进行通信

全局状态管理工具: 借助Redux或者Mobx等全局状态管理工具进行通信,这种工具会维护一个全局状态中心Store,并根据不同的事件产生新的状态



参考：

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904#heading-3)


### 在 React 中，refs 的作用是什么？

Refs 可以用于获取一个 DOM 节点或者 React 组件的引用。何时使用 refs 的好的示例有管理焦点/文本选择，触发命令动画，或者和第三方 DOM 库集成。你应该避免使用String 类型的 Refs 和内联的 ref 回调。Refs 回调是 React 所推荐的




### 是否了解shouldComponentUpdate，做什么的？

在class组件中，我们可以通过shouldComponentUpdate阻止不必要的re-render：

``` js
class DemoLoader extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.demoUrl !== this.props.demoUrl;
  }

  render() {
    const { domoUrl } = this.props;
    return <div className="demoloader">
      <iframe src={demoUrl} />
    </div>;
  }
}

```

在更新数据的时候用setState修改整个数据，数据变了之后，遍历的时候所有内容都要被重新渲染，数据量少还好，数据量大就会严重影响性能

解决办法：

1.shouldComponentUpdate 在渲染前进行判断组件是否更新，更新了再渲染

2.pureComponent（纯组件）省去了虚拟dom生成和对比的过程  在类组件中使用

3.react.memo() 类似于纯组件 在无状态组件中使用


### hook函数式组件怎么实现shouldComponentUpdate？

为了解决函数组件中的优化问题，React在16.6版本增加了React.memo。

React.memo是一个高阶组件，类似于React.PureComponent，只不过用于函数组件而非class组件。
如果你的函数组件在相同props下渲染出相同结果，你可以把它包裹在React.memo中来通过缓存渲染结果来实现性能优化。这意味着React会跳过组件渲染，而使用上次渲染结果。

``` js
const DemoLoader = React.memo(props => {
  const { demoUrl } = props;
  return <div className="demoloader">
    <iframe src={demoUrl} />
  </div>;
}, (prevProps, nextProps) => {
  return prevProps.demoUrl === nextProps.demoUrl;
});

```

参考：

[React.memo: 在函数组件中实现'shouldComponentUpdate'](https://juejin.cn/post/6844904006075023367)


### class组件怎么使用hooks？

class组件使用不了hooks，所以可以通过高阶组件，包一层给class用：

``` js
import { useErrorHandler } from "react-error-boundary";
//为了给class用上hook，只能如此
export function withErrorHandler(Component) {
  return function WithErrorHandler(props) {
    const handleError = useErrorHandler();
    return <Component {...props} handleError={handleError} />;
  };
}

```

### hook遇到不更新的问题吗？怎么解决？

闭包问题经常捕获一个未更新的变量，一个有效的解决闭包问题的方法是在React hooks里设置正确的依赖，或者用函数的方式更新state。

先看一个useEffect的问题：

``` js
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
  }, []);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        Increase
      </button>
    </div>
  );
}
```

点击多次后，count 还是0。

这个问题的本质可以看看下面的例子：

``` js
function createIncrement(incBy) {
  let value = 0;

  function increment() {
    value += incBy;
    console.log(value);
  }

  const message = `Current value is ${value}`;
  function log() {
    console.log(message);
  }
  
  return [increment, log];
}

const [increment, log] = createIncrement(1);
increment(); // logs 1
increment(); // logs 2
increment(); // logs 3
// Does not work!
log();       // logs "Current value is 0"
```

尽管多次调用increment增加vulue的值，message变量也没有保持更新。

需要改为：

``` js
function createIncrement(incBy) {
  let value = 0;

  function increment() {
    value += incBy;
    console.log(value);
  }

  function log() {
    const message = `Current value is ${value}`;
    console.log(message);
  }
  
  return [increment, log];
}

const [increment, log] = createIncrement(1);
increment(); // logs 1
increment(); // logs 2
increment(); // logs 3
// Works!
log();       // logs "Current value is 3"
```

所以刚才的useEffect应该改为：

``` js
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    const id = setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
    return function() {
      clearInterval(id);
    }
  }, [count]);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        Increase
      </button>
    </div>
  );
}
```

通过依赖计算，来保证其执行。

再看看useState遇到同样的问题：

``` js
function DelayedCount() {
  const [count, setCount] = useState(0);

  function handleClickAsync() {
    setTimeout(function delay() {
      setCount(count + 1);
    }, 1000);
  }

  return (
    <div>
      {count}
      <button onClick={handleClickAsync}>Increase async</button>
    </div>
  );
}
```

需要改为：

``` js
function DelayedCount() {
  const [count, setCount] = useState(0);

  function handleClickAsync() {
    setTimeout(function delay() {
      setCount(count => count + 1);
    }, 1000);
  }

  function handleClickSync() {
    setCount(count + 1);
  }

  return (
    <div>
      {count}
      <button onClick={handleClickAsync}>Increase async</button>
      <button onClick={handleClickSync}>Increase sync</button>
    </div>
  );
}
```

参考：

[警惕React hooks中的闭包 - 知乎](https://zhuanlan.zhihu.com/p/351069053)





### React怎么控制渲染顺序？

第一种方式使用标识位，在父组件进行控制。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210510103900.png"/>

第二种使用React.lazy在后面的流程中去渲染其他的

``` js
import React, { lazy, Suspense } from "react";
const OtherComponent = lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

第三种是基于React17的concurrent模式去完成对调度的精细控制。

目前是实验版本：

``` js
ReactDOM.render(
  <React.unstable_ConcurrentMode>
    <App />
  </React.unstable_ConcurrentMode>,
  rootElement
);

```

具体的调度方式待定，由于实验版本就不深究了。

参考：

[React元件渲染的控制順序 - JAVASCRIPT _程式人生](https://www.796t.com/post/NjR6NmU=.html)

[精读《Scheduling in React》](https://juejin.cn/post/6844903821433372680)


### 做过哪些React方面的性能优化？

说到性能优化首先需要排查出性能问题。通过开发者工具可以查看组件渲染时间和原因。

[React Profiler 介绍 – React Blog](https://zh-hans.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)


查看某个组件某次渲染的原因以及花费的时间：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210426174108.png"/>


然后找到需要优化的组件，再做优化：


#### 使用 React.Memo 来缓存组件

提升应用程序性能的一种方法是实现 memoization。Memoization 是一种优化技术，主要通过存储昂贵的函数调用的结果，并在再次发生相同的输入时返回缓存的结果，以此来加速程序。  
父组件的每次状态更新，都会导致子组件重新渲染，即使传入子组件的状态没有变化，为了减少重复渲染，我们可以使用 React.memo 来缓存组件，这样只有当传入组件的状态值发生变化时才会重新渲染。如果传入相同的值，则返回缓存的组件。示例如下：

``` js
export default React.memo((props) => {
  return (
    <div>{props.value}</div>  
  )
});
```



``` js
import React, { useCallback, useState, useEffect } from "react";

function Memo() {
//   return <DualCounter />;
  return <DualCounter2 />;
}

function CountButton({ onClick, count }) {
  console.log("render");
  return <button onClick={onClick}>{count}</button>;
}
//这种情况下，每点击一个按钮，都会引起两个组件的重新渲染
function DualCounter() {
  const [count1, setCount1] = React.useState(0);
  const increment1 = () => setCount1((c) => c + 1);

  const [count2, setCount2] = React.useState(0);
  const increment2 = () => setCount2((c) => c + 1);

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  );
}
//React.memo和useCallback的组合下，就可以达到只渲染自己的目的
const CountButton2 = React.memo(function CountButton({ onClick, count }) {
    console.log('render')
  return <button onClick={onClick}>{count}</button>;
});

function DualCounter2() {
  const [count1, setCount1] = React.useState(0);
  const increment1 = React.useCallback(() => setCount1((c) => c + 1), []);

  const [count2, setCount2] = React.useState(0);
  const increment2 = React.useCallback(() => setCount2((c) => c + 1), []);

  return (
    <>
      <CountButton2 count={count1} onClick={increment1} />
      <CountButton2 count={count2} onClick={increment2} />
    </>
  );
}

export default Memo;


```

#### 使用 useMemo 缓存大量的计算

参考demo：[reactDemo/Memo.jsx at master · FunnyLiu/reactDemo](https://github.com/FunnyLiu/reactDemo/blob/master/useCallback/components/Memo.jsx#L1)

有时渲染是不可避免的，但如果您的组件是一个功能组件，重新渲染会导致每次都调用大型计算函数，这是非常消耗性能的，我们可以使用新的 useMemo 钩子来 “记忆” 这个计算函数的计算结果。这样只有传入的参数发生变化后，该计算函数才会重新调用计算新的结果。  
通过这种方式，您可以使用从先前渲染计算的结果来挽救昂贵的计算耗时。总体目标是减少 JavaScript 在呈现组件期间必须执行的工作量，以便主线程被阻塞的时间更短。

``` js
// 避免这样做
function Component(props) {
  const someProp = heavyCalculation(props.item);
  return <AnotherComponent someProp={someProp} /> 
}
  
// 只有 `props.item` 改变时someProp的值才会被重新计算
function Component(props) {
  const someProp = useMemo(() => heavyCalculation(props.item), [props.item]);
  return <AnotherComponent someProp={someProp} /> 
} 

```

#### 使用 React.PureComponent , shouldComponentUpdate

父组件状态的每次更新，都会导致子组件的重新渲染，即使是传入相同 props。但是这里的重新渲染不是说会更新 DOM, 而是每次都会调用 diif 算法来判断是否需要更新 DOM。这对于大型组件例如组件树来说是非常消耗性能的。  
在这里我们就可以使用 React.PureComponent , shouldComponentUpdate 生命周期来确保只有当组件 props 状态改变时才会重新渲染。如下例子:

``` js
export default function ParentComponent(props) {
  return (
    <div>
      <SomeComponent someProp={props.somePropValue}
    <div>
      <AnotherComponent someOtherProp={props.someOtherPropValue} />
    </div>
   </div>
 )
}

export default function SomeComponent(props) {
  return (
    <div>{props.someProp}</div>  
  )
}

// 只要props.somePropValue 发生变化，不论props.someOtherPropValue是否发生变化该组件都会发生变化
export default function AnotherComponent(props) {
  return (
    <div>{props.someOtherProp}</div>  
  )
}

```

我们可以使用 React.PureComponent 或 shouldComponentUpdate 进行如下优化：

``` js
// 第一种优化
class AnotherComponent extends React.PureComponent {
  render() {
    return <div>{this.props.someOtherProp}</div>   
  }
}

//第二种优化
class AnotherComponent extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }
  render() {
    return <div>{this.props.someOtherProp}</div>   
  }
}

```

  
PureComponent 会进行浅比较来判断组件是否应该重新渲染，对于传入的基本类型 props，只要值相同，浅比较就会认为相同，对于传入的引用类型 props，浅比较只会认为传入的 props 是不是同一个引用，如果不是，哪怕这两个对象中的内容完全一样，也会被认为是不同的 props。  
需要注意的是在对于那些可以忽略渲染时间的组件或者是状态一直变化的组件则要谨慎使用 PureComponent，因为进行浅比较也会花费时间，这种优化更适用于大型的展示组件上。大型组件也可以拆分成多个小组件，并使用 memo 来包裹小组件，也可以提升性能。

#### 避免使用内联对象

使用内联对象时，react 会在每次渲染时重新创建对此对象的引用，这会导致接收此对象的组件将其视为不同的对象, 因此，该组件对于 prop 的浅层比较始终返回 false, 导致组件一直重新渲染。  
许多人使用的内联样式的间接引用，就会使组件重新渲染，可能会导致性能问题。为了解决这个问题，我们可以保证该对象只初始化一次，指向相同引用。另外一种情况是传递一个对象，同样会在渲染时创建不同的引用，也有可能导致性能问题，我们可以利用 ES6 扩展运算符将传递的对象解构。这样组件接收到的便是基本类型的 props，组件通过浅层比较发现接受的 prop 没有变化，则不会重新渲染。示例如下：

``` js
// Don't do this!
function Component(props) {
  const aProp = { someProp: 'someValue' }
  return <AnotherComponent style={{ margin: 0 }} aProp={aProp} />  
}

// Do this instead :)
const styles = { margin: 0 };
function Component(props) {
  const aProp = { someProp: 'someValue' }
  return <AnotherComponent style={styles} {...aProp} />  
}


```

#### 避免使用匿名函数

虽然匿名函数是传递函数的好方法（特别是需要用另一个 prop 作为参数调用的函数），但它们在每次渲染上都有不同的引用。这类似于上面描述的内联对象。为了保持对作为 prop 传递给 React 组件的函数的相同引用，您可以将其声明为类方法（如果您使用的是基于类的组件）或使用 useCallback 钩子来帮助您保持相同的引用（如果您使用功能组件）。  
当然，有时内联匿名函数是最简单的方法，实际上并不会导致应用程序出现性能问题。这可能是因为在一个非常 “轻量级” 的组件上使用它，或者因为父组件实际上必须在每次 props 更改时重新渲染其所有内容。因此不用关心该函数是否是不同的引用，因为无论如何，组件都会重新渲染。

``` js
// 避免这样做
function Component(props) {
  return <AnotherComponent onChange={() => props.callback(props.id)} />  
}

// 优化方法一
function Component(props) {
  const handleChange = useCallback(() => props.callback(props.id), [props.id]);
  return <AnotherComponent onChange={handleChange} />  
}

// 优化方法二
class Component extends React.Component {
  handleChange = () => {
   this.props.callback(this.props.id) 
  }
  render() {
    return <AnotherComponent onChange={this.handleChange} />
  }
}


```

#### 延迟加载不是立即需要的组件

延迟加载实际上不可见（或不是立即需要）的组件，React 加载的组件越少，加载组件的速度就越快。因此，如果您的初始渲染感觉相当粗糙，则可以在初始安装完成后通过在需要时加载组件来减少加载的组件数量。同时，这将允许用户更快地加载您的平台 / 应用程序。最后，通过拆分初始渲染，您将 JS 工作负载拆分为较小的任务，这将为您的页面提供响应的时间。这可以使用新的 React.Lazy 和 React.Suspense 轻松完成。

``` js
// 延迟加载不是立即需要的组件
const MUITooltip = React.lazy(() => import('@material-ui/core/Tooltip'));
function Tooltip({ children, title }) {
  return (
    <React.Suspense fallback={children}>
      <MUITooltip title={title}>
        {children}
      </MUITooltip>
    </React.Suspense>
  );
}

function Component(props) {
  return (
    <Tooltip title={props.title}>
      <AnotherComponent />
    </Tooltip>
  )
}


```

#### 调整 CSS 而不是强制组件加载和卸载

渲染成本很高，尤其是在需要更改 DOM 时。每当你有某种手风琴或标签功能，例如想要一次只能看到一个项目时，你可能想要卸载不可见的组件，并在它变得可见时将其重新加载。如果加载 / 卸载的组件 “很重”，则此操作可能非常消耗性能并可能导致延迟。在这些情况下，最好通过 CSS 隐藏它，同时将内容保存到 DOM。  
尽管这种方法并不是万能的，因为安装这些组件可能会导致问题（即组件与窗口上的无限分页竞争），但我们应该选择在不是这种情况下使用调整 CSS 的方法。另外一点，将不透明度调整为 0 对浏览器的成本消耗几乎为 0（因为它不会导致重排），并且应尽可能优先于更该 visibility 和 display。  
有时在保持组件加载的同时通过 CSS 隐藏可能是有益的，而不是通过卸载来隐藏。对于具有显著的加载 / 卸载时序的重型组件而言，这是有效的性能优化手段。

``` js
// 避免对大型的组件频繁对加载和卸载
function Component(props) {
  const [view, setView] = useState('view1');
  return view === 'view1' ? <SomeComponent /> : <AnotherComponent />  
}

// 使用该方式提升性能和速度
const visibleStyles = { opacity: 1 };
const hiddenStyles = { opacity: 0 };
function Component(props) {
  const [view, setView] = useState('view1');
  return (
    <React.Fragment>
      <SomeComponent style={view === 'view1' ? visibleStyles : hiddenStyles}>
      <AnotherComponent style={view !== 'view1' ? visibleStyles : hiddenStyles}>
    </React.Fragment>
  )
}

```

#### 使用 React.Fragment 避免添加额外的 DOM

有些情况下，我们需要在组件中返回多个元素，例如下面的元素，但是在 react 规定组件中必须有一个父元素。

``` html
            <h1>Hello world!</h1>
            <h1>Hello there!</h1>
            <h1>Hello there again!</h1>


```

因此你可能会这样做, 但是这样做的话即使一切正常，也会创建额外的不必要的 div。这会导致整个应用程序内创建许多无用的元素：

``` js
function Component() {
        return (
            <div>
                <h1>Hello world!</h1>
                <h1>Hello there!</h1>
                <h1>Hello there again!</h1>
            </div>
        )
}


```

实际上页面上的元素越多，加载所需的时间就越多。为了减少不必要的加载时间，我们可以使 React.Fragment 来避免创建不必要的元素。

``` js
function Component() {
        return (
            <React.Fragment>
                <h1>Hello world!</h1>
                <h1>Hello there!</h1>
                <h1>Hello there again!</h1>
            </React.Fragment>
        )
}


```


参考：

[React性能优化的8种方式了解一下？](https://juejin.cn/post/6844903924302888973)



### useLayoutEffect和useEffect的区别是？

useLayoutEffect是同步调用，发生在浏览器把内容渲染到界面前。

useEffect是异步调用，发生在浏览器把内容渲染到界面后。


参考：

[useEffect和useLayoutEffect的区别 | 王鹏飞](https://pengfeixc.com/blog/605af93600f1525af762a725)

### useCallback用过没？使用场景是？

useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。

`useCallback(fn, deps)`相当于`useMemo(() => fn, deps)`

#### 1、普通情况下不需要使用

比如以下[笔记内容](https://github.com/FunnyLiu/reactDemo/blob/master/useCallback/components/Simple.jsx#L1)

``` js
import React, { useCallback, useState, useEffect } from "react";


function Simple() {
  const [val, setVal] = useState("");
  //这种简单套个壳的意义没有，适得其反
  const onChange = useCallback((evt) => {
    setVal(evt.target.value);
  }, []);
  //普通场景下下面的方式性能更好
//   const onChange = (evt) => {
//     setVal(evt.target.value);
//   };

  return <input val={val} onChange={onChange} />;
}

export default Simple;

```

这种情况下用了反而性能更低

#### 2、解决引用问题

解决useEffect的依赖项为引用类型时，即使内容没有改变但是依旧触发update的问题。

比如以下[笔记内容](https://github.com/FunnyLiu/reactDemo/blob/master/useCallback/components/Effect.jsx#L1)

``` js
import React, { useCallback, useState, useMemo } from "react";

function Effect() {
  //   return <Blub />;
  // return <Blub2 />;
  return <Blub3 />;
}
let num = 0;

function Foo({ bar, baz }) {
  const options = { bar, baz };
  //useEffect 将对每次渲染中对 options 进行引用相等性检查，并且由于JavaScript的工作方式，
  //每次渲染 options 都是新的，所以当React测试 options 是否在渲染之间发生变化时，
  //它将始终计算为 true，意味着每次渲染后都会调用 useEffect 回调，而不是仅在 bar 和 baz 更改时调用
  React.useEffect(() => {
    console.log(options);
  }, [options]);
  return <div>foobar</div>;
}
function Blub() {
  const [val, setVal] = useState(0);

  function onClick() {
    num = num + 1;
    //每一次Foo组件重新渲染，其子组件Child都会重新useEffect
    setVal(num);
    console.log(val);
  }
  return (
    <div>
      <Foo bar="bar value" baz={3} val={val} />
      <button onClick={onClick}>click</button>
    </div>
  );
}
//有两种方式解决上面的问题

// 第一种方式是
function Foo2({ bar, baz }) {
  React.useEffect(() => {
    const options = { bar, baz };
    console.log(options);
    //但是有一种情况下：如果 bar 或者 baz 是（非原始值）对象、数组、函数等，这不是一个实际的解决方案
  }, [bar, baz]); // we want this to re-run if bar or baz change
  return <div>foobar</div>;
}
function Blub2() {
  const [val, setVal] = useState(0);

  function onClick() {
    num = num + 1;
    setVal(num);
    console.log(val);
  }
  return (
    <div>
      <Foo2 bar="bar value" baz={3} val={val} />
      {/* 但是有一种情况下：如果 bar 或者 baz 是（非原始值）对象、数组、函数等，这不是一个实际的解决方案 */}
      {/* <Foo2 bar="bar value" baz={[3]} val={val} /> */}
      <button onClick={onClick}>click</button>
    </div>
  );
}

//第二种方式就是useMemo和useCallback了
function Foo3({ bar, baz }) {
  React.useEffect(() => {
    const options = { bar, baz };
    console.log(options);
  }, [bar, baz]); // we want this to re-run if bar or baz change
  return <div>foobar</div>;
}
function Blub3() {
  const [val, setVal] = useState(0);

  function onClick() {
    num = num + 1;
    setVal(num);
    console.log(val);
  }

//   const bar = () => {};
//   const baz = [3];
  // 通过这种方法解决引用类型的重新渲染问题
  const bar = useCallback(() => {}, [])
  const baz = useMemo(() => [3], [])
  return (
    <div>
      {/* <Foo3 bar="bar value" baz={3} val={val} /> */}
      {/* 故意使用引用类型 */}
      <Foo2 bar={bar} baz={baz} val={val} />
      <button onClick={onClick}>click</button>
    </div>
  );
}

export default Effect;

```

当使用useEffect等hooks的变化依赖是引用类型值时，即使变化的不是依赖项，也会导致重复渲染。可以通过useCallback和useMemo来解决。

#### 3、配合React.memo优化不必要的渲染

所有依赖本地状态或props来创建函数，需要使用到缓存函数的地方，都是useCallback的应用场景。


比如以下[笔记内容](https://github.com/FunnyLiu/reactDemo/blob/master/useCallback/components/Memo.jsx#L1)


``` js
import React, { useCallback, useState, useEffect } from "react";

function Memo() {
//   return <DualCounter />;
  return <DualCounter2 />;
}

function CountButton({ onClick, count }) {
  console.log("render");
  return <button onClick={onClick}>{count}</button>;
}
//这种情况下，每点击一个按钮，都会引起两个组件的重新渲染
function DualCounter() {
  const [count1, setCount1] = React.useState(0);
  const increment1 = () => setCount1((c) => c + 1);

  const [count2, setCount2] = React.useState(0);
  const increment2 = () => setCount2((c) => c + 1);

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  );
}
//React.memo和useCallback的组合下，就可以达到只渲染自己的目的
const CountButton2 = React.memo(function CountButton({ onClick, count }) {
    console.log('render')
  return <button onClick={onClick}>{count}</button>;
});

function DualCounter2() {
  const [count1, setCount1] = React.useState(0);
  const increment1 = React.useCallback(() => setCount1((c) => c + 1), []);

  const [count2, setCount2] = React.useState(0);
  const increment2 = React.useCallback(() => setCount2((c) => c + 1), []);

  return (
    <>
      <CountButton2 count={count1} onClick={increment1} />
      <CountButton2 count={count2} onClick={increment2} />
    </>
  );
}

export default Memo;

```

使用两个相同组件，count变化后，两个组件都会渲染，其实我们只想渲染其中的一个，这种情况下利用React.memo和useCallback，就可以优化性能。


参考：

[【译】什么时候使用 useMemo 和 useCallback - 键落云起](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)


### useMemo用过没？使用场景是？

#### 1、惰性计算

部分复杂的计算依赖项变化再执行




``` js
import React, { useCallback, useState, useEffect, useMemo } from "react";

function UseMemo() {
  return <WithMemo />;
}

const WithMemo = function() {
  const [count, setCount] = useState(1);
  const [val, setValue] = useState("");
  const expensive = () => {
    console.log("执行了expensive");
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
      sum += i;
    }
    return sum;
  };
  const expensive2 = React.useMemo(() => {
    // 加入此处是一段大量运算的逻辑，实现了只有依赖项count变化时才会重新触发。达 到了性能优化的目的
    console.log("执行了expensive2");
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
      sum += i;
    }
    return sum;
  }, [count]);
  return (
    <div>
      {" "}
      <h4>
        {count}-{val}-{expensive()}
      </h4>
      <h4>
        {count}-{val}-{expensive2}
      </h4>{" "}
      <div>
        <button onClick={() => setCount(count + 1)}>+c1</button>
        <input
          value={val}
          onChange={(event) => setValue(event.target.value)}
        />{" "}
      </div>
      用能性化优来用般一
    </div>
  );
};

export default UseMemo;

```

#### 2、配合React.memo优化不必要的渲染

比如以下[笔记内容](https://github.com/FunnyLiu/reactDemo/blob/master/useCallback/components/Memo.jsx#L1)

``` js
import React, { useCallback, useState, useEffect } from "react";

function Memo() {
//   return <DualCounter />;
  return <DualCounter2 />;
}

function CountButton({ onClick, count }) {
  console.log("render");
  return <button onClick={onClick}>{count}</button>;
}
//这种情况下，每点击一个按钮，都会引起两个组件的重新渲染
function DualCounter() {
  const [count1, setCount1] = React.useState(0);
  const increment1 = () => setCount1((c) => c + 1);

  const [count2, setCount2] = React.useState(0);
  const increment2 = () => setCount2((c) => c + 1);

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  );
}
//React.memo和useCallback的组合下，就可以达到只渲染自己的目的
const CountButton2 = React.memo(function CountButton({ onClick, count }) {
    console.log('render')
  return <button onClick={onClick}>{count}</button>;
});

function DualCounter2() {
  const [count1, setCount1] = React.useState(0);
  const increment1 = React.useCallback(() => setCount1((c) => c + 1), []);

  const [count2, setCount2] = React.useState(0);
  const increment2 = React.useCallback(() => setCount2((c) => c + 1), []);

  return (
    <>
      <CountButton2 count={count1} onClick={increment1} />
      <CountButton2 count={count2} onClick={increment2} />
    </>
  );
}

export default Memo;

```

使用两个相同组件，count变化后，两个组件都会渲染，其实我们只想渲染其中的一个，这种情况下利用React.memo和useCallback，就可以优化性能。





参考：

[理解useMemo与useCallback的使用场景_ass_ace-CSDN博客](https://blog.csdn.net/baidu_39067385/article/details/111412255)


### useReducer用过没？比Redux好在哪里？

从代码量上看，useReducer简洁了很多很多，更易于编写和阅读。同时也减少了方法的定义、减少了命名的次数。

可以对比redux：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210519094634.png"/>

使用redux的步骤：

定义reducer

引入connect

定义mapStateToProps方法，mapDispatchToProps方法(分别用来接收state和dispatch)


这种写法并无些麻烦但如果写起大型项目，频繁地connect，频繁地定义mapStateToProps、mapDispatchToProps还是稍有一些麻烦。有一点必须要知道的是，在mapDispatchToProps中我们还要再定义一个方法，包裹那些需要dispatch的动作。


再来看看useReducer：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210519094719.png"/>

使用useReducer的步骤

定义reducer

useReducer引入reducer和初始值

从代码中可以看到我们通过useReducer，一句话的功夫就可以将state和dispatch引出，供view层使用。不需要像redux再引入connect，将组件connect起来，定义mapStateToProps，mapDispatchToProps，再供view层使用。


参考：

[react16.8版本更新中的useReducer想比起redux到底好在哪呢？](https://juejin.cn/post/6844904006020497422)



### react中state有层级很深，比如a.b.c.d，如果只更新c属性有哪些办法？


react推荐浅比较，但是如果非要这种深层次的，则可以通过深拷贝、深层拓展运算符或是immutable等库来解决。


``` js
// 主要考的是react的immutable, react推崇浅比较
// 对于react的PureComponent或者React.memo而言
// 如果只是修改了b的title，b引用未修改，那么将无法触发组件render

// 深拷贝对象
const oldState = {
   a: {
      b: {title: "old"},
   }
}
const newState = deepClone(oldState)
newState.a.b.title = "new"


// 生成新的b引用
const oldState = {
   a: {
      b: {title: "old"},
   }
}
const newState = {
     a:{
       b:{
         ...oldState.a.b,
         title: "new"
       }
     }
}

// 通过immutablejs 
// oldState是不可修改的，所以每次修改值之后
// 都会产生新的对象引用
import { Map } from 'immutable';

const oldState = Immutable.Map({
    a: {
      b: {title:"old"}
    }
  })
const newState = oldState.set('a', {b:{title:"new"}})
// true
oldState !== newState

```


### react中怎么处理异常？

使用错误边界。

这个是React16中新增的概念，错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获并处理发生在其子组件树任何位置的 JavaScript 错误，并且，我们也可以指定渲染出错误显示 UI。

错误边界的工作方式类似于 JavaScript 的 catch {}，不同的地方在于错误边界只针对 React 组件。只有 class 组件才可以成为成错误边界组件。大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它。

错误边界无法捕获以下场景中产生的错误：

事件处理

异步代码

服务端渲染

错误边界自身抛出来的错误（并非它的子组件）

举个例子：

``` js
import * as React from 'react'

export interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        if (error) {
            console.error(error)
        }
        if (info) {
            console.log(info)
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>出错了</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
```

也可以上报sentry比如：

``` js
  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }
```

参考：

[06-React异常处理 - 简书](https://www.jianshu.com/p/456509f44fbd)


### 错误边界怎么捕获异步错误

https://github.com/facebook/react/issues/14981#issuecomment-468460187

正常情况是捕获不了的，因为错误边界主要是为了捕获渲染错误。但是可以通过useState来hack：

``` js
setState(() => {
  throw new Error('hi')
})

```

所以也有类型的库专门干这事：
[react-error-boundary](https://github.com/bvaughn/react-error-boundary) 
``` js
function useErrorHandler(givenError?: unknown): (error: unknown) => void {
  const [error, setError] = React.useState<unknown>(null)
  if (givenError != null) throw givenError
  if (error != null) throw error
  return setError
}
```





### react可以写命令行？体验怎么样？

最近有一个库[ink](https://github.com/vadimdemedes/ink)，赋予了react写命令行UI的操作。下面提供一个本人在[yoso](https://github.com/Linjovi/yoso)开发时封装的一套流程：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/Jul-09-2019%2010-41-40.gif"/>

可以看到，非常流畅，这里更不谈其组件化后会有多少种可能性和效率提升。其原理可以参考下面的问题。

### 使用react操作cli的工具ink的原理是什么？

react在传统的web开发中，通过react，和react-dom两个包来配合使用。在app开发中则是react和react-native来完成。所以自然可以操作各种终端的前端开发。

[ink](https://github.com/vadimdemedes/ink)是一款基于react的操作bash的图形化工具。我在参与一个[开源项目yoso](https://github.com/Linjovi/yoso)的时候用到过。

这里简单介绍下它的原理。
首先它内置的部分组件如Color，[Text](https://github.com/vadimdemedes/ink/blob/v2.3.0/src/components/Text.js#L6)是直接基于[chalk](https://www.npmjs.com/package/chalk)，其他逻辑则是[在render时](https://github.com/vadimdemedes/ink/blob/v2.3.0/src/renderer.js#L21)，基于[wrap-ansi](https://github.com/chalk/wrap-ansi)来转化为命令行[asni转义码](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors_and_Styles)的。

---

## 原理



### react和react-dom的区别是什么？

react 包即是抽象逻辑，它包含了 React 的主干逻辑。例如组件实现、更新调度等。

react-dom 顾名思义就是一种针对 dom 的平台实现，主要用于在 web 端进行渲染。ReactDom 只做和浏览器或 DOM 相关的操作，例如 ReactDOM.render() 和 ReactDOM.findDOMNode()。如果是服务器端渲染，可以 ReactDOM.renderToString()。除这些以外的其他所有的事情都是 react 做的。

参考：

[为什么react和react-dom要分成两个包？ - 知乎](https://www.zhihu.com/question/336664883)

### React整体的工作流程和架构是什么样？

React16架构可以分为三层：

Scheduler（调度器）—— 核心职责只有 1 个, 就是执行回调

把react-reconciler提供的回调函数, 包装到一个任务对象中.

在内部维护一个任务队列, 优先级高的排在最前面.

循环消费任务队列, 直到队列清空.

Reconciler（协调器）—— 负责找出变化的组件，16版本主要是Fiber，15版本是stack。区别在于增加了优先级系统，通过遍历的方式实现可中断的递归，将fiber树的构造过程包装在一个回调函数中, 并将此回调函数传入到scheduler包等待调度.

Renderer（渲染器）—— 负责将变化的组件渲染到页面上，能够将react-reconciler包构造出来的fiber树表现出来, 生成 dom 节点(浏览器中), 生成字符串(ssr)，比如说react-dom、react-native

三者关系：

![img](https://raw.githubusercontent.com/brizer/graph-bed/master/img/20211109094218.png)

参考：

[FunnyLiu/react-1 at readsource](https://github.com/FunnyLiu/react-1/tree/readsource#react%E6%9E%B6%E6%9E%84%E6%80%8E%E4%B9%88%E5%88%92%E5%88%86)


### React.createElement是做什么？


JSX会被编译为React.createElement，让我们看看他做了什么：

[源码实现](https://github.com/FunnyLiu/react-1/blob/readsource/packages/react/src/ReactElement.js#L351)

我们可以看到，React.createElement最终会调用ReactElement方法返回一个包含组件数据的对象，该对象有个参数$$typeof: REACT_ELEMENT_TYPE标记了该对象是个React Element。

换言之，在React中，所有JSX在运行时的返回结果（即React.createElement()的返回值）都是React Element。




### JSX/ReactElement/Fiber/Dom之间的关系是什么？

JSX是一种描述当前组件内容的数据结构，他不包含组件schedule、reconcile、render所需的相关信息。

所有采用jsx语法书写的节点, 都会被编译器转换, 最终会以React.createElement(...)的方式, 创建出来一个与之对应的ReactElement对象。

fiber对象是通过ReactElement对象进行创建的, 多个fiber对象构成了一棵fiber树, fiber树是构造DOM树的数据模型, fiber树的任何改动, 最后都体现到DOM树。

DOM将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合, 也就是常说的DOM树. JavaScript可以访问和操作存储在 DOM 中的内容, 也就是操作DOM对象, 进而触发 UI 渲染.

参考：

[FunnyLiu/react-1 at readsource](https://github.com/FunnyLiu/react-1/tree/readsource#fiberreactelementdom%E4%B8%89%E8%80%85%E5%85%B3%E7%B3%BB)


### React15的StackReconciler和React16的FiberReconciler有什么区别？

Fiber Reconciler是从Stack Reconciler重构而来，通过遍历的方式实现可中断的递归。


参考：

[FunnyLiu/react-1 at readsource](https://github.com/FunnyLiu/react-1/tree/readsource#react15%E5%92%8C16%E7%9A%84reconciler%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)

[React技术揭秘](https://react.iamkasong.com/preparation/newConstructure.html#react16%E6%9E%B6%E6%9E%84)


### Reconciler主要是做什么的？


此处先归纳一下react-reconciler包的主要作用, 将主要功能分为 4 个方面:

输入: 暴露api函数(如: scheduleUpdateOnFiber), 供给其他包(如react包)调用.

注册调度任务: 与调度中心(scheduler包)交互, 注册调度任务task, 等待任务回调.

执行任务回调: 在内存中构造出fiber树, 同时与与渲染器(react-dom)交互, 在内存中创建出与fiber对应的DOM节点.

输出: 与渲染器(react-dom)交互, 渲染DOM节点.


![](https://raw.githubusercontent.com/brizer/graph-bed/master/img/20211109094806.png)

图中的1,2,3,4步骤可以反映react-reconciler包从输入到输出的运作流程,这是一个固定流程, 每一次更新都会运行.


### Fiber是什么？数据结构是怎么样？

在React15及以前，Reconciler采用递归的方式创建虚拟DOM，递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，React16将递归的无法中断的更新重构为异步的可中断更新，由于曾经用于递归的虚拟DOM数据结构已经无法满足需要。于是，全新的Fiber架构应运而生。

Fiber包含三层含义：

作为架构来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为stack Reconciler。React16的Reconciler基于Fiber节点实现，被称为Fiber Reconciler。

作为静态的数据结构来说，每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。

作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

数据结构如下：

``` js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  // 指向父级Fiber节点
  this.return = null;
  // 指向子Fiber节点
  this.child = null;
  // 指向右边第一个兄弟Fiber节点
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}

```

### Fiber是怎么工作的？

在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的Fiber树称为current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树。

每次状态更新都会产生新的workInProgress Fiber树，通过current与workInProgress的替换，完成DOM更新。

### React16的的render阶段做了什么事情？


**先整体介绍**：

React 16 之前的渲染流程： jsx 编译出的 render function 执行后产生 vdom，递归渲染 vdom，也就是增删改 dom，实现 render 和 patch

React 16 之后的渲染流程： jsx 编译出的 render function 执行后产生 vdom，通过空闲调度来慢慢的把 vdom 转成 fiber，vdom 转 fiber 的过程叫做 reconcile，最后都转完了就一次性渲染 fiber，也就是 commit，这样实现的 render 和 patch。之所以多了一层 vdom 转 fiber，是为了避免递归 patch 的时候需要做对比，而是通过可打断的方式来逐步计算如何修改 dom （是增、是删还是改）记录到 fiber 上，最后直接根据 fiber 直接增删改 dom




再详细描述：



render阶段，根据组件返回的JSX在内存中依次创建Fiber节点并连接在一起构建Fiber树。

“递”阶段

首先从rootFiber开始向下深度优先遍历。为遍历到的每个Fiber节点调用beginWork方法。

该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

“归”阶段

在“归”阶段会调用completeWork处理Fiber节点。

当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点（即fiber.sibling !== null），会进入其兄弟Fiber的“递”阶段。

如果不存在兄弟Fiber，会进入父级Fiber的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到rootFiber。至此，render阶段的工作就结束了。


举个例子：

``` js

function App() {
  return (
    <div>
      i am
      <span>KaSong</span>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
```

生成的Fiber树为：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20211104154724.png"/>

其render阶段会执行：

1. rootFiber beginWork
2. App Fiber beginWork
3. div Fiber beginWork
4. "i am" Fiber beginWork
5. "i am" Fiber completeWork
6. span Fiber beginWork
7. span Fiber completeWork
8. div Fiber completeWork
9. App Fiber completeWork
10. rootFiber completeWork



### render阶段的beginWork究竟做了什么？

beginWork的工作是传入当前Fiber节点，创建子Fiber节点。[源码在此](https://github.com/FunnyLiu/react-1/blob/readsource/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3214)

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20211104155833.png"/>

### render阶段的completeWork究竟做了什么？

completeWork属于“归”阶段调用的函数，每次调用appendAllChildren时都会将已生成的子孙DOM节点插入当前生成的DOM节点下。那么当“归”到rootFiber时，我们已经有一个构建好的离屏DOM树。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20211104160616.png"/>




### Diff算法到底是做什么的？

一个DOM节点在某一时刻最多会有4个节点和他相关。

1、current Fiber。如果该DOM节点已在页面中，current Fiber代表该DOM节点对应的Fiber节点。

2、workInProgress Fiber。如果该DOM节点将在本次更新中渲染到页面中，workInProgress Fiber代表该DOM节点对应的Fiber节点。

3、DOM节点本身。

4、JSX对象。即ClassComponent的render方法的返回结果，或FunctionComponent的调用结果。JSX对象中包含描述DOM节点的信息。

Diff算法的本质是对比1和4，生成2。


### Diff算法怎么优化复杂度？


由于Diff操作本身也会带来性能损耗，React文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中n是树中元素的数量。

如果在React中使用了该算法，那么展示1000个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。

为了降低算法复杂度，React的diff会预设三个限制：

1、只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。

2、两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。

3、开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。考虑如下例子：

``` js
// 更新前
<div>
  <p key="ka">ka</p>
  <h3 key="song">song</h3>
</div>

// 更新后
<div>
  <h3 key="song">song</h3>
  <p key="ka">ka</p>
</div>

```

如果没有key，React会认为div的第一个子节点由p变为h3，第二个子节点由h3变为p。这符合限制2的设定，会销毁并新建。

但是当我们用key指明了节点前后对应关系后，React知道key === "ka"的p在更新后还存在，所以DOM节点可以复用，只是需要交换下顺序。

这就是React为了应对算法性能瓶颈做出的三条限制


### Diff算法具体怎么实现？

[源码在此](https://github.com/FunnyLiu/react-1/blob/readsource/packages/react-reconciler/src/ReactChildFiber.new.js#L1213)


前面提到，React为了优化复杂度只对同级元素进行Diff。我们可以从同级的节点数量将Diff分为两类：

1、当newChild类型为object、number、string，代表同级只有一个节点

2、当newChild类型为Array，同级有多个节点

针对同级有单个节点的情况：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20211104195437.png"/>

React通过先判断key是否相同，如果key相同则判断type是否相同，只有都相同时一个DOM节点才能复用。

针对同级有多个节点的情况：

如果让我设计一个Diff算法，我首先想到的方案是：

判断当前节点的更新属于哪种情况

如果是新增，执行新增逻辑

如果是删除，执行删除逻辑

如果是更新，执行更新逻辑

按这个方案，其实有个隐含的前提——不同操作的优先级是相同的

但是React团队发现，在日常开发中，相较于新增和删除，更新组件发生的频率更高。所以Diff会优先判断当前节点是否属于更新。

由于diff主要是对比Fiber（单链表）和jsx的区别，所以双指针优化无法使用。

基于以上原因，Diff算法的整体逻辑会经历两轮遍历：

第一轮遍历：处理更新的节点。

第二轮遍历：处理剩下的不属于更新的节点。

第一轮遍历步骤如下：

1、let i = 0，遍历newChildren，将newChildren[i]与oldFiber比较，判断DOM节点是否可复用。

2、如果可复用，i++，继续比较newChildren[i]与oldFiber.sibling，可以复用则继续遍历。

3、如果不可复用，分两种情况：

key不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。

key相同type不同导致不可复用，会将oldFiber标记为DELETION，并继续遍历

4、如果newChildren遍历完（即i === newChildren.length - 1）或者oldFiber遍历完（即oldFiber.sibling === null），跳出遍历，第一轮遍历结束。

其他具体参考：https://react.iamkasong.com/diff/multi.html


### React的diff为什么用不了双指针优化？

在我们做数组相关的算法题时，经常使用双指针从数组头和尾同时遍历以提高效率，但是这里却不行。

虽然本次更新的JSX对象 newChildren为数组形式，但是和newChildren中每个组件进行比较的是current fiber，同级的Fiber节点是由sibling指针链接形成的单链表，即不支持双指针遍历。

即 newChildren[0]与fiber比较，newChildren[1]与fiber.sibling比较。

所以无法使用双指针优化。


### React组件什么时候会重新渲染？

当内部data发生改变，state发生改变(通过调用this.setState()) 以及父组件传过来的props发生改变时，会导致组件重新渲染。

### React如何避免重复渲染？

react生命周期中有这样一个钩子，叫shouldComponentUpdate函数，是重渲染时render()函数调用前被调用的函数，两个参数 nextProps和nextState ，分别表示下一个props和state的值。当函数返回false时，阻止接下来的render()函数的调用，阻止组件重渲染，返回true时，组件照常渲染。 前后不改变state的值的setState和无数据交换的父组件的重渲染都会导致组件的重渲染，但我们可以通过shouldComponentUpdate来阻止这两种情况，shouldComponentUpdate并不是完美的，只能阻止扁平的对象，这时候可以考虑​​Immutable.js​​(Immutable.js 的基本原则是对于不变的对象返回相同的引用，而对于变化的对象，返回新的引用)或者​​PureRenderMixin​​ 插件。

### Fiber原理

Fiber：一种将 recocilation （递归 diff），拆分成无数个小任务的算法；它随时能够停止，恢复。停止恢复的时机取决于当前的一帧（16ms）内，还有没有足够的时间允许计算。


在了解Fiber前，需要先了解virtual DOM的相关原理，可以参考[Vue中Virtual DOM到底是什么？如何实现的？](https://omnipotent-front-end.github.io/library/vue.html#vue2-x%E4%B8%AD%E7%9A%84virtual-dom%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E7%9A%84%EF%BC%9F)

然后[Fiber要解决的问题](https://reactjs.org/docs/reconciliation.html)，主要是大量DOM在进行渲染时的卡顿情况。

Fiber Tree相比之前的Virtual DOM，不再仅仅是dom的基本属性了，还增加了任务调度相关的信息。

**整个结构是一个链表树**。每个工作单元（fiber）执行完成后，都会查看是否还继续拥有主线程时间片，如果有继续下一个，如果没有则先处理其他高优先级事务，等主线程空闲下来继续执行。

对比图：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710155311.png"/>


Fiber解决任务调度的方式，主要是使用了[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)和[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)两个API。

整个Fiber的reconciler过程分为两个阶段：

1、（可中断）render/reconciliation 通过构造workInProgress tree得出change

2、（不可中断）commit 应用这些DOM change

render/reconciliation流程如下：

1、如果当前节点不需要更新，直接把子节点clone过来，跳到5；要更新的话打个tag

2、更新当前节点状态（props, state, context等）

3、调用shouldComponentUpdate()，false的话，跳到5

4、调用render()获得新的子节点，并为子节点创建fiber（创建过程会尽量复用现有fiber，子节点增删也发生在这里）

5、如果没有产生child fiber，该工作单元结束，把effect list归并到return，并把当前节点的sibling作为下一个工作单元；否则把child作为下一个工作单元

6、如果没有剩余可用时间了，等到下一次主线程空闲时才开始下一个工作单元；否则，立即开始做

7、如果没有下一个工作单元了（回到了workInProgress tree的根节点），第1阶段结束，进入pendingCommit状态

实际上是**1-6的工作循环**，7是出口，工作循环每次只做一件事，做完看要不要喘口气。工作循环结束时，workInProgress tree的根节点身上的effect list就是收集到的所有side effect（因为每做完一个都向上归并）

所以，**构建workInProgress tree的过程就是diff的过程**，**通过requestIdleCallback来调度执行一组任务，每完成一个任务后回来看看有没有插队的（更紧急的）**，每完成一组任务，把时间控制权交还给主线程，直到下一次requestIdleCallback回调再继续构建workInProgress tree。

commit阶段是一气呵成的，如下流程：

1、处理effect list（包括3种处理：更新DOM树、调用组件生命周期函数以及更新ref等内部状态）

2、所有更新都commit到DOM树上了


### React Hooks的原理

首先，如果不了解Hooks是什么，先学习[官方文档](https://reactjs.org/docs/hooks-intro.html)，然后我也开发了一个基于Hooks的[todomvc](https://github.com/FunnyLiu/reactDemo/tree/master/todomvc_hook)。

然后再看看Hooks的原理。

内容选自[一篇染陌同学的译文](https://github.com/answershuto/Blog/blob/master/blogs/(%E8%AF%91)Reacthooks%EF%BC%9A%E5%AE%83%E4%B8%8D%E6%98%AF%E4%B8%80%E7%A7%8D%E9%AD%94%E6%B3%95%EF%BC%8C%E5%8F%AA%E6%98%AF%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84%E2%80%94%E2%80%94%E4%BD%BF%E7%94%A8%E5%9B%BE%E8%A1%A8%E6%8F%AD%E7%A7%98%E6%8F%90%E6%A1%88%E8%A7%84%E5%88%99.MarkDown)
**Hooks的状态管理都是依赖数组的**。但是在React的实现中是**以单链表的数据结构**来完成的。
以一个简单的使用`useState()`的组件为例：
``` js
function RenderFunctionComponent() {
  const [firstName, setFirstName] = useState("Rudi");
  const [lastName, setLastName] = useState("Yardley");

  return (
    <Button onClick={() => setFirstName("Fred")}>Fred</Button>
  );
}
```

React在渲染时做做如下步骤：

1、初始化

创建两个空数组“setters”与“state”

设置指针“cursor”为 0

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190705163608.png"/>

2、首次渲染

首次执行组件函数

每当 useState() 被调用时，如果它是首次渲染，它会通过 push 将一个 setter 方法（绑定了指针“cursor”位置）放进 setters 数组中，同时，也会将另一个对应的状态放进 state 数组中去。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190705163821.png"/>

3、后续渲染

每次的后续渲染都会重置指针“cursor”的位置，并会从每个数组中读取对应的值。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190705163903.png"/>

4、事件处理

每个 setter 都会有一个对应的指针位置的引用，因此当触发任何 setter 调用的时候都会触发去改变状态数组中的对应的值。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190705164049.png"/>

代码实现如下：

``` js
// 通过闭包来完成对数据的存储，方便在函数中去有状态的使用
let state = [];
let setters = [];
let firstRun = true;
let cursor = 0;

function createSetter(cursor) {
  return function setterWithCursor(newVal) {
    state[cursor] = newVal;
  };
}

/* 译:https://github.com/answershuto */
// This is the pseudocode for the useState helper
export function useState(initVal) {
  if (firstRun) {
    state.push(initVal);
    setters.push(createSetter(cursor));
    firstRun = false;
  }

  const setter = setters[cursor];
  const value = state[cursor];

  cursor++;
  return [value, setter];
}

/* 译:https://github.com/answershuto */
// Our component code that uses hooks
function RenderFunctionComponent() {
  const [firstName, setFirstName] = useState("Rudi"); // cursor: 0
  const [lastName, setLastName] = useState("Yardley"); // cursor: 1

  return (
    <div>
      <Button onClick={() => setFirstName("Richard")}>Richard</Button>
      <Button onClick={() => setFirstName("Fred")}>Fred</Button>
    </div>
  );
}

// This is sort of simulating Reacts rendering cycle
function MyComponent() {
  cursor = 0; // resetting the cursor
  return <RenderFunctionComponent />; // render
}

console.log(state); // Pre-render: []
MyComponent();
console.log(state); // First-render: ['Rudi', 'Yardley']
MyComponent();
console.log(state); // Subsequent-render: ['Rudi', 'Yardley']

// click the 'Fred' button

console.log(state); // After-click: ['Fred', 'Yardley']
```

### React Hooks为什么不能在循环、条件或者嵌套函数中调用

这个问题，如果了解了其原理，就比较容易想得通了。
可以模拟一下

``` js
let firstRender = true;

function RenderFunctionComponent() {
  let initName;
  
  if(firstRender){
    [initName] = useState("Rudi");
    firstRender = false;
  }
  const [firstName, setFirstName] = useState(initName);
  const [lastName, setLastName] = useState("Yardley");

  return (
    <Button onClick={() => setFirstName("Fred")}>Fred</Button>
  );
}
```

我们在条件语句中调用了 useState 函数，让我们看看它对整个系统造成的破坏。

首次渲染：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190705164512.png"/>

第二次渲染

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190705164558.png"/>

现在 firstName 与 lastName 这两个变量全部被设置为“Rudi”，与我们实际的存储状态不符。

这个例子的用法显然是不正确的，但是它让我们知道了为什么我们必须使用 React 团队规定的规则去使用 Hooks。



### hooks为什么用单链表存储而不是数组？

首先说明下，react的hook是单链表的结构，而fre的hook则是数组结构。数组结构和单链表结构可以实现hook。

但是我们在选择数据结构的时候需要考虑场景，hook的场景需要的是顺序访问，不需要随机访问；链表面对插入的场景，复杂度更低；数组会存在爆栈的隐患，而链表不会。

根据132的介绍，hook用数组更好，effectlist和fiber用链表更好，因为hook不需要插入、也不会出现量大到爆栈的情况，而react团队当年是能不用数组就不用数组的政治正确。

### hook为什么不能在条件判断中使用？

hook无论用数组还是链表，都无法解决这个问题，因为hook只初始化一次，但需要执行多次。if-else会干扰初始化的顺序。

而vue3的就没有这个问题，因为vue3不需要反复执行，所以顺序不会发生变化。



### React在批量处理事件时，是否需要开发者手动进行事件代理？为什么？

不需要，因为React自己内部已经做了处理，将所有在JSX上绑定的事件都集中代理到了document上。具体可以参考[官网](https://zh-hans.reactjs.org/docs/events.html)。

这样的好处在于，在底层封装一套event，跨端跨浏览器保持统一的API风格。


### React.memo做了什么？怎么做的？

React.memo(...) 对应的是函数组件，React.PureComponent 对应的是类组件。

React.memo 会返回了一个纯组件 MemodFuncComponent。 我们将在 JSX 标记中渲染此组件。 每当组件中的 props 和 state 发生变化时，React 将检查 上一个 state 和 props 以及下一个 props 和 state 是否相等，如果不相等则函数组件将重新渲染，如果它们相等则函数组件将不会重新渲染。


从实现的角度来看，React.memo方法只是在组件上增加了一个标识位：[笔记内容](https://github.com/FunnyLiu/react-1/blob/readsource/packages/react/src/ReactMemo.js#L27)

``` js
  //相当于带上了一个标识的type
  const elementType = {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare,
  };
```

然后在Fiber阶段会针对这个类似额外做适配[笔记内容](https://github.com/FunnyLiu/react-1/blob/readsource/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3603)：

``` js
    case MemoComponent: {

      //Memo组件会去走这个逻辑
      return updateMemoComponent(
        current,
        workInProgress,
        type,
        resolvedProps,
        updateLanes,
        renderLanes,
      );
    }
```

该方法会进行compare比较[笔记内容](https://github.com/FunnyLiu/react-1/blob/readsource/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L490)：

``` js
    // 如果两次props相等
    if (compare(prevProps, nextProps) && current.ref === workInProgress.ref) {
      //直接返回，不再进行下面的fiber操作。
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
```

如果比较结果一致，就不进行后续Fiber流程。



参考：

[Web 性能优化： 使用 React.memo() 提高 React 组件性能 - SegmentFault 思否](https://segmentfault.com/a/1190000018444604)




### React.memo和PureComponent有什么区别？

React.PureComponent 是 ES6 类的组件

React.memo(...) 是函数组件

React.PureComponent 优化 ES6 类组件中的重新渲染

React.memo(...) 优化函数组件中的重新渲染


参考：

[Web 性能优化： 使用 React.memo() 提高 React 组件性能 - SegmentFault 思否](https://segmentfault.com/a/1190000018444604)

### React.lazy做了什么？怎么做的？

它能让你像渲染常规组件一样处理动态引入的组件，配合 webpack 的 Code Splitting ，只有当组件被加载，对应的资源才会导入 ，从而达到懒加载的效果。

``` js
// 不使用 React.lazy
import OtherComponent from './OtherComponent';
// 使用 React.lazy
const OtherComponent = React.lazy(() => import('./OtherComponent'))
```

React.lazy 需要配合 Suspense 组件一起使用，在 Suspense 组件中渲染 React.lazy 异步加载的组件。如果单独使用 React.lazy，React 会给出错误提示。


React.lazy不支持服务端渲染，使用服务端渲染的同学，请绕行至 react-loadable和 loadable-components。

从实现上来看，React.lazy其实是给组件增加了标识位和回调函数[笔记内容](https://github.com/FunnyLiu/react-1/blob/readsource/packages/react/src/ReactLazy.js#L104)。

``` js
//React.Lazy实现
export function lazy<T>(
  ctor: () => Thenable<{default: T, ...}>,
): LazyComponent<T, Payload<T>> {
  const payload: Payload<T> = {
    // We use these fields to store the result.
    //用来标记
    _status: -1,
    _result: ctor,
  };
  //增加标识位
  const lazyType: LazyComponent<T, Payload<T>> = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: payload,
    _init: lazyInitializer,
  };
}
```


然后在fiber的开始阶段，而不是整个项目初始化的阶段。再去执行传入的thenable函数[笔记内容](https://github.com/FunnyLiu/react-1/blob/readsource/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L1278)

``` js
    //如果是lazy组件的话，走单独的流程
    case LazyComponent: {
      const elementType = workInProgress.elementType;
      return mountLazyComponent(
        current,
        workInProgress,
        elementType,
        updateLanes,
        renderLanes,
      );
    }
```


参考：

[这就是你日思夜想的 React 原生动态加载 - 政采云前端团队](https://www.zoo.team/article/react-lazy-suspense)


### class组件为什么需要绑定this

这其实是javascript的一个问题。

我们可以看看：

``` js
class Foo {
  constructor(name){
    this.name = name
    //this.display = this.display.bind(this);
  }
  
  display(){
    console.log(this.name);
  }
}

var foo = new Foo('Saurabh');
foo.display(); // Saurabh

var display = foo.display;
display(); // Error
```
正常情况下，对象方法是可以访问到this的。但是如果把函数给拷贝给另一个对象时，这个this就会丢失。

来看看React是怎么用的：

``` js
class Foo extends React.Component{
  constructor( props ){
    super( props );
  }
    
  handleClick(event){
    console.log(this); // 'this' is undefined
  }
    
  render(){
    return (
      <button type="button" onClick={this.handleClick}>
        Click Me
      </button>
    );
  }
}

ReactDOM.render(
  <Foo />,
  document.getElementById("app")
);

```

onClick相对是与函数拷贝给了下一个组件，所以this就丢失了。

### 怎么解决this丢失问题

有很多方式，有onClick中bindthis，或者箭头函数，或者autobind库里完成。

也可以基于

``` js
// 方式二
class B {
    print = () => {
    	console.log('print b');
    }
}

```


这也是react支持的方案。

参考：

[ES6 Class Methods 定义方式的差异 · Issue #67 · dwqs/blog](https://github.com/dwqs/blog/issues/67)


### 为什么用箭头函数可以解决？

在箭头函数出现之前，每个新定义的函数都有它自己的 this 值，但箭头函数不会创建自己的 this，它从会从自己的作用域链的上一层继承 this。

直接箭头函数就是把箭头函数绑定到当前class 构造函数的this上。而普通函数传统方式则是prototype上。

``` js
class B {
    print = () => {
    	console.log('print b');
    }
}

class D extends B {
    print () {
	  super.print();
          console.log('print d');
    }
}

const d = new D();
d.print();
// print b
```
编译后为：
``` js
var B = function B() {
   _classCallCheck(this, B);

   this.print = function () {
      console.log('print b');
   };
};
function D () {
    // 继承自 B
    this.print = function () {
	console.log('print b');
    }
}

// 通过原型实现继承
D.__proto__ = B;
D.prototype.__proto__ === B.prototype;

D.prototype.print = function () {
    // 类 D 自身定义的 print 方法
}
const d = new D();
d.print();

```

### Concurrent Mode是什么？

Concurrent 模式是一组 React 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整。

从源码层面讲，Concurrent Mode是一套可控的“多优先级更新架构”。


Concurrent Mode是React过去2年重构Fiber架构的源动力，也是React未来的发展方向。

可以预见，当v17完美支持Concurrent Mode后，v18会迎来一大波基于Concurrent Mode的库。


到要实现Concurrent Mode，最关键的一点是：实现异步可中断的更新。

基于这个前提，React花费2年时间重构完成了Fiber架构。

Fiber架构的意义在于，他将单个组件作为工作单元，使以组件为粒度的“异步可中断的更新”成为可能。

### Scheduler（调度器）是做什么的？

如果我们同步运行Fiber架构（通过ReactDOM.render），则Fiber架构与重构前并无区别。

但是当我们配合时间切片，就能根据宿主环境性能，为每个工作单元分配一个可运行时间，实现“异步可中断的更新”。

于是，scheduler （调度器）产生了。

Scheduler，他包含两个功能：

时间切片

优先级调度


### 时间切片的原理

时间切片的本质是模拟实现requestIdleCallback 。

除去“浏览器重排/重绘”，下图是浏览器一帧中可以用于执行JS的时机。

```
一个task(宏任务) -- 队列中全部job(微任务) -- requestAnimationFrame -- 浏览器重排/重绘 -- requestIdleCallback
```

requestIdleCallback是在“浏览器重排/重绘”后如果当前帧还有空余时间时被调用的。

Scheduler的时间切片功能是通过task（宏任务）实现的。

最常见的task当属setTimeout了。但是有个task比setTimeout执行时机更靠前，那就是MessageChannel 。

所以Scheduler将需要被执行的回调函数作为MessageChannel的回调执行。如果当前宿主环境不支持MessageChannel，则使用setTimeout。

在React的render阶段，开启Concurrent Mode时，每次遍历前，都会通过Scheduler提供的shouldYield方法判断是否需要中断遍历，使浏览器有时间渲染：

``` js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

是否中断的依据，最重要的一点便是每个任务的剩余时间是否用完。

在Schdeduler中，为任务分配的初始剩余时间为5ms。随着应用运行，会通过fps动态调整分配给任务的可执行时间。[源码在此](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L172-L187)

### 优先级调度的原理

Scheduler内部存在5种优先级。

设想一个大型React项目，在某一刻，存在很多不同优先级的任务，对应不同的过期时间。

同时，又因为任务可以被延迟，所以我们可以将这些任务按是否被延迟分为：

已就绪任务

未就绪任务

所以，Scheduler存在两个队列：

timerQueue：保存未就绪任务

taskQueue：保存已就绪任务

每当有新的未就绪的任务被注册，我们将其插入timerQueue并根据开始时间重新排列timerQueue中任务的顺序。

当timerQueue中有任务就绪，即startTime <= currentTime，我们将其取出并加入taskQueue。

取出taskQueue中最早过期的任务并执行他。

为了能在O(1)复杂度找到两个队列中时间最早的那个任务，Scheduler使用小顶堆实现了优先级队列。



## 编码

### 实现一个自定义hook（todo）？

