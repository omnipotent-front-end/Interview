# React

## Web

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


## Cli

### 使用react操作cli的工具ink的原理是什么？

react在传统的web开发中，通过react，和react-dom两个包来配合使用。在app开发中则是react和react-native来完成。所以自然可以操作各种终端的前端开发。

[ink](https://github.com/vadimdemedes/ink)是一款基于react的操作bash的图形化工具。我在参与一个[开源项目yoso](https://github.com/Linjovi/yoso)的时候用到过。

这里简单介绍下它的原理。
首先它内置的部分组件如Color，[Text](https://github.com/vadimdemedes/ink/blob/v2.3.0/src/components/Text.js#L6)是直接基于[chalk](https://www.npmjs.com/package/chalk)，其他逻辑则是[在render时](https://github.com/vadimdemedes/ink/blob/v2.3.0/src/renderer.js#L21)，基于[wrap-ansi](https://github.com/chalk/wrap-ansi)来转化为命令行[asni转义码](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors_and_Styles)的。
