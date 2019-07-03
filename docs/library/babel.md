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



