# Css

## 应用

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

