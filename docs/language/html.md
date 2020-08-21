# Html



## 表单相关

### input如何处理中文输入？

elementui是通过compositionstart & compositionend做的中文输入处理：
相关代码：
``` html
<input ref="input"
    @compositionstart="handleComposition"
    @compositionupdate="handleComposition"
    @compositionend="handleComposition"
>
```
这3个方法是原生的方法，这里简单介绍下，官方定义如下
compositionstart 事件触发于一段文字的输入之前（类似于 keydown 事件，但是该事件仅在若干可见字符的输入之前，而这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词）

简单来说就是切换中文输入法时在打拼音时(此时input内还没有填入真正的内容)，**会首先触发compositionstart**，然后每打一个拼音字母，**触发compositionupdate**，最后将输入好的中文填入input中时**触发compositionend**。

触发compositionstart时，文本框会填入 “虚拟文本”（待确认文本），同时触发input事件；在触发compositionend时，就是填入实际内容后（已确认文本）,所以这里如果不想触发input事件的话就得设置一个bool变量来控制。


### input如何做到文件上传？

最简单的表单文件上传，使用type为file的input。

``` html
<form id="uploadForm" method="POST" action="upload" enctype="multipart/form-data">
      <input type="file" id="myFile" name="file"></input>
      <input type="submit" value="提交"></input>
 </form>
```

通过multiple属性支持多文件

```
<input id="myFile" type="file" multiple>
```

通过异步接口配合FileReader来无刷新上传。


参考文章：

[文件上传那些事儿 - 前端 - 掘金](https://juejin.im/entry/590ad4682f301e00582a78b5)


## DOM相关

### 一个iframe，内嵌了一个A页面，iframe的宽高不停变化，如何让A页面的宽高实时自适应这个iframe的宽高大小

css

设置宽高100%

设置宽100vw，高100vh

js监听后设置为视口宽高

监听窗口resize事件，然后postmessage通信给里面

使用ResizeObserver监听html元素


### script标签的的defer和async有什么区别？

*   两者都是异步去加载外部 JS 文件，不会阻塞 DOM 解析
    
*   Async 是在外部 JS 加载完成后，浏览器空闲时，Load 事件触发前执行，标记为 async 的脚本并不保证按照指定他们的先后顺序执行，该属性对于内联脚本无作用 (即没有src属性的脚本）。
    
*   defer 是在 JS 加载完成后，整个文档解析完成后，触发 `DOMContentLoaded` 事件前执行，如果缺少 `src` 属性（即内嵌脚本），该属性不应被使用，因为这种情况下它不起作用
    


## 样式相关


### png8、png24、png32有什么区别？

2^8等于256，也就是说PNG 8能存储256种颜色，一张图片如果颜色种类很少，将它设置成PNG 8得图片类型是非常适合的。

PNG 32 相当于PNG 24 加上 8bits的透明颜色通道，就相当于R（红）、G（绿）、B（蓝）、A（透明）。R(0255),G(0255),B(0255),A(0255)。比PNG 24多了一个A（透明），也就是说PNG 32能表示跟PNG 24一样多的色彩，并且还支持256种透明的颜色，能表示更加丰富的图片颜色类型。