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

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210301145123.png"/>

挂载阶段:

constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this

getDerivedStateFromProps: static getDerivedStateFromProps(nextProps, prevState),这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps

render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容

componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅

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


### React 中的 setState 是同步还是异步？


setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。

setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。

参考：

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904#heading-3)

### React 中 setState 后想要拿到更新的state值应该怎么处理？（todo）



### React 中受控组件和非受控组件的区别？(todo)

### 在哪些场景应该使用非受控组件？(todo)


### React组件之间怎么通信？

父组件向子组件通讯: 父组件可以向子组件通过传 props 的方式，向子组件进行通讯

子组件向父组件通讯: props+回调的方式,父组件向子组件传递props进行通讯，此props为作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中

兄弟组件通信: 找到这两个兄弟节点共同的父节点,结合上面两种方式由父节点转发信息进行通信

跨层级通信: Context设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言,对于跨越多层的全局数据通过Context通信再适合不过

发布订阅模式: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引入event模块进行通信

全局状态管理工具: 借助Redux或者Mobx等全局状态管理工具进行通信,这种工具会维护一个全局状态中心Store,并根据不同的事件产生新的状态



参考：

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904#heading-3)



### useCallback用过没？使用场景是？

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

### react如何将O(n3)的算法降低到O(n)级别的？

传统的 diff 算法通过循环递归对节点一次对比，效率很低，复杂度达到 O(n3), 其中 n 是树中节点的总数。

React的优化策略为3点：

1、同级比较

对于两个 DOM tree **只比较同一层次的节点**，忽略 DOM 中节点跨层级的移动操作。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。

2、同组件比较

diff 算法当**遇到组件变化时，不会比较两个组件的不同**，因为这种比较几乎没有意义。

3、子元素比较

当节点处于同一层级时，React diff 提供了三种节点操作，分别是增加、移动和删除。

通常情况下 diff 在比较集合 [A, B, C, D] 和 [D, A, B,C] 时，会按位置逐个对比，发现每个位置的元素都有更新，就把旧集合全部移除替换成新的集合。这种比较是不合理的，合理的方式是复用 A，B，C 而将末尾的 D 移动到集合最前面。

React对这一现象做出了一个高效的策略：**允许开发者对同一层级的同组子节点添加唯一key值进行区分**。
在开发过程中，同层级的节点添加唯一key值可以极大提升性能，尽量减少将最后一个节点移动到列表首部的操作，当节点达到一定的数量以后或者操作过于频繁，在一定程度上会影响React的渲染性能。

**React 通过上面3种策略将原本 O(n3) 的算法复杂度降低到 O(n)**。

至于具体如何比较，可以参考：[vue中的key有什么用？为什么会优化diff算法的速度？](/library/vue.html#vue%E4%B8%AD%E7%9A%84key%E6%9C%89%E4%BB%80%E4%B9%88%E7%94%A8%EF%BC%9F%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E4%BC%98%E5%8C%96diff%E7%AE%97%E6%B3%95%E7%9A%84%E9%80%9F%E5%BA%A6%EF%BC%9F)

参考：

[React diff 算法 | Hongxu's Blog](https://hongxuwei.github.io/2018/06/21/%E7%AE%97%E6%B3%95/React-diff-%E7%AE%97%E6%B3%95/index.html)


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
**Hooks的状态管理都是依赖数组的**。
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


### React在批量处理事件时，是否需要开发者手动进行事件代理？为什么？

不需要，因为React自己内部已经做了处理，将所有在JSX上绑定的事件都集中代理到了document上。具体可以参考[官网](https://zh-hans.reactjs.org/docs/events.html)。

这样的好处在于，在底层封装一套event，跨端跨浏览器保持统一的API风格。



## 编码

### 实现一个自定义hook（todo）？

