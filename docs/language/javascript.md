# Javascript

## 语言基础

### let在全局作用域声明的变量在window上吗？

在ES5中，全局变量直接挂载到全局对象的属性上，所以能在window上看到var声明的变量

在ES6中，全局对象的属性和全局变量脱钩，但是为了保持兼容性，旧的不变，所以var、function声明的全局变量依然可以在window对象上看到，而let、const声明的全局变量在window对象上看不到


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

---

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