# 编译原理

## 基础

### 机器码和字节码有什么区别？

**机器码(machine code)**，学名机器语言指令，有时也被称为原生码（Native Code），是电脑的CPU可直接解读的数据。

通常意义上来理解的话，机器码就是计算机可以直接执行，并且执行速度最快的代码。

**字节码**(Bytecode)是一种包含执行程序、由一序列 op 代码/数据对 组成的二进制文件。字节码是一种中间码，它比机器码更抽象，需要直译器转译后才能成为机器码的中间代码。

通常情况下它是已经经过编译，但与特定机器码无关。字节码通常不像源码一样可以让人阅读，而是编码后的数值常量、引用、指令等构成的序列。

字节码在运行时通过JVM（JAVA虚拟机）做一次转换生成机器指令，因此能够更好的跨平台运行。

**字节码是一种中间状态（中间码）的二进制代码（文件）**。需要直译器转译后才能成为机器码。

可以通过javascript进行对比：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119174020.png"/>

机器码所占用的空间远远超过了字节码，所以使用字节码可以减少系统的内存使用。

参考

[机器码和字节码 - 第五空间](https://blog.csdn.net/limonzet/article/details/77892159)

### 编程语言的runtime和compiler有什么区别？请以js为例说明下。

**compiler也就是编译器**是将代码编译为机器代码的工具。

我们说的的**js引擎比如V8将js代码编译成了字节码，只针对少量场景使用其TurboFan模块编译为了优化过的机器码**，所以其TurboFan可以勉强算作编译器。

关于字节码和机器代码的区别可以参考[机器码和字节码有什么区别？](/cp/compiler.html#%E6%9C%BA%E5%99%A8%E7%A0%81%E5%92%8C%E5%AD%97%E8%8A%82%E7%A0%81%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F)

关于v8工作原理，可以参考[简单说下v8引擎工作原理](/cp/browser.html#%E7%AE%80%E5%8D%95%E8%AF%B4%E4%B8%8Bv8%E5%BC%95%E6%93%8E%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)

汇编代码与机器代码是严格一一对应的，也很容易互相转换，这也是反编译的原理。

而**runtime，是基于compiler之上的运行环境**。比如浏览器端的document和node端的fs的提供者这种。

以`require('asd.js')`为例，这句话是什么意思？v8是不关心的。
v8只关心你调了一个require函数，参数是个字符串，它只是执行这个函数；但是require这个函数到底能干嘛，是Node定义的。

所以在node架构图中：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190701094137.png"/>

下面两层都是runtime，而v8中的TurboFan最多算半个compiler。

参考：

[v8引擎是如何工作的](https://blog.fundebug.com/2019/07/16/how-does-v8-work/)


### 对JIT的理解

即时编译(JIT)技术，是指字节码配合解释器和编译器。可以先了解[v8引擎是如何工作的](https://blog.fundebug.com/2019/07/16/how-does-v8-work/)，简单来说，就是指解释器Ignition在解释执行字节码 的同时，收集代码信息，当它发现某一部分代码变热了之后，TurboFan编译器便闪亮登场，把热点的字节 码转换为机器码，并把转换后的机器码保存起来，以备下次使用。

对于JavaScript工作引擎，除了V8使用了“字节码+JIT”技术之外，苹果的SquirrelFish Extreme和Mozilla 的SpiderMonkey也都使用了该技术，Java和Python的虚拟机也都是基于这种 技术实现的。

用一张图来表示：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119174623.png"/>

