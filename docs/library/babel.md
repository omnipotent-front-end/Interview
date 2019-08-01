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


## 原理


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

