# Html

## 基础综合信息相关

### DOCTYPE 的作用是什么?

IE5.5 引入了文档模式的概念，而这个概念是通过使用文档类型(DOCTYPE)切换实现的。

`<!DOCTYPE>`声明位于 HTML 文档中的第一行，处于 `<html>` 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。
DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。

在标准模式下，浏览器的解析规则都是按照最新的标准进行解析的。而在兼容模式下，浏览器会以向后兼容的方式来模拟老式浏览器的行为，以保证一些老的网站的正确访问。 在 html5 之后不再需要指定 DTD 文档，因为 html5 以前的 html 文档都是基于SGML 的，所以需要通过指定 DTD 来定义文档中允许的属性以及一些规则。而 html5 不再基于 SGML 了，所以不再需要使用 DTD。

### 标准模式和兼容模式有什么区别？

标准模式的渲染方式和 JS 引擎的解析方式都是以该浏览器支持的最高标准运行。在兼
容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

### 行内元素和块级元素有什么区别？有哪些常见的？

HTML4 中，元素被分成两大类:inline (内联元素)与 block (块级元素)。

(1) 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。 

(2) 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。 

(3) 行内元素与块级元素属性的不同，主要是盒模型属性上:行内元素设置 width 无效，height 无效(可以设置 line-height)，设置 margin 和 padding 的上下不会对其他元素 产生影响。

常见的行内元素有 a b span img strong sub sup button input label select textarea。

常见的块级元素有 div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p


### 页面导入样式时，使用 link 和 @import 有什么区别?

(1)从属关系区别。 @import 是 CSS 提供的语法规则，只有导入样式表的作用;link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网 站图标等。

(2)加载顺序区别。加载页面时，link 标签引入的 CSS 被同时加载;@import 引入 的 CSS 将在页面加载完毕后被加载。

(3)兼容性区别。@import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别;link 标 签作为 HTML 元素，不存在兼容性问题。

(4)DOM 可控性区别。可以通过 JS 操作 DOM ，插入 link 标签来改变样式;由于 DOM 方法是基于文档的，无法使用 @import 的方式插入样式。

### 说说你对html语义化的理解？

(1) 用正确的标签做正确的事情。

(2) html 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;

(3) 即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的; 

(4) 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于SEO ;
  
(5) 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

### 场景的meta标签有哪些？

`<meta>` 元素可提供有关页面的元信息(meta-information)，比如针对搜索引擎和更新频度 的描述和关键词。
`<meta>` 标签位于文档的头部，不包含任何内容。`<meta>` 标签的属性定义了与文档相关联 的名称/值对。
``` html
<!DOCTYPE html> H5 标准声明，使用 HTML5 doctype，不区分大小写
<head lang=”en”> 标准的 lang 属性写法
<meta charset=’utf-8′> 声明文档使用的字符编码
<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1′′/> 优先使用 IE 最新版
本和 Chrome
<meta name=”description” content=”不超过 150 个字符”/> 页面描述
<meta name=”keywords” content=””/> 页面关键词者
<meta name=”author” content=”name, email@gmail.com”/> 网页作
<meta name=”robots” content=”index,follow”/> 搜索引擎抓取
<meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1,
user-scalable=no”> 为移动设备添加 viewport
<meta name=”apple-mobile-web-app-title” content=”标题”> iOS 设备 begin
<meta name=”apple-mobile-web-app-capable” content=”yes”/> 添加到主屏后的标题(iOS 6
新增)
是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
<meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData,
app-argument=myURL”>
添加智能 App 广告条 Smart App Banner(iOS 6+ Safari)
<meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>
<meta name=”format-detection” content=”telphone=no, email=no”/> 设置苹果工具栏颜色 <meta name=”renderer” content=”webkit”> 启用 360 浏览器的极速模式(webkit)
<meta http-equiv=”X-UA-Compatible” content=”IE=edge”> 避免 IE 使用兼容模式
<meta http-equiv=”Cache-Control” content=”no-siteapp” /> 不让百度转码
<meta name=”HandheldFriendly” content=”true”> 针对手持设备优化，主要是针对一些
老的不识别 viewport 的浏览器，比如黑莓
<meta name=”MobileOptimized” content=”320′′> 微软的老式浏览器
    <meta name=”screen-orientation” content=”portrait”> <meta name=”x5-orientation” content=”portrait”> <meta name=”full-screen” content=”yes”>
<meta name=”x5-fullscreen” content=”true”>
<meta name=”browsermode” content=”application”>
<meta name=”x5-page-mode” content=”app”> QQ 应用模式
<meta name=”msapplication-tap-highlight” content=”no”> windows phone 点击无高光 设置页面不缓存
uc 强制竖屏 QQ 强制竖屏
UC 强制全屏 QQ 强制全屏
UC 应用模式
 <meta http-equiv=”pragma” content=”no-cache”> <meta http-equiv=”cache-control” content=”no-cache”> <meta http-equiv=”expires” content=”0′′>
```


### base标签是否了解？怎么指定资源相对路径？

`<base>`标签是用来指定一个HTML页中所有的相对路径的根路径。

比如：

``` html
<head>
  <base href="http://www.xxx.com/public/script/">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!--  -->
  <script type="text/javascript" src="/common/111.js"></script>
  <script type="text/javascript" src="/common/222.js"></script>
  <link rel="stylesheet" href="/common/111.css">
  <link rel="stylesheet" href="/common/222.css">

> <script type="text/javascript" src="/script/plug.js"></script>
	...
</head>
```

浏览器在解析的时候会比较基路径和静态文件的相对路径，如果相对路径中的一部分包含在基路径中，比如plug.js的/script/在基路径中已经有了，那么就会将二者拼起来，**去重哦（不可控）**

```
->http://www.xxx.com/public/script/plug.js

```


如果没有则会取前面的域名（如果为ip地址的话则是ip+端口号）和相对路径拼起来，比如111.js

```
->http://www.xxx.com/common/111.js
```


参考：

[HTML Base标签的使用技巧-为页面设置统一的资源地址](https://juejin.cn/post/6844904116758511624)

## 表单相关

### label标签有什么用？

label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签 相关的表单控件上。

``` html
<label for="Name">Number:</label>
<input type=“text“ name="Name" id="Name"/>
```


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


### HTML5 的 form 的自动完成功能是什么?

autocomplete 属性规定输入字段是否应该启用自动完成功能。默认为启用，设置为 autocomplete=off 可以关闭该功能。

自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入 过的值，应该显示出在字段中填写的选项。

autocomplete 属性适用于` <form>`，以及下面的 `<input>` 类型:text, search, url, telephone, email, password, datepickers, range 以及 color。


### disabled 和 readonly 的区别?

disabled 指当 input 元素加载时禁用此元素。input 内容不会随着表单提交。

readonly 规定输入字段为只读。input 内容会随着表单提交。

无论设置 readonly 还是 disabled，通过 js 脚本都能更改 input 的 value。


## DOM相关

### DOM和BOM是什么？

DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处 理网页内容的方法和接口。BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM 的核心是 window，而 window 对 象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global(全局)对象。 

这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。 window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的 最根本的对象 document 对象也是 BOM 的 window 对象的子对象。


### 一个iframe，内嵌了一个A页面，iframe的宽高不停变化，如何让A页面的宽高实时自适应这个iframe的宽高大小

css

设置宽高100%

设置宽100vw，高100vh

js监听后设置为视口宽高

监听窗口resize事件，然后postmessage通信给里面

使用ResizeObserver监听html元素


### script标签的的defer和async有什么区别？

(1)脚本没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等 待后续载入的文档元素，读到就加载并执行。

(2)defer 属性表示延迟执行引入的 JavaScript，即这段 JavaScript 加载时 HTML 并未停止解析，这两个过程是并行的。当整个 document 解析完毕后再执行脚本文件，在 DOMContentLoaded 事件触发之前 完成。多个脚本按顺序执行。module script默认就是defer模式。

(3)async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20210331104833.png"/>

### script的async属性使用场景是？

不依赖dom的各个独立sdk适合async。因为他下载了就执行，其如果和dom有关会阻塞文档的解析。



### style 标签写在 body 后与 body 前有什么区别?

页面加载自上而下当然是先加载样式。写在 body 标签后由于浏览器以逐行方式对 HTML 文 档进行解析，当解析到写在尾部的样式
表(外联或写在 style 标签)会导致浏览器停止之前的渲染，等待加载且解析样式表完成之 后重新渲染，在 windows 的 IE 下可
能会出现 FOUC 现象(即样式失效导致的页面闪烁问题)

### js延迟加载的方式有哪些？

js 延迟加载，也就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提 高页面加载速度。

第一种方式是我们一般采用的是将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最 后来加载执行。

第二种方式是给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解 析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设 置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。

第三种方式是给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的 解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同 样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执 行。

第四种方式是动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加 载完成后再动态的创建 script 标签来引入 js 脚本


### b 与 strong 的区别和 i 与 em 的区别?

从页面显示效果来看，被 `<b>` 和 `<strong>` 包围的文字将会被加粗，而被 `<i>` 和 `<em>` 包围的文字将以斜体的形式呈现。

但是 `<b> <i>` 是自然样式标签，分别表示无意义的加粗，无意义的斜体，表现样式为 `{ font-weight: bolder}`，仅仅表示「这里应该用粗体显示」或者「这里应该用斜体显示」，此两个标签在 HTML4.01 中并不 被推荐使用。

而 `<em>` 和 `<strong>` 是语义样式标签。`<em> `表示一般的强调文本，而 `<strong>` 表 示比 `<em>` 语义更强的强调文本。
使用阅读设备阅读网页时:`<strong>` 会重读，而 `<b> `是展示强调内容。

### iframe有哪些缺点？


iframe 元素会创建包含另外一个文档的内联框架(即行内框架)。
主要缺点有

(1) iframe 会阻塞主页面的 onload 事件。window 的 onload 事件需要在所有 iframe加载完毕后(包含里面的元素)才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态 设置 iframe 的 src 可以避免这种阻塞情况。

(2) 搜索引擎的检索程序无法解读这种页面，不利于网页的 SEO 。

(3) iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的 并行加载。

(4) 浏览器的后退按钮失效。

(5) 小型的移动设备无法完全显示框架。


参考：

[Iframe简单探索以及Iframe跨域处理_个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000009891683)


### 如何在页面实现一个圆形的可点击区域？

(1)纯 html 实现，使用 `<area>` 来给 `<img>` 图像标记热点区域的方式，`<map>`标签用 来定义一个客户端图像映射，`<area>`标签用来定义图像映射中的区域，area 元素永远嵌套在 map 元素内部，我们可以将 area 区域设置为圆形，从而实现可点击的圆形区域。

(2)纯 css 实现，使用 border-radius ，当 border-radius 的长度等于宽高相等的元素值 的一半时，即可实现一个圆形的点击区域。

(3)纯 js 实现，判断一个点在不在圆上的简单算法，通过监听文档的点击事件，获取每 次点击时鼠标的位置，判断该位置是否在我们规定的圆形区域内。


### img 的 title 和 alt 有什么区别?
title 通常当鼠标滑动到元素上的时候显示。

alt 是 `<img>` 的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅 读图片。可提图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。


### offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别?

clientWidth/clientHeight 返回的是元素的内部宽度，它的值只包含 content + padding， 如果有滚动条，不包含滚动条。
clientTop 返回的是上边框的宽度。 clientLeft 返回的左边框的宽度。

offsetWidth/offsetHeight 返回的是元素的布局宽度，它的值包含 content + padding + border 包含了滚动条。
offsetTop 返回的是当前元素相对于其 offsetParent 元素的顶部的距离。
offsetLeft 返回的是当前元素相对于其 offsetParent 元素的左部的距离。

scrollWidth/scrollHeight 返回值包含 content + padding + 溢出内容的尺寸。 scrollTop 属性返回的是一个元素的内容垂直滚动的像素数。
scrollLeft 属性返回的是元素滚动条到元素左边的距离。

参考：

[最全的获取元素宽高及位置的方法](https://juejin.cn/post/6844903695428108302)




## 样式相关


### png8、png24、png32有什么区别？

2^8等于256，也就是说PNG 8能存储256种颜色，一张图片如果颜色种类很少，将它设置成PNG 8得图片类型是非常适合的。

PNG 32 相当于PNG 24 加上 8bits的透明颜色通道，就相当于R（红）、G（绿）、B（蓝）、A（透明）。R(0255),G(0255),B(0255),A(0255)。比PNG 24多了一个A（透明），也就是说PNG 32能表示跟PNG 24一样多的色彩，并且还支持256种透明的颜色，能表示更加丰富的图片颜色类型。