# Babel

## 使用



### 为什么需要@babel/runtime?它和@babel/polyfill有什么区别？

首先说下polyfill。babel默认只会转换语法，而不是API。比如说Set、Map这种，还是需要引入polyfill来兼容老的浏览器。其本质还是引用了[core-js](https://www.npmjs.com/package/core-js)。

而[@babel/runtime](https://www.npmjs.com/package/@babel/runtime)的使用场景是将一个babel转换时的功能函数进行了封装。
这里举个例子，假设我们要转化如下语法：
``` js
{ [name]: 'JavaScript' }
```

babel的转换结果为：
``` js
'use strict';
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var obj = _defineProperty({}, 'name', 'JavaScript');
```

这里的`_defineProperty`就是一个帮助函数，如果代码变得更加复杂，可能会有多个它存在与不同的模块。所以babel会**提一个公共的包**，也就是runtime，来做这些事情，将转换结果变为：
``` js
'use strict';
// The previous _defineProperty function has been used as a public module `babel-runtime/helpers/defineProperty'.
var _defineProperty2 = require('babel-runtime/helpers/defineProperty');
var _defineProperty3 = _interopRequireDefault(_defineProperty2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var obj = (0, _defineProperty3.default)({}, 'name', 'JavaScript');
```



### babel能解析html吗？为什么？

babel目前只能解析javascript，babel的解析器是@babel/parser（之前是babyion）。其是基于acorn，fork出来的一套parser。
babel的抽象语法树是基于[estree](https://github.com/estree/estree)拓展的一套Babel AST，所以只能解析js。

如果需要解析html，可以基于acorn的插件机制提供一个插件（@babel/parser未提供插件机制），也可以直接fork @babel/parser来，但这些成本都比较大，不如直接用现成的解析器：[parse5](https://github.com/inikulin/parse5)


### babel的预设presets和插件plugins的执行顺序是怎么样的？

首先需要理解[babel的完整工作流程](/library/babel.html#babel%E7%9A%84%E5%AE%8C%E6%95%B4%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)，babel的preset和plugins都是在transform阶段起作用。

preset就是一群plugins的集合。常见的几个可以参考[Babel | Awesome-url](https://brizer.github.io/urls/zh/babel_zh.html)。

它们的执行顺序如下：

1. 先执行 plugins 的配置项,再执行 Preset 的配置项；

2. plugins 配置项，按照声明**顺序执行**；

3. Preset 配置项，按照声明**逆序执行**。



### 有没有写过babel插件，是什么模式解析的？

自己做过比较简单的demo：[babelDemo/easyPlugin at master · FunnyLiu/babelDemo](https://github.com/FunnyLiu/babelDemo/tree/master/easyPlugin)。

``` js
module.exports = function testPlugin(babel) {
    return {
      visitor: {
        Identifier(path) {
        // 将所有的foo改成bar
          if (path.node.name === 'foo') {
            path.node.name = 'bar';
          }
        }
      }
    };
  };
```

``` js
module.exports = function testPlugin(babel) {
  return {
    visitor: {
      Identifier(path) {
        // 将所有的bar2改成bar3
        if (path.node.name === "bar2") {
          path.node.name = "bar3";
        }
      },
      //将==变成===
      BinaryExpression(path) {
        if (path.node.operator == "==") {
          path.node.operator = "===";
        }
        // ...
      },
    },
  };
};
```

也做过一些特定AMD转ESM的插件。

这里的visitor其实就是具体访问者。而在解析AST的过程中，babel会将每一个符合type的语法树node，交给访问者队列来处理。比如Identifier就会顺序交给上面两个插件对应的方法来处理。之所以这样就为了将算法和真正的对象隔离，从而解耦方便扩展。

想象一下，Babel 有那么多插件，如果每个插件自己去遍历AST，对不同的节点进行不同的操作，维护自己的状态。这样子不仅低效，它们的逻辑分散在各处，会让整个系统变得难以理解和调试， 最后插件之间关系就纠缠不清，乱成一锅粥。




参考：

[FunnyLiu/babel at readsource](https://github.com/FunnyLiu/babel/tree/readsource#%E6%8F%92%E4%BB%B6%E7%9A%84%E5%BC%80%E5%8F%91)

[design - 设计模式（以Typescript描述）](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/visitor/index?id=babel%e6%8f%92%e4%bb%b6%e4%b8%ad%e5%af%b9ast%e7%9a%84%e6%93%8d%e4%bd%9c)

[深入浅出 Babel 上篇：架构和原理 + 实战](https://juejin.cn/post/6844903956905197576)




### babel在做polyfill时，如何保证不污染原型。

默认情况下，babel通过core-js来做api的polyfill，但是会污染各个对象的原型，想要不污染的话，需要配置@babel/plugin-transform-runtime和@babel/runtime-corejs3来完成。

``` js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "debug": true
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
      }
    ]
  ]
}
```

他的作用就是将core-js原本修改原型的逻辑，改成自己实现一套函数。

比如下图这样，从而保证不污染Array的原型。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210819143508.png"/>

### useBuiltIns 参数说明：

* false: 不对 polyfills 做任何操作
* entry: 根据 target 中浏览器版本的支持，将 polyfills 拆分引入，仅引入有浏览器不支持的 polyfill
* usage(新)：检测代码中 ES6/7/8 等的使用情况，仅仅加载代码中用到的 polyfills


## 原理


### babel生态下有哪些包，分别在做什么？

参考源码阅读系列：[FunnyLiu/babel at readsource](https://github.com/FunnyLiu/babel/tree/readsource#%E7%94%9F%E6%80%81%E5%8C%85%E4%BB%8B%E7%BB%8D)

### babel的完整工作流程

Babel 的功能很纯粹，它只是一个编译器。

Parse(解析)：将源代码转换成更加抽象的表示方法（例如抽象语法树）

Transform(转换)：对（抽象语法树）做一些特殊处理，让它符合编译器的期望（babel的插件就是在这个阶段起作用的）

Generate(代码生成)：将第二步经过转换过的（抽象语法树）生成新的代码

接下来一步步介绍

#### parse解析
分为词法解析和语法解析。词法解析就是分词，将代码变成类似词语数组的形式。比如`const add = (a, b) => a + b`，就会变成：

``` js
[
    { "type": "Keyword", "value": "const" },
    { "type": "Identifier", "value": "add" },
    { "type": "Punctuator", "value": "=" },
    { "type": "Punctuator", "value": "(" },
    { "type": "Identifier", "value": "a" },
    { "type": "Punctuator", "value": "," },
    { "type": "Identifier", "value": "b" },
    { "type": "Punctuator", "value": ")" },
    { "type": "Punctuator", "value": "=>" },
    { "type": "Identifier", "value": "a" },
    { "type": "Punctuator", "value": "+" },
    { "type": "Identifier", "value": "b" }
]
```

语法解析是将词语数组变成AST。
上面那些词语数组对于的[ASTjson文件](https://brizer.github.io/static/json/ast.json)

#### transform转换

我们编写的 **babel 插件主要专注于这一步转换过程**的工作。通过Babel提供的API，对AST的各个节点进行添加、更新或移除等操作。

Babel 自 6.0 起，就不再对代码进行转换。现在只负责图中的 parse 和 generate 流程，转换代码的 transform 过程全都交给插件去做。

Babel 对于 AST 的遍历是深度优先遍历，对于 AST 上的每一个分支 Babel 都会先向下遍历走到尽头，然后再向上遍历退出刚遍历过的节点，然后寻找下一个分支。

#### generate生成

经过了前面的步骤，现在的AST已经是最新的状态了，现在就需要根据AST来输出代码了。通过[@babel/generator](https://babeljs.io/docs/en/babel-generator)，将AST转换成js代码。


参考：

[Babel 内部原理分析 | Tsung's BLOG](https://octman.com/blog/2016-08-27-babel-notes/)

[前端自习课](https://mp.weixin.qq.com/s?__biz=MjM5MDc4MzgxNA==&mid=2458453197&idx=1&sn=17c87903f152a80f41e3677e7fba1ee4&chksm=b1c224e486b5adf253536520bcc2d7cd82467202bc1780317de2a2e852032ca3eccc7eb76b1e&mpshare=1&scene=24&srcid=0720K4h9Sl67l9p4CzgoR4Oh&key=8f90367f007f539f7fef938326296704385013ce6202228cbfc1f6e9161541b7048c69b5957964698ab24eed72c4465c00be828c67c5c604424779835accf1913dd7648d1a560179c1c84382446d36cb&ascene=0&uin=MjUwMTIyNjY4Mg%3D%3D&devicetype=iMac+MacBookPro13%2C2+OSX+OSX+10.14.1+build(18B75)&version=12020810&nettype=WIFI&lang=zh_CN&fontScale=100&pass_ticket=%2BIVC5t4o%2BRVpON9JZy94ucxj88jHSEU%2B8JAiDOM7A9hrFYk9FGuI6V2vfm79kroG)




## 各插件工作原理

### 模板字符串怎么转？

参考[@babel/plugin-transform-template-literals · Babel](https://babeljs.io/docs/en/babel-plugin-transform-template-literals)。

通过String.prototype.concat来拼接字符串。

### 扩展运算符怎么转？

数组参考[@babel/plugin-transform-spread · Babel](https://babeljs.io/docs/en/babel-plugin-transform-spread)

通过Array.prototype.concat来拼接数组。

对象参考[@babel/plugin-proposal-object-rest-spread · Babel](https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread)

利用Object.assign来模拟。




### 剩余参数怎么转？

参考[@babel/plugin-transform-parameters · Babel](https://babeljs.io/docs/en/babel-plugin-transform-parameters)

通过arguments来。

### for-of怎么转？

参考[@babel/plugin-transform-for-of · Babel](https://babeljs.io/docs/en/babel-plugin-transform-for-of)

通过[Symbol.iterator]和其next方法来实现。不了解可迭代可以看看[如何让一个对象变得可迭代，可迭代的本质是什么？](/language/javascript.html#%E5%A6%82%E4%BD%95%E8%AE%A9%E4%B8%80%E4%B8%AA%E5%AF%B9%E8%B1%A1%E5%8F%98%E5%BE%97%E5%8F%AF%E8%BF%AD%E4%BB%A3%EF%BC%8C%E5%8F%AF%E8%BF%AD%E4%BB%A3%E7%9A%84%E6%9C%AC%E8%B4%A8%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)

### 解构怎么转？

参考[@babel/plugin-transform-destructuring · Babel](https://babeljs.io/docs/en/babel-plugin-transform-destructuring)

针对对象就是直接a.b.c，针对数组则是通过Array.prototype.slice来模拟。


### 块级作用域怎么转？

参考[@babel/plugin-transform-block-scoping · Babel](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping)

将{}内的变量通过_a来命名，从而和外部的区分开来。

``` js
{
  let a = 3;
}

let a = 3;

function bbb() {
  
  let c ='1';
}

let c = '2';

if(true){
  let d = 1;
}
var d = 2;

```

变为：

``` js
"use strict";

{
  var _a = 3;
}
var a = 3;

function bbb() {
  var c = '1';
}

var c = '2';

if (true) {
  var _d = 1;
}

var d = 2;
```

### 箭头函数怎么转？

参考[@babel/plugin-transform-arrow-functions · Babel](https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions)

转为普通函数，this使用上一层作用域的this。

### async怎么转？

参考[@babel/plugin-transform-async-to-generator · Babel](https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator)

转成generator

### 私有属性怎么转？

参考[@babel/plugin-proposal-private-property-in-object · Babel](https://babeljs.io/docs/en/babel-plugin-proposal-private-property-in-object)

通过weakmap来存储私有属性，mock `#`操作符。


### class和extends怎么转？

先了解怎么实现继承：[简单实现继承](/language/javascript.html#%E7%AE%80%E5%8D%95%E5%AE%9E%E7%8E%B0%E7%BB%A7%E6%89%BF)

参考[@babel/plugin-transform-classes · Babel](https://babeljs.io/docs/en/babel-plugin-transform-classes)。

class是通过构造函数和prototype来完成：

``` js
class Test {
  constructor(name) {
    this.name = name;
  }

  logger() {
    console.log("Hello", this.name);
  }
}
// 转为：

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Test = (function() {
  function Test(name) {
    _classCallCheck(this, Test);

    this.name = name;
  }

  Test.prototype.logger = function logger() {
    console.log("Hello", this.name);
  };

  return Test;
})();
```


针对继承是通过封装一个方法，基本如下：

``` js
function extend(A, B) {
  function f() {}
  f.prototype = B.prototype;
  A.prototype = new f();
  A.prototype.constructor = A;
}

// 或者看看复杂版:

function _inherits(subClass, superClass) {
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}


```

