# Javascript

## 语言基础

### let在全局作用域声明的变量在window上吗？

在ES5中，全局变量直接挂载到全局对象的属性上，所以能在window上看到var声明的变量

在ES6中，全局对象的属性和全局变量脱钩，但是为了保持兼容性，旧的不变，所以var、function声明的全局变量依然可以在window对象上看到，而let、const声明的全局变量在window对象上看不到

### 说说对bind,apply,call的理解？

apply、call 和 bind 都是为了**改变某个函数运行时的上下文**而存在的，其实就是为了**改变所调用的函数体内部 this 的指向**。

bind方法只是替换了所调用方法的this指向，并不会主动去执行这个方法，而是**返回一个全新的函数**；

而apply和call方法是即改变了this指向，又立即执行。**区别在于call是将参数一个个的传入，而apply是将参数以数组的形式传入**。



### call和apply有什么区别？哪个性能更好？

call和apply就是为了动态地改变this的指向，两者的区别在于call是将参数一个个的传入，而apply是将参数以数组的形式传入。

``` js
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])
```

ES6加入了扩展运算符后，不再需要apply：
``` js
let params = [1,2,3,4]
xx.call(obj, ...params)
```

**call的性能比apply要好**,可以参考[call和apply的性能对比](https://github.com/noneven/__/issues/6)


### 0.1+0.2等于多少？为什么？怎么解决这种问题？

0.30000000000000004，JavaScript遵循 IEEE 754 规范。

在JavaScript中，所有的Number都是以64-bit的双精度浮点数存储的；
双精度的浮点数在这64位上划分为3段，而这3段也就确定了一个浮点数的值，64bit的划分是“1-11-52”的模式，具体来说：

1.就是1位最高位（最左边那一位）表示符号位，0表示正，1表示负；

2.11位表示指数部分；

3.52位表示尾数部分，也就是有效域部分

解决方案：

[bignumber](https://github.com/MikeMcl/bignumber.js)

[BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt): JavaScript 中的任意精度整数(新提案)

[参考](https://github.com/airuikun/Weekly-FE-Interview/issues/27)

### for-in 和 for-of的区别？

**for...in循环出的是key，for...of循环出的是value**。

但是：

for...of语句在**可迭代对象**(包括 **Array, Map, Set, String, TypedArray，arguments 对象等等**)上创建一个迭代循环，对每个不同属性的属性值,调用一个自定义的有执行语句的迭代挂钩.

也就是说，**for of只可以循环可迭代对象的可迭代属性**，不可迭代属性在循环中被忽略了。




### 对象属性的可枚举性是什么意思？会影响哪些操作？

对象属性可分为可枚举和不可枚举，区别在于enumerable的值。
Object对象的**propertyIsEnumerable**()方法可以判断此对象是否包含某个属性，并且这个属性是否可枚举。

以下几种操作会被影响：

- for...in
- Object.keys()
- JSON.stringify()

他们只会返回可被枚举的值。

可以通过object.defineProperty来指定其是否可被枚举
``` js
Object.defineProperty(kxy, "sex", {
    value: "female",
    enumerable: false
});
```

[参考](https://www.cnblogs.com/kongxy/p/4618173.html)

### 遍历对象有哪些方式？

- for in
- Object.keys()遍历key
- Object.values()遍历值
- Object.entries()遍历key和值
- Reflect.ownKeys(obj)遍历key

### 遍历数组有哪些方式？

- forEach
- for in
- for of 数组对象也可以，例如Dom nodelist


### Map和Object的区别是什么？

Objects 和 Maps 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 Maps 使用。

不过 Maps 和 Objects 有一些重要的区别，在下列情况里使用 Map 会是更好的选择：

1、**一个Object的键只能是字符串或者 Symbols**，但一个 Map 的键可以是任意值，包括函数、对象、基本类型。

2、**Map 中的键值是有序的**，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。

3、你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算。

4、**Map 可直接进行迭代**，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。

5、**Object 都有自己的原型**，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。**Map是没有原型的**，虽然 ES5 开始可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。

6、Map 在涉及频繁增删键值对的场景下会**有些性能优势**。

### Map和WeakMap的区别是什么？

WeakMap 对象是一组键值对的集合，其中的**键是弱引用对象**，而值可以是任意。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，**这个对象将会被垃圾回收（相应的key则变成无效的），所以，WeakMap 的 key 是不可枚举的。**

### WeakMap的使用场景是？

和DOM进行关联，某些库会维护一个自定义对象，来关联DOM元素，并且其映射关系会存储在内部对象缓存中。如果一个DOM元素已经不复存在于网页中，库就需要清除对该DOM的引用，避免内存泄漏。使用WeakMap来追踪DOM元素，当DOM并不存在了，WeakMap将被自动销毁。



### requestAnimationFrame了解吗？有使用过吗？说一下使用场景。

requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。
与 setTimeout 相比，rAF 最大的优势是 **由系统来决定回调函数的执行时机。这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题**。

使用场景多在于动画，比如说滑动页面顶部:

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```
也可以用于任务调度，如果React的Fiber就是基于requestAnimationFrame和requestIdleCallback的。


### js异步编程方法和各种的优缺点

发展历程：
callback->Promise->generator->async/await

callback缺点：
- 回调地狱
- 不能用 try catch 捕获错误
- 不能 return

Promise优点：
- 解决了回调地狱的问题

Promise缺点：
- 无法取消 Promise 
- 错误需要通过回调函数来捕获

generator缺点：
- 写法冗余

async优点：
- 代码清晰

async缺点：
- 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低
比如说：
``` js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch('XXX1')
  await fetch('XXX2')
  await fetch('XXX3')
}

```
---

### 如何实现decorator

在用[nest](https://github.com/nestjs/nest)写node服务的时候，我们会用到很多的装饰器语法，可以参考[nestDemo](https://github.com/FunnyLiu/nestDemo/blob/master/serve-data/src/user/user.controller.ts#L51)。

那么如何实现装饰器呢？
我们以[core-decorators](https://github.com/jayphelps/core-decorators)为例。
来看一个readonly的装饰器用法如下：
``` js
import { readonly } from 'core-decorators';

class Meal {
  @readonly
  entree = 'steak';
}

var dinner = new Meal();
dinner.entree = 'salmon';
// Cannot assign to read only property 'entree' of [object Object]
```

[readonly.js源码](https://github.com/jayphelps/core-decorators/blob/v0.12.1/src/readonly.js#L3)：

``` js
import { decorate } from './private/utils';

function handleDescriptor(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

export default function readonly(...args) {
  return decorate(handleDescriptor, args);
}
```
传入一个具体的处理函数给utils中的decorate。

[utils的decorate源码](https://github.com/jayphelps/core-decorators/blob/v0.12.1/src/private/utils.js#L22)：
``` js
export function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor(...entryArgs, []);
  } else {
    return function () {
      return handleDescriptor(...Array.prototype.slice.call(arguments), entryArgs);
    };
  }
}
```

将参数给回调函数进行处理。

我们再来看看typescript对以下代码的编译：

``` ts
function Injectable(): ClassDecorator {
  return target => {
    const metadata = Reflect.getMetadata('design:paramtypes', target)
    console.log(metadata)
  }
}

class Service {
  constructor() {}
}

@Injectable() // Array [ Service() ]
class Controller {
  constructor(private Service: Service) {}
}

```

结果为：

``` js
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function Injectable() {
    return target => {
        const metadata = Reflect.getMetadata('design:paramtypes', target);
        console.log(metadata);
    };
}
class Service {
    constructor() { }
}
let Controller = class Controller {
    constructor(Service) {
        this.Service = Service;
    }
};
Controller = __decorate([
    Injectable() // Array [ Service() ]
    ,
    __metadata("design:paramtypes", [Service])
], Controller);

```

可以看到__decorate函数就是封装decorator的核心逻辑：
``` js
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
 var c = arguments.length,
  r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
  d;
 if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
 else
  for (var i = decorators.length - 1; i >= 0; i--)
   if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
 return c > 3 && r && Object.defineProperty(target, key, r), r;
};
```

这里有三个比较重要的API：

- [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) - 如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。
- Reflect.decorate - 这个还不是ES的标准，是TS的ES.later中的一项，所以需要额外的polyfill。
- [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) - 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

所以主要流程就是判断其是否还有其他装饰器，然后尝试调用Reflect.decorate来直接解决问题，如果没有该API，则退而求其次的使用`Object.defineProperty`拦截某个property来进行自己想要的修改。


而`__metadata`则是使用了`Reflect.metadata`来操作元数据：
``` js
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
```


### 为什么decorator只能用于类，不能用于函数

函数是存在变量提升的问题的，而类则不存在。
举一个最简单的例子：
``` js
var { readOnly } = require("core-decorator");

@readOnly
    function foo() {
}
```
其实会变成：

``` js
var readOnly;

@readOnly
    function foo() {
}

{ readOnly } = require("core-decorator");
```

明白了吧。

---

## 性能相关

### 大量DOM操作，应该如何优化？

最简单的，使用document，fragment

``` js
var fragment = document.createDocumentFragment();
    fragment.appendChild(elem);
```

如果是需要diff，比对替换，则需要Virtualdom；如果还是遇到性能瓶颈，则需要类似React的Fiber一样，通过requestIdleCallback和requestAnimationFrame来进一步通过任务调度的方式来优化。

### 浏览器端大数据问题，两万个小球记住信息，进行最优检索和存储？

如果你仅仅只是答用数组对象存储了2万个小球信息，然后用for循环去遍历进行索引，那是远远不够的。

这题要往深一点走，用特殊的数据结构和算法进行存储和索引。

然后进行存储和速度的一个权衡和对比，最终给出你认为的最优解。

我提供几个思路：

用ArrayBuffer实现极致存储

哈夫曼编码 + 字典查询树实现更优索引

用bit-map实现大数据筛查

用hash索引实现简单快捷的检索

用IndexedDB实现动态存储扩充浏览器端虚拟容量

用iframe的漏洞实现浏览器端localStorage无限存储，实现2千万小球信息存储

[参考地址](https://github.com/airuikun/Weekly-FE-Interview/issues/16)

### 两万个小球，做流畅的动画效果？

这题考察对大数据的动画显示优化，当然方法有很多种。

但是你有没有用到浏览器的高级api？

你还有没有用到浏览器的专门针对动画的引擎？

或者你对3D的实践和优化，都可以给面试官展示出来。

提供几个思路：

使用GPU硬件加速

使用webGL

使用assembly辅助计算，然后在浏览器端控制动画帧频

用web worker实现javascript多线程，分块处理小球

用单链表树算法和携程机制，实现任务动态分割和任务暂停、恢复、回滚，动态渲染和处理小球




---

## 原理

### 任务队列机制

尝试写出以下代码的结果：
``` js
//请写出输出内容
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

答案为:
``` js
/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

首先需要理解js中有同步和异步任务。

同步任务都在主线程上执行，形成一个执行栈，遇到异步任务时则加入不同的任务队列。

异步任务分为宏任务和微任务。

宏任务一般是：包括script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)

微任务：原生Promise(有些实现的promise将then方法放到了宏任务中)、process.nextTick、Object.observe(已废弃)、 MutationObserver 记住就行了。

**在当前的微任务没有执行完成时，是不会执行下一个宏任务的。**

**Promise**中的异步体现在then和catch中，所以**写在Promise中的代码是被当做同步任务立即执行的**。

对于async/await来说，**await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码。**
所以说：
``` js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
//等价于

async function async1() {
  console.log('async1 start');
  Promise.resolve(async2()).then(() => {
    console.log('async1 end');
  })
}
```

现在可以理解上面的结果了吧。

### 模块依赖管理import，import from 和require等的区别？

首先import和export是ES module的标准语法。
先介绍import 和 import from的区别：

import语句会执行所加载的模块，而如果export的很多，只import其中一部分的话，比如：

``` js
export { onlyOne }
```



``` js
import { onlyOne } from 'path/to/module'
```

则可以进一步优化文件打包，这也是各个打包工具所谓的tree-shaking。


而require则是nodejs中的依赖的方式，这种也叫CommonJS，会有一套完成的查找模块的顺序。
**require和es的import的区别在于**：

1. CommonJS 模块输出的是一个**值的拷贝**，ES6 模块输出的是**值的引用**。
CommonJS 模块输出的是**值的拷贝**，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个**只读引用**。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

2. CommonJS 模块是**运行时加载**，ES6 模块是编译时输出接口。
运行时加载: CommonJS 模块就是对象；即**在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”**。
编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。

CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。


---

## 编码


### 如何实现一个sleep(1000)?麻烦用各自异步方式实现

4种方式
``` js
//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve,time))
}
sleep(1000).then(()=>{
  console.log(1)
})

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve,reject){
    setTimeout(resolve,time);
  })
}
sleepGenerator(1000).next().value.then(()=>{console.log(1)})

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}
output();

//callback
function sleep(callback,time) {
  if(typeof callback === 'function')
    setTimeout(callback,time)
}

function output(){
  console.log(1);
}
sleep(output,1000);
```

参考地址：

[一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/63)


### 遍历dom树

``` js
function traversal(node) {
    //对node的处理
    if (node && node.nodeType === 1) {
        console.log(node.tagName);
    }
    var i = 0,
        childNodes = node.childNodes,
        item;
    for (; i < childNodes.length; i++) {
        item = childNodes[i];
        if (item.nodeType === 1) {
            //递归先序遍历子节点
            traversal(item);
        }
    }
}
```


参考地址：

[如何遍历一个dom树](https://github.com/airuikun/Weekly-FE-Interview/issues/4)


### 如何实现一个new

1、创建一个空对象，并且 this 变量引用该对象，// let obj = new Object()

2、继承了函数的原型。// obj.__proto = Con.prototype

3、属性和方法被加入到 this 引用的对象中。并执行了该函数func // let result = Con.apply(obj, arguments)

4、新创建的对象由 this 所引用，并且最后隐式的返回 this 。


``` js
function create() {
    // 创建一个空的对象
    let obj = new Object()
    // 获得构造函数
    let Con = [].shift.call(arguments)
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定 this，执行构造函数
    let result = Con.apply(obj, arguments)
    // 确保 new 出来的是个对象
    return typeof result === 'object' ? result : obj
}
```

es6之后更加复杂了，[参考](https://www.ecma-international.org/ecma-262/6.0/#sec-new-operator)。

### 如何实现bind？

先看看bind有哪些特点。

第一个就是，**bind方法会返回一个函数**：
``` js
var foo = {
    value: 1
};
 
function bar() {
    console.log(this.value);
}
 
// 返回了一个函数
var bindFoo = bar.bind(foo);
 
bindFoo(); // 1
```
故而实现为：

``` js
Function.prototype.bind2 = function (context) {
    var self = this;
    return function () {
        self.apply(context);
    }
 
}
```

第二个特点，**bind方法可以传入参数**：

``` js
var foo = {
    value: 1
};
 
function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
 
}
 
var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18
```
故而实现为：

``` js
// 第二版
Function.prototype.bind2 = function (context) {
 
    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);
 
    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数，也就是上面例子中的18
        var bindArgs = Array.prototype.slice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }
 
}
```

bind还有一个最复杂的特点，就是**当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效**：

``` js
var value = 2;
 
var foo = {
    value: 1
};
 
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
 
bar.prototype.friend = 'kevin';
 
var bindFoo = bar.bind(foo, 'daisy');
 
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

可以看到value取不到，这是因为this已经由于new操作而指向了obj。
故而实现为：

``` js
Function.prototype.bind2 = function (context) {
 
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
 
    var fNOP = function () {};
 
    var fbound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    //使用空函数进行中转
    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();
    return fbound;
 
}

```
当然，第三种就考虑的较为全面，也比较复杂。一般情况下理解第二种就可以了。

### 如何实现深拷贝？

首先明白深拷贝和浅拷贝的区别。**浅克隆之所以被称为浅克隆，是因为对象只会被克隆最外部的一层,至于更深层的对象,则依然是通过引用指向同一块堆内存**.
Object.assign()实现的是浅复制。

生产环境最好使用[lodash的cloneDeep](https://lodash.com/docs/4.17.11#cloneDeep。),
其基于[结构化克隆算法](https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm)

如果只是简单的兼容数组和对象，可以采用如下：

``` js
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
      ? Array.from(obj)
      : clone;
};

const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```

如果要兼容Buffer对象、Promise、Set、Map、正则、Date等等，还是算了。

### 如何简单的拷贝一些不同数据类型的值
针对不同的数据类型，有一些不同的拷贝方案。

#### 对于数组

使用for循环和push
``` js
var arr = [1,2,3,4,5]；//只适应单层数组结构
var arr2 = copyArr(arr)
function copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
     res.push(arr[i])
    }
    return res
}
```

使用slice：

``` js
var arr = [1,2,3,4,5] //只适应单层数组结构
var arr2 = arr.slice(0)
console.log(arr)   //(5) [1, 2, 5, 4, 5]
console.log(arr2)  //(5) [1, 2, 5, 4, 5]
```

使用concat：

``` js
var arr = [1,2,3,4,5] //只适应单层数组结构
var arr2 = arr.concat()
console.log(arr)   //(5) [1, 2, 5, 4, 5]
console.log(arr2)  //(5) [1, 2, 5, 4, 5]
```

使用扩展运算符

``` js
var arr = [1,2,3,4,5] //只适应单层数组结构
var [ ...arr2 ] = arr
console.log(arr)   //(5) [1, 2, 5, 4, 5]
console.log(arr2)  //(5) [1, 2, 5, 4, 5]

```


#### 对于对象

for循环实现

``` js
 //如果包含属性值是数组，无法深层拷贝数组里面的数据
var obj = {
  name: 'jingjing',
  sex: 'girl',
  old: '18'
}
var obj2 = copyObj(obj)
function copyObj(obj) {
  let res = {}
  for (var key in obj) {
    res[key] = obj[key]
  }
  return res
}
```

json转一转，注意函数类型会丢失。

``` js
var obj = {
  name: 'jingjing',
  sex: 'girl',
  old: '18'
}
var obj2 = JSON.parse(JSON.stringify(obj))
```

扩展运算符
``` js
//如果包含的属性值是数组，无法深层拷贝数组里面的数据
var obj = {
  name: 'jingjing',
  sex: 'girl',
  old: '18'
}
var { ...obj2 } = obj
obj.old = '22'
console.log(obj)  //{name: "jingjing", sex: "girl", old: "22"}
console.log(obj2) //{name: "jingjing", sex: "girl", old: "18"}
```

[参考](https://segmentfault.com/a/1190000012150942)



### 二维数组转一维有哪些实现方式？

1.遍历

``` js
var arr = [
    ['h', 'e', 'l', 'l', 'o'],
    ['m', 'y'],
    ['w', 'o', 'r', 'l', 'd'],
    ['!']
];
var result = [];
for (var r = 0; r < arr.length; r++) {
    for (var c = 0; c < arr[r].length; c++) {
        result.push(arr[r][c]);
    }
}
console.log(result); //=>[ 'h', 'e', 'l', 'l', 'o', 'm', 'y', 'w', 'o', 'r', 'l', 'd', '!' ]
```

2.concat

``` js
var arr = [
    ['h', 'e', 'l', 'l', 'o'],
    ['m', 'y'],
    ['w', 'o', 'r', 'l', 'd'],
    ['!']
];
var result = [];
for (var r = 0, result = []; r < arr.length; r++) {
    result = result.concat(arr[r]);
}
console.log(result); //=>[ 'h', 'e', 'l', 'l', 'o', 'm', 'y', 'w', 'o', 'r', 'l', 'd', '!' ]
```

3.apply+concat
利用apply和concat一行代码就够了。
``` js
var arr = [
    ['h', 'e', 'l', 'l', 'o'],
    ['m', 'y'],
    ['w', 'o', 'r', 'l', 'd'],
    ['!']
];
var result = Array.prototype.concat.apply([], arr);
console.log(result); //=>[ 'h', 'e', 'l', 'l', 'o', 'm', 'y', 'w', 'o', 'r', 'l', 'd', '!' ]
```

4.join+split

``` js
var arr = [
    ['h', 'e', 'l', 'l', 'o'],
    ['m', 'y'],
    ['w', 'o', 'r', 'l', 'd'],
    ['!']
];

var result = arr.join().split(",");

console.log(result);
```

5.reduce+concat

``` js
var arr = [
    ['h', 'e', 'l', 'l', 'o'],
    ['m', 'y'],
    ['w', 'o', 'r', 'l', 'd'],
    ['!']
];
var result = arr.reduce((prev,curr)=>{
  return prev.concat(curr)
})
console.log(result)
```

6.使用展开运算符+concat

``` js
var arr = [
    ['h', 'e', 'l', 'l', 'o'],
    ['m', 'y'],
    ['w', 'o', 'r', 'l', 'd'],
    ['!']
];
var result = [].concat(...arr)
console.log(result)
```

[参考](https://juejin.im/entry/5847c1600ce46300578d99bf)

[Javascript多维数组扁平化](http://www.jstips.co/zh_cn/javascript/flattening-multidimensional-arrays-in-javascript/)


### 多维数组转一维

在上面提到的几种办法中，加入递归并对数组类型进行判断
``` js
const flatten = arr => {
  return arr.reduce((flat, next) => {
    console.log(flat, next); // flat:初始值或累加的值 next:当前值
    return flat.concat(Array.isArray(next) ? flatten(next) : next);
    // 判断当前元素是否为数组 决定是否递归 将值返回到下次循环
  }, []);
};
// 运行示例：
let nestedArr = [1, 2, [3, 4, [5, [6, 7]]]]; // 四维数组 展开
console.log(flatten(nestedArr)); // [1,2,3,4,5,6,7]

```

参考：

[多维数组展开 | effect · Issue #159 · OBKoro1/web_accumulate](https://github.com/OBKoro1/web_accumulate/issues/159)