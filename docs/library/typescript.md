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


### 有没有了解过ts-node？ts-node是ts的运行时吗？为什么？（todo）



