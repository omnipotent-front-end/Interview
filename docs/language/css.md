# Css

## 应用

### 浮动元素和绝对定位元素的区别和应用?(todo)

### CSS 中解决浮动中高度塌陷的方案有哪些？(todo)

解题思路

可以先概括解决高度塌陷问题的两种类型：clear 属性 和 BFC 法

然后可以介绍两种类型的具体方案：

追加元素并设置 clear 属性

使用 CSS 样式插入伪元素

Bootstrap 的解决高度塌陷方案（BFC）

### 高度塌陷产生的原因是什么？(todo)

### clear 属性清除浮动的原理是什么？(todo)

### 采用 BFC 解决高度塌陷和clear 属性清除浮动相比的优势是什么？(todo)

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

### 了解 Flex 布局么？平常有使用 Flex 进行布局么？(todo)

解题思路

首先得说出 Flex 布局概念，Flex 的结构组成（Flex Container 、Flex Item），遇到的所有面试者都没有此回答

其次可以讲讲自己平常用的最多的 Flex 属性

最后可以讲讲自己平时常用的布局（左右两列，上下两行等）


### flex: 0 1 auto 表示什么意思？(todo)

flex: 0 1 auto 其实就是弹性盒子的默认值，表示 flex-grow, flex-shrink 和 flex-basis 的简写，分别表示放大比例、缩小比例、分配多余空间之前占据的主轴空间。






### grid布局了不了解，简单说下？

display:grid,和flex类似。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是**将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局**。Grid 布局远比 Flex 布局强大。

具体api不介绍了。

参考地址：

[一些需要用心去记住的css面试点](https://github.com/glitchboyl/blog/issues/6)

### 如果使用了flex，grid等新特性，怎么解决浏览器兼容性？

通过postcss，autoprefix，browserslist来在构建的阶段通过分析语法树，自动加到前缀中。

### position有哪些取值？

relative,static,absolute,sticky,fixed,initial,inherit,unset。

### initial、inherit 和 unset是什么意思？

initial 关键字用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式。

inherit 用来控制继承，每一个 CSS 属性都有一个特性就是，这个属性必然是默认继承的 (inherited: Yes) 或者是默认不继承的 (inherited: no)。

unset是关键字 initial 和 inherit 的组合。

什么意思呢？也就是当我们给一个 CSS 属性设置了 unset 的话：

如果该属性是默认继承属性，该值等同于 inherit；
如果该属性是非继承属性，该值等同于 initial

参考：

[谈谈 CSS 关键字 initial、inherit 和 unset - 最骚的就是你 - 博客园](https://www.cnblogs.com/libin-1/p/6734751.html)


### CSS 中选择器有哪些？CSS 选择器优先级是怎么去匹配？(todo)



### 伪元素和伪类有什么区别？(todo)


### CSS 中的 background 的 background-image 属性可以和 background-color 属性一起生效么？(todo)


### background-color 属性可以覆盖 background-image 属性吗？(todo)

### CSS 中哪些属性可以继承？(todo)




### 了解 CSS 3 动画的硬件加速么？在重绘和重流方面有什么需要注意的点？(todo)


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

### CSS 如何实现三列布局，左侧和右侧固定宽度，中间自适应宽度？(todo)

### 如何设计一个 4 列等宽布局，各列之间的边距是 10px（考虑浏览器的兼容性）？(todo)

### Flex 如何实现上下两行，上行高度自适应，下行高度 200px？(todo)

