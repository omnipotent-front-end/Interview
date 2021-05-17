# Typescript

## 应用

### interface和type有什么区别？

1. interface 方式可以实现接口的 extends 和 implements ， 而 type alias 则不行。

2. interface 可以实现接口的 merge ，但 type alias 则不行。

接口merge指的是：

``` js
interface C {
    a: string;
}
interface C {
    b: number;
}
const obj:C = {
    a: '',
}; // Error: Type '{ a: string; }' is not assignable to type 'C'.  Property 'b' is missing in type '{ a: string; }'.

type C =  {
    a: string;
}
// Error:  Duplicate identifier 'C'.
type C =  {
    b: number;
}
```

3. interface 只能定义对象类型， type 声明的方式可以定义组合类型，交叉类型，原始类型。

参考：

[typescript interface 与 type 声明类型的区别 | KBScript](http://kbscript.com/2017/01/27/different-from-interface-type/)

### extends和implements有什么区别？

一般来讲，**一个类只能继承自另一个类**，有时候**不同类之间可以有一些共有的特性**，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。

``` ts
interface Alarm {
    alert();
}

interface Light {
    lightOn();
    lightOff();
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```


###  object类型和{}类型有什么区别？

object类型只能引用类型，即非bool, number, string, symbol。

通过实例理解：

```  js
var o: object;
o = { prop: 0 }; // OK
o = []; // OK
o = 42; // Error
o = "string"; // Error
o = false; // Error
o = null; // Error
o = undefined; // Error

var p: {};
p = { prop: 0 }; // OK
p = []; // OK
p = 42; // OK
p = "string"; // OK
p = false; // OK
p = null; // Error
p = undefined; // Error

var q: { [key: string]: any };
q = { prop: 0 }; // OK
q = []; // OK
q = 42; // Error
q = "string"; // Error
q = false; // Error
q = null; // Error
q = undefined; // Error

var r: { [key: string]: string };
r = { prop: 'string' }; // OK
r = { prop: 0 }; // Error
r = []; // Error
r = 42; // Error
r = "string"; // Error
r = false; // Error
r = null; // Error
r = undefined; // Error
```

参考：

[ecmascript 6 - Difference between 'object' and {} in TypeScript - Stack Overflow](https://stackoverflow.com/questions/49464634/difference-between-object-and-in-typescript)



### 什么是TS的泛型？


泛型（Generics）是指在**定义函数、接口或类**的时候，**不预先指定具体的类型，而在使用的时候再指定类型**的一种特性。

举个例子：

``` js
// 声明一个泛型接口，这个写法，像极了声明一个函数，我们用描述语言来形容 @type = T => (T): T
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// 这个写法，有点像一个闭包函数，在声明函数后，立即运行这个函数，描述语言：@@[T => (T): T](any)
function identity<T>(arg: T): T {
    return arg;
}

// 使用泛型接口，像极了调用一个函数，我们用描述语言来形容 @type(number)
let myIdentity: GenericIdentityFn<number> = identity;
```


参考：

[TypeScript 泛型的通俗解释](https://juejin.cn/post/6844904015235383303)



### 有没有了解过ts-node？ts-node是ts的运行时吗？为什么？

ts-node不是将typescript编译成js再执行，而是直接通过hack开启了node的ts运行时。

它通过扩展require.extensions，来完成node版loader的扩展，将ts、tsx等运行时执行赋予node，至于node的loader，也就是module.extensions，可以参考。[FunnyLiu/ts-node at readsource](https://github.com/FunnyLiu/ts-node/tree/readsource)





