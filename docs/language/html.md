# Html

## 渲染

### 浏览器是如何渲染的？

浏览器采用流式布局模型（Flow Based Layout）

浏览器会把HTML解析成DOM，把CSS解析成CSSOM，**DOM和CSSOM合并就产生了渲染树（Render Tree）**。

有了RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。

由于浏览器使用流式布局，对Render Tree的计算通常只需要遍历一次就可以完成，但table及其内部元素除外，他们可能需要多次计算，通常要花3倍于同等元素的时间，这也是**为什么要避免使用table布局**的原因之一。


### 重排和重绘是什么？

由于**节点的几何属性发生改变或者由于样式发生改变**而**不会影响布局**的，称为**重绘**，例如outline, visibility, color、background-color等，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。

**重排**是布局或者几何属性需要改变。重排是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的重排可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的重排。

**重排必定会发生重绘，重绘不一定会引发重排。**

### 如何避免重排和重绘？

js方面：

现代浏览器做了一定的优化，通过队列机制来批量更新布局，浏览器会把修改操作放在队列中，至少一个帧（即16.6ms）才会清空队列，但当你获取布局信息的时候，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发重排与重绘来确保返回正确的值。

主要包括以下属性或方法：

offsetTop、offsetLeft、offsetWidth、offsetHeight
scrollTop、scrollLeft、scrollWidth、scrollHeight
clientTop、clientLeft、clientWidth、clientHeight

width、height

getComputedStyle()


所以，我们应该**避免频繁的使用上述的属性，他们都会强制渲染刷新队列**。


css方面：

- 使用 transform 替代 top

- 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局

- 避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局。

- 尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。

- 避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。

- 将动画效果应用到position属性为absolute或fixed的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 requestAnimationFrame，详见探讨 requestAnimationFrame。

- 避免使用CSS表达式，可能会引发回流。

- 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如will-change、video、iframe等标签，浏览器会自动将该节点变为图层。

- CSS3 硬件加速（GPU加速），使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。


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

