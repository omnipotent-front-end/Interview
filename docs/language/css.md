# Css

## 应用

### 介绍一下标准的 CSS 的盒子模型?低版本 IE 的盒子模型有什么不同的?


盒模型都是由四个部分组成的，分别是 margin、border、padding 和 content。

标准盒模型和 IE 盒模型的区别在于设置 width 和 height 时，所对应的范围不同。标准盒模 型的 width 和 height 属性的范围只包含了 content，而 IE 盒模型的 width 和 height 属性的范围包含了 border、padding 和 content。

一般来说，我们可以通过修改元素的 box-sizing 属性来改变元素的盒模型。 


### 内联盒模型基本概念

(1)内容区域(contentarea)。内容区域指一种围绕文字看不见的盒子，其大小仅受字符本 身特性控制，本质上是一个字符盒子 (characterbox);但是有些元素，如图片这样的替换元素，其内容显然不是文字，不存在字 符盒子之类的，因此，对于这些
元素，内容区域可以看成元素自身。

(2)内联盒子(inlinebox)。“内联盒子”不会让内容成块显示，而是排成一行，这里的“内联 盒子”实际指的就是元素的“外在盒 子”，用来决定元素是内联还是块级。该盒子又可以细分为“内联盒子”和“匿名内联盒子”两类。 

(3)行框盒子(linebox)，每一行就是一个“行框盒子”(实线框标注)，每个“行框盒子”又是由一个一个“内联盒子”组成的。 

(4)包含块(containingbox)，由一行一行的“行框盒子”组成。


### 什么是包含块，对于包含块的理解? 

包含块(containingblock)就是元素用来计算和定位的一个框

(1)根元素(很多场景下可以看成是`<html>`)被称为“初始包含块”，其尺寸等同于浏览器 可视窗口的大小。

(2)对于其他元素，如果该元素的 position 是 relative 或者 static，则“包含块”由其最近的 块容器祖先盒的 contentbox
边界形成。

(3)如果元素 position:fixed，则“包含块”是“初始包含块”。

(4)如果元素 position:absolute，则“包含块”由最近的 position 不为 static 的祖先元素建立，

具体方式如下:

如果该祖先元素是纯 inline 元素，则规则略复杂: •假设给内联元素的前后各生成一个宽度为 0 的内联盒子(inlinebox)，则这两个内联盒子的 paddingbox 外面的包围盒就是内联元素的“包含块”; •如果该内联元素被跨行分割了，那么“包含块”是未定义的，也就是 CSS2.1 规范并没有明确 定义，浏览器自行发挥否则，“包含块”由该祖先的 paddingbox 边界形成。

如果没有符合条件的祖先元素，则“包含块”是“初始包含块”。

### absolute 的 containing block(包含块)计算方式跟正常流有什么不同? 

(1)内联元素也可以作为“包含块”所在的元素;

(2)“包含块”所在的元素不是父块级元素，而是最近的 position 不为 static 的祖先元素或根 元素;

(3)边界是 paddingbox 而不是 contentbox。


### 什么是幽灵空白节点?

“幽灵空白节点”是内联盒模型中非常重要的一个概念，具体指的是:在 HTML5 文档声明中， 内联元素的所有解析和渲染表现就如同 每个行框盒子的前面有一个“空白节点”一样。这个“空白节点”永远透明，不占据任何宽度， 看不见也无法通过脚本获取，就好像幽灵 一样，但又确确实实地存在，表现如同文本节点一样，因此，我称之为“幽灵空白节点”。


### 什么是替换元素?

通过修改某个属性值呈现的内容就可以被替换的元素就称为“替换元素”。因此，`<img>、 <object>、<video>、<iframe>`或者表 单元素`<textarea>`和`<input>`和`<select>`都是典型的替换元素。

替换元素除了内容可替换这一特性以外，还有以下一些特性。

(1)内容的外观不受页面上的 CSS 的影响。用专业的话讲就是在样式表现在 CSS 作用域之 外。如何更改替换元素本身的外观需要
类似 appearance 属性，或者浏览器自身暴露的一些样式接口，

(2)有自己的尺寸。在 Web 中，很多替换元素在没有明确尺寸设定的情况下，其默认的尺 寸(不包括边框)是 300 像素×150 像 素，如`<video>`、`<iframe>`或者`<canvas>`等，也有少部分替换元素为 0 像素，如`<img>`图片， 而表单元素的替换元素
的尺寸则和浏览器有关，没有明显的规律。

(3)在很多 CSS 属性上有自己的一套表现规则。比较具有代表性的就是 vertical-align 属性， 对于替换元素和非替换元素，ve
rtical-align 属性值的解释是不一样的。比方说 vertical-align 的默认值的 baseline，很简单的属 性值，基线之意，
被定义为字符 x 的下边缘，而替换元素的基线却被硬生生定义成了元素的下边缘。

(4)所有的替换元素都是内联水平元素，也就是替换元素和替换元素、替换元素和文字都 是可以在一行显示的。但是，替换元素默认
的 display 值却是不一样的，有的是 inline，有的是 inline-block。


### 替换元素的计算规则?
 
 
  
替换元素的尺寸从内而外分为 3 类:固有尺寸、HTML 尺寸和 CSS 尺寸。 

(1)固有尺寸指的是替换内容原本的尺寸。例如，图片、视频作为一个独立文件存在的时
候，都是有着自己的宽度和高度的。

(2)HTML 尺寸只能通过 HTML 原生属性改变，这些 HTML 原生属性包括`<img>`的 width 和 height 属性、`<input>`的 s
ize 属性、`<textarea>`的 cols 和 rows 属性等。

(3)CSS 尺寸特指可以通过 CSS 的 width 和 height 或者 max-width/min-width 和 max-height/min-height 设置的
尺寸，对应盒尺寸中的 contentbox。

这 3 层结构的计算规则具体如下

(1)如果没有 CSS 尺寸和 HTML 尺寸，则使用固有尺寸作为最终的宽高。

(2)如果没有 CSS 尺寸，则使用 HTML 尺寸作为最终的宽高。

(3)如果有 CSS 尺寸，则最终尺寸由 CSS 属性决定。

(4)如果“固有尺寸”含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依 然按照固有的宽高比例显示。

(5)如果上面的条件都不符合，则最终宽度表现为 300 像素，高度为 150 像素。 

(6)内联替换元素和块级替换元素使用上面同一套尺寸计算规则。


### content 与替换元素的关系? 

content 属性生成的对象称为“匿名替换元素”。

(1)我们使用 content 生成的文本是无法选中、无法复制的，好像设置了 userselect:none 声明一般，但是普通元素的文本
却可以被轻松选中。同时，content 生成的文本无法被屏幕阅读设备读取，也无法被搜索引 擎抓取，因此，千万不要自以为是
地把重要的文本信息使用 content 属性生成，因为这对可访问性和 SEO 都很不友好。

(2)content 生成的内容不能左右:empty 伪类。

(3)content 动态生成值无法获取。

### 什么是层叠上下文?

层叠上下文，英文称作 stackingcontext，是 HTML 中的一个三维的概念。如果一个元素含有 层叠上下文，我们可以理解为这个元
素在 z 轴上就“高人一等”。

层叠上下文元素有如下特性:

(1)层叠上下文的层叠水平要比普通元素高(原因后面会说明)。 

(2)层叠上下文可以阻断元素的混合模式。 

(3)层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的“层叠上下文”。 

(4)每个层叠上下文和兄弟元素独立，也就是说，当进行层叠变化或渲染的时候，只需要 考虑后代元素。 

(5)每个层叠上下文是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠 上下文的层叠顺序中。

层叠上下文的创建: 

(1)页面根元素天生具有层叠上下文，称为根层叠上下文。根层叠上下文指的是页面根元
素，可以看成是`<html>`元素。因此，页面中所有的元素一定处于至少一个“层叠结界”中。

(2)对于 position 值为 relative/absolute 以及 Firefox/IE 浏览器(不包括 Chrome 浏览器)下 含有 position:fixed 声明的定位元素，当其 z-index 值不是 auto 的时候，会创建层叠上下文。 Chrome 等 WebKit 内核浏览器下，position:fixed 元素天然层叠上下文元素，无须 z-index 为 数值。根据我的测试，目前 IE 和 Firefox 仍是老套路。

(3)其他一些 CSS3 属性，比如元素的 opacity 值不是 1。

### 层叠准则?

(1)谁大谁上:当具有明显的层叠水平标识的时候，如生效的 z-index 属性值，在同一个层
叠上下文领域，层叠水平值大的那一个覆盖小的那一个。

(2)后来居上:当元素的层叠水平一致、层叠顺序相同的时候，在 DOM 流中处于后面的 元素会覆盖前面的元素。


 
### display有哪些值，说说他们作用？

block 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。

none 元素不显示，并从文档流中移除。

inline 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。 

inline-block 默认宽度为内容宽度，可以设置宽高，同行显示。

list-item 像块类型元素一样显示，并添加样式列表标记。

table 此元素会作为块级表格来显示。

inherit 规定应该从父元素继承 display 属性的值。

### 'display'、'position'和'float'的相互关系?

(1)首先我们判断 display 属性是否为 none，如果为 none，则 position 和 float 属性的值不影响元素最后的表现。

(2)然后判断 position 的值是否为 absolute 或者 fixed，如果是，则 float 属性失效，并且 display 的值应该被设置为 table 或者 block，具体转换需要看初始转换值。

(3)如果 position 的值不为 absolute 或者 fixed，则判断 float 属性的值是否为 none，如果 不是，则 display的值则按上面的规则转换。注意，如果 position 的值为 relative 并且 float 属性的值存在，则 relative 相对于浮动后的最终位置定位。

(4)如果 float 的值为 none，则判断元素是否为根元素，如果是根元素则 display 属性按照 上面的规则转换，如果不是，则保持指定的 display 属性值不变。

总的来说，可以把它看作是一个类似优先级的机制，"position:absolute"和"position:fixed"优 先级最高，有它存在 的时候，浮动不起作用，'display'的值也需要调整;其次，元素的'float'特性的值不是"none" 的时候或者它是根元素 的时候，调整'display'的值;最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display' 特性值同设置值


### 如何让去除 inline-block 元素间间距?

移除空格、使用 margin 负值、使用 font-size:0、letter-spacing、word-spacing


### position有哪些取值？

static,relative,absolute,sticky,fixed,initial,inherit,unset。

* static 默认值。没有定位，元素出现在正常的流中

* relative 生成相对定位的元素，相对于其在普通流中的位置进行定位。

* absolute :生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位。

* sticky 生成粘性定位的元素，容器的位置根据正常文档流计算得出

* fixed （老IE不支持）生成绝对定位的元素，通常相对于浏览器窗口或 frame 进行定位。


### position的定位原点是什么？

relative 定位的元素，是相对于元素本身的正常位置来进行定位的。

absolute 定位的元素，是相对于它的第一个 position 值不为 static 的祖先元素的 paddingbox 来进行定位的。

这句话我们可以这样来理解，我们首先需要找到绝对定位元素的一个 position 的值不为 static 的祖 先元素，然后相对于这个祖先元素的 paddingbox 来定位，也就是说在计算定位距离的时候，padding 的值也要算进去。


### 浮动元素和绝对定位元素的区别和应用?

虽然浮动和绝对定位都是脱离文本流，但是绝对定位是彻底脱离的，而且它不会影响其他元素的布局。而浮动是会影响的，会导致文本环绕它。

浮动应用场景：

多列布局、左右自适应布局等等。

绝对定位应用场景：

全局居中、动画移动特效、相对间距样式如多行省略的...

参考：

[浮动的应用场景](https://juejin.cn/post/6844904098936913928)



### 如何理解BFC？

BFC 即 Block Formatting Contexts, 翻成中文是 块级格式化上下文。

可以这样来理解, 将 BFC 理解为一个**完全封闭的盒子, 盒子内部的元素无论如何摆放, 也不会影响到盒子外面**.

只要元素触发以下任意一条, 便视其具有 BFC 特性.

- body 根元素.
- 浮动元素: float 除 none 以外的值.
- 绝对定位元素: position 为 (absolute || fixed).
- display 为 (inline-block || table-cells || flex).
- overflow 除了 visible 以外的值 (hidden || auto || scroll).

BFC特性如下：

- 同一个 BFC 下的两个块级元素之间的外边距会发生折叠.
- 清除浮动.
- 阻止元素被浮动元素覆盖

### IFC 是什么?

IFC 指的是行级格式化上下文，它有这样的一些布局规则:

(1)行级上下文内部的盒子会在水平方向，一个接一个地放置。 

(2)当一行不够的时候会自动切换到下一行。 

(3)行级上下文的高度由内部最高的内联盒子的高度决定

### 高度塌陷产生的原因是什么？

当父元素未设置高度时，所有子元素浮动后，会造成子元素脱离文档流进而无法把父元素撑开，父元素高度为0产生高度塌陷，称为高度塌陷问题。

父元素高度塌陷后，父元素以下的元素都会向上移动，导致布局混乱。

参考：

[高度塌陷的产生原因及解决方法_Mencre的博客-CSDN博客_高度塌陷解决方法](https://blog.csdn.net/qq_17497931/article/details/104463298)


### CSS 中解决浮动中高度塌陷的方案有哪些？

1、直接定高

2、触发BFC

可以通过给box添加overflow: hidden;等声明触发BFC。还有其他触发BFC的手段可以参考[如何理解bfc？](/language/css.html#%E5%A6%82%E4%BD%95%E7%90%86%E8%A7%A3bfc%EF%BC%9F)

3、清除浮动

比如在所有浮动元素后面增加空div clear both，或者增加after伪元素来完成浮动的清除。

参考：

[高度塌陷的产生原因及解决方法_Mencre的博客-CSDN博客_高度塌陷解决方法](https://blog.csdn.net/qq_17497931/article/details/104463298)


### clear 属性清除浮动的原理是什么？

使用 clear 属性清除浮动，其语法如下: clear:none|left|right|both

如果单看字面意思，clear:left 应该是“清除左浮动”，clear:right 应该是“清除右浮动”的意思， 实际上，这种解释是有问
题的，因为浮动一直还在，并没有清除。

官方对 clear 属性的解释是:“元素盒子的边不能和前面的浮动元素相邻。”，我们对元素设 置 clear 属性是为了避免浮动元素
对该元素的影响，而不是清除掉浮动。

还需要注意的一点是 clear 属性指的是元素盒子的边不能和前面的浮动元素相邻，注意这里 “前面的”3 个字，也就是 clear 属
性对“后面的”浮动元素是不闻不问的。考虑到 float 属性要么是 left，要么是 right，不可能同 时存在，同时由于 clear
属性对“后面的”浮动元素不闻不问，因此，当 clear:left 有效的时候，clear:right 必定无效， 也就是此时 clear:left
等同于设置 clear:both;同样地，clear:right 如果有效也是等同于设置 clear:both。由此可见， clear:left 和 cle
ar:right 这两个声明就没有任何使用的价值，至少在 CSS 世界中是如此，直接使用 clear:both 吧。
一般使用伪元素的方式清除浮动

``` css
.clear::after{
  content:''; display:table;//也可以是'block'，或者是'list-item' clear:both;
}

```
clear 属性只有块级元素才有效的，而::after 等伪元素默认都是内联水平，这就是借助伪元素 清除浮动影响时需要设置 display 属性值的原因。

### 采用 BFC 解决高度塌陷和clear 属性清除浮动相比的优势是什么？

当子元素有定位属性时，设置 overflow: hidden; 容器以外的部分会被裁剪掉。

空div clear在页面中添加无意义的div，容易造成代码冗余。

伪元素方法最为灵活，不会造成代码冗余。

[什么是高度塌陷？ 页面布局中高度塌陷的四种解决方法_tiankai100的专栏-CSDN博客_高度塌陷](https://blog.csdn.net/tiankai100/article/details/83054061?utm_medium=distribute.pc_relevant.none-task-blog-baidulandingword-2&spm=1001.2101.3001.4242)

### CSS 中的 vertical-align 有哪些值？它在什么情况下才能生效？

vertical-align属性值：

线类：baseline、top、middle、bottom

文本类：text-top、text-bottom

上标下标类：sub、super

数值百分比类：20px、2em、20%等（对于基线往上或往下偏移）

vertical-align**生效前提**  ：

内联元素span、strong、em、img、button、input等

display值为inline、inline-block、inline-table或table-cell的元素

需要注意**浮动和绝对定位**会让元素块状化，因此此元素绝对不会生效



### 了解 Flex 布局么？平常有使用 Flex 进行布局么？

Flex 是 FlexibleBox 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

采用 Flex 布局的元素，称为 Flex 容器(flexcontainer)，简称"容器"。它的所有子元素自动成 为容器成员，称为 Flex项目(flexitem)，简称"项目"。

容器默认存在两根轴:水平的主轴(mainaxis)和垂直的交叉轴(crossaxis)，项目默认沿主 轴排列。

以下 6 个属性设置在容器上：

flex-direction 属性决定主轴的方向(即项目的排列方向)。 

flex-wrap 属性定义，如果一条轴线排不下，如何换行。
  
flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 rownowrap。

justify-content 属性定义了项目在主轴上的对齐方式。

align-items 属性定义项目在交叉轴上如何对齐。

align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

以下 6 个属性设置在项目上：

order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。 

flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计 算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

flex 属性是 flex-grow，flex-shrink 和 flex-basis 的简写，默认值为 01auto。

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认 值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。




### flex: 0 1 auto 表示什么意思？

flex: 0 1 auto 其实就是弹性盒子的默认值，表示 flex-grow, flex-shrink 和 flex-basis 的简写，分别表示放大比例、缩小比例、分配多余空间之前占据的主轴空间。

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。如果所有项目的flex-grow属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

flex-shrink属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。如果所有项目的flex-shrink属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

lex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。它可以设为跟width或height属性一样的值（比如 350px），则项目将占据固定空间。


参考：[Flex 布局教程：语法篇 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

 

### grid布局了不了解，简单说下？

display:grid,和flex类似。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是**将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局**。Grid 布局远比 Flex 布局强大。

具体api不介绍了。

参考地址：

[一些需要用心去记住的css面试点](https://github.com/glitchboyl/blog/issues/6)

### 如果使用了flex，grid等新特性，怎么解决浏览器兼容性？

通过postcss，autoprefix，browserslist来在构建的阶段通过分析语法树，自动加到前缀中。


### 常见的元素隐藏方式?

-(1)使用 display:none;隐藏元素，渲染树不会包含该渲染对象，因此该元素不会在页面中 占据位置，也不会响应绑定的监听事件。

-(2)使用 visibility:hidden;隐藏元素。元素在页面中仍占据空间，但是不会响应绑定的监听 事件。

-(3)使用 opacity:0;将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍 然占据空间，并且能够响应元素绑定的监听事件。

-(4)通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。

-(5)通过 z-index 负值，来使其他元素遮盖住该元素，以此来实现隐藏。

-(6)通过 clip/clip-path 元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面 中占据位置，但是不会响应绑定的监听事件。

-(7)通过 transform:scale(0,0)来将元素缩放为 0，以此来实现元素的隐藏。这种方法下， 元素仍在页面中占据位置，但是不会响应绑定的监听事件。


### initial、inherit 和 unset是什么意思？

initial 关键字用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式。

inherit 用来控制继承，每一个 CSS 属性都有一个特性就是，这个属性必然是默认继承的 (inherited: Yes) 或者是默认不继承的 (inherited: no)。

unset是关键字 initial 和 inherit 的组合。

什么意思呢？也就是当我们给一个 CSS 属性设置了 unset 的话：

如果该属性是默认继承属性，该值等同于 inherit；
如果该属性是非继承属性，该值等同于 initial

参考：

[谈谈 CSS 关键字 initial、inherit 和 unset - 最骚的就是你 - 博客园](https://www.cnblogs.com/libin-1/p/6734751.html)


### CSS 中选择器有哪些？CSS 选择器优先级是怎么去匹配？


(1)id 选择器(#myid) 

(2)类选择器(.myclassname) 

(3)标签选择器(div,h1,p) 

(4)后代选择器(h1 p) 

(5)相邻后代选择器(子)选择器(ul>li) 

(6)兄弟选择器(li~a) 

(7)相邻兄弟选择器(li+a) 

(8)属性选择器(a[rel="external"]) 

(9)伪类选择器(a:hover,li:nth-child)

(10)伪元素选择器(::before、::after) 

(11)通配符选择器(*)

选择器的特殊性值分为四个等级，如下:

(1)标签内选择符 x,0,0,0

(2)ID 选择符 0,x,0,0

(3)class 选择符/属性选择符/伪类选择符 (4)元素和伪元素选择符 0,0,0,x

计算方法:

0,0,x,0

(1)每个等级的初始值为 0

(2)每个等级的叠加为选择器出现的次数相加

(3)不可进位，比如 0,99,99,99

(4)依次表示为:0,0,0,0

(5)每个等级计数之间没关联 

(6)等级判断从左向右，如果某一位数值相同，则判断下一位数值 

(7)如果两个优先级相同，则最后出现的优先级高，!important 也适用 

(8)通配符选择器的特殊性值为:0,0,0,0 

(9)继承样式优先级最低，通配符样式优先级高于继承样式 

(10)!important(权重)，它没有特殊性值，但它的优先级是最高的，为了方便记忆，可以 认为它的特殊性值为 1,0,0,0,0。

计算实例: 

(1)#demoa{color:orange;}/*特殊性值:0,1,0,1*/

(2)div#demoa{color:red;}/*特殊性值:0,1,0,2*/

注意:

(1)样式应用时，css 会先查看规则的权重(!important)，加了权重的优先级最高，当权重 相同的时候，会比较规则的特殊性。

(2)特殊性值越大的声明优先级越高。 

(3)相同特殊性值的声明，根据样式引入的顺序，后声明的规则优先级高(距离元素出现
最近的)

(4) 部分浏览器由于字节溢出问题出现的进位表现不做考虑

### 浏览器是怎么解析css选择器的？

样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素。只要选择器的子树 一直在工作，样式系统就会持续左移，直 到和规则匹配，或者是因为不匹配而放弃该规则。

试想一下，如果采用从左至右的方式读取 CSS 规则，那么大多数规则读到最后(最右)才会 发现是不匹配的，这样做会费时耗能， 最后有很多都是无用的;而如果采取从右向左的方式，那么只要发现最右边选择器不匹配， 就可以直接舍弃了，避免了许多无效匹配。

### 伪元素和伪类有什么区别？

在 css3 中使用单冒号来表示伪类，用双冒号来表示伪元素。但是为了兼容已有的伪元素的写法，在一些浏览器中也可以使用单冒号来表示伪元素。

伪类一般匹配的是`元素的一些特殊状态`，如 hover、link 等，而伪元素一般匹配的`特殊的位置`，比如 after、before 等。


### 有哪些伪类？

a 标签有四种状态:链接访问前、链接访问后、鼠标滑过、激活，分别对应四种伪类:link、:visited、:hover、:active; 当链接未访问过时:

(1)当鼠标滑过 a 链接时，满足:link 和:hover 两种状态，要改变 a 标签的颜色，就必须将:hover 伪类在:link 伪类后面声明;

(2)当鼠标点击激活 a 链接时，同时满足:link、:hover、:active 三种状态，要显示 a 标签激 活时的样式(:active)，必须将:active 声明放到:link 和:hover 之后。因此得出 LVHA 这个顺序。 当链接访问过时，情况基本同上，只不过需要将:link 换成:visited。

css3新增伪类：

(1)elem:nth-child(n)选中父元素下的第 n 个子元素，并且这个子元素的标签名为 elem，n 可以接受具体的数
值，也可以接受函数。

(2)elem:nth-last-child(n)作用同上，不过是从后开始查找。

(3)elem:last-child 选中最后一个子元素。

(4)elem:only-child 如果 elem 是父元素下唯一的子元素，则选中之。

(5)elem:nth-of-type(n)选中父元素下第 n 个 elem 类型元素，n 可以接受具体的数值，也可 以接受函数。

(6)elem:first-of-type 选中父元素下第一个 elem 类型元素。

(7)elem:last-of-type 选中父元素下最后一个 elem 类型元素。

(8)elem:only-of-type 如果父元素下的子元素只有一个 elem 类型元素，则选中该元素。

(9)elem:empty 选中不包含子元素和内容的 elem 类型元素。

(10)elem:target 选择当前活动的 elem 元素。

(11):not(elem)选择非 elem 元素的每个元素。

(12):enabled 控制表单控件的禁用状态。

(13):disabled 控制表单控件的禁用状态。

(14):checked 单选框或复选框被选中。

参考：

[浅谈CSS伪类和伪元素及CSS3新增伪类_筱葭的博客-CSDN博客](https://blog.csdn.net/zhouziyu2011/article/details/58605705)


### CSS 中的 background 的 background-image 属性可以和 background-color 属性一起生效么？

background：color url（）；

合并起来写 只有只有这样的顺序才有效，分开写也可以，不过color必须写在前面，image必须写在后面才生效。


参考：

[background-color和background-image一起用的问题_aa2635aaa的博客-CSDN博客](https://blog.csdn.net/aa2635aaa/article/details/78652220)



### background-color 属性可以覆盖 background-image 属性吗？


当背景图片和背景色同时作用的时候，背景图片会覆盖背景色，没有覆盖到的就显示背景色

### 隐藏元素的 background-image 到底加不加载?

相关知识点:

根据测试，一个元素如果 display 计算值为 none，在 IE 浏览器下(IE8~IE11，更高版本不确 定)依然会发送图片请求，Fire
fox 浏览器不会，至于 Chrome 和 Safari 浏览器则似乎更加智能一点:如果隐藏元素同时又设 置了 background-image，则图片
依然会去加载;如果是父元素的 display 计算值为 none，则背景图不会请求，此时浏览器或 许放心地认为这个背景图暂时是不会使
用的。

如果不是 background-image，而是`<img>`元素，则设置 display:none 在所有浏览器下依旧都会 请求图片资源。

还需要注意的是如果设置的样式没有对应的元素，则 background-image 也不会加载。hover 情况下的 background-image，在触
发时加载。

回答:

-(1)元素的背景图片

-元素本身设置 display:none，会请求图片 

-父级元素设置 display:none，不会请求图片 

-样式没有元素使用，不会请求 

-:hover 样式下，触发时请求

-(2)img 标签图片任何情况下都会请求图片

### CSS 中哪些属性可以继承？

当元素的一个继承属性没有指定值时，则取父元素的同属性的计算值。当元素的一个非继承属性(在 Mozillacode 里有时称之为 resetproperty)没有指定值时，则 取属性的初始值 initialvalue。


有继承性的属性: 

(1)字体系列属性 font、font-family、font-weight、font-size、font-style、font-variant、font-stretch、font-size-adjust

(2)文本系列属性 text-indent、text-align、text-shadow、line-height、word-spacing、letter-spacing、 text-transform、direction、color

(3)表格布局属性 caption-side border-collapse empty-cells

(4)列表属性 list-style-type、list-style-image、list-style-position、list-style

(5)光标属性 cursor

(6)元素可见性 visibility

(7)还有一些不常用的;speak，page，设置嵌套引用的引号类型 quotes 等属性


### 两个li之间看不见的空白是怎么造成的，怎么解决？

浏览器会把 inline 元素间的空白字符(空格、换行、Tab 等)渲染成一个空格。而为了美观。 我们通常是一个`<li>`放在一行， 这导致`<li>`换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

解决办法:

(1)为`<li>`设置 float:left。不足:有些容器是不能设置浮动，如左右切换的焦点图等。 

(2)将所有`<li>`写在同一行。不足:代码不美观。

(3)将`<ul>`内的字符尺寸直接设为 0，即 font-size:0。不足:`<ul>`中的其他字符尺寸也被设 为 0，需要额外重新设定其他
字符尺寸，且在 Safari 浏览器依然会出现空白间隔。

(4)消除`<ul>`的字符间隔 letter-spacing:-8px，不足:这也设置了`<li>`内的字符间隔，因此需 要将`<li>`内的字符
间隔设为默认 letter-spacing:normal。


### width:auto 和 width:100%的区别

一般而言

`width:100%`会使元素 box 的宽度等于父元素的 contentbox 的宽度。

`width:auto` 会使元素撑满整个父元素，margin、border、padding、content 区域会自动分配水平空间。


### 元素竖向的百分比设定是相对于容器的高度吗? 

如果是 height 的话，是相对于包含块的高度。

如果是 padding 或者 margin 竖直方向的属性则是相对于包含块的宽度


### 为什么 height:100%会无效? 

对于普通文档流中的元素，百分比高度值要想起作用，其父级必须有一个可以生效的高度值。

原因是如果包含块的高度没有显式指定(即高度由内容决定)，并且该元素不是绝对定位， 则计算值为 auto，因为解释成了 auto，
所以无法参与计算。

使用绝对定位的元素会有计算值，即使祖先元素的 height 计算为 auto 也是如此

 
### min-width/max-width 和 min-height/max-height 属性间的覆盖规则?

(1)max-width 会覆盖 width，即使 width 是行类样式或者设置了!important。

(2)min-width 会覆盖 max-width，此规则发生在 min-width 和 max-width 冲突的时候。

### 绝对定位元素与非绝对定位元素的百分比计算的区别

绝对定位元素的宽高百分比是相对于临近的 position 不为 static 的祖先元素的 paddingbox 来 计算的。

非绝对定位元素的宽高百分比则是相对于父元素的 contentbox 来计算的。

### margin 和 padding 分别适合什么场景使用?

margin 是用来隔开元素与元素的间距;padding 是用来隔开元素与内容的间隔。

margin 用于布局分开元素使元素与元素互不相干。

padding 用于元素与内容之间的间隔，让内容(文字)与(包裹)元素之间有一段距离。

何时应当使用 margin:
 
•需要在 border 外侧添加空白时。

•空白处不需要背景(色)时。

•上下相连的两个盒子之间的空白，需要相互抵消时。如 15px+20px 的 margin，将得到 20px 的空白。

何时应当时用 padding:

•需要在 border 内测添加空白时。

•空白处需要背景(色)时。

•上下相连的两个盒子之间的空白，希望等于两者之和时。如 15px+20px 的 padding，将得到 35px 的空白。

### 对margin重叠问题的理解

margin 重叠指的是在垂直方向上，两个相邻元素的 margin 发生重叠的情况。 一般来说可以分为四种情形:

第一种是相邻兄弟元素的 marin-bottom 和 margin-top 的值发生重叠。这种情况下我们可以 通过设置其中一个元素为 BFC
来解决。

第二种是父元素的 margin-top 和子元素的 margin-top 发生重叠。它们发生重叠是因为它们是 相邻的，所以我们可以通过这
一点来解决这个问题。我们可以为父元素设置 border-top、padding-top 值来分隔它们，当然 我们也可以将父元素设置为 BFC
来解决。

第三种是高度为 auto 的父元素的 margin-bottom 和子元素的 margin-bottom 发生重叠。它们 发生重叠一个是因为它们相 邻，一个是因为父元素的高度不固定。因此我们可以为父元素设置 border-bottom、 padding-bottom 来分隔它们，也可以为
父元素设置一个高度，max-height 和 min-height 也能解决这个问题。当然将父元素设置为 BFC 是最简单的方法。

第四种情况，是没有内容的元素，自身的 margin-top 和 margin-bottom 发生的重叠。我们可 以通过为其设置 border、pa
dding 或者高度来解决这个问题。


### margin:auto 的填充规则?
    
 margin 的'auto'可不是摆设，是具有强烈的计算意味的关键字，用来计算元素对应方向应该 获得的剩余间距大小。但是触发 mar
gin:auto 计算有一个前提条件，就是 width 或 height 为 auto 时，元素是具有对应方向的自动 填充特性的。

(1)如果一侧定值，一侧 auto，则 auto 为剩余空间大小。 

(2)如果两侧均是 auto，则平分剩余空间。


### margin 无效的情形
(1)display 计算值 inline 的非替换元素的垂直 margin 是无效的。对于内联替换元素，垂直 margin 有效，并且没有 ma
rgin 合并的问题。

(2)表格中的`<tr>`和`<td>`元素或者设置 display 计算值是 table-cell 或 table-row 的元素的 margin 都是无效的。

(3)绝对定位元素非定位方位的 margin 值“无效”。

(4)定高容器的子元素的 margin-bottom 或者宽度定死的子元素的 margin-right 的定位“失效”。



### overflow:scroll 时不能平滑滚动的问题怎么处理?


以下代码可解决这种卡顿的问题:-webkit-overflow-scrolling:touch;

是因为这行代码启用了硬件加速特性，所以滑动很流畅。


### 对font-weight 的理解?

如果使用数值作为 font-weight 属性值，必须是 100~900 的整百数。因为这里的数值仅仅是 外表长得像数值，实际上是一个具有特定含义的关键字，并且这里的数值关键字和字母关键 字之间是有对应关系的。


### 对text-indent 的理解? 

(1)text-indent 仅对第一行内联盒子内容有效。

(2)非替换元素以外的 display 计算值为 inline 的内联元素设置 text-indent 值无效，如果计 算值 inline-block/inline-table 则会生效。

(3)`<input>`标签按钮 text-indent 值无效。 

(4)`<button>`标签按钮 text-indent 值有效。

(5)text-indent 的百分比值是相对于当前元素的“包含块”计算的，而不是当前元素。


### 对letter-spacing的理解?

letter-spacing 可以用来控制字符之间的间距，这里说的“字符”包括英文字母、汉字以及空格等。
letter-spacing 具有以下一些特性。

(1)继承性。

(2)默认值是 normal 而不是 0。虽然说正常情况下，normal 的计算值就是 0，但两者还是 有差别的，在有些场景下，letter-spacing 会调整 normal 的计算值以实现更好的版面布局。 

(3)支持负值，且值足够大的时候，会让字符形成重叠，甚至反向排列。

(4)和 text-indent 属性一样，无论值多大或多小，第一行一定会保留至少一个字符。

(5)支持小数值，即使 0.1px 也是支持的。
 
(6)暂不支持百分比值


### 对white-space的理解?

white-space 属性声明了如何处理元素内的空白字符，这类空白字符包括 Space(空格)键、 Enter(回车)键、Tab(制表符)
键产生的空白。因此，white-space 可以决定图文内容是否在一行显示(回车空格是否生效)， 是否显示大段连续空白(空格是否
生效)等。

letter-spacing 作用于所有字符，但 word-spacing 仅作用于空格字符。换句话说，word-spacing 的作用就是增加空格的间隙
宽度

其属性值包括下面这些。

•normal:合并空白字符和换行符。 

•pre:空白字符不合并，并且内容只在有换行符的地方换行。

•nowrap:该值和 normal 一样会合并空白字符，但不允许文本环绕。 

•pre-wrap:空白字符不合并，并且内容只在有换行符的地方换行，同时允许文本环绕。 

•pre-line:合并空白字符，但只在有换行符的地方换行，允许文本环绕

### 了解 CSS 3 动画的硬件加速么？在重绘和重流方面有什么需要注意的点？

1. 使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。

2. 对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

如何使用

常见的触发硬件加速的css属性：

transform

opacity

filters

Will-change

当然，任何美好的东西都是会有对应的代价的，过犹不及。css3硬件加速还是有坑的:

如果你为太多元素使用css3硬件加速，会导致内存占用较大，会有性能问题。

在GPU渲染字体会导致抗锯齿无效。这是因为GPU和CPU的算法不同。因此如果你不在动画结束的时候关闭硬件加速，会产生字体模糊。

具体原理可以参考[如何避免重排和重绘？](/cp/browser.html#%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E6%8E%92%E5%92%8C%E9%87%8D%E7%BB%98%EF%BC%9F)

参考：

[第 22 题：介绍下重绘和回流（Repaint & Reflow），以及如何进行优化 · Issue #24 · Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24)




### 如果需要手动写动画，你认为最小时间间隔是多久，为什么?

多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 1/60*1000ms=16.7ms

### transition 和 animation 的区别

transition 关注的是 CSS property 的变化，property 值和时间的关系是一个三次贝塞尔曲线。

animation 作用于元素本身而不是样式属性，可以使用关键帧的概念，应该说可以实现更自由的动画效果。


### 常见的兼容性问题有哪些？


(1)png24 位的图片在 iE6 浏览器上出现背景 解决方案:做成 PNG8，也可以引用一段脚本处理。

(2)浏览器默认的 margin 和 padding 不同。解决方案:加一个全局的*{margin:0;padding:0;}来统一。

(3)IE6 双边距 bug:在 IE6 下，如果对元素设置了浮动，同时又设置了 margin-left 或
margin-right，margin 值会加倍。 #box{float:left;width:10px;margin:00010px;}
这种情况之下 IE 会产生 20px 的距离
解决方案:在 float 的标签样式控制中加入_display:inline;将其转化为行内属性。(_这个符号 只有 ie6 会识别)

(4)渐进识别的方式，从总体中逐渐排除局部。 首先，巧妙的使用"\9"这一标记，将 IE 游览器从所有情况中分离出来。 接着，再次使用"+"将 IE8 和 IE7、IE6 分离开来，这样 IE8 已经独立识别。 .bb{
background-color:#f1ee18;/*所有识别*/ .background-color:#00deff\9;/*IE6、7、8 识别*/ +background-color:#a200ff;/*IE6、7 识别*/ _background-color:#1e0bd1;/*IE6 识别*/
}

(5)IE 下，可以使用获取常规属性的方法来获取自定义属性，也可以使用 getAttribute()获 取自定义
属性;Firefox 下，只能使用 getAttribute()获取自定义属性
解决方法:统一通过 getAttribute()获取自定义属性。

(6)IE 下，event 对象有 x、y 属性，但是没有 pageX、pageY 属性;Firefox 下，event 对象有 pageX、pageY 属性，但是没有 x、y 属性。
解决方法:(条件注释)缺点是在 IE 浏览器下可能会增加额外的 HTTP 请求数。

(7)Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示 解决方法:
1.可通过加入 CSS 属性-webkit-text-size-adjust:none;解决。但是，在 chrome 更新到 27 版本之后就不可以用了。
2.还可以使用-webkit-transform:scale(0.5);注意-webkit-transform:scale(0.75);
收缩的是整个 span 的大小，这时候，必须要将 span 转换成块元素，可以使用 display: block/inline-block/...;

(8)超链接访问过后 hover 样式就不出现了，被点击访问过的超链接样式不再具有 hover 和 active 了
解决方法:改变 CSS 属性的排列顺序 L-V-H-A
    
(9)怪异模式问题:漏写 DTD 声明，Firefox 仍然会按照标准模式来解析网页，但在 IE 中会 触发怪异模
式。为避免怪异模式给我们带来不必要的麻烦，最好养成书写 DTD 声明的好习惯。


### 使用base64图片的优缺点


base64 编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，在页面上 显示的时候，可以用该字符串来代替图片的
url 属性。

使用 base64 的优点是: 


(1)减少一个图片的 HTTP 请求 

使用 base64 的缺点是:

(1)根据 base64 的编码原理，编码后的大小会比原文件大小大 1/3，如果把大图片编码到 html/css 中，不仅会造成文件体
积的增加，影响文件的加载速度，还会增加浏览器对 html 或 css 文件解析渲染的时间。

(2)使用 base64 无法直接缓存，要缓存只能缓存包含 base64 的文件，比如 HTML 或者 CSS， 这相比域直接缓存图片的效果要
差很多。

 
(3)兼容性的问题，ie8 以前的浏览器不支持。


一般一些网站的小图标可以使用 base64 图片来引入。


### 说一下常见的图片格式？

(1)第一种是 BMP 格式，它是无损压缩的，支持索引色和直接色的点阵图。由于它基本上 没有进行压缩，因此它的文件体积一般比
较大。

(2)第二种是 GIF 格式，它是无损压缩的使用索引色的点阵图。由于使用了 LZW 压缩方法， 因此文件的体积很小。并且 GIF 还 支持动画和透明度。但因为它使用的是索引色，所以它适用于一些对颜色要求不高且需要文 件体积小的场景。

(3)第三种是 JPEG 格式，它是有损压缩的使用直接色的点阵图。由于使用了直接色，色彩 较为丰富，一般适用于来存储照片。但
由于使用的是直接色，可能文件的体积相对于 GIF 格式来说更大。

(4)第四种是 PNG-8 格式，它是无损压缩的使用索引色的点阵图。它是 GIF 的一种很好的 替代格式，它也支持透明度的调整，并
且文件的体积相对于 GIF 格式更小。一般来说如果不是需要动画的情况，我们都可以使用 PNG-8 格式代替 GIF 格式。

(5)第五种是 PNG-24 格式，它是无损压缩的使用直接色的点阵图。PNG-24 的优点是它使 用了压缩算法，所以它的体积比 BMP格式的文件要小得多，但是相对于其他的几种格式，还是要大一些。

(6)第六种格式是 svg 格式，它是矢量图，它记录的图片的绘制方式，因此对矢量图进行 放大和缩小不会产生锯齿和失真。它一般
适合于用来制作一些网站 logo 或者图标之类的图片。

(7)第七种格式是 webp 格式，它是支持有损和无损两种压缩方式的使用直接色的点阵图。 使用 webp 格式的最大的优点是，在相 同质量的文件下，它拥有更小的文件体积。因此它非常适合于网络图片的传输，因为图片体 积的减少，意味着请求时间的减小， 这样会提高用户的体验。这是谷歌开发的一种新的图片格式，目前在兼容性上还不是太好。

### 浏览器如何判断是否支持 webp 格式图片？

(1)宽高判断法。通过创建 image 对象，将其 src 属性设置为 webp 格式的图片，然后在 onload 事件中获取图片的宽高，如
果能够获取，则说明浏览器支持 webp 格式图片。如果不能获取或者触发了 onerror 函数， 那么就说明浏览器不支持 webp 格
式的图片。

(2)canvas 判断方法。我们可以动态的创建一个 canvas 对象，通过 canvas 的 toDataURL 将 设置为 webp 格式，然后判断
返回值中是否含有 image/webp 字段，如果包含则说明支持 WebP，反之则不支持。



### 书写css提升性能的方法有哪些？


加载性能:

(1)css 压缩:将写好的 css 进行打包压缩，可以减少很多的体积。

(2)css 单一样式:当需要下边距和左边距的时候，很多时候选择:margin:top0bottom0;但 margin-bottom:bot
tom;margin-left:left;执行的效率更高。

(3)减少使用@import,而建议使用 link，因为后者在页面加载时一起加载，前者是等待页 面加载完成之后再进行加载。

选择器性能:

(1)关键选择器(keyselector)。选择器的最后面的部分为关键选择器(即用来匹配目标元 素的部分)。CSS 选择符是从右到 左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元 素等等;

(2)如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规 则(这样样式系统就不会浪费时间去匹
配它们了)。

(3)避免使用通配规则，如*{}计算次数惊人!只对需要用到的元素进行选择。 

(4)尽量少的去对标签进行选择，而是用 class。

(5)尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽 量将选择器的深度降到最低，最高不要超过
三层，更多的使用类来关联每一个标签元素。

(6)了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。

渲染性能:

(1)慎重使用高性能属性:浮动、定位。

(2)尽量减少页面重排、重绘。

(3)去除空规则:{}。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑 能减少 css 文档体积。

(4)属性值为 0 时，不加单位。

(5)属性值为浮动小数 0.**，可以省略小数点之前的 0。 

(6)标准化各种浏览器前缀:带浏览器前缀的在前。标准属性在后。 

(7)不使用@import 前缀，它会影响 css 的加载速度。 

(8)选择器优化嵌套，尽量避免层级过深。


(9)css 雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时 图片本身会变大，使用时，优劣考虑清楚，再使用。

(10)正确使用 display 的属性，由于 display 的作用，某些样式组合会无效，徒增样式体积 的同时也影响解析性能。

(11)不滥用 web 字体。对于中文网站来说 WebFonts 可能很陌生，国外却很流行。webfonts 通常体积庞大，而且一些浏览器在下载 webfonts 时会阻塞页面渲染损伤性能。


### 怎么让 Chrome 支持小于 12px 的文字?
  
 在谷歌下 css 设置字体大小为 12px 及以下时，显示都是一样大小，都是默认 12px。 解决办法:

(1)可以使用 Webkit 的内核的-webkit-text-size-adjust 的私有 CSS 属性来解决，只要加了 -webkit-text-size
-adjust:none;字体大小就不受限制了。但是 chrome 更新到 27 版本之后就不可以用了。所以 高版本 chrome 谷歌浏览器
已经不再支持-webkit-text-size-adjust 样式，所以要使用时候慎用。

( 2 ) 还 可 以 使 用 css3 的 transform 缩 放 属 性 -webkit-transform:scale(0.5); 注 意 -webkit-transform:scale(0. 75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素， 可以使用 display:block/
inline-block/...;

(3)使用图片:如果是内容固定不变情况下，使用将小于 12px 文字内容切出做图片，这样不影响兼容也不影响美观。

### 让页面里的字体变清晰，变细用 CSS 怎么做?

webkit 内核的私有属性:-webkit-font-smoothing，用于字体抗锯齿，使用后字体看起来会更
清晰舒服。


在 MacOS 测试环境下面设置-webkit-font-smoothing:antialiased;但是这个属性仅仅是面向 MacOS，其他操作系统设
置后无效。

### 设备像素、css 像素、设备独立像素、dpr、ppi 之间的区别? 

设备像素指的是物理像素，一般手机的分辨率指的就是设备像素，一个设备的设备像素是不可变的。

css 像素和设备独立像素是等价的，不管在何种分辨率的设备上，css 像素的大小应该是一致的，css 像素是一个相对单位，它是相
对于设备像素的，一个 css 像素的大小取决于页面缩放程度和 dpr 的大小。

dpr 指的是设备像素和设备独立像素的比值，一般的 pc 屏幕，dpr=1。在 iphone4 时，苹果 推出了 retina 屏幕，它的 dpr
为 2。屏幕的缩放会改变 dpr 的值。

ppi 指的是每英寸的物理像素的密度，ppi 越大，屏幕的分辨率越大。


### 什么是 CSS 预处理器/后处理器?

CSS 预处理器定义了一种新的语言，其基本思想是，用一种专门的编程语言，为 CSS 增加了 一些编程的特性，将 CSS 作为目标生成 文件，然后开发者就只要使用这种语言进行编码工作。通俗的说，CSS 预处理器用一种专门 的编程语言，进行 Web 页面样式设计，然
后再编译成正常的 CSS 文件。

预处理器例如:LESS、Sass、Stylus，用来预编译 Sass 或 less css sprite，增强了 css 代码的复 用性，还有层级、mixin、
变量、循环、函数等，具有很方便的 UI 组件模块化开发能力，极大的提高工作效率。

CSS 后处理器是对 CSS 进行处理，并最终生成 CSS 的预处理器，它属于广义上的 CSS 预处理 器。我们很久以前就在用 CSS 后
处理器了，最典型的例子是 CSS 压缩工具(如 clean-css)，只不过以前没单独拿出来说过。 还有最近比较火的 Autoprefixer，
以 CanIUse 上的浏览器支持数据为基础，自动处理兼容性问题。

后处理器例如:PostCSS，通常被视为在完成的样式表中根据 CSS 规范处理 CSS，让其更有效; 目前最常做的是给 CSS 属性添加浏
览器私有前缀，实现跨浏览器兼容性的问题。

## 编码

### div水平垂直居中

``` html
<div class="parent">
  <div class="child"></div>
</div>
```

``` css
/* 方法1：flex */
div.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 方法2：相对绝对布局 */
div.parent {
    position: relative; 
}
div.child {
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  
}
/* 或者 */
div.child {
    width: 50px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -5px;
}
/* 或 */
div.child {
    width: 50px;
    height: 10px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
/* 方法3：grid布局 */
div.parent {
    display: grid;
}
div.child {
    justify-self: center;
    align-self: center;
}

/* 方法4：inline-block */
div.parent {
    font-size: 0;
    text-align: center;
    &::before {
        content: "";
        display: inline-block;
        width: 0;
        height: 100%;
        vertical-align: middle;
    }
}
div.child{
  display: inline-block;
  vertical-align: middle;
}
```

### 图片宽度已经!important了，如何覆盖宽度？

如题

``` html
<img src="1.jpg" style="width:480px!important;”>
```

通过`max-width`:

``` css
max-width: 300px
```

或者`box-sizing`配合`padding`:

``` css
box-sizing: border-box;
padding: 0 90px;
```


### 用css实现一个持续的动画效果

``` css
animation:mymove 5s infinite;
@keyframes mymove {
    from {top:0px;}
    to {top:200px;}
}

```

考察的点：

值 | 描述 
------------ | ------------- 
animation-name|	规定需要绑定到选择器的 keyframe 名称。
animation-duration|	规定完成动画所花费的时间，以秒或毫秒计。
animation-timing-function|	规定动画的速度曲线。
animation-delay|	规定在动画开始之前的延迟。
animation-iteration-count|	规定动画应该播放的次数。
animation-direction	| 规定是否应该轮流反向播放动画。


### 一列固定宽度，一列自适应

flex布局：


``` html
<style>
body{
    display: flex;
}
.left{
    background-color: rebeccapurple;
    height: 200px;
    flex: 1;
}
.right{
    background-color: red;
    height: 200px;
    width: 100px;
}
</style>
<body>
    <div class="left"></div>
    <div class="right"></div>
</body>
```

float配合margin：

``` html
<style>
div {
    height: 200px;
}
.left {
    float: right;
    width: 200px;
    background-color: rebeccapurple;
}
.right {
    margin-right: 200px;
    background-color: red;
}
</style>
<body>
    <div class="left"></div>
    <div class="right"></div>
</body>
```


### 满屏品字布局

简单的方式:

上面的 div 宽 100%，下面的两个 div 分别宽 50%，然后用 float 或者 inline 使其不换行即可。

参考：

[一个满屏品字布局怎么设计？_sjinsa的博客-CSDN博客_一个满屏品字布局如何设计](https://blog.csdn.net/sjinsa/article/details/70903940)



### 多列等高布局如何实现？

(1)利用 padding-bottom|margin-bottom 正负值相抵，不会影响页面布局的特点。设置父 容器设置超出隐藏(overflow:hidden)，这样父容器的高度就还是它里面的列没有设定 padding-bottom 时的高度，当它里 面的任一列高度增加了，则 父容器的高度被撑到里面最高那列的高度，其他比这列矮的列会用它们的 padding-bottom 补偿这部分高度差。

(2)利用 table-cell 所有单元格高度都相等的特性，来实现多列等高。

(3)利用 flex 布局中项目 align-items 属性默认为 stretch，如果项目未设置高度或设为 auto， 将占满整个容器的高度的特性，来实现多列等高。

参考：

[常用的多列等高布局收藏](https://juejin.cn/post/6844903615182667789)




### CSS 如何实现三列布局，左侧和右侧固定宽度，中间自适应宽度？

(1)利用绝对定位的方式，左右两栏设置为绝对定位，中间设置对应方向大小的 margin 的 值。

(2)利用 flex 布局的方式，左右两栏的放大和缩小比例都设置为 0，基础大小设置为固定 的大小，中间一栏设置为 auto。

(3)利用浮动的方式，左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左 右两个方向的 margin 值，注意这种方式，中间一栏必须放到最后。

(4)圣杯布局，利用浮动和负边距来实现。父级元素设置左右的 padding，三列均设置向左 浮动，中间一列放在最前面，宽度设置为父级元素的宽度，因此后面两列都被挤到了下一行， 通过设置 margin 负值将其移动到上一行，再利用相对定位，定位到两边。双飞翼布局中间 列的宽度不能小于两边任意列的宽度，而双飞翼布局则不存在这个问题。 

(5)双飞翼布局，双飞翼布局相对于圣杯布局来说，左右位置的保留是通过中间列的 margin 值来实现的，而不是通过父元素的 padding 来实现的。本质上来说，也是通过浮动和外边距 负值来实现的。

### 实现三行布局，上下固定中间自适应

利用绝对定位实现 

``` css

body { 
    padding: 0;
    margin: 0;
}
.header {
    position: absolute; 
    top: 0;
    width: 100%; 
    height: 100px; 
    background: red;
}
.container {
    position: absolute; 
    top: 100px; 
    bottom: 100px; 
    width: 100%; 
    background: green;
}
.footer {
    position: absolute; 
    bottom: 0;
    height: 100px; 
    width: 100%; 
    background: red;
}
```

利用 flex 布局实现 

``` css
html, body {
    height: 100%; 
}
body {
    display: flex;
    padding: 0;
    margin: 0; 
    flex-direction: column;
}
.header {
    height: 100px; 
    background: red;
}
.container { 
    flex-grow: 1; 
    background: green;
}
.footer {
    height: 100px; background: red;
}
```

### 如何设计一个 4 列等宽布局，各列之间的边距是 10px（考虑浏览器的兼容性）？

如果直接给p设置width为25%，然后设置间距，这样会使一排排不下，最后一个p会被挤到换行，所以要设置p的box-sizing为border-box，使width的值以IE盒子模型的标准解析，即width=border+padding-left+padding-right+content，然后通过设置内边距来产生间距，最后通过设置parent的左右margin为负值来抵消两侧的间距。

[实现4列等分布局，每列之间有间距_DreamFJ的博客-CSDN博客](https://blog.csdn.net/DreamFJ/article/details/68922929)

### 有一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一 个填满剩下的高度

( 1 )外层 div 使用 position : relative ;高度要求自适应的 div 使用 position:absolute;top:100px;bottom:0;
left:0;right:0;

(2)使用 flex 布局，设置主轴为竖轴，第二个 div 的 flex-grow 为 1。

### 画一条 0.5px 的线

采用 metaviewport 的方式 

采用 border-image 的方式

采用 transform:scale()的方式

### 如何实现单行/多行文本溢出的省略(...)?

``` css
/*单行文本溢出*/
p { 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
}
/*多行文本溢出*/
p {
    position: relative;
    line-height: 1.5em; 
    /*高度为需要显示的行数*行高，比如这里我们显示两行，则为 3*/ 
    height: 3em;
    overflow: hidden;
}
p:after {
    content: "...";
    position: absolute; bottom: 0;
    right: 0; background-color: #fff;
}
```


### 实现一个宽高自适应的正方形

``` css
/*1.第一种方式是利用 vw 来实现*/ 
.square {
    width: 10%;
    height: 10vw; 
    background: tomato;
}
/*2.第二种方式是利用元素的 margin/padding 百分比是相对父元素 width 的性质来实现*/ 
.square {
    width: 20%;
    height: 0; 
    padding-top: 20%; 
    background: orange;
}
/*3.第三种方式是利用子元素的 margin-top 的值来实现的*/
.square {
    width: 30%; 
    overflow: hidden; 
    background: yellow;
}
.square::after { 
    content: ""; 
    display: block; 
    margin-top: 100%;
}

```


### 实现一个三角形

``` css
/*三角形的实现原理是利用了元素边框连接处的等分原理。*/ 
.triangle {
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    border-color: tomato transparent transparent transparent;
}

```

### 一个自适应矩形，水平垂直居中，且宽高比为 2:1

``` css  
 /*实现原理参考自适应正方形和水平居中方式*/ 
.box {
    position: absolute; top: 0;
    right: 0;
    left: 0;
    bottom: 0; 
    margin: auto;
    width: 10%;
    height: 0; 
    padding-top: 20%; 
    background: tomato;
}
```

### css动画的兼容性

1. 常见的谷歌浏览器和Safari浏览器的前缀为 -webkit-

2. 火狐浏览器（Firefox）的前缀为 -moz-

3. Opera浏览器的前缀为 -o-

4. IE浏览器的前缀为 -ms-
