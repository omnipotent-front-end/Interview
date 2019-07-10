# Javascript

## 语言基础

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