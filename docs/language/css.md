# Css

## 布局

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


