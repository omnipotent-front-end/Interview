# Javascript

## 语言基础

### javascript是一门什么类型的语言？动态、静态、强类型、弱类型分别有什么区别？

在使用之前就需要确认其变 量数据类型的称为**静态语言**。
相反地，我们把在运行过程中需要检查数据类型的语言称为**动态语言**。

通常把偷偷转换的操作称为**隐式类型转换**。而支持隐式类型转换的语言称为**弱类型语言**，不支持隐式类型转换的语言称为**强类型语言**。

JavaScript是一种**弱类型的、动态的语言**。

编程语言类型图：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119113154.png"/>



### javascript 有哪些数据类型，如何判断？

javascript 中有八种数据类型，其中有七种简单数据类型，一种复杂数据类型。

七种简单数据类型

- String
- Number
- Boolean
- Null
- Undefined
- Symbol (ECMAScript 6 新定义)
- BigInt (ECMAScript 201* 新定义)

复杂数据类型

Object 是唯一的复杂数据类型。 Object Array Function 这些引用类型值最终都可以归结为 Object 复杂数据类型。

判断方法有如下几种：

1、typeof 是用来**检测变量数据类型**的操作符。

对一个值使用 typeof 操作符可能会返回下列某个字符串

- "undefined" --- 如果这个值未定义
- "string" --- 如果这个值是字符串
- "boolean" --- 如果这个值是布尔类型值
- "number" --- 如果这个值是数值
- "object" --- 如果这个值是对象或者 null
- "function" --- 如果这个值是函数

这个函数其实是非常不安全的，`typeof []` 和 `typeof null` 都是是会返回 'object'的。

2、instanceof

测试一个对象在其原型链中**是否存在一个构造函数的 prototype 属性**。

```js
var arr = [1, 2, 3];
arr instanceof Array; // true
```

instanceof 却不能安全的判断 Object 类型，因为 Array 构造函数是继承自 Object 对象的，因此在 arr 变量上是**可以访问到 Object 的 prototype 属性**的。

3、Object.prototype.toString.call(variable)

用这个方法来判断变量类型目前是最可靠的了，它总能返回正确的值。

该方法返回 "[object type]", 其中 type 是对象类型。

```js
Object.prototype.toString.call(null); //  "[object Null]"

Object.prototype.toString.call([]); //  "[object Array]"

Object.prototype.toString.call({}); //  "[object Object]"

Object.prototype.toString.call(123); //  "[object Number]"

Object.prototype.toString.call("123"); //  "[object String]"

Object.prototype.toString.call(false); //  "[object Boolean]"

Object.prototype.toString.call(undefined); //  "[object Undefined]"
```

具体的最佳实现可以参考tomato:[tomato/is-type.ts at master · tomato-js/tomato](https://github.com/tomato-js/tomato/blob/master/packages/shared/src/is-type.ts)



参考：

[Javascript 判断变量类型的陷阱 与 正确的处理方式 - 前端 - 掘金](https://juejin.im/entry/5964a1c15188250d8b65ef5f)

[JS 数据类型分类和判断 - 掘金](https://juejin.im/post/5b2b0a6051882574de4f3d96)


### typeof NaN 的结果是什么?
NaN 意指“不是一个数字”(not a number)，NaN 是一个“警戒值”(sentinel value， 有特殊用途的常规值)，用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失 败后返回的结果”。

typeof NaN; // "number"

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反(自反，reflexive，即 x === x 不
成立)的值。而 NaN != NaN 为 true。

### isNaN 和 Number.isNaN 函数的区别?
                  
函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返 回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。

函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为准确。

### 什么是堆?什么是栈?它们之间有什么区别和联系?
 
堆和栈的概念存在于数据结构中和操作系统内存中。

在数据结构中，栈中数据的存取方式为 先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全 二叉树是堆的一种实现方式。

在操作系统中，内存被分为栈区和堆区。栈区内存由编译器自动分 配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。堆区内存一 般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。

js中的基本数据类型的值直接保存在栈中，而复杂数据类型的值保存在堆中，通过使用在栈中保存对应的指针来获取堆中的值。

原始数据类型直接存储在栈(stack)中的简单数据段， 占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。引用数据类型存储在堆(heap) 中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能;引用数据类 型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索 其在栈中的地址，取得地址后从堆中获得实体。

### 介绍 js 有哪些内置对象?

js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、 函数和用来实例化其他对象的构造函数对象。

(1)值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。例如 Infinity、
NaN、undefined、null 字面量 

(2)函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果
直接返回给调用者。例如 eval()、parseFloat()、parseInt() 等 

(3)基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和
错误对象。例如 Object、Function、Boolean、Symbol、Error 等 

(4)数字和日期对象，用来表示数字、日期和执行数学计算的对象。例如 Number、Math、Date
                       
 
(5)字符串，用来表示和操作字符串的对象。例如 String、RegExp 

(6)可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，
以及类数组结构的对象。例如 Array 

(7)使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元
素。例如 Map、Set、WeakMap、WeakSet

(8)矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。例如 SIMD 等

(9)结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。 例如 JSON 等

(10)控制抽象对象例如 Promise、Generator 等 

(11)反射，例如 Reflect、Proxy

(12)国际化，为了支持多语言处理而加入 ECMAScript 的对象。例如 Intl、Intl.Collator 等

(13)WebAssembly

### null 和 undefined 的区别?

首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值， 就是 undefined 和 null。

undefined 代表的含义是未定义，null 代表的含义是空对象。

一般变量声明了但还没有定义的时候会返回 undefined，null 主要用于赋值给一些可能会返回对 象的变量，作为初始化。undefined 在 js 中不是一个保留字，这意味着我们可以使用 undefined 来作为一个变量名，这样的做法是非常危险的，它会影响我们对 undefined 值的 判断。

但是我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。当我们对两种 类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。 当我们使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。


### 如何获取安全的 undefined 值?

void 0来替代。为什么呢？

我们先看第一点，答案很简单，undefined 并不是保留词（reserved word），它只是全局对象的一个属性，在低版本 IE 中能被重写。

事实上，undefined 在 ES5 中已经是全局对象的一个只读（read-only）属性了，它不能被重写。但是在局部作用域中，还是可以被重写的。

接下来思考第二个问题，为毛找的替代品是 void 0？

void 运算符能对给定的表达式进行求值，然后返回 undefined。也就是说，void 后面你随便跟上一个表达式，返回的都是 undefined，都能完美代替 undefined！那么，这其中最短的是什么呢？毫无疑问就是 void 0 了。其实用 void 1，void (1+1)，void (0) 或者 void "hello"，void (new Date()) 等等，都是一样的效果。更重要的前提是，void 是不能被重写的（cannot be overidden）。

那么，ES5 大环境下，void 0 就没有用武之地了吗？答案是否定的，用 void 0 代替 undefined 能节省不少字节的大小，事实上，不少 JavaScript 压缩工具在压缩过程中，正是将 undefined 用 void 0 代替掉了。

参考

[为什么用「void 0」代替「undefined」 · Issue #1 · lessfish/underscore-analysis](https://github.com/lessfish/underscore-analysis/issues/1) 


### 在 js 中不同进制数字的表示方式

0X、0x 开头的表示为十六进制

0、0O、0o 开头的表示为八进制

以 0B、0b 开头的表示为二进制格式
        
### js 中整数的安全范围是多少?

安全整数指的是，在这个范围内的整数转化为二进制存储的时候不会出现精度丢失，能够被 “安全”呈现的最大整数是 2^53 - 1，即 9007199254740991，在 ES6 中被定义为 Number.MAX_SAFE_INTEGER。最小整数是-9007199254740991，在 ES6 中被定义为 Number.MIN_SAFE_INTEGER。

如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转 换为特殊的 Infinity 值。如果某次计算返回了正或负的 Infinity 值，那么该值将无法参与 下一次的计算。判断一个数是不是有穷的，可以使用 isFinite 函数来判断


### toString 和 valueOf 有什么区别？

- valueOf(): 返回**最适合该对象类型的原始值**；
- toString(): 将该对象的原始值**以字符串形式**返回。

这两个方法一般是交由 JS 去隐式调用，以满足不同的运算情况。在数值运算里，会优先调用 valueOf()，如 a + b；

在字符串运算里，会优先调用 toString()，如 alert(c)

看一个例子：

```js
var x = {
  toString: function() {
    return "foo";
  },
  valueOf: function() {
    return 42;
  }
};

alert(x); // foo
"x=" + x; // "x=42"
x + "=x"; // "42=x"
x + "1"; // 421
x + 1; // 43
["x=", x].join(""); // "x=foo"
```

最后给个对比：

```js
//再看看valueOf()方法的结果
const a = 3;
const b = "3";
const c = true;
const d = { test: "123", example: 123 };
const e = function() {
  console.log("example");
};
const f = ["test", "example"];
const g = [];
const h = "";
const i = {};
const j = /\d/g;

console.log(a.valueOf()); // 3
console.log(b.valueOf()); // "3"
console.log(c.valueOf()); // true
console.log(d.valueOf()); // {test:'123',example:123}
console.log(e.valueOf()); // function(){console.log('example');}
console.log(f.valueOf()); // ['test','example']
console.log(g.valueOf()); // []
console.log(h.valueOf()); // ''
console.log(i.valueOf()); // {}
console.log(j.valueOf()); // /\d/g

console.log(a.toString()); // "3"
console.log(b.toString()); // "3"
console.log(c.toString()); // 'true'
console.log(d.toString()); // '[object Object]'
console.log(e.toString()); // 'function(){console.log('example');}'
console.log(f.toString()); // 'test','example'
console.log(g.toString()); // ''
console.log(h.toString()); // ''
console.log(i.toString()); // '[object Object]'
console.log(j.toString()); // '/\d/g'
```

参考：

[valueOf() vs. toString() in Javascript - Stack Overflow](https://stackoverflow.com/questions/2485632/valueof-vs-tostring-in-javascript)

[js 中 toString 和 valueOf 的区别？ - 知乎](https://www.zhihu.com/question/24262399)


### 'hello' 和 new String('hello')有什么区别？

String 是值类型，Object 是引用类型。值类型存储在栈中，引用类型存储在堆中。`'hello'`是 String，而`new String('hello')`是个 Object。

### 其他值到数字值的转换规则? 

有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义
了抽象操作 ToNumber。

(1)Undefined 类型的值转换为 NaN。

(2)Null 类型的值转换为 0。

(3)Boolean 类型的值，true 转换为 1，false 转换为 0。

(4)String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。

(5)Symbol 类型的值不能转换为数字，会报错。

(6)对象(包括数组)会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值， 则再遵循以上规则将其强制转换为数字。为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先(通过内部操作 DefaultValue)检查该值是否有 valueOf() 方法。如 果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返 回值(如果存在)来进行强制类型转换。如果 valueOf() 和 toString() 均不返回基本类型 值，会产生 TypeError 错误。

### js 中的==和+背后的类型操作，以及一些常见判断。

在使用 == 进行判断时，隐式转换的内部机制，判断步骤如下：

- 两个操作数类型一样的情况：

  - 如果两个操作数是同类基本类型值，则直接比较

  - 如果两个操作数是同类引用类型值，则比较内存地址

- 两个操作数类型不一样的情况：

  - 如果有一个操作数是布尔值，则将这个**布尔值转换为数字**再进行比较。
  - 如果有一个操作数是字符串，另一个操作数是数字，则将**字符串转换成数字**再进行比较
  - 如果有一个操作数是**引用类型的值，则调用该实例的 valueOf 方法，如果得到的值不是基本类型的值，再调用该实例的 toString 方法**，用得到的基本类型的值按照前面的规则进行匹配对比。

valueOf 和 toString 的区别参考：[tostring 和 valueof 有什么区别？](/language/javascript.html#tostring%E5%92%8Cvalueof%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F)

特殊情况为：

1、null == undefined 判断为 true

2、null 和 undefined 无法转换为基本类型值

3、NaN != NaN 判断为 true，事实上，NaN 更像一个特例，谁都不等于

使用 + 进行判断时

- 两个操作数都为数字时直接运行加法操作
- 其他情况下，会优先调用 valueOf 方法，经过转换之后的任一个为字符串，则会优先进行字符串连接；否则转为数字类型，进行数字运算。

使用除 + 号以外的四则运算符判断时

- 直接进行数学运算，行就行，不行就直接 NaN，简单粗暴。

下面是一些常见类型转换题汇总：

第一题：

```js
console.log([] == ![]); //true
```

流程如下：

```js
// 尝试判断，!运算符的优先级大于 ==，所以实际上这里还涉及到!的运算。
[] == ![]
// 将右边 ![] 进行转换
[] == false
// 隐式转换布尔值为数字
[] == 0
// 转换左边的 []，调用 [] 实例的 valueOf 方法
[] == 0
// valueOf 方法返回的不是基本类型值，再次调用 toString 方法
'' == 0
// 隐式转换字符串为数字
0 == 0
// 返回结果
true
```

第二题：

```js
console.log({} == !{}); //false
```

流程为:

```js
// 尝试判断，!运算符的优先级大于 ==，所以实际上这里还涉及到!的运算。
{} == !{}
// 将右边 !{} 进行转换
{} == false
// 隐式转换布尔值为数字
{} == 0
// 转换左边的 {}，调用 {} 实例的 valueOf 方法
{} == 0
// valueOf 方法返回的不是基本类型值，再次调用 toString 方法
'[object Object]' == 0
// 隐式转换字符串为数字
1 == 0
// 返回结果
false

```

第三题

```js
console.log(1 + "1"); //'11'
```

流程为：

```js
// 进行valueOf判断后发现第二个1为字符串，从而进行字符串拼接
"1" + "1";
// 返回结果
("11");
```

第四题

```js
console.log(true + true); //2
```

流程为：

```js
// 首先valueOf，还是true，则转为数字类型
1 + 1;
//返回结果
2;
```

第五题

```js
console.log(4 + []); //'4'
```

流程为：

```js
// 进行valueOf
4 + "";
//有字符串，所以转字符串拼接

"4" + "";

//返回结果
("4");
```

其余简单题

```js
console.log(4 + {}); //'4[object Object]'
console.log(4 + [1]); //'41'
console.log(4 + [1, 2, 3, 4]); //'41,2,3,4'
console.log("a" + +"b"); //'aNaN'
```

参考：

[[基础] JavaScript 类型转换及面试题 - 掘金](https://juejin.im/post/5c3c4d84f265da6142741c9f)


### 什么情况下会发生布尔值的隐式强制类型转换?
        
(1) if (..) 语句中的条件判断表达式。

(2) for ( .. ; .. ; .. ) 语句中的条件判断表达式(第二个)。

(3) while (..) 和 do..while(..) 循环中的条件判断表达式。

(4) ? : 中的条件判断表达式。

(5) 逻辑运算符 ||(逻辑或)和 &&(逻辑与)左边的操作数(作为条件判断表达式)

### || 和 && 操作符的返回值?
 
|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先进行 ToBoolean 强制 类型转换，然后再执行条件判断。

对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回 第二个操作数的值。

&& 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一 个操作数的值。

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果。


### JavaScript 中的作用域与变量声明提升?
                  

变量提升的表现是，无论我们在函数中何处位置声明的变量，好像都被提升到了函数的首部，我们可以在变量声明前访问到而不会报错。

造成变量声明提升的本质原因是 js 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。当我们访问一个变量时，我们会到当前执行上下文中的作用域链中去查找，而作用域链的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参、所有的函数和变量声明。

这个对象的是在代码解析的时候创建的。这就是会出现变量声明提升的根本原因。


### 函数声明和函数表达式的区别？

函数声明：在主代码流中声明为单独的语句的函数。

``` js
// 函数声明
function sum(a, b) {
  return a + b;
}

```

函数表达式：在一个表达式中或另一个语法结构中创建的函数。下面这个函数是在赋值表达式 = 右侧创建的：

``` js
// 函数表达式
var sum = function(a, b) {
  return a + b;
};
```

函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用，而函数声明存在变量提升，也就是说，下面的方式会报错：

``` js
sayHi("John"); // VM2331:1 Uncaught TypeError: sayHi is not a function

var sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```







参考：

[函数表达式](https://zh.javascript.info/function-expressions)



### let 在全局作用域声明的变量在 window 上吗？

在 ES5 中，全局变量直接挂载到全局对象的属性上，所以能在 window 上看到 var 声明的变量

在 ES6 中，全局对象的属性和全局变量脱钩，但是为了保持兼容性，旧的不变，所以 var、function 声明的全局变量依然可以在 window 对象上看到，而 let、const 声明的全局变量在 window 对象上看不到

### 如何将字符串转化为数字，例如 '12.3b'?
 
(1)使用 Number() 方法，前提是所包含的字符串不包含不合法字符。

(2)使用 parseInt() 方法，parseInt() 函数可解析一个字符串，并返回一个整数。还可 以设置要解析的数字的基数。当基数的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。

(3)使用 parseFloat() 方法，该函数解析一个字符串参数并返回一个浮点数。 

(4)使用 + 操作符的隐式转换。


### 说说对this的理解？

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模式来判断。

1.第一种是函数调用模式，当一个函数不是一个对象的属性时，直接作为 函数来调用时，this 指向全局对象。

2.第二种是方法调用模式，如果一个函数作为一个对象的方法来调用时， this 指向这个对象。

3.第三种是构造器调用模式，如果一个函数用 new 调用时，函数执行前 会新创建一个对象，this 指向这个新创建的对象。

4.第四种是 apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。

这四种方式，使用构造器调用模式的优先级最高，然后是 apply 、 call 和 bind 调用模式， 然后是方法调用模式，然后是函数调用模式。

### 说说对 bind,apply,call 的理解？

apply、call 和 bind 都是为了**改变某个函数运行时的上下文**而存在的，其实就是为了**改变所调用的函数体内部 this 的指向**。

bind 方法只是替换了所调用方法的 this 指向，并不会主动去执行这个方法，而是**返回一个全新的函数**；

而 apply 和 call 方法是即改变了 this 指向，又立即执行。**区别在于 call 是将参数一个个的传入，而 apply 是将参数以数组的形式传入**。

### call 和 apply 有什么区别？哪个性能更好？

call 和 apply 就是为了动态地改变 this 的指向，两者的区别在于 call 是将参数一个个的传入，而 apply 是将参数以数组的形式传入。

```js
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2]);
```

ES6 加入了扩展运算符后，不再需要 apply：

```js
let params = [1, 2, 3, 4];
xx.call(obj, ...params);
```

**call 的性能比 apply 要好**,可以参考[call 和 apply 的性能对比](https://github.com/noneven/__/issues/6)


### 0.1+0.2 等于多少？为什么？怎么解决这种问题？

0.30000000000000004，JavaScript 遵循 IEEE 754 规范。

在 JavaScript 中，所有的 Number 都是以 64-bit 的双精度浮点数存储的；
双精度的浮点数在这 64 位上划分为 3 段，而这 3 段也就确定了一个浮点数的值，64bit 的划分是“1-11-52”的模式，具体来说：

1.就是 1 位最高位（最左边那一位）表示符号位，0 表示正，1 表示负；

2.11 位表示指数部分；

3.52 位表示尾数部分，也就是有效域部分

解决方案：

使用成熟的数学计算第三方库：[NodeJS | Awesome-url](https://brizer.github.io/urls/zh/node_modules_zh.html#%E6%95%B0%E5%AD%A6%E8%AE%A1%E7%AE%97)

基本思路就是**转成字符串，确定位数，先放大，运算后再缩小**。给一个加法的 demo：

```js
/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function(arg) {
  return accAdd(arg, this);
};
```


### toPrecision 和 toFixed 和 Math.round 的区别?

toPrecision 用于处理精度，精度是从左至右第一个不为 0 的数开始数起。 

``` js
function precise(x) {
  return Number.parseFloat(x).toPrecision(4);
}

console.log(precise(123.456));
// expected output: "123.5"

console.log(precise(0.004));
// expected output: "0.004000"
```


toFixed 是对小数点后指定位数取整，从小数点开始数起。

``` js
function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

console.log(financial(123.456));
// expected output: "123.46"

console.log(financial(0.004));
// expected output: "0.00"

```

Math.round 是将一个数字四舍五入到一个整数。

### 说一下原型链，对象，构造函数之间的一些联系？prototype 和__proto__有什么区别？

ES 把对象定义为：“无序属性的集合，其属性可以包含基本值，对象和函数”。严格来讲，这就相当于说**对象是一组没有特定顺序的值**。

ES 中的构造函数可以**用来创建特定类型的对象，用来在创建对象时初始化对象**。它的特点是，一般为大写字母开头，**使用 new 操作符来实例化对象**，比如：

```js
function Person() {}
var person = new Person();
person.name = "Kevin";
console.log(person.name); // Kevin
```

Person 就是构造函数，person 就是对象。

在 JavaScript 中，对象有一个特殊的隐藏属性 `[[Prototype]]`（如规范中所命名的），其取值为 null 或者是**另一个对象的引用。该对象称为“原型”**。属性` [[Prototype]]` 是内部的而且隐藏的，但是设置它的方法却有很多种。
其中之一是使用 `__proto__`。

对于对象而言，每个 JS 对象一定对应一个原型对象，并从原型对象继承属性和方法。**对象`__proto__`属性**的值就是它所对应的原型对象。对象的`__proto__`指向自己构造函数的 prototype。所以对象的原型链就是`obj.__proto__.proto__....`。

对于函数而言，只有函数才有 prototype 属性，Person.prototype 是一个对象，并且有两个属性，
一个是 **constructor 指向其构造函数 Person**，
一个是 `__proto__` 属性：是一个对象，指向上一层的原型。

JavaScript 本身并不能确保正确的 `"constructor"` 函数值，我们可以随意修改之。因此，为了确保正确的 `"constructor"`，我们可以选择添加/删除属性到默认 `"prototype"` 而不是将其整个覆盖。

原型链的尽头是`Object.prototype`。所有对象均从`Object.prototype`继承属性。

`Function.prototype`和`Function.__proto__`为同一对象。**Object/Array/String 等等构造函数本质上和 Function 一样，均继承于`Function.prototype`。**

`Function.prototype`直接继承`Object.prototype`。

这里的 Object 和 Function 有点鸡和蛋的问题，总结：先有`Object.prototype`（原型链顶端），`Function.prototype`继承`Object.prototype`而产生，最后，**Function 和 Object 和其它构造函数继承`Function.prototype`而产生**。

属性查找时，先在对象自己上找，找不到才会一步步根据原型链往上找。

```js
function Person() {
  this.age = 15;
}
Person.prototype.age = 20;
var person = new Person();
class Child extends Person {}
var person2 = new Child();
console.log("////////////////////");
console.log(person.age); //15
console.log(Person.prototype.__proto__ == Object.prototype); //true
console.log(Person.prototype == Object.prototype); //false
console.log(Person.__proto__ == Function.prototype); //true
console.log(person.__proto__ == Person.prototype); //true
console.log(Person.prototype.constructor == Person); //true
console.log(Object.getPrototypeOf(person) === Person.prototype); //true
console.log(Object.prototype.__proto__); //null
console.log(Object.__proto__ == Function.prototype); //true
console.log(Function.prototype.__proto__ == Object.prototype); //true
console.log(Function.prototype == Function.__proto__); //true

console.log(Child.prototype.__proto__ == Person.prototype); //true
console.log(Child.prototype.__proto__ == Object.prototype); //false
console.log(Child.__proto__ == Person); //true
console.log(person2.__proto__ == Child.prototype); //true
console.log(person2.__proto__.__proto__ == Person.prototype); //true
```

所有的对象会一层层往上找原型，最终点是 Object，而 Object 的上一层原型就是 null 了。

参考：

[JavaScript 深入之从原型到原型链 · Issue #2 · mqyqingfeng/Blog](https://github.com/mqyqingfeng/Blog/issues/2)

[原型，原型链，对象，构造函数之间的联系。 - 泰阳的博客 - CSDN 博客](https://blog.csdn.net/qq_39795538/article/details/81836497)


### js获取原型的方法

``` js

p.__proto__

p.constructor.prototype

Object.getPrototypeOf(p)

```


### 闭包是什么？

**闭包是指有权访问另一个函数作用域中变量的函数**。广义上来说，**所有的js函数都可以称为闭包**，因为js函数在创建时保存了当前的词法环境。

我们来看一个例子：

``` js
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

alert( counter1() ); // 0
alert( counter1() ); // 1

alert( counter2() ); // 0 （独立的）
```

注意[[Environment]] 属性。

1、在脚本开始时，只存在全局词法环境

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20191025171654.png"/>

所有的函数在『诞生』时都会根据创建它的词法环境获得隐藏的 [[Environment]] 属性。
在这里，makeCounter 创建于全局词法环境，那么 [[Environment]] 中保留了它的一个引用。

2、代码执行，`makeCounter()` 被执行。下图是当 `makeCounter()` 内执行第一行瞬间的快照：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20191025171819.png"/>

在 `makeCounter()` 执行时，包含其变量和参数的词法环境被创建。

词法环境中存储着两个东西：

一个是环境记录，它保存着局部变量。在我们的例子中 count 是唯一的局部变量（当执行到 let count 这一行时出现）。

另外一个是外部词法环境的引用，它被设置为函数的` [[Environment]]` 属性。这里 makeCounter 的` [[Environment]] `属性引用着全局词法环境。
所以，现在我们有了两个词法环境：第一个是全局环境，第二个是 makeCounter 的词法环境，它拥有指向全局环境的引用。

3、在 makeCounter() 的执行中，创建了一个小的嵌套函数。

不管是使用函数声明或是函数表达式创建的函数都没关系，所有的函数都有 `[[Environment]]` 属性，该属性引用着所创建的词法环境。新的嵌套函数同样也拥有这个属性。

我们新的嵌套函数的 `[[Environment]]` 的值就是 makeCounter() 的当前词法环境（创建的位置）。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20191025172129.png"/>

请注意在这一步中，内部函数并没有被立即调用。 `function() { return count++; }` 内的代码还没有执行，我们要返回它。

4、随着执行的进行，`makeCounter()` 调用完成，并且将结果（该嵌套函数）赋值给全局变量 counter。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20191025172304.png"/>

这个函数中只有 `return count++` 这一行代码，当我们运行它时它会被执行。


5、当 `counter()` 执行时，它会创建一个『空』的词法环境。它本身没有局部变量，但是 counter 有 `[[Environment]] `作为其外部引用，所以它可以访问前面创建的 `makeCounter()` 函数的变量。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20191025174259.png"/>

如果它要访问一个变量，它首先会搜索它自身的词法环境（空），然后是前面创建的 `makeCounter()` 函数的词法环境，然后才是全局环境。

当它搜索 `count `，它会在最近的外部词法环境 `makeCounter` 的变量中找到它。

请注意这里的内存管理工作机制。虽然 `makeCounter()` 执行已经结束，但它的词法环境仍保存在内存中，因为这里仍然有一个嵌套函数的 `[[Environment]]` 在引用着它。

通常，只要有一个函数会用到该词法环境对象，它就不会被清理。并且只有没有（函数）会用到时，才会被清除。


但正如上面所说的，在 JavaScript 中函数都是天生的闭包。

也就是说，他们会通过隐藏的` [[Environment]]` 属性记住创建它们的位置，所以它们都可以访问外部变量。

在面试时，前端通常都会被问到『什么是闭包』，正确的答案应该是闭包的定义并且解释 JavaScript 中所有函数都是闭包，以及可能的关于` [[Environment]] `属性和词法环境原理的技术细节。

参考：

[闭包](https://zh.javascript.info/closure)


### 闭包的使用场景是？

1、保存变量优化性能

比如有一个复杂的计算：

``` js
_module._$isSupportWebP = function(){
    try{
        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }catch(err){
        return false;
    }
};
```

如果每次都去创建dom来判断，就会影响性能，此时将其闭包：

``` js
_module._$isSupportWebP = (function(){
    var isWebP;
    try{
        isWebP =  document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }catch(err){
        isWebP =  false;
    }
    return function(){
        return isWebP;
    }
})();
```

2、单例模式

构造函数单例化：

``` js
// 单例构造函数
function CreateSingleton (name) {
    this.name = name;
    this.getName();
};

// 获取实例的名字
CreateSingleton.prototype.getName = function() {
    console.log(this.name)
};
// 单例对象
var Singleton = (function(){
    var instance;
    return function (name) {
        if(!instance) {
            instance = new CreateSingleton(name);
        }
        return instance;
    }
})();

// 创建实例对象1
var a = new Singleton('a');
// 创建实例对象2
var b = new Singleton('b');

console.log(a===b);

```

通过模块单例化，比如实现一个自增长的id：[参考redux-saga](https://github.com/FunnyLiu/redux-saga/blob/readsource/packages/core/src/internal/uid.js#L1)，利用闭包就可以：

``` js
export let current = 0
// 单例id自增长
export default () => ++current
```

3、模仿块级作用域

经典的for var 问题：

``` js
for(var i = 0; i < 5; i++) {
    (function(j){
        setTimeout(() => {
            console.log(j);
        }, j * 1000);
    })(i)
}
```

4、私有变量和私有函数

第一种方式是：

``` js
function MyObject() {
    // 私有变量和私有函数
    var privateVariable = 10;
    function privateFunction() {
        return false;
    }
    // 特权方法
    this.publicMethod = function() {
        privateVariable++;
        return privateFunction;
    }
}
```

第二种方式就是闭包：

``` js
function Foo(name){
    this.getName = function(){
        return name;
    };
};
var foo = new Foo('luckyStar');
console.log(foo.name); //  => undefined
console.log(foo.getName()); //  => 'luckyStar'
```


### event.target 和 event.currentTarget 有什么区别？

**currentTarget 始终是监听事件者，而 target 是事件的真正发出者**。

```html
<div id="a">
  <div id="b">
    xx
  </div>
</div>

<script>
  var a = document.getElementById("a"),
    b = document.getElementById("b");
  function handler(e) {
    console.log(e.target);
    console.log(e.currentTarget);
  }
  a.addEventListener("click", handler, false);
</script>
```

点击 B 的 dom 时输出为 b，a；点击 A 的 dom 时输出 a，a。


可以参考vue中.self修饰符的实现：

``` js
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };
// 事件修饰符
var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};
```

参考：

[深入理解 e.target 与 e.currentTarget - 掘金](https://juejin.im/post/59f16ffaf265da43085d4108)


### 事件委托是什么？

事件委托本质上是利用了浏览器事件冒泡的机制。因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上
 
 
由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理。使用事件代理我们可以不必要为每一个子元素都绑定一个监听事件
，这样减少了内存上的消耗。
   
我们还可以实现事件的动态绑定，比如说新增了一个子节点听事件，它所发生的事件会交给父元素中的监听函数来处理。 

### mouseover 和 mouseenter 的区别?

当鼠标移动到元素上时就会触发 mouseenter 事件，类似 mouseover，它们两者之间的差别是 mouseenter 不会冒泡。

由于 mouseenter 不支持事件冒泡，导致在一个元素的子元素上进入或离开的时候会触发其 mouseover 和 mouseout 事件，但是却不会触发 mouseenter 和 mouseleave 事件。

参考：

[mouseenter与mouseover为何这般纠缠不清？ · Issue #1 · qianlongo/zepto-analysis](https://github.com/qianlongo/zepto-analysis/issues/1)




### 说说对严格模式的理解

use strict 是一种 ECMAscript5 添加的(严格)运行模式，这种模式使得 Javascript 在 更严格的条件下运行。设立"严格模式"的目的，主要有以下几个:

- 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;

- 消除代码运行的一些不安全之处，保证代码运行的安全;

- 提高编译器效率，增加运行速度;

- 为未来新版本的 Javascript 做好铺垫

区别:

1.禁止使用 with 语句。

2.禁止 this 关键字指向全局对象。

3.对象不能有重名的属性。

### for-in 和 for-of 的区别？

**for...in 循环出的是 key，for...of 循环出的是 value**。

但是：

for...of 语句在**可迭代对象**(包括 **Array, Map, Set, String, TypedArray，arguments 对象等等**)上创建一个迭代循环，对每个不同属性的属性值,调用一个自定义的有执行语句的迭代挂钩.

也就是说，**for of 只可以循环可迭代对象的可迭代属性**，不可迭代属性在循环中被忽略了。

### 如何让一个对象变得可迭代，可迭代的本质是什么？

比方说如下代码会抛出TypeError，因为object是不可迭代的。

``` js
const obj = {x:1,y:2,z:3};
const arr = [...obj];//TypeError
```

那我们如何修改使其成立呢？

利用[iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)，和[iterable协议](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)即可。
一个可迭代对象的定义：

``` js
var myIterator = {
    next: function() {
        // ...
    },
    [Symbol.iterator]: function() { return this }
};
```

所以我们如下改造即可：
``` js
const obj = {x:1,y:2,z:3};
obj[Symbol.iterator] = function() {
  return {
    count:0,
    next: function() {
      if(this.count == 3){
        return {value: this.count,done:true}
      }else{
        this.count +=1;
        return {value:this.count,done:false}
      }
    }
  }
}
const arr = [...obj];//1,2,3
```

### 对象属性的可枚举性是什么意思？会影响哪些操作？

对象属性可分为可枚举和不可枚举，区别在于 enumerable 的值。
Object 对象的**propertyIsEnumerable**()方法可以判断此对象是否包含某个属性，并且这个属性是否可枚举。

以下几种操作会被影响：

- for...in
- Object.keys()
- JSON.stringify()

他们只会返回可被枚举的值。

可以通过 object.defineProperty 来指定其是否可被枚举

```js
Object.defineProperty(kxy, "sex", {
  value: "female",
  enumerable: false
});
```

[参考](https://www.cnblogs.com/kongxy/p/4618173.html)

### 数组有哪些原生方法，列举一下?

数组和字符串的转换方法:toString()、toLocalString()、join() 其中 join() 方法 可以指定转换为字符串时的分隔符。数组尾部操作的方法 pop() 和 push()，push 方法可以 传入多个参数。数组首部操作的方法 shift() 和 unshift() 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数， 则交换两个参数的位置。

数组连接的方法 concat() ，返回的是拼接好的数组，不影响原数组。

数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。

数组插入方法 splice()，影响原数组查找特定项的索引的方法，indexOf() 和 lastIndexOf() 迭代方法 every()、some()、filter()、map() 和 forEach() 方法

数组归并方法 reduce() 和 reduceRight() 方法

### 遍历对象有哪些方式？

- for in
- Object.keys()遍历 key
- Object.values()遍历值
- Object.entries()遍历 key 和值
- Reflect.ownKeys(obj)遍历 key

### 遍历数组有哪些方式？

- forEach
- for in
- for of 数组对象也可以，例如 Dom nodelist


### js中的类数组是什么？

一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数 组类似，但是不能调用数组的方法。常见的类数组对象有 arguments 和 DOM 方法的返回结果， 还有一个函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个 数。
          
### 类数组怎么转变为数组

(1)通过 call 调用数组的 slice 方法来实现转换

``` js
Array.prototype.slice.call(arrayLike);
```

(2)通过 call 调用数组的 splice 方法来实现转换
 
``` js
Array.prototype.splice.call(arrayLike, 0);
```

(3)通过 apply 调用数组的 concat 方法来实现转换

``` js
Array.prototype.concat.apply([], arrayLike);
```

(4)通过 Array.from 方法来实现转换

``` js
Array.from(arrayLike);
```

### [,,,]和[,,,1]的长度是多少，为什么？

``` js
[,,,].length
//3
[,,,1].length
//4
```
尾后逗号 (有时叫做“终止逗号”)在向 JavaScript 代码添加元素、参数、属性时十分有用。 如果你想要添加新的属性，并且上一行已经使用了尾后逗号，你可以仅仅添加新的一行，而不需 要修改上一行。这使得版本控制更加清晰，以及代码维护麻烦更少。

JavaScript 一开始就支持数组字面值中的尾后逗号，随后向对象字面值(ECMAScript 5)中 添加了尾后逗号。最近(ECMAScript 2017)，又将其添加到函数参数中。但是 JSON 不支持尾后逗号。

如果使用了多于一个尾后逗号，会产生间隙。 带有间隙的数组叫做稀疏数组(密致数组没有间 隙)。稀疏数组的长度为逗号的数量。



### Map 和 Object 的区别是什么？

Objects 和 Maps 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 Maps 使用。

不过 Maps 和 Objects 有一些重要的区别，在下列情况里使用 Map 会是更好的选择：

1、**一个 Object 的键只能是字符串或者 Symbols**，但一个 Map 的键可以是任意值，包括函数、对象、基本类型。

2、**Map 中的键值是有序的**，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。

3、你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算。

4、**Map 可直接进行迭代**，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。

5、**Object 都有自己的原型**，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。**Map 是没有原型的**，虽然 ES5 开始可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。

6、Map 在涉及频繁增删键值对的场景下会**有些性能优势**。

### Map 和 WeakMap 的区别是什么？

WeakMap 对象是一组键值对的集合，其中的**键是弱引用对象**，而值可以是任意。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，**这个对象将会被垃圾回收（相应的 key 则变成无效的），所以，WeakMap 的 key 是不可枚举的。**

### WeakMap 的使用场景是？

和 DOM 进行关联，某些库会维护一个自定义对象，来关联 DOM 元素，并且其映射关系会存储在内部对象缓存中。如果一个 DOM 元素已经不复存在于网页中，库就需要清除对该 DOM 的引用，避免内存泄漏。使用 WeakMap 来追踪 DOM 元素，当 DOM 并不存在了，WeakMap 将被自动销毁。

### requestAnimationFrame 了解吗？有使用过吗？说一下使用场景。

requestAnimationFrame 是浏览器用于定时循环操作的一个接口，类似于 setTimeout，主要用途是按帧对网页进行重绘。
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

也可以用于任务调度，如果 React 的 Fiber 就是基于 requestAnimationFrame 和 requestIdleCallback 的。

### requestIdleCallback和requestAnimationFrame有什么区别？

首先了解[浏览器每一帧到底做了什么？](/cp/browser.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E6%AF%8F%E4%B8%80%E5%B8%A7%E5%88%B0%E5%BA%95%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88%EF%BC%9F)
requestAnimationFrame的回调会在每一帧确定执行，属于高优先级任务，而requestIdleCallback的回调则不一定，属于低优先级任务。 


参考：

[你应该知道的requestIdleCallback - 掘金](https://juejin.im/post/5ad71f39f265da239f07e862)


### 什么是ajax？

我对 ajax 的理解是，它是一种异步通信的方法，通过直接由 js 脚本向服务器发起 http 通 信，然后根据服务器返回的数据，更新网页的相应部分，而不用刷新整个页面的一种方法。创建 一个 ajax 有这样几个步骤。

首先是创建一个 XMLHttpRequest 对象。然后在这个对象上使用 open 方法创建一个 http 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。 

在发起请求前，我们可以为这个对象添加一些信息和监听函数。比如说我们可以通过 setRequestHeader 方法来为请求添加头信息。我们还可以为这个对象添加一个状态监听函数。 

一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发 onreadystatechange 事件，我们可以通过设置监听函数，来处理请求成功后的结果。

当对象 的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候我们可以通过判 断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。

这个时候我们就可以通过 response 中的数据来对页面进行更新了。

当对象的属性和监听函数设置完成后，最后我们调用 sent 方法来向服务器发起请求，可以传入参数作为发送的数据体。

以下是一个普通实现：

``` js
let xhr = new XMLHttpRequest();
// 创建 Http 请求 
xhr.open("GET", SERVER_URL, true);
// 设置状态监听函数 
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    //回调执行返回内容
    handle(this.response); 
  } else {
    console.error(this.statusText); 
  }
};
// 设置请求失败时的监听函数 
xhr.onerror = function() { 
  console.error(this.statusText);
};
// 设置请求头信息 
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
// 发送 Http 请求 
xhr.send(null);
```

### 什么是 Promise 对象，什么是 Promises/A+ 规范? 

Promise 对象是异步编程的一种解决方案，最早由社区提出。Promises/A+ 规范是JavaScript Promise 的标准，规定了一个 Promise 所必须具有的特性。

Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。

一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和 已失败。

实例的状态只能由 pending 转变 resolved 或者 rejected 状态，并且状态一经改 变，就凝固了，无法再被改变了。

状态的改变是通过 resolve() 和 reject() 函数来实现的， 

我们可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任 务，会在本轮事件循环的末尾执行。

参考：

[Promise 对象 - ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/promise)

### js 异步编程方法和各种的优缺点

发展历程：
callback->Promise->generator->async/await

callback 缺点：

- 回调地狱
- 不能用 try catch 捕获错误
- 不能 return

Promise 优点：

- 解决了回调地狱的问题

Promise 缺点：

- 无法取消 Promise
- 错误需要通过回调函数来捕获

generator 缺点：

- 写法冗余

async 优点：

- 代码清晰

async 缺点：

- 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低
  比如说：

```js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch("XXX1");
  await fetch("XXX2");
  await fetch("XXX3");
}
```

---

### 并发多个接口，如何回调一次结果？

利用promise构造函数只触发一次，内部状态转换后无法重复的特性来完成。

``` js
const FecthSomething = () => new Promise((resolve,reject)=>{
  setTimeout(()=>{
    //构造函数中只会执行一次
    console.log('exec')
    resolve({code:0});
  },2000)
})
const promise = new Promise((resolve, reject) => {
  return FecthSomething().then(data=>{resolve(data)})
})


promise.then((result) => {
  console.log(result)
})

promise.then((result) => {
  console.log(result)
})
//exec
//{code:0}
//{code:0}
```

### 如何实现 decorator

在用[nest](https://github.com/nestjs/nest)写 node 服务的时候，我们会用到很多的装饰器语法，可以参考[nestDemo](https://github.com/FunnyLiu/nestDemo/blob/master/serve-data/src/user/user.controller.ts#L51)。

那么如何实现装饰器呢？
我们以[core-decorators](https://github.com/jayphelps/core-decorators)为例。
来看一个 readonly 的装饰器用法如下：

```js
import { readonly } from "core-decorators";

class Meal {
  @readonly
  entree = "steak";
}

var dinner = new Meal();
dinner.entree = "salmon";
// Cannot assign to read only property 'entree' of [object Object]
```

[readonly.js 源码](https://github.com/jayphelps/core-decorators/blob/v0.12.1/src/readonly.js#L3)：

```js
import { decorate } from "./private/utils";

function handleDescriptor(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

export default function readonly(...args) {
  return decorate(handleDescriptor, args);
}
```

传入一个具体的处理函数给 utils 中的 decorate。

[utils 的 decorate 源码](https://github.com/jayphelps/core-decorators/blob/v0.12.1/src/private/utils.js#L22)：

```js
export function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor(...entryArgs, []);
  } else {
    return function() {
      return handleDescriptor(
        ...Array.prototype.slice.call(arguments),
        entryArgs
      );
    };
  }
}
```

将参数给回调函数进行处理。

我们再来看看 typescript 对以下代码的编译：

```ts
function Injectable(): ClassDecorator {
  return target => {
    const metadata = Reflect.getMetadata("design:paramtypes", target);
    console.log(metadata);
  };
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

```js
"use strict";
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
function Injectable() {
  return target => {
    const metadata = Reflect.getMetadata("design:paramtypes", target);
    console.log(metadata);
  };
}
class Service {
  constructor() {}
}
let Controller = class Controller {
  constructor(Service) {
    this.Service = Service;
  }
};
Controller = __decorate(
  [
    Injectable(), // Array [ Service() ]
    __metadata("design:paramtypes", [Service])
  ],
  Controller
);
```

可以看到\_\_decorate 函数就是封装 decorator 的核心逻辑：

```js
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
```

这里有三个比较重要的 API：

- [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) - 如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。
- Reflect.decorate - 这个还不是 ES 的标准，是 TS 的 ES.later 中的一项，所以需要额外的 polyfill。
- [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) - 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

所以主要流程就是判断其是否还有其他装饰器，然后尝试调用 Reflect.decorate 来直接解决问题，如果没有该 API，则退而求其次的使用`Object.defineProperty`拦截某个 property 来进行自己想要的修改。

而`__metadata`则是使用了`Reflect.metadata`来操作元数据：

```js
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
```

还有一些其他的实现库可以参考。

如：[egg-shell-decorators源码分析](https://github.com/FunnyLiu/egg-shell-decorators/tree/readsource)，以及 [基于reflect-metadata实现类装饰器、方法装饰器、属性装饰器和函数参数装饰器](https://github.com/FunnyLiu/typescript-decorators/tree/readsource)


### 为什么 decorator 只能用于类，不能用于函数

函数是存在变量提升的问题的，而类则不存在。
举一个最简单的例子：

```js
var { readOnly } = require("core-decorator");

@readOnly
    function foo() {
}
```

其实会变成：

```js
var readOnly;

@readOnly
    function foo() {
}

{ readOnly } = require("core-decorator");
```

明白了吧。

### Object.create(null)和{}有什么区别？

首先了解[简单实现 object-create](/language/javascript.html#%E7%AE%80%E5%8D%95%E5%AE%9E%E7%8E%B0object-create)。通过 Object.create(null)创建的对象是没有原型的：

```js
console.log(Object.create({}).toString); // function toString() { [native code] }
console.log(Object.create(null).toString); // undefined
```

所以说在赋值默认值时更加适合，比如说 node 源码中的这一段：

```js
// Don't use 'blue' not visible on cmd.exe
inspect.styles = Object.assign(Object.create(null), {
  special: "cyan",
  number: "yellow",
  bigint: "yellow",
  boolean: "yellow",
  undefined: "grey",
  null: "bold",
  string: "green",
  symbol: "green",
  date: "magenta",
  // "name": intentionally not styling
  regexp: "red",
  module: "underline"
});
```

### Object.is和===有什么区别？

使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情 况，比如 -0 和 +0 不再相等，两个 NaN 认定为是相等的。

 
### 如何判断一个对象是否为空对象？



可以参考tomato的实现：[tomato/is-empty.ts at master · tomato-js/tomato](https://github.com/tomato-js/tomato/blob/master/packages/shared/src/is-empty.ts)



### 浏览器里的window和Window有什么区别？

简单的说：

Window 是类， window 是实例，全局变量是 window 的属性。

1、概念上看，

1）Window和window都是由浏览器实现的【native code】，应该可以增加属性，但肯定没法修改其原始代码；

2）window是由构造函数Window实例化的对象，各自有自己独立的内存空间。

2、继承关系上看：

window的继承关系为：

window—>Window.prototype—>Windowproperties.prototype—>EventTarget.prototype—>Object.prototype;

而Window的继承关系为：

Window—>EventTarget—>Function.prototype—>Object.prototype。

两者的顶层都是Object.prototype，不可能单独为Window和window增加新的属性，Window的根下一层Function.prototype也不可能增加新的属性，因为所有自定义函数和对象都会用到这两个玩意；要想一样（指属性一样），只能从Window的EventTarget这一层和window的Windowproperties.prototype这一层以下做文章。对于对象属性可以互相引用，做到一样，对于原始类型的属性，只能通过代码来同步


参考：

[js中Window和window的区别是什么？ - 知乎](https://www.zhihu.com/question/52761658)



### 如何在代码中减少迭代次数？（todo）

### 如何实现一个 Duff 装置？（todo）


### 在 JavaScript 中如何实现对象的私有属性?（todo）

### 获取精度更高的时间（todo）

### 如何获取首屏渲染时间（todo）


### 列举常见dom api

(1)创建新节点

createDocumentFragment(node);createElement(node);createTextNode(text);

(2)添加、移除、替换、插入

appendChild(node)removeChild(node)replaceChild(new,old)insertBefore(new,old )

   
(3)查找

getElementById();getElementsByName();getElementsByTagName();getElementsByClassName();

querySelector();querySelectorAll(); 

(4)属性操作

getAttribute(key);setAttribute(key, value);hasAttribute(key);removeAttribute(key);


### innerHTML 和 outerHTML的区别？

对于这样一个 HTML 元素:`<div>content<br/></div>`。 

innerHTML:内部 HTML，`content<br/>`; 

outerHTML:外部 HTML，`<div>content<br/></div>`; 


### escape,encodeURI,encodeURIComponent 有什么区别?

encodeURI 是对整个 URI 进行转义，将 URI 中的非法字符转换为合法字符，所以对于一些在 URI 中有特殊意义的字符不会进行转义。

encodeURIComponent 是对 URI 的组成部分进行转义，所以一些特殊字符也会得到转义。

escape 和 encodeURI 的作用相同，不过它们对于 unicode 编码为 0xff 之外字符的时候会 有区别，escape 是直接在字符的 unicode 编码前加上 %u，而 encodeURI 首先会将字符转 换为 UTF-8 的格式，再在每个字节前加上 %。


1、如果只是编码字符串，不和URL有半毛钱关系，那么用escape。

2、如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。比如`encodeURI("http://www.cnblogs.com/season-huang/some other thing")`;
编码后会变为`"http://www.cnblogs.com/season-huang/some%20other%20thing"`;

其中，空格被编码成了%20。但是如果你用了encodeURIComponent，那么结果变为`"http%3A%2F%2Fwww.cnblogs.com%2Fseason-huang%2Fsome%20other%20thing"`
看到了区别吗，连 "/" 都被编码了，整个URL已经没法用了。

3、当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法。
``` js
var param = "http://www.cnblogs.com/season-huang/"; //param为参数
param = encodeURIComponent(param);
var url = "http://www.cnblogs.com?next=" + param;
console.log(url) //"http://www.cnblogs.com?next=http%3A%2F%2Fwww.cnblogs.com%2Fseason-huang%2F"
```
看到了把，参数中的 "/" 可以编码，如果用encodeURI肯定要出问题，因为后面的/是需要编码的。

参考：

[escape,encodeURI,encodeURIComponent有什么区别? - 知乎](https://www.zhihu.com/question/21861899)


### 如何理解Proxy？

 
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”， 即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这 层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代 理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

### Reflect 对象创建目的?
1.将 Object 对象的一些明显属于语言内部的方法(比如Object.defineProperty)，放到 Reflect 对象上。

2.修改某些 Object 方法的返回结果，让其变得更合理。

3.让 Object 操作都变成函数行为。

4.Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象 的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取 默认行为。比如应用场景：[基于-proxy-实现双向绑定](/language/javascript.html#%E5%9F%BA%E4%BA%8E-proxy-%E5%AE%9E%E7%8E%B0%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A)




### 怎么编写高性能的js，需要注意哪些点？

- 建议将对象进行缓存处理，特别是DOM访问是比较消耗资源的

- 使用位运算代替一些简单的四则运算。

- 避免使用过深的嵌套循环。

- 不要使用未定义的变量。

- 当需要多次访问数组长度时，可以用变量保存起来，避免每次都会去进 行属性查找

参考：

[编写高性能Javascript代码的若干建议 - 知乎](https://zhuanlan.zhihu.com/p/34780474)


### 哪些操作会造成内存泄漏？

针对node端，可以参考[遇到过nodejs中的内存泄漏吗？怎么排查呢？怎么避免呢？](/language/node.html#%E9%81%87%E5%88%B0%E8%BF%87nodejs%E4%B8%AD%E7%9A%84%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E5%90%97%EF%BC%9F%E6%80%8E%E4%B9%88%E6%8E%92%E6%9F%A5%E5%91%A2%EF%BC%9F%E6%80%8E%E4%B9%88%E9%81%BF%E5%85%8D%E5%91%A2%EF%BC%9F)。

针对浏览器端有以下几点：

第一种情况是我们由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留 在内存中无法被回收。

第二种情况是我们设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量 的引用的话，那么这个变量会被一直留
在内存中，而无法被回收。

第三种情况是我们获取一个 DOM 元素的引用，而后面这个元素被删除，由于我们一直保留了对 这个元素的引用，所以它也无法被回收。

第四种情况是不合理的使用闭包，从而导致某些变量一直被留在内存当中。

### 什么是尾调用，使用尾调用有什么好处?
                   
尾调用指的是函数的最后一步调用另一个函数。我们代码执行是基于执行栈的，所以当我们在一 个函数里调用另一个函数时，我们会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这个时候我们可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。但是ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

---

## 原理

### js是单线程语言，和异步冲突吗？

JS 的单线程是指一个浏览器进程中只有一个 JS 的执行线程，同一时刻内只会有一段代码在执行。

举个通俗例子，假设 JS 支持多线程操作的话，JS 可以操作 DOM，那么一个线程在删除 DOM，另外一个线程就在获取 DOM 数据，这样子明显不合理，这算是证明之一。

异步机制是浏览器的两个或以上常驻线程共同完成的，举个例子，比如异步请求由两个常驻线程，JS 执行线程和事件触发线程共同完成的。

*   JS 执行线程发起异步请求（浏览器会开启一个 HTTP 请求线程来执行请求，这时 JS 的任务完成，继续执行线程队列中剩下任务）
    
*   然后在未来的某一时刻事件触发线程监视到之前的发起的 HTTP 请求已完成，它就会把完成事件插入到 JS 执行队列的尾部等待 JS 处理
    

再比如定时器触发 (settimeout 和 setinterval) 是由**浏览器的定时器线程**执行的定时计数，然后在定时时间把定时处理函数的执行请求插入到 JS 执行队列的尾端（所以用这两个函数的时候，实际的执行时间是大于或等于指定时间的，不保证能准确定时的）。

所以这么说，JS 单线程与异步更多是浏览器行为，之间不冲突。


### 任务队列机制

尝试写出以下代码的结果：

```js
//请写出输出内容
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log("script end");
```

答案为:

```js
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

首先需要理解 js 中有同步和异步任务。

同步任务都在主线程上执行，形成一个执行栈，遇到异步任务时则加入不同的任务队列。

异步任务分为宏任务和微任务。

宏任务一般是：包括 script(整体代码)、setTimeout、setInterval、I/O、UI 交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)

微任务：原生 Promise(有些实现的 promise 将 then 方法放到了宏任务中)、process.nextTick、Object.observe(已废弃)、 MutationObserver 记住就行了。

**一个EventLoop只有一个宏任务和一组微任务列表。**

**在当前的微任务没有执行完成时，是不会执行下一个宏任务的。**

**Promise**中的异步体现在 then 和 catch 中，所以**写在 Promise 中的代码是被当做同步任务立即执行的**。

对于 async/await 来说，**await 是一个让出线程的标志。await 后面的表达式会先执行一遍，将 await 后面的代码加入到 microtask 中，然后就会跳出整个 async 函数来执行后面的代码。**
所以说：

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
//等价于

async function async1() {
  console.log("async1 start");
  Promise.resolve(async2()).then(() => {
    console.log("async1 end");
  });
}
```

现在可以理解上面的结果了吧。

至于多个promise的then链式调用：

``` js
new Promise((resolve,reject)=>{
    console.log("promise1")
    resolve()
}).then(()=>{
    console.log("then1-1")
    new Promise((resolve,reject)=>{
        // 构造函数中内容是同步的
        console.log("promise2")
        //意味这当前promise已经resolved
        resolve()
        // 跳到下面关键的第四步
    }).then(()=>{
        console.log("then2-1")
    }).then(()=>{
        console.log("then2-2")
    })
}).then(()=>{
    console.log("then1-2")
})
```
每一次then其实就是回调一层queueMicrotask
其实就是对标：

``` js
console.log("promise1")
queueMicrotask(()=>{
    console.log("then1-1");
    console.log("promise2")
    queueMicrotask(()=>{
        console.log("then2-1")
        queueMicrotask(()=>{
            console.log("then2-2")
        })
    });
    queueMicrotask(()=>{
        console.log("then1-2")        
    })
})
```

输出结果为：

``` js
/*
运行结果：
promise1
then1-1
promise2
then2-1
then1-2
then2-2
*/ 

//第一个外层then的状态为resolve时，先把自身then加入队列，才会调用第二个外层then

// 1、外层promise执行，打印promise1，把then1-1追加到microtasks，此时microtasks为[then1-1] 
// 2、外层then1-1中的回调函数执行，打印then1-1，此时microtasks为[] 
// 3、内层promise执行，打印promise2，把then2-1追加到microtasks，此时microtasks为[then2-1] 
// 4、外层then1-1执行结束，把then1-2追加到microtasks，此时microtasks为[then2-1, then1-2] 
// 5、内层then2-1中的回调函数执行，打印then2-1，把then2-2追加到microtasks，此时microtasks为[then1-2, then2-2] 
// 6、外层then1-2中的回调函数执行，打印then1-2，此时microtasks为[then2-2] 
// 7、内层then2-2中的回调函数执行，打印then2-2，此时microtasks为[]

```

有一个情况比较特殊，就是当 Promise resolve 了一个 Promise 时，会产生一个 NewPromiseResolveThenableJob。

该 Jobs 还会调用一次 then 函数来 resolve Promise，这也就又生成了一次微任务。

``` js
new Promise((resolve,reject)=>{
    console.log("promise1")
    resolve()
}).then(()=>{
    console.log("then1-1")
    new Promise((resolve,reject)=>{
        // 构造函数中内容是同步的
        console.log("promise2")
        resolve();
    }).then(()=>{
        console.log("then2-1")
        //当 Promise resolve 了一个 Promise 时，会产生一个 NewPromiseResolveThenableJob
        //该 Jobs 还会调用一次 then 函数来 resolve Promise，这也就又生成了一次微任务。
        return Promise.resolve()
    }).then(()=>{
        console.log("then2-2")
    }).then(()=>{
        console.log("then2-3")
    })
}).then(()=>{
    console.log("then1-2")
}).then(()=>{
    console.log("then1-3")
})
//对标queueMicrotask版本
console.log("promise1")
queueMicrotask(()=>{
    console.log("then1-1");
    console.log("promise2")
    queueMicrotask(()=>{
        console.log("then2-1")
        //该 Jobs 还会调用一次 then 函数来 resolve Promise，这也就又生成了一次微任务。
        queueMicrotask(()=>{
            queueMicrotask(()=>{
                console.log("then2-2")
                queueMicrotask(()=>{
                    console.log("then2-3")
                })
            })
        })
    });
    queueMicrotask(()=>{
        console.log("then1-2")   
        queueMicrotask(()=>{
            console.log("then1-3")
        })     
    })
})
// 结果为：
// promise1
// then1-1
// promise2
// then2-1
// then1-2
// then1-3
// then2-2
// then2-3
```

### js的几种模块规范

js 中现在比较成熟的有四种模块加载方案。

第一种是 CommonJS 方案，它通过 require 来引入模块，通过 module.exports 定义模块的 输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的方式来引入模块的，因为在 服务端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题。但如果是在 浏览器端，由于模块的加载是使用网络请求，因此使用异步加载的方式更加合适。

第二种是 AMD 方案，这种方案采用异步加载的方式来加载模块，模块的加载不影响后面语句的 执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后再执行回调函数。 require.js 实现了 AMD 规范。

第三种是 CMD 方案，这种方案和 AMD 方案都是为了解决异步模块加载的问题，sea.js 实现 了 CMD 规范。它和 require.js 的区别在于模块定义时对依赖的处理不同和对依赖模块的执行 时机的处理不同。

第四种方案是 ES6 提出的方案，使用 import 和 export 的形式来导入导出模块。这种方案 和上面三种方案都不同。

### 模块依赖管理 import，import from 和 require 等的区别？

首先 import 和 export 是 ES module 的标准语法。
先介绍 import 和 import from 的区别：

import 语句会执行所加载的模块，而如果 export 的很多，只 import 其中一部分的话，比如：

```js
export { onlyOne };
```

```js
import { onlyOne } from "path/to/module";
```

则可以进一步优化文件打包，这也是各个打包工具所谓的 tree-shaking。

而 require 则是 nodejs 中的依赖的方式，这种也叫 CommonJS，会有一套完成的查找模块的顺序。
**require 和 es 的 import 的区别在于**：

1. CommonJS 模块是**运行时加载**，ES6 模块是编译时输出接口。
   运行时加载: CommonJS 模块就是对象；即**在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”**，具体细节可以参考[require时到底发生了什么](https://github.com/FunnyLiu/node/tree/readsource#libinternalmodulescjsloaderjs)。
   编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import 时采用静态命令的形式。即在 import 时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。

3. CommonJs 是单个值导出，ES6 Module可以导出多个。

4. CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层。

5. CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined。


CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。


参考：

[require() 源码解读 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/05/require.html)




### 在同一段代码中，ES6是如何做到既要支持变量提升的特性，又要支持块级作用域的呢？

以这段代码为例：

``` js
 function foo(){
      var a = 1
      let b = 2
      {
        let b = 3
        var c = 4
        let d = 5
        console.log(a)
        console.log(b)
      }
      console.log(b)
      console.log(c)
      console.log(d)  
  }  
  foo()
```

块级作用域就是通过词法环境的栈结构来 实现的，而变量提升是通过变量环境来实现，通过这两者的结合，JavaScript引擎也就同时支持了变量提升 和块级作用域了。

沿着词法环境的栈顶向下查询，如果在词法环境中的某个块中查找到了，就 直接返回给JavaScript引擎，如果没有查找到，那么继续在变量环境中查找。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119164448.png"/>



### JavaScript 中不同类型以及不同环境下变量的内存都是何时释放?

首先掌握[谈谈v8中的gc策略](/cp/browser.html#%E8%B0%88%E8%B0%88v8%E4%B8%AD%E7%9A%84gc%E7%AD%96%E7%95%A5)

引用类型是在没有引用之后, 通过 v8 的 GC 自动回收, 值类型如果是处于闭包的情况下, 要等闭包没有引用才会被 GC 回收, 非闭包的情况下等待 v8 的新生代 (new space) 切换的时候回收。

参考：

[Node.js Interview](https://elemefe.github.io/node-interview/#/sections/zh-cn/common?id=%e5%86%85%e5%ad%98%e9%87%8a%e6%94%be)



### JavaScript 中的数组为什么可以不需要分配固定的内存空间？（todo）

### JavaScript 中数组的存储和 C / C++ / Java 中数组的存储有什么区别？（todo）

### JavaScript 中数组是否可以理解为特殊的对象？（todo）

### JavaScript 中数组和 C / C++ / Java 中数组存储在性能上有什么区别？（todo）

### JavaScript 中的 Array 和 Node.js 中的 Buffer 有什么区别？（todo）

### JavaScript 中的数组何时是连续存储的，何时是哈希存储的？（todo）

### 哈希存储的键冲突（散列碰撞）可以有哪些解决方案（开链法、线性探测法、红黑树等）（todo）？


### 聊聊继承以及说说 ES5 和 ES6 继承的区别？（todo）


### 条件比较多的时候 if-else 和 switch 性能哪个高？（todo）

### 字面量 / 数组 / 对象存储性能有没有什么区别？（todo）

### 如何提升 JavaScript 变量的存储性能？(todo)


---

## 编码


### 说说下面输出结果

首先弄明白[函数声明和函数表达式的区别？](/language/javascript.html#%E5%87%BD%E6%95%B0%E5%A3%B0%E6%98%8E%E5%92%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F)，知道**函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用，而函数声明存在变量提升**。



``` js
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}
 
//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

最后结果为2411233

答案解读：

``` js
function Foo() {
    //函数表达式，执行到才赋值
    getName = function () { alert (1); };
    //this为window
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
//最后的getName为4，因为其是表达式
var getName = function () { alert (4);};
//函数声明被提升到顶部了
function getName() { alert (5);}
 
//请写出以下输出结果：
Foo.getName();//调用的Foo.getName
getName();//最初的是表达式：var getName = function () { alert (4);};，因为其最后执行而不被提升
Foo().getName();//调用的是window.getName也就是被getName = function () { alert (1); };覆盖后的getName
getName();//window上的getName已被覆盖为1
new Foo.getName();//调用Foo.getName
new Foo().getName();//Foo.prototype.getName
new new Foo().getName();//Foo.prototype.getName
```

参考：

[前端程序员经常忽视的一个JavaScript面试题 · Issue #85 · Wscats/articles](https://github.com/Wscats/articles/issues/85)



### 对于 this,prototype 理解

答案是什么：

```js
function a() {
  this.b = 3;
}
a.prototype.b = 7;
var t = new a();
var b = 2;
a();
console.log(t.b); //3
console.log(b); //3
```

属性查找顺序先找实例再找原型。

构造函数不用 new 的方式直接用会有问题。this 指向 window。

### 两个变量交换值

``` js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a,b)//2 1
```

### 如何实现一个 sleep(1000)?麻烦用各自异步方式实现

4 种方式

```js
//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};
sleep(1000).then(() => {
  console.log(1);
});

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve, reject) {
    setTimeout(resolve, time);
  });
}
sleepGenerator(1000)
  .next()
  .value.then(() => {
    console.log(1);
  });

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}
output();

//callback
function sleep(callback, time) {
  if (typeof callback === "function") setTimeout(callback, time);
}

function output() {
  console.log(1);
}
sleep(output, 1000);
```

参考地址：

[一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/63)

### 遍历 dom 树

```js
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

[如何遍历一个 dom 树](https://github.com/airuikun/Weekly-FE-Interview/issues/4)

### 如何实现一个 new

1、创建一个空对象，并且 this 变量引用该对象，// let obj = new Object()

2、继承了函数的原型。// obj.\_\_proto = Con.prototype

3、属性和方法被加入到 this 引用的对象中。并执行了该函数 func // let result = Con.apply(obj, arguments)

4、新创建的对象由 this 所引用，并且最后隐式的返回 this 。

```js
function create() {
  // 创建一个空的对象
  let obj = new Object();
  // 获得构造函数
  let Con = [].shift.call(arguments);
  // 链接到原型
  obj.__proto__ = Con.prototype;
  // 绑定 this，执行构造函数
  let result = Con.apply(obj, arguments);
  // 确保 new 出来的是个对象
  return typeof result === "object" ? result : obj;
}
```

es6 之后更加复杂了，[参考](https://www.ecma-international.org/ecma-262/6.0/#sec-new-operator)。

### 如何实现 call

```js
// 将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("not funciton");
  }
  context = context || window;
  context.fn = this;
  let arg = [...arguments].slice(1);
  let result = context.fn(...arg);
  delete context.fn;
  return result;
};
```

### 如何实现 apply

首先了解：[call 和 apply 有什么区别？哪个性能更好？](/language/javascript.html#call%E5%92%8Capply%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F%E5%93%AA%E4%B8%AA%E6%80%A7%E8%83%BD%E6%9B%B4%E5%A5%BD%EF%BC%9F)

```js
Function.prototype.myapply = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("not funciton");
  }
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
```

### apply的使用场景有哪些？

1、Vue插件加载

插件必须实现install方法，且第一个参数的Vue对象本身

``` js
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      // 调用入参的install方法。
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

2、lodash.memoize

使用apply将传入的方法拦截并执行。

参考lodash下的memoize：

``` js
function memoize(func, resolver) {
  // 函数类型检查
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;
    // 取缓存
    if (cache.has(key)) {
      return cache.get(key);
    }
    // 关键，拦截func并执行
    var result = func.apply(this, args);
    // 将执行结果缓存起来
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  // 使用MapCache.js或自定义cache
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}
```

3、nej.aop

紧接函数的aop方法

参考nej:

``` js
/**
 * AOP增强操作，增强操作接受一个输入参数包含以下信息
 *
 *  | 参数名称 | 参数类型  | 参数描述 |
 *  | :--     | :--      | :-- |
 *  | args    | Array    | 函数调用时实际输入参数，各增强操作中可以改变值后将影响至后续的操作 |
 *  | value   | Variable | 输出结果 |
 *  | stopped | Boolean  | 是否结束操作，终止后续操作 |
 *
 * @method external:Function#_$aop
 * @param  {Function} arg0 - 前置操作，接受一个输入参数，见描述信息
 * @param  {Function} arg1 - 后置操作，接受一个输入参数，见描述信息
 * @return {Function}        增强后操作函数
 */
_extpro._$aop = function(_before,_after){
    var _after = _after||_f,
        _before = _before||_f,
        _handler = this;
    return function(){
        var _event = {args:_r.slice.call(arguments,0)};
        _before(_event);
        if (!_event.stopped){
            // handler就是this，函数自己，执行自己。
            _event.value = _handler.apply(this,_event.args);
            _after(_event);
        }
        return _event.value;
    };
};
```

4、curry

实现函数curry化:

``` js
function curry(fn) {
  var args = [...arguments].slice(1);
  return function() {
    var finalArgs = args.concat(...arguments);
    return fn.apply(null, finalArgs);
  };
}

//使用方法如下：
function add(num1, num2) {
  return num1 + num2;
}
var curriedAdd = curry(add, 5);
document.write(curriedAdd(3) + "<br>"); //8
var curriedAddB = curry(add, 5, 10);
document.write(curriedAddB() + "<br>"); //15
```

5、lodash的before和after

``` js
// 通过apply拦截函数
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}
// after
function after(n, func) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function() {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}

```

### 如何实现 bind？

```js
Function.prototype.mybind = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let _this = this;
  let arg = [...arguments].slice(1);
  return function F() {
    // 处理函数使用new的情况
    if (this instanceof F) {
      return new _this(...arg, ...arguments);
    } else {
      return _this.apply(context, arg.concat(...arguments));
    }
  };
};
```

### 如何实现instanceof？

首先弄懂[说一下原型链，对象，构造函数之间的一些联系？prototype-和-proto-有什么区别？](/language/javascript.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E5%8E%9F%E5%9E%8B%E9%93%BE%EF%BC%8C%E5%AF%B9%E8%B1%A1%EF%BC%8C%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E4%B9%8B%E9%97%B4%E7%9A%84%E4%B8%80%E4%BA%9B%E8%81%94%E7%B3%BB%EF%BC%9Fprototype-%E5%92%8C-proto-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F)

本题主要考察instanceof的判断原理，instanceof主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false。

``` js
/**
  自定义instanceof 
*/
function instanceOf(left, right) {
  let proto = left.__proto__
  while(proto){
    if(proto === right.prototype){
       return true
    }
    proto = proto.__proto__
  }  
  return false
}

class A{}
class B extends A {}
class C{}

const b = new B()
// 输出 true
console.log(instanceOf(b,B))
// 输出 true
console.log(instanceOf(b,A))
// 输出 false
console.log(instanceOf(b,C))

```

参考：

[面试造火箭，看下这些大厂原题 - 掘金](https://juejin.im/post/6859121743869509646)



### 如何实现 curry？

```js
function curry(fn) {
  var args = [...arguments].slice(1);
  return function() {
    var finalArgs = args.concat(...arguments);
    return fn.apply(null, finalArgs);
  };
}

//使用方法如下：
function add(num1, num2) {
  return num1 + num2;
}
var curriedAdd = curry(add, 5);
document.write(curriedAdd(3) + "<br>"); //8
var curriedAddB = curry(add, 5, 10);
document.write(curriedAddB() + "<br>"); //15
//可以看到参数灵活多变
```

```js
const curry = (fn, arr = []) =>
  fn.length === arr.length
    ? fn(...arr)
    : (...args) => curry(fn, [...arr, ...args]);
```

### js 的 api 中哪些用的了 curry？

函数的 bind 方法，数组的 reduce 方法。

### 如何实现深拷贝？

首先明白深拷贝和浅拷贝的区别。**浅克隆之所以被称为浅克隆，是因为对象只会被克隆最外部的一层,至于更深层的对象,则依然是通过引用指向同一块堆内存**.
Object.assign()实现的是浅复制。

生产环境最好使用[lodash 的 cloneDeep](https://lodash.com/docs/4.17.11#cloneDeep。),
其基于[结构化克隆算法](https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm)

如果只是简单的兼容数组和对象，可以采用如下：

```js
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone;
};

const a = { foo: "bar", obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```

如果要兼容 Buffer 对象、Promise、Set、Map、正则、Date 等等，还是算了。

### 如何简单的拷贝一些不同数据类型的值

针对不同的数据类型，有一些不同的拷贝方案。

#### 对于数组

使用 for 循环和 push

```js
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

使用 slice：

```js
var arr = [1, 2, 3, 4, 5]; //只适应单层数组结构
var arr2 = arr.slice(0);
console.log(arr); //(5) [1, 2, 5, 4, 5]
console.log(arr2); //(5) [1, 2, 5, 4, 5]
```

使用 concat：

```js
var arr = [1, 2, 3, 4, 5]; //只适应单层数组结构
var arr2 = arr.concat();
console.log(arr); //(5) [1, 2, 5, 4, 5]
console.log(arr2); //(5) [1, 2, 5, 4, 5]
```

使用扩展运算符

```js
var arr = [1, 2, 3, 4, 5]; //只适应单层数组结构
var [...arr2] = arr;
console.log(arr); //(5) [1, 2, 5, 4, 5]
console.log(arr2); //(5) [1, 2, 5, 4, 5]
```

#### 对于对象

for 循环实现

```js
//如果包含属性值是数组，无法深层拷贝数组里面的数据
var obj = {
  name: "jingjing",
  sex: "girl",
  old: "18"
};
var obj2 = copyObj(obj);
function copyObj(obj) {
  let res = {};
  for (var key in obj) {
    res[key] = obj[key];
  }
  return res;
}
```

json 转一转，注意函数类型会丢失。

```js
var obj = {
  name: "jingjing",
  sex: "girl",
  old: "18"
};
var obj2 = JSON.parse(JSON.stringify(obj));
```

扩展运算符

```js
//如果包含的属性值是数组，无法深层拷贝数组里面的数据
var obj = {
  name: "jingjing",
  sex: "girl",
  old: "18"
};
var { ...obj2 } = obj;
obj.old = "22";
console.log(obj); //{name: "jingjing", sex: "girl", old: "22"}
console.log(obj2); //{name: "jingjing", sex: "girl", old: "18"}
```

Object.assign

```js
let copy2 = Object.assign({}, { x: 1 });
```

[参考](https://segmentfault.com/a/1190000012150942)

### 二维数组转一维有哪些实现方式？

1.遍历

```js
var arr = [
  ["h", "e", "l", "l", "o"],
  ["m", "y"],
  ["w", "o", "r", "l", "d"],
  ["!"]
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

```js
var arr = [
  ["h", "e", "l", "l", "o"],
  ["m", "y"],
  ["w", "o", "r", "l", "d"],
  ["!"]
];
var result = [];
for (var r = 0, result = []; r < arr.length; r++) {
  result = result.concat(arr[r]);
}
console.log(result); //=>[ 'h', 'e', 'l', 'l', 'o', 'm', 'y', 'w', 'o', 'r', 'l', 'd', '!' ]
```

3.apply+concat
利用 apply 和 concat 一行代码就够了。

```js
var arr = [
  ["h", "e", "l", "l", "o"],
  ["m", "y"],
  ["w", "o", "r", "l", "d"],
  ["!"]
];
var result = Array.prototype.concat.apply([], arr);
console.log(result); //=>[ 'h', 'e', 'l', 'l', 'o', 'm', 'y', 'w', 'o', 'r', 'l', 'd', '!' ]
```

4.join+split

```js
var arr = [
  ["h", "e", "l", "l", "o"],
  ["m", "y"],
  ["w", "o", "r", "l", "d"],
  ["!"]
];

var result = arr.join().split(",");

console.log(result);
```

5.reduce+concat

```js
var arr = [
  ["h", "e", "l", "l", "o"],
  ["m", "y"],
  ["w", "o", "r", "l", "d"],
  ["!"]
];
var result = arr.reduce((prev, curr) => {
  return prev.concat(curr);
});
console.log(result);
```

6.使用展开运算符+concat

```js
var arr = [
  ["h", "e", "l", "l", "o"],
  ["m", "y"],
  ["w", "o", "r", "l", "d"],
  ["!"]
];
var result = [].concat(...arr);
console.log(result);
```

[参考](https://juejin.im/entry/5847c1600ce46300578d99bf)

[Javascript 多维数组扁平化](http://www.jstips.co/zh_cn/javascript/flattening-multidimensional-arrays-in-javascript/)

### 多维数组转一维

在上面提到的几种办法中，加入递归并对数组类型进行判断

```js
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

### 数组去重

```js
// 数组去重，要求时间复杂度O(nlogn) 空间复杂度O(1)
function uniqueArray(list) {
  // 1 1 2 2 3 4
  // 当然你可以自己写快排等nlogn的算法
  list.sort();
  // 剩下的代码和leetcode26题一摸一样

  const size = list.length;
  let slowP = 0;
  for (let fastP = 0; fastP < size; fastP++) {
    if (list[fastP] !== list[slowP]) {
      slowP++;
      list[slowP] = list[fastP];
    }
  }
  return list.slice(0, slowP + 1);
}

console.log(uniqueArray([1, 1, 2, 2, 3, 4]));
console.log(uniqueArray([1, 1, 6, 7, 9, 9, 8, 2, 2]));
console.log(uniqueArray(["a", "c", "b", "z", "A", "K", "d", "D", "a"]));
```

使用 Set

```js
[...new Set([1, 2, 3, 1, "a", 1, "a"])];
```

使用 filter 和 indexOf 配合索引判断：

```js
[1, 2, 3, 1, "a", 1, "a"].filter(function(ele, index, array) {
  return index === array.indexOf(ele);
});
```

### 简单实现继承

对 prototype、constructor 不了解的先理解：[说一下原型链，对象，构造函数之间的一些联系？prototype 和-proto-有什么区别？](/language/javascript.html#%E8%AF%B4%E4%B8%80%E4%B8%8B%E5%8E%9F%E5%9E%8B%E9%93%BE%EF%BC%8C%E5%AF%B9%E8%B1%A1%EF%BC%8C%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E4%B9%8B%E9%97%B4%E7%9A%84%E4%B8%80%E4%BA%9B%E8%81%94%E7%B3%BB%EF%BC%9Fprototype%E5%92%8C-proto-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F)

子类原型指向父类的新实例，子类的 constructor 指向自己。

```js
function extend(A, B) {
  function f() {}
  f.prototype = B.prototype;
  A.prototype = new f();
  A.prototype.constructor = A;
}

function A(name) {
  this.name = name;
}
function B(name) {
  this.name = name;
}
extend(A, B);
B.prototype.say = function() {
  console.log("b say");
};
A.prototype.eat = function() {
  console.log("a eat");
};

const a = new A("a name");

console.log(a.name); //a name
a.say(); //b say
a.eat(); //a eat
```

### 实现一个简单的 eventbus

通过 class 的方式：

```js
// 组件通信，一个触发与监听的过程
class EventEmitter {
  constructor() {
    // 存储事件
    this.events = this.events || new Map();
  }
  // 监听事件
  addListener(type, fn) {
    if (!this.events.get(type)) {
      this.events.set(type, fn);
    }
  }
  // 触发事件
  emit(type) {
    let handle = this.events.get(type);
    handle.apply(this, [...arguments].slice(1));
  }
}

// 测试
let emitter = new EventEmitter();
// 监听事件
emitter.addListener("ages", age => {
  console.log(age);
});
// 触发事件
emitter.emit("ages", 18); // 18
```

通过函数的方式：

```js
const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
  }
});

//使用
const handler = data => console.log(data);
const hub = createEventHub();
let increment = 0;

// Subscribe: listen for different types of events
hub.on("message", handler);
hub.on("message", () => console.log("Message event fired"));
hub.on("increment", () => increment++);

// Publish: emit events to invoke all handlers subscribed to them, passing the data to them as an argument
hub.emit("message", "hello world"); // logs 'hello world' and 'Message event fired'
hub.emit("message", { hello: "world" }); // logs the object and 'Message event fired'
hub.emit("increment"); // `increment` variable is now 1

// Unsubscribe: stop a specific handler from listening to the 'message' event
hub.off("message", handler);
```

或者参考tomato的最佳实践：[tomato/Events.ts at master · tomato-js/tomato](https://github.com/tomato-js/tomato/blob/master/packages/events/src/Events.ts)



### 简单实现 Object.create

```js
function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
```

### 简单实现一个Promise对象


首先需要了解[什么是-promise-对象，什么是-promises-a-规范](/language/javascript.html#%E4%BB%80%E4%B9%88%E6%98%AF-promise-%E5%AF%B9%E8%B1%A1%EF%BC%8C%E4%BB%80%E4%B9%88%E6%98%AF-promises-a-%E8%A7%84%E8%8C%83)

``` js
const statusMap = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};
// 将promise设置为fulfilled状态
function fulfilledPromise(promise, value) {
  // 只能从pending状态转换为其他状态
  if (promise.status !== statusMap.PENDING) {
    return;
  }
  // 将pending的promise转为fulfilled
  promise.status = statusMap.FULFILLED;
  promise.value = value;
  runCbs(promise.fulfilledCbs, value);
}
// 将promise设置为rejected状态
function rejectedPromise(promise, reason) {
  // 只能从pending状态转换为其他状态
  if (promise.status !== statusMap.PENDING) {
    return;
  }
  promise.status = statusMap.REJECTED;
  promise.reason = reason;
  runCbs(promise.rejectedCbs, reason);
}
function runCbs(cbs, value) {
  cbs.forEach(cb => cb(value));
}
function isFunction(fn) {
  return (
    Object.prototype.toString.call(fn).toLocaleLowerCase() ===
    '[object function]'
  );
}
function isObject(obj) {
  return (
    Object.prototype.toString.call(obj).toLocaleLowerCase() ===
    '[object object]'
  );
}
function isPromise(p) {
  return p instanceof Promise;
}
// promise的解析
function resolvePromise(promise, x) {
  // x 与promise相同
  // 防止循环引用
  if (promise === x) {
    rejectedPromise(promise, new TypeError('cant be the same'));
    return;
  }
  // x 是promise
  if (isPromise(x)) {
    // 完成状态
    if (x.status === statusMap.FULFILLED) {
      fulfilledPromise(promise, x.value);
      return;
    }
    // 失败状态
    if (x.status === statusMap.REJECTED) {
      rejectedPromise(promise, x.reason);
      return;
    }
    // pending状态
    if (x.status === statusMap.PENDING) {
      // 执行其then
      x.then(
        () => {
          fulfilledPromise(promise, x.value);
        },
        () => {
          rejectedPromise(promise, x.reason);
        }
      );
      return;
    }
    return;
  }
  // x 是对象或函数
  if (isObject(x) || isFunction(x)) {
    let then;
    let called = false;
    // 兼容异常情况
    try {
      then = x.then;
    } catch (error) {
      rejectedPromise(promise, error);
      return;
    }
    // 如果x是thenable对象
    if (isFunction(then)) {
      // 执行其then方法
      try {
        then.call(
          x,
          y => {
            if (called) {
              return;
            }
            called = true;
            // 递归解析promise
            resolvePromise(promise, y);
          },
          r => {
            if (called) {
              return;
            }
            called = true;
            rejectedPromise(promise, r);
          }
        );
      } catch (error) {
        if (called) {
          return;
        }
        called = true;
        rejectedPromise(promise, error);
      }
      return;
    } else {
      // 说明x是个普通值，比如resolve({code:0})，中的{code:0}
      fulfilledPromise(promise, x);
      return;
    }
    // x不是对象或者函数
  } else {
    fulfilledPromise(promise, x);
    return;
  }
}
class Promise {
  constructor(fn) {
    this.status = statusMap.PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.fulfilledCbs = []; // then fulfilled callback
    this.rejectedCbs = []; // then rejected callback
    fn(
      value => {
        // fulfilledPromise(this, value);
        // 解析promise
        resolvePromise(this, value);
      },
      reason => {
        rejectedPromise(this, reason);
      }
    );
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }
  static all(arr) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(arr)) {
        throw new Error(`argument must be a array`);
      }
      let dataArr = [];
      let num = 0;
      for (let i = 0; i < arr.length; i++) {
		let p = arr[i];
		if(!isPromise(p)){
			p = Promise.resolve(p)
		}
        p.then(data => {
          dataArr.push(data);
          num++;
          if (num === arr.length) {
            return resolve(dataArr);
          }
        }).catch(e => {
          return reject(e);
        });
      }
    });
  }
  // 两个参数
  then(onFulfilled, onRejected) {
    const promise1 = this;
    const promise2 = new Promise(() => {});
    // 如果是完成状态
    if (promise1.status === statusMap.FULFILLED) {
      if (!isFunction(onFulfilled)) {
        return promise1;
      }
      // 通过setTimeout来做为微任务api
      setTimeout(() => {
        try {
          const x = onFulfilled(promise1.value);
          // 将x.then对接promise2
          resolvePromise(promise2, x);
        } catch (error) {
          rejectedPromise(promise2, error);
        }
      }, 0);
    }
    // 如果是失败状态
    if (promise1.status === statusMap.REJECTED) {
      if (!isFunction(onRejected)) {
        return promise1;
      }
      setTimeout(() => {
        try {
          const x = onRejected(promise1.reason);
          resolvePromise(promise2, x);
        } catch (error) {
          rejectedPromise(promise2, error);
        }
      }, 0);
    }
    // 如果是pending状态
    if (promise1.status === statusMap.PENDING) {
      onFulfilled = isFunction(onFulfilled)
        ? onFulfilled
        : value => {
            return value;
          };
      onRejected = isFunction(onRejected)
        ? onRejected
        : err => {
            throw err;
          };
      // 将执行链加到对应的回调队列中去
      promise1.fulfilledCbs.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(promise1.value);
            resolvePromise(promise2, x);
          } catch (error) {
            rejectedPromise(promise2, error);
          }
        }, 0);
      });
      promise1.rejectedCbs.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(promise1.reason);
            resolvePromise(promise2, x);
          } catch (error) {
            rejectedPromise(promise2, error);
          }
        }, 0);
      });
    }
    // 将构造好的promise2对象返回出去
    return promise2;
  }
  // catch就是then的语法糖
  catch(callback) {
    return this.then(null, callback);
  }
  finally(callback) {
    return this.then(
      data => {
        return Promise.resolve(callback()).then(() => data);
      },
      err => {
        return Promise.resolve(callback()).then(() => {
          throw err;
        });
      }
    );
  }
}
```

参考[实现符合Promise/A+规范的promise](https://github.com/FunnyLiu/nodeDemo/blob/master/myPromise/myPromise.js)

### 实现简单的发布订阅

Subject是构造函数，new Subject() 创建一个主题对象，该对象内部维护订阅当前主题的观察者数组。主题对象上有一些方法，如添加观察者(addObserver)、删除观察者(removeObserver)、通知观察者更新(notify)。 当notify 时实际上调用全部观察者 observer 自身的 update 方法。

Observer 是构造函数，new Observer() 创建一个观察者对象，该对象有一个 update 方法，观察者可以订阅主题，实际上是把自己加入到主题的订阅者列表里。

``` js
class Subject {
  observers = []

  addObserver(observer) {
    this.observers.push(observer)
  }
  removeObserver(observer) {
    let index = this.observers.indexOf(observer)
    if(index > -1){
      this.observers.splice(index, 1)
    }
  }
  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}


class Observer{
  update() {}
  subscribeTo(subject) {
    subject.addObserver(this)
  }
} 
```

用法如下：

``` js
let subject = new Subject()
let observer = new Observer()
observer.update = function() {
  console.log('observer update')
}
observer.subscribeTo(subject)  //观察者订阅主题

subject.notify()
```

更详细的设计模式相关可以查看：[design - 设计模式（以Typescript描述）](https://omnipotent-front-end.github.io/-Design-Patterns-Typescript/#/observer/index)

参考：

[手写发布订阅模式（手写系列二） - 知乎](https://zhuanlan.zhihu.com/p/210218462)



### 基于 Object.defineProperty 实现双向绑定

```js
var inputNode = document.querySelector("#input");
var showNode = document.querySelector("#show");
//定义一个没有原型链的空对象
var model = new Object(null);
Object.defineProperty(model, "name", {
  //当属性被修改时
  set: function(value) {
    user = value;
    showNode.innerHTML = value;
  },
  //当属性被访问时
  get: function() {
    return user;
  }
});

function modelChange() {
  model["name"] = inputNode.value;
}

inputNode.addEventListener("keyup", modelChange);
```

### 基于 Proxy 实现双向绑定

为什么用 Proxy 更好，可以参考：[vue 的响声式用 proxy 和 object-defineproperty 有什么区别？](/library/vue.html#vue%E7%9A%84%E5%93%8D%E5%A3%B0%E5%BC%8F%E7%94%A8proxy%E5%92%8Cobject-defineproperty%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F)

```js
var inputNode = document.querySelector("#input");
var showNode = document.querySelector("#show");

const obj = {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key === "text") {
      inputNode.value = value;
      showNode.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  }
});

input.addEventListener("keyup", function(e) {
  newObj.text = e.target.value;
});
```

### 闭包实现计数器

```js
const add = (function() {
  let counter = 0;
  return function() {
    console.log(counter);
    return (counter += 1);
  };
})(); //这里var add已经是执行过后的函数了，var add=function(){..}

add(); //执行匿名子函数
add();
add();
```

### 使用闭包每秒打印1个递增数字

``` js
// 使用闭包实现
for (var i = 0; i < 5; i++) { 
  (function(i) {
    setTimeout(function() {
     console.log(i);
    }, i * 1000);
  })(i);
}
// 使用 let 块级作用域
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
```


### 函数节流

不做封装的简陋版：

```js
let throttle;
window.addEventListener(
  "scroll",
  () => {
    if (throttle) {
      return;
    }

    throttle = setTimeout(function() {
      console.warn("节流");

      throttle = clearTimeout(throttle);
    }, 300);
  },
  false
);
```

通过闭包的封装版：

```js
//节流函数
function throttle(fn, delay) {
  // 利用闭包保存时间
  let prev = Date.now();
  return function() {
    let context = this;
    let arg = arguments;
    let now = Date.now();
    if (now - prev >= delay) {
      fn.apply(context, arg);
      prev = Date.now();
    }
  };
}

function fn() {
  console.log("节流");
}
addEventListener("scroll", throttle(fn, 300));
```

应用场景：

- 滑动时不要触发多次；
-  比如游戏中发射子弹的频率 (1 秒发射一颗)


### 函数防抖

和节流的区别在于，在规定时间内再次执行的话，会清除定时器再重设定时器，也就是说**只有最后一次之后指定时间后，才会执行到真正的 fn**。

不做封装的简陋版：

```js
let throttle;
window.addEventListener(
  "scroll",
  () => {
    // 在规定时间内再次触发会先清除定时器后再重设定时器
    throttle = clearTimeout(throttle);
    throttle = setTimeout(function() {
      console.warn("防抖");
    }, 300);
  },
  false
);
```

通过闭包的封装版：

```js
function debounce(fn, delay) {
  // 利用闭包保存定时器
  let timer = null;
  return function() {
    let context = this;
    let arg = arguments;
    // 在规定时间内再次触发会先清除定时器后再重设定时器
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, arg);
    }, delay);
  };
}

function fn() {
  console.log("防抖");
}
addEventListener("scroll", debounce(fn, 1000));
```

应用场景：

- 表单输入框校验最后输入完才执行校验函数；
- 频繁点赞取消，最后只发一次接口；
- 电梯最后一个进门的人之后延时关门；

### 使用位运算实现加法

递归，先异或、然后与运算，并左移，直到某一个数全为 0，得出结果。

```js
function twoSum(a, b) {
  if (a === 0) return b;
  if (b === 0) return a;
  const res = a ^ b;

  return twoSum(res, (a & b) << 1);
}

// test

a = twoSum("" + Math.pow(2, 20), "" + Math.pow(2, 20));

console.log(a === Math.pow(2, 21));
```

参考：

[大前端面试宝典 - 图解前端](https://lucifer.ren/fe-interview/#/./topics/algorthimn/bitTwoSum)

### 解析 url 中的参数

```js
// 给定key，求解href中的value，如果有多个，返回数组。如果没有返回null
function getUrlParams(key, href) {
  const query = href.split("?");
  if (query.length <= 1) return null;
  // a=1&b=2&a=3
  const pairs = query[1].split("&");
  const res = pairs
    .filter(pair => {
      const [k] = pair.split("=");
      if (k === key) return true;
      return false;
    })
    .map(pair => {
      const [, v] = pair.split("=");
      return v;
    });
  if (res.length === 0) return null;
  if (res.length === 1) return res[0];
  return res;
}

const a = getUrlParams("a", "http://lucifer.ren?a=1&b=2&a=3");
const b = getUrlParams("b", "http://lucifer.ren?a=1&b=2&a=3");
const c = getUrlParams("c", "http://lucifer.ren?a=1&b=2&a=3");

console.log(a); //[1,3]
console.log(b); //2
console.log(c); //null
```

```js
const parseQueryString = url => {
  var json = {};
  var arr = url.substr(url.indexOf("?") + 1).split("&");
  arr.forEach(item => {
    var tmp = item.split("=");
    json[tmp[0]] = tmp[1];
  });
  return json;
};
```

可以参考[tomato中的实现](https://github.com/tomato-js/tomato/blob/master/packages/path/src/parse.ts)

### 增加 url 中的参数

```js
function updateQueryStringParameter(uri, key, value) {
  if (!value) {
    return uri;
  }
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}
```

### 实现字符串反转

一个最简单的递归应用：

```js
function reverseString(str) {
  if (str.length === 1) return str;

  return reverseString(str.slice(1)) + str[0];
}

console.log(reverseString("abc"));
console.log(reverseString("abca"));
console.log(reverseString("8cchds7"));
```

### 千位分隔

一串整数转换成千位分隔形式，例如 10000000000，转换成 10,000,000,000。

思路为：**把每三位数字前面的那个空""匹配出来，并替换成千位分隔符，第一位要除外**。

代码为：

```js
var str = "100000000000",
  reg = /(?=(\B\d{3})+$)/g;
console.log(str.replace(reg, ","));
```

其中`(?=p)`为**零宽正向先行断言**，要求接下来的字符都与 p 匹配，但不能包括匹配 p 的那些字符。用来匹配到每三位数前面的`""`。

`\B`为匹配非单词边界的位置。用来排查第一个在满足 3 的倍速位时加上了`,`符合。

参考：

[把一串数字表示成千位分隔形式——JS 正则表达式的应用 - 掘金](https://juejin.im/post/5abb5b01f265da237f1e5a92)

### 实现无限循环动画

主要使用`requestAnimationFrame`。

也可以参考 css 版：[用 css 实现一个持续的动画效果](/language/css.html#%E7%94%A8css%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E6%8C%81%E7%BB%AD%E7%9A%84%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C)

```js
//兼容性处理
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var e = document.getElementById("e");
var flag = true;
var left = 0;

function render() {
  left == 0 ? (flag = true) : left == 100 ? (flag = false) : "";
  flag ? (e.style.left = ` ${left++}px`) : (e.style.left = ` ${left--}px`);
}

(function animloop() {
  render();
  requestAnimFrame(animloop);
})();
```


### 简单实现一个redux

首先掌握[实现简单的发布订阅](/language/javascript.html#%E5%AE%9E%E7%8E%B0%E7%AE%80%E5%8D%95%E7%9A%84%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85)。然后稍作改造即可：

``` js
function createStore(reducer) {
  let state
  let handlers = []

  return {
    getState() {
      return state
    },

    dispatch(action) {
      state = reducer(state, action)
      handlers.forEach(handler => handler())
    },

    subscribe(handler) {
      handlers.push(handler)
    }
  }
}

function counter(state = 10, action) {
  switch (action.type) {
    case '+':
      return state + action.val
    case '-':
      return state - action.val
    default:
      return state
  }
}

let store = createStore(counter)

store.subscribe(() => console.log(store.getState()))

store.dispatch({type: '+', val: 10})
store.dispatch({type: '-', val: 10})
```

相当于一个带state的发布订阅，createStore传入reducer，dispatch就执行reducer和对应的subscribe传入的handler。

参考：

[手写简易Redux（手写系列三） - 知乎](https://zhuanlan.zhihu.com/p/222031321)


### 实现一个简易的模块加载器


``` js
(global => {
  let modules = {}

  function require(deps, callback) {    
    if(!Array.isArray(deps)) {
      callback = deps
      deps = []
    }
    depFns = deps.map(depName => modules[depName])
    return callback.apply(null, depFns)
  }

  function define(name, deps, callback) {
    modules[name] = require(deps, callback)
  }

  global.define = define
  global.require = require
  
})(window)
// 用法如下：
define('firstName', [], () => {
  return '饥人谷'
})

define('lastName', [], () => {
  return '前端'
})

define('sayHello', ['firstName', 'lastName'], (v1, v2) => {
  return function() {
    console.log(`Hello ${v1} ${v2}`)
  }
})

require(['sayHello'], (fn) => {
  fn()
})
```

以上代码为模块加载器的简易实现，未涉及模块的网络下载以及循环引用的处理。

参考：

[手写简易模块加载器（手写系列四） - 知乎](https://zhuanlan.zhihu.com/p/242419249)


### 实现一个模块打包器

``` js
// 每个模块
const modules = {
  0: {
    module(require, exports) {
      //模块的真实内容
      const { sum } = require('./sum.js')  
      console.log(sum(2, 3))               
    },
    mapping: {'./sum.js': 1 } 
  },
  1: {
    module(require, exports) {
      function sum(...args) {
        return args.reduce((v1, v2) => v1 + v2)
      }
      exports.sum = sum
    },
    mapping: {}
  }
}

function exec(id) {
  const { module, mapping } = modules[id]
  let  exports =  {}
  module(path => exec(mapping[path]), exports)
  return exports
}
exec(0)
```

代码通过exec(0)获取到入口模块的代码(module) 和依赖映射(mapping)；执行module；执行时如果里面遇到了require('./sum.js')，require就是箭头函数，执行的结果是exec(mapping['./sum.js']) 也就是 exec(1)，最终拿到id为1的模块对象里面的exports。

参考：

[手写简易模块打包器（手写系列五） - 知乎](https://zhuanlan.zhihu.com/p/257046071)


### 实现一个简单的react

``` js
//我们在使用React的时候，源码里写的都是JSX。JSX代码在运行之前会被Babel的@babel/preset-react 预设里的插件转换成JavaScript后再运行。
//React.createElement方法专门用来生成virtual dom对象，比如：
//let div = <div className="header">hello jirengu</div>;
//JSX会变为下面：
//let div = React.createElement("div", {className: "header"}, "hello jirengu");
const React = {
  createElement(tag, attrs, ...children) {
    return {tag, attrs, children};
  }
};

const ReactDom = {
  render(vdom, container) {
    container.innerHTML = "";
    render(vdom, container);
  }
};
//vdom是经过React.createElement之后的内容
function render(vdom, container) {
  let node;
  if (typeof vdom === "string") {
    node = document.createTextNode(vdom);
  }
  if (typeof vdom === "object") {
    node = document.createElement(vdom.tag);
    setAttribute(node, vdom.attrs);
    //层层渲染
    vdom.children.forEach((childVdom) => render(childVdom, node));
  }
  container.appendChild(node);
}

function setAttribute(node, attrs) {
  for (let key in attrs) {
    if (key.startsWith("on")) {
      node[key.toLocaleLowerCase()] = attrs[key];
    } else if (key === "style") {
      Object.assign(node.style, attrs[key]);
    } else {
      node[key] = attrs[key];
    }
  }
}

//测试代码
let str = "jirengu";
let styleObj = {
  color: "red",
  fontSize: "30px"
};

ReactDom.render(
  <div className="wrap">
    Hello {str}
    <button className="btn" onClick={() => console.log("click me")}>
      Click me!
    </button>
    <p style={styleObj}>I have style</p>
  </div>,
  document.body
);
```

参考：

[手写简易React（手写系列六） - 知乎](https://zhuanlan.zhihu.com/p/259741693)


### 实现一个简单的react hooks

我们先看看hooks的用法：

``` js
import React, { useState } from "react";
import ReactDOM from "react-dom";

function Counter() {
  let [count, setCount] = useState(0);
  return (
    <>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </>
  );
}

ReactDOM.render(<Counter />, document.querySelector("#root"));
```

我们可以得出以下信息：

1、useState是一个函数

2、useState执行返回一个数组，数组第一项是内部维护的数据（通过函数第一次调用的参数传入，可被修改），数组第二项是一个能修改内部数据的函数

3、当触发修改数据修改的方法时，会修改数据，并且会再次渲染组件

4、再次渲染组件时，会再次执行useState，获取修改后新值而不是初始值

如果只需要兼容单个useState，代码如下：

``` js
import React from "react";
import ReactDOM from "react-dom";

let value;
function useState(initValue) {
  value = value === undefined ? initValue : value;
  function dispatch(newValue) {
    value = newValue;
    // 调用重新渲染
    scheduleWork();
  }
  return [value, dispatch];
}

function Counter() {
  let [count, setCount] = useState(0);
  return (
    <>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> Add count</button>
    </>
  );
}

function scheduleWork() {
  ReactDOM.render(<Counter />, document.querySelector("#root"));
}
```

当在组件里连续使用多个 useState 时，上述代码就没法正常工作了。因为只有一个全局的vulue ，无法同时代表多个数据。

可以沿着当前思路继续往下走。

把**每个数据都放到一个对象节点里，这些节点构成一个单向链表，这样我们就能存储多个数据**。

把执行过程分为 mount 和 update 两个阶段，两个阶段做的事情不一样。

在 mount 阶段依次执行 useState 时，会使用初始化的数据依次创建多个hook节点，构造链表。

在 update 阶段依次执行 useState 时，会从链表开头依次遍历 hook 节点，返回节点信息(如[age, setAge]) 。

执行修改数据的方法时会修改当前hook节点的数据，定位到链表开头， 修改mount阶段到update阶段。

``` js
import React from "react";
import ReactDOM from "react-dom";

const Dispatcher = (() => {
  let isMount = true;
  let firstWorkInProgressHook = null;
  let workInProgressHook = null;

  function mountWorkInProgressHook() {
    const hook = {
      state: null,//数据
      dispatch: null,//修改数据的方法
      next: null//指向下一节点
    };
    if (workInProgressHook === null) {
      firstWorkInProgressHook = workInProgressHook = hook;
    } else {
      //将下一个挂到上一个的next
      workInProgressHook = workInProgressHook.next = hook;
    }
    return workInProgressHook;
  }

  function updateWorkInProgressHook() {
    let curHook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
    return curHook;
  }

  function useState(initialState) {
    let hook;
    //mount阶段，用来定义hooks
    if (isMount) {
      hook = mountWorkInProgressHook();
      hook.state = initialState;
    } else {
      //update阶段
      hook = updateWorkInProgressHook();
    }

    hook.dispatch = function (newState) {
      this.state = newState;
      workInProgressHook = firstWorkInProgressHook;
      //如果调用，将不再是mount阶段
      isMount = false;
      // 重新渲染
      scheduleWork();
    }.bind(hook);

    return [hook.state, hook.dispatch];
  }

  return {
    useState
  };
})();

function Counter() {
  let [count, setCount] = Dispatcher.useState(1);
  let [age, setAge] = Dispatcher.useState(10);
  return (
    <>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> Add count</button>
      <p>Age is {age}</p>
      <button onClick={() => setAge(age + 1)}> Add age</button>
    </>
  );
}

function scheduleWork() {
  ReactDOM.render(<Counter />, document.querySelector("#root"));
}

scheduleWork();
```



### 实现一个简易的模板引擎（todo）

### 求字符串的最长公共前缀（todo）

比如输入: ["flower","flow","flight"]，输出: "fl"

### 生成随机字符串


可以参考tomato的实现：

``` js
/**
 * @packageDocumentation
 * @module @tomato-js/string
 */
/**
 * 随机字符串
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { random } from '@tomato-js/string'
 *   random(3); // '2xK'
 * ```
 *
 * @param length - 字符串长度
 * @returns 随机字符串
 */
export function random(length: number) {
  const characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //取得随机位的单个字符
  const randomChar = () => characterSet[Math.floor(Math.random() * characterSet.length)];
  let text = "";
  let idx = 0;
  //循环几次即可
  while (idx < length) {
    text = text + randomChar();
    idx += 1;
  }
  return text;
}

```

### 数组随机排序


可以参考tomato：

``` js

/**
 * 在数组中随机生选择 n 个元素生成新的数组
 * 基于Fisher–Yates shuffle 洗牌算法
 *
 * 脚本举例
 * ```
 *   import { sampleSize } from '@tomato-js/array'
 *   sampleSize([1, 2, 3], 2); // [3,1]
 * ```
 *
 * @param arr - 原始数组
 * @param n - 新数组元素个数
 * @returns 随机新数组
 */
export function sampleSize([...arr], n = 1) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
}


```

### js实现拖拽的思路

一个元素的拖拽过程，我们可以分为三个步骤，第一步是鼠标按下目标元素，第二步是鼠标保持 按下的状态移动鼠标，第三步是鼠
标抬起，拖拽过程结束。


这三步分别对应了三个事件，mousedown 事件，mousemove 事件和 mouseup 事件。只有在鼠 标按下的状态移动鼠标我们才会
      
 
执行拖拽事件，因此我们需要在 mousedown 事件中设置一个状态来标识鼠标已经按下，然后在 mouseup 事件中再取消这个状
态。

在 mousedown 事件中我们首先应该判断，目标元素是否为拖拽元素，如果是拖拽元素，我 们就设置状态并且保存这个时候鼠
标的位置。

然后在 mousemove 事件中，我们通过判断鼠标现在的位置和以前位置的相对移动， 来确定拖拽元素在移动中的坐标。

最后 mouseup 事件触发后，清除状态，结束拖拽事件。

参考：

[【JS】原生js实现拖拽功能基本思路_LZGS_4的专栏-CSDN博客](https://blog.csdn.net/LZGS_4/article/details/43523465)


### setInterval有什么问题，如何用setTimeout模拟？

setInterval 的作用是每隔一段指定时间执行一个函数，但是这个执行不是真的到了时间立即 执行，它真正的作用是每隔一段时间将事件加入事件队列中去，只有当当前的执行栈为空的时候， 才能去从事件队列中取出事件执行。所以可能会出现这样的情况，就是当前执行栈执行的时间很 长，导致事件队列里边积累多个定时器加入的事件，当执行栈结束的时候，这些事件会依次执行， 因此就不能到间隔一段时间执行的效果。
针对 setInterval 的这个缺点，我们可以使用 setTimeout 递归调用来模拟 setInterval， 这样我们就确保了只有一个事件结束了，我们才会触发下一个定时器事件，这样解决了 setInterval 的问题。

``` js
// 思路是使用递归函数，不断地去执行 setTimeout 从而达到 setInterval 的效果 
function mySetInterval(fn, timeout) {
  // 控制器，控制定时器是否继续执行 
  var timer = { flag: true };
  // 设置递归函数，模拟定时器执行。 
  function interval() {
    if (timer.flag) {
      fn();
      setTimeout(interval, timeout); 
    }
  }
  // 启动定时器
  setTimeout(interval, timeout);
  // 返回控制器 
  return timer;
}
```

参考：

[用setTimeout实现setInterval - 简书](https://www.jianshu.com/p/32479bdfd851)