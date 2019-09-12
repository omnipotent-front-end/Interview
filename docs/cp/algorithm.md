# 算法

## 应用

### 各类排序算法介绍，冒泡，快排，堆排，以及相应的算法复杂度？（todo）

### 二分查找的时间复杂度怎么求，是多少（todo）

### 线性顺序存储结构和链式存储结构有什么区别？以及优缺点(todo)

## 原理

### git的diff操作是基于什么算法的（Myers）？简单说下原理。

参考：

git的diff是基于Myers算法，基于查找最短编辑脚本（shortest edit script, SES）的思想。最短编辑脚本查找问题可以被建模成图搜索问题。

以文本a = ABCABBA和文本b = CBABAC来说明。

构建图为：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190819110409.png"/>

在上面的坐标系中，当我们位于原点(0,0)时，表示我们现在有一个字符串a；

当我们向右走，也就是增加x坐标的时候，对应的从a中删除一个字符，比如我们从(0,0) - > (1,0)时，我们从a中删除字符A，这时候我们当前的文本就变成了BCABBA；

而当我们向下走，也就是增加y坐标的时候，对应的从b中插入一个字符，比如我们从(1,0) -> (1,1)的时候，对应的插入b中的字符C，这时候的文本变成了CBCABBA；

在上面的某些位置上面还有斜向下的虚线，比如从(1,1) -> (2,2)，这时候表示a[1]==b[1]，这时候保留该字符，并且同时增加x坐标和y坐标；

而当我们沿某一条路线从(0,0)走到(7,6)，就代表字符串a经过一系列编辑操作之后转换成了字符串b。

我们把上面的向右走记作del操作，向下走记为ins操作，沿虚线走记为mov操作，只有执行del操作和ins操作才会让字符串发生变更。我们可以看到，从(0,0)到(7,6)有很多条路径可达，最多需要7+6次del和ins操作，也就是执行全删全增操作。

myers算法的思想很简单，就是**要找出一条从(0,0)到(7,6)的路径，让这条路径中的del和ins操作尽量的少**，这就要求要尽量执行mov操作，并且当出现分支选择的时候，del操作能够优先于ins操作。



[一种diff算法：Myers ](http://mcll.top/2019/05/23/diff%E7%AE%97%E6%B3%95/)


## 编码

### 实现二叉树的遍历，考虑非递归。

思路：

如果非递归的话利用栈来简化操作
如果数据规模不大的话，建议使用递归
递归的问题需要注意两点，一个是终止条件，一个如何缩小规模

1、终止条件，自然是当前这个元素是 null（链表也是一样）

2、由于二叉树本身就是一个递归结构， 每次处理一个子树其实就是缩小了规模， 难点在于**如何合并结果**，这里的合并结果其实就是`mid.concat(left).concat(right)`, mid 是一个具体的节点，left 和 right递归求出即可。

先序遍历

递归方式

``` js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    // 1. Recursive solution
    if (!root) return [];
    return [root.val].concat(preorderTraversal(root.left)).concat(preorderTraversal(root.right));
};
```

非递归方式

先**将根节点入栈，然后 看有没有右节点，有则入栈，再看有没有左节点，有则入栈。 然后出栈一个元素，重复即可**。

``` js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  if (!root) return [];
  const ret = [];
  const stack = [root];
  let t = stack.pop();
  
  while (t) {
    //先将根节点入栈
    ret.push(t.val);
    //如果有右节点则入栈
    if (t.right) {
      stack.push(t.right);
    }
    //如果有左节点则入栈
    if (t.left) {
      stack.push(t.left);
    }
    //然后出栈，直到栈内没内容为止
    t = stack.pop();
  }

  return ret;
};
```


中序遍历

递归方式

``` js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    //使用递归的方案
    if(!root) return [];
    let left = root.left?inorderTraversal(root.left):[];
    let right = root.right?inorderTraversal(root.right):[];
    return left.concat(root.val).concat(right);
};
```

非递归方式：

如果采用非递归，可以用栈(Stack)的思路来处理问题。
中序遍历的顺序为左-根-右，具体算法为：

从根节点开始，**先将根节点压入栈**

然后再将其**所有左子结点压入栈**，取出栈顶节点，保存节点值

再将**当前指针移到其右子节点上，若存在右子节点，则在下次循环时又可将其所有左子结点压入栈中**， 重复上步骤


``` js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    //使用递归的方案
    // if(!root) return [];
    // let left = root.left?inorderTraversal(root.left):[];
    // let right = root.right?inorderTraversal(root.right):[];
    // return left.concat(root.val).concat(right);
    //使用栈的方案
    if (!root) return [];
    const stack = [root];
    const ret = [];
    let left = root.left;

    let item = null; // stack 中弹出的当前项
    //先将左节点全部压入栈
    while(left) {
        stack.push(left);
        left = left.left;
    }
    //首先处理所有加入栈的左节点们
    while(item = stack.pop()) {
        //取出栈内值
        ret.push(item.val);
        let t = item.right;
        //如果存在右节点，压入栈，并将其所有的左节点压入栈
        while(t) {
            stack.push(t);
            t = t.left;     
        }
    }

    return ret;
};
```

后序遍历

递归方式

``` js
 /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    if(!root) return [];
    let left = root.left?postorderTraversal(root.left):[];
    let right = root.right?postorderTraversal(root.right):[];
    return left.concat(right).concat(root.val)
};
```

非递归方案

如果采用非递归，可以用栈(Stack)的思路来处理问题。
相比于前序遍历，后续遍历思维上难度要大些，**前序遍历是通过一个stack，首先压入父亲结点，然后弹出父亲结点，并输出它的value，之后压人其右儿子，左儿子**即可。

然而后序遍历结点的访问顺序是：左儿子 -> 右儿子 -> 自己。那么**一个结点需要两种情况下才能够输出： 第一，它已经是叶子结点； 第二，它不是叶子结点，但是它的儿子已经输出过**。

那么基于此我们只需要**记录一下当前输出的结点**即可。对于一个新的结点，**如果它不是叶子结点，儿子也没有访问，那么就需要将它的右儿子，左儿子压入**。 如果它**满足输出条件，则输出它，并记录下当前输出结点**。输出在stack为空时结束。

``` js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  //使用栈的方案
  if (!root) return [];
  const ret = [];
  const stack = [root];
  let p = root; // 标识元素，用来判断节点是否应该出栈

  while (stack.length > 0) {
    //对栈尾元素进行判断
    const top = stack[stack.length - 1];
    if (
      top.left === p ||
      top.right === p || // 子节点已经遍历过了
      (top.left === null && top.right === null) // 叶子元素
    ) {
      //满足条件则出栈，并存入结果列表
      p = stack.pop();
      ret.push(p.val);
    } else {
      //否则将其右节点和左节点依次入栈
      if (top.right) {
        stack.push(top.right);
      }
      if (top.left) {
        stack.push(top.left);
      }
    }
  }

  return ret;
};
```

### 如何判断是不是完全二叉树？（todo）


### 判断一个链表是否有环（todo）


### 将一个嵌套的数组用深度遍历和广度遍历分别写出来(todo)

