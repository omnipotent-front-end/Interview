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

### 为什么要使用Hooks，解决了class什么问题？

class组件经历了`React.createClass`，`React.Component`,也经历了constructor的super，bind this到class filed的坑。

生命周期的设计也越来越复杂多变，**为了复用生命周期的逻辑，class组件是通过HOC来完成**。但是HOC的滥用会带来额外的维护性，和不可理解性。

而hooks的扁平处理可以完美解决这些问题。


参考：

[Why React Hooks? - YouTube](https://www.youtube.com/embed/eX_L39UvZes)



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

