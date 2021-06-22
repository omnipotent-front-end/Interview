# 算法

## 应用


### 什么叫排序的稳定性？

排序算法的稳定性大家应该都知道，通俗地讲就是能保证排序前2个相等的数其在序列的前后位置顺序和排序后它们两个的前后位置顺序相同。



### 各类排序算法介绍，冒泡，快排，堆排，以及相应的算法复杂度？

首先了解[冒泡排序](/cp/algorithm.html#%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)，[选择排序](/cp/algorithm.html#%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F)，[插入排序](/cp/algorithm.html#%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F)，[希尔排序](/cp/algorithm.html#%E5%B8%8C%E5%B0%94%E6%8E%92%E5%BA%8F)，[归并排序](/cp/algorithm.html#%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F)，[快速排序](/cp/algorithm.html#%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)，[堆排序](/cp/algorithm.html#%E5%A0%86%E6%8E%92%E5%BA%8F)。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20201126095106.png"/>


### 系统自带排序实现
  
每个语言的排序内部实现都是不同的。

对于 JS 来说，数组长度大于 10 会采用快排，否则使用插入排序。

选择插入排序是因为虽然时间复杂度很差，但是在数据 量很小的情况下和 O(N * logN) 相 差无几，然而插入排序需要的常数时间很小，所以相对别的排序来说更快。



### 快速排序相当于其他排序，效率高的原因？

首先了解[各类排序算法介绍，冒泡，快排，堆排，以及相应的算法复杂度？](/cp/algorithm.html#%E5%90%84%E7%B1%BB%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E4%BB%8B%E7%BB%8D%EF%BC%8C%E5%86%92%E6%B3%A1%EF%BC%8C%E5%BF%AB%E6%8E%92%EF%BC%8C%E5%A0%86%E6%8E%92%EF%BC%8C%E4%BB%A5%E5%8F%8A%E7%9B%B8%E5%BA%94%E7%9A%84%E7%AE%97%E6%B3%95%E5%A4%8D%E6%9D%82%E5%BA%A6%EF%BC%9F)

在实际使用中，应用最广泛的是快速排序。快 速排序相对于其他排序算法的优势在于在相同 数据量的情况下，它的运算效率最高，并且它额外所需空间最小。

我们首先从时间复杂度来判断，由于前面几种方法的时间复杂度平均情况下基本 趋向于 O(n^2)，因此只从时间复杂度上来看 的话，显然归并排序、堆排序和快 速排序的时间复杂度最小。但是既然这几种方法的时间复杂度基本一致，并且快 速排序在最 坏情况下时间的复杂度还会变为 O(n^2)，那么为什么它的效率反而 更高呢?

首先在对大数据量排序的时候，由于归并排序的空间复杂度为 O(n)，因此归并 排序在这种情况下会需要过多的额外内存，因 此归并排序首先就被排除掉了。

接下来就剩下了堆排序和快速排序的比较。我认为堆排序相对于快速排序的效率 不高的原因有两个方面。

第一个方面是对于比较操作的有效性来说。对于快速排序来说，每一次元素的比 较都会确定该元素在数组中的位置，也就是在 枢纽值的左边或者右边，快速排 序的每一次比较操作都是有意义的结果。而对于堆排序来说，在每一次重新调整 堆的时候，我 们在迭代时，已经知道上层的节点值一定比下层的节点值大，因 此当我们每次为了打乱堆结构而将最后一个元素与堆顶元素互 换时，互换后的 元素一定是比下层元素小的，因此我们知道比较结果却还要在堆结构调整时去进 行再一次的比较，这样的比较 是没有意义的，以此在堆排序中会产生大量的没 有意义的比较操作。

第二个方面是对于缓存局部性原理的利用上来考虑的，我认为这应该是造成堆排 序的效率不如快速排序的主要原因。在计算机 中利用了多级缓存的机制，来解决 cpu 计算速度与存储器数据读取速度间差距过大的问题。缓存的原理主要是基于局部性原 理，局部性原理简单来说就是，当前被访问过的数据，很有可能 在一段时间内被再次访问，这被称为时间局部性。还有就是当 前访问的数据， 那么它相邻的数据，也有可能在一段时间内被访问到，这被称为空间局部性。计 算机缓存利用了局部性的原理 来对数据进行缓存，来尽可能少的减少磁盘的I/O 次数，以此来提高执行效率。对于堆排序来说，它最大的问题就是它对于 空 间局部性的违背，它在进行比较时，比较的并不是相邻的元素，而是与自己相隔 很远的元素，这对于利用空间局部性来进行 数据缓存的计算机来说，它的很多 缓存都是无效的。并且对于大数据量的排序来说，缓存的命中率就会变得很低，因此会明显 提高磁盘的 I/O 次数，并且由于堆排序的大量的无效比较，因此这样就造成了堆排序执行效率的低下。而相对来快速排序来 说，它的排序每一次 都是在相邻范围内的比较，并且比较的范围越来越小，它很好的利用了局部性原 理，因此它的执行效率更 高。简单来说就是在堆排序中获取一个元素的值所花 费的时间比在快速排序获取一个元素的值所花费的时间要大。因此我们可 以看 出，时间复杂度类似的算法，在计算机中实际执行可能会有很大的差别，因为决 定算法执行效率的还有内存读取这样的其 他的因素。

参考：

[为什么说快速排序是性能最好的排序算法？_chenmeiqi的博客-CSDN博客_最快的排序算法](https://blog.csdn.net/qq_36770641/article/details/82669788)


[数学之美番外篇：快排为什么那样快_刘未鹏|C++的罗浮宫-CSDN博客](https://blog.csdn.net/pongba/article/details/2544933)




### 二分查找的时间复杂度怎么求，是多少（todo）


### 线性顺序存储结构和链式存储结构有什么区别？以及优缺点(todo)


### 对大文件中的数据进行排序？

对于数据量不大的情况，将文件中的内容读取出来，并且通过逗号分割成一个
一个的数字，放到内存数组中，然后编写某种排序算法(比如快排)，或者直接使用编程语
言提供的排序函数，对数组进行排序，最后再将数组中的数据写入文件就可以了。

如果文件大过内存，内存有限，我们没办法一次性加载文件中的所有数据到内存中，这个时候，我们就要利用外部排序算法。外排序通常采用的是一种“排序-归并”的策略。在排序阶段，先读入能放在内存中的数据量，将其排序输出到一个临时文件，依此进行，将待排序数据组织为多个有序的临时文件。而后在归并阶段将这些临时文件组合为一个大的有序文件，也即排序结果。

如果文件更大，需要等待时间过长，我们为了利用 CPU 多核的优势，可以在外部排序的基础之上进行优化，加入多线程并发排序的功能，这就有点类似“单机版”的MapReduce。

如果更大，即便是单机多线程排序，这也算很慢了。这个时候， 我们可以使用真正的 MapReduce 框架，利用多机的处理能力，提高排序的效率。



### 用两个栈来实现一个队列，完成队列的 Push 和 Pop 操作。

队列的一个基本特点是，元素先进先出。

通过两个栈来模拟时，首先我们将两个栈分为栈 1 和 栈 2。

当执行队列的 push 操作时，直接将元素 push 进栈 1 中。

当队列执行 pop 操作时，首先判断栈 2 是否为空，如果不为空则直接 pop 元素。

如果栈 2 为空，则将栈 1 中的所有元素 pop 然后 push 到栈 2 中，然后再执行栈 2 的 pop 操作。


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


### 冒泡排序

冒泡排序的基本思想是，对相邻的元素进行两两比较，顺序相反则进行交换，这样，每一趟会将最小或最大的元素“浮”到顶端， 最终达到完全有序。

![](https://camo.githubusercontent.com/34e1e2a85f90e3d7c005ada9e1c7a5f57a7eb9a4d519fb369b276a0dd7f5aec9/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f632f63382f427562626c652d736f72742d6578616d706c652d33303070782e676966)

实现：

``` js
function bubbleSort(arr) {
    var len = arr.length;
    // 先确保最后一位是正确的，每塞一个，就占位一个，然后准备塞倒数第二位
    for (let outer = len ; outer >= 2; outer--) {
        // 从第一个开始一个个比较
        for(let inner = 0; inner <=outer - 1; inner++) {
            // 一个个比较，把最小的放到后面一位
            if(arr[inner] > arr[inner + 1]) {
                [arr[inner],arr[inner+1]] = [arr[inner+1],arr[inner]]
            }
        }
    }
    return arr;
}

```

当排序序列为已排序序列时，为最好的时间复杂度为 O(n)。 冒泡排序的平均时间复杂度为 O(n^2) ，最坏时间复杂度为 O(n^2) ，空间复杂度
为 O(1) ，是稳定排序。


参考：

[javascript-algorithms/src/algorithms/sorting/bubble-sort at master · trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/bubble-sort)

[前端笔试&面试爬坑系列---算法](https://juejin.cn/post/6844903656865677326)



### 选择排序

 
选择排序的基本思想为每一趟从待排序的数据元素中选择最小(或最大)的一个 元素作为首元素，直到所有元素排完为止。

![](https://camo.githubusercontent.com/fe834a61b6e60d9e46d124f8c5b90e73f7b44db1442371932aa069257654493a/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f392f39342f53656c656374696f6e2d536f72742d416e696d6174696f6e2e676966)

实现很简单： 外层循环从0开始到length-1， 然后内层比较，最小的放开头

``` js
function selectSort(arr) {
    var len = arr.length;
    //先把第一个选中
    for(let i = 0 ;i < len - 1; i++) {
        // 让他和其他的依次比较，小就直接换位
        for(let j = i ; j<len; j++) {
            if(arr[j] < arr[i]) {
                [arr[i],arr[j]] = [arr[j],arr[i]];
            }
        }
    }
    return arr
}

```

 选择排序的平均时间复杂度为 O(n^2) ，最好时间复杂度为 O(n^2)，最坏时间复杂度为 O(n^2) ，空间复杂度为 O(1) ，是不稳定排序。

 举个例子，序列5 8 5 2 9，我们知道第一遍选择第1个元素5会和2交换，那么原序列中2个5的相对前后顺序就被破坏了，所以选择排序不是一个稳定的排序算法。

 参考：

 [javascript-algorithms/src/algorithms/sorting/selection-sort at master · trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/selection-sort)

 [前端笔试&面试爬坑系列---算法](https://juejin.cn/post/6844903656865677326)

 ### 插入排序


直接插入排序基本思想是每一步将一个待排序的记录，插入到前面已经排好序的 有序序列中去，直到插完所有元素为止。

插入排序核心--扑克牌思想: 就想着自己在打扑克牌，接起来一张，放哪里无 所谓，再接起来一张，比第一张小，放左边， 继续接，可能是中间数，就插在 中间....依次.

![](https://camo.githubusercontent.com/ac772dfad98df54c1658e98dcfeb11f76aa7e7f027558554067c9eeef219d852/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f302f30662f496e73657274696f6e2d736f72742d6578616d706c652d33303070782e676966)



``` js
function insertSort(arr) {
    //外循环从1开始，默认arr[0]是有序段
    for(let i = 1; i < arr.length; i++) {  
        //j = i,将arr[j]依次插入有序段中
        for(let j = i; j > 0; j--) {  
            if(arr[j] < arr[j-1]) {
                [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
            }
        }
    }
    return arr;
}
```

当排序序列为已排序序列时，为最好的时间复杂度 O(n)。 插入排序的平均时间复杂度为 O(n^2) ，最坏时间复杂度为 O(n^2) ，空间复杂度为 O(1) ，是稳定排序。



参考：

[javascript-algorithms/src/algorithms/sorting/insertion-sort at master · trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/insertion-sort)

[前端笔试&面试爬坑系列---算法](https://juejin.cn/post/6844903656865677326)


### 希尔排序

希尔排序的基本思想是把数组按下标的一定增量分组，对每组使用直接插入排序 算法排序;随着增量逐渐减少，每组包含的元 素越来越多，当增量减至 1 时， 整个数组恰被分成一组，算法便终止。

![](https://camo.githubusercontent.com/a8b5da7d73d0e30f76846af1af6f4236426ab59b0f6433930198fabbb08b4285/68747470733a2f2f7777772e7475746f7269616c73706f696e742e636f6d2f646174615f737472756374757265735f616c676f726974686d732f696d616765732f7368656c6c5f736f72745f6761705f342e6a7067)

![](https://camo.githubusercontent.com/4d2bd8ce55a62a72d56f696900eb37d90a79941097d2a03a5baeadaba105db31/68747470733a2f2f7777772e7475746f7269616c73706f696e742e636f6d2f646174615f737472756374757265735f616c676f726974686d732f696d616765732f7368656c6c5f736f72745f6761705f322e6a7067)

实现：

``` js
function shellSort(arr,gap) {
    console.log(arr)//为了方便观察过程，使用时去除
    for(let i = 0; i<gap.length; i++) {  //最外层循环，一次取不同的步长，步长需要预先给出
        let n = gap[i]; //步长为n
        for(let j = i + n; j < arr.length; j++) { //接下类和插入排序一样，j循环依次取后面的数
            for(let k = j; k > 0; k-=n) { //k循环进行比较，和直接插入的唯一区别是1变为了n
                if(arr[k] < arr[k-n]) {
                    [arr[k],arr[k-n]] = [arr[k-n],arr[k]];
                    console.log(`当前序列为[${arr}] \n 交换了${arr[k]}和${arr[k-n]}`)//为了观察过程
                } else {
                    continue;
                }
            }
        }
    }
    return arr;
}

```

希尔排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n^s) ，空间复 杂度为 O(1) ，不是稳定排序。


参考：

[javascript-algorithms/src/algorithms/sorting/shell-sort at master · trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/shell-sort)

[前端笔试&面试爬坑系列---算法](https://juejin.cn/post/6844903656865677326#heading-8)


### 归并排序

归并排序是利用归并的思想实现的排序方法，该算法采用经典的分治策略。递归的将数组两两分开直到只包含一个元素，然后将数组排序合并，最终合并为排序好的数组。

![](https://camo.githubusercontent.com/1d3f6508e07151f337fddc8e0e25b3f53fb1abd4cb3cebca16d8333544fc3d99/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f632f63632f4d657267652d736f72742d6578616d706c652d33303070782e676966)


``` js
function merge(leftArr, rightArr){  
    var result = [];  
    while (leftArr.length > 0 && rightArr.length > 0){  
      if (leftArr[0] < rightArr[0])  
        result.push(leftArr.shift()); //把最小的最先取出，放到结果集中   
      else   
        result.push(rightArr.shift());  
    }   
    return result.concat(leftArr).concat(rightArr);  //剩下的就是合并，这样就排好序了  
}  

function mergeSort(array){  
    if (array.length == 1) return array;  
    var middle = Math.floor(array.length / 2);       //求出中点  
    var left = array.slice(0, middle);               //分割数组  
    var right = array.slice(middle);  
    return merge(mergeSort(left), mergeSort(right)); //递归合并与排序  
}  

var arr = mergeSort([32,12,56,78,76,45,36]);
console.log(arr);   // [12, 32, 36, 45, 56, 76, 78]
```


归并排序将整个排序序列看成一个二叉树进行分解，首先将树分解到每一个子节 点，树的每一层都是一个归并排序的过程，每 一层归并的时间复杂度为 O(n)，
因为整个树的高度为 lgn，所以归并排序的时间复杂度不管在什么情况下都为 O(nlogn)。

归并排序的空间复杂度取决于递归的深度和用于归并时的临时数组，所以递归的深度为 logn，临时数组的大小为 n，所以归 并排序的空间复杂度为 O(n)。

归并排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(nlogn) ，空间 复杂度为 O(n) ，是稳定排序。

参考：

[javascript-algorithms/src/algorithms/sorting/merge-sort at master · trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/merge-sort)

[归并排序_brizer的博客-CSDN博客](https://blog.csdn.net/mevicky/article/details/46127553?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160628864919725225021262%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=160628864919725225021262&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v2~rank_blog_default-1-46127553.pc_v2_rank_blog_default&utm_term=%E5%BD%92%E5%B9%B6&spm=1018.2118.3001.4450)


### 快速排序

快速排序的基本思想是通过一趟排序将要排序的数据分割成独立的两部分，其中 一部分的所有数据都比另外一部分的所有数据 都要小，然后再按此方法对这两 部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变 成有序序列。

![](https://camo.githubusercontent.com/9d156a36ab19a3ae2dfbabc70daaaa074fddfaac233f6d0bfce45b8d07ad5289/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f362f36612f536f7274696e675f717569636b736f72745f616e696d2e676966)


``` js
function quickSort(arr) {
    if(arr.length <= 1) {
        return arr;  //递归出口
    }
    var left = [],
        right = [],
        current = arr.splice(0,1); //注意splice后，数组长度少了一个
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < current) {
            left.push(arr[i])  //放在左边
        } else {
            right.push(arr[i]) //放在右边
        }
    }
    return quickSort(left).concat(current,quickSort(right)); //递归
}

```

快速排序的空间复杂度取决于递归的深度，所以最好的时候为 O(logn)，最坏的时候为 O(n)。

快速排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n^2) ，空间复杂度为 O(logn) ，不是稳定排序。



参考：

[javascript-algorithms/src/algorithms/sorting/quick-sort at master · trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/quick-sort)

[前端笔试&面试爬坑系列---算法](https://juejin.cn/post/6844903656865677326#heading-8)


### 堆排序

堆排序的基本思想是:将待排序序列构造成一个大顶堆，此时，整个序列的最大 值就是堆顶的根节点。将其与末尾元素进行 交换，此时末尾就为最大值。然后将剩余 n-1 个元素重新构造成一个堆，这样会得到 n 个元素的次小值。如此反 复执行， 便能得到一个有序序列了。

![](https://camo.githubusercontent.com/c8ee4c2d4b28615947bfde32ff810c8b81a151b91da1e44f917b426e3991315b/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f342f34642f48656170736f72742d6578616d706c652e676966)

``` js
// 创建堆，其实是对data数组做一个结构调整，使其具有堆的特性
function buildHeap(data) {
    var len = data.length;
    for(var i=Math.floor(len/2); i>=0; i--) {
        heapAjust(data, i, len);
    }
}
// 堆调整函数，即调整当前data为大根堆
function heapAjust(data, i, len) {
    var child = 2*i + 1;
    // 如果有孩子结点，默认情况是左孩子
    while(child <= len) {
        var temp = data[i];
        // 如果右孩子存在且其值大于左孩子的值，则将child指向右孩子
        if(child + 1 <= len && data[child] < data[child + 1]) {
            child = child + 1;
        }
        // 如果当前结点的值小于其孩子结点的值，则交换，直至循环结束
        if(data[i] < data[child]) {
            data[i] = data[child];
            data[child] = temp;
            i = child;
            child = 2*i + 1
        }else {
            break
        }
    }
}
// 排序
function heapSort(data) {
    var data = data.slice(0);
    if(!(data instanceof Array)) {
        return null;
    }
    if(data instanceof Array && data.length == 1) {
        return data;
    }
    // 将data数组改造为“堆”的结构
    buildHeap(data);

    var len = data.length;
    // 下面需要注意的时候参数的边界，参考文档里面程序中i的值是不对的
    for(var i=len-1; i>=0; i--) {
        swap(data, i, 0);
        heapAjust(data, 0, i-1);
    }
    return data;
}
const arr = [62, 88, 58, 47, 35, 73, 51, 99, 37, 93];
var newArr = heapSort(arr);
console.log(newArr);  // [35, 37, 47, 51, 58, 62, 73, 88, 93, 99]


```

建立堆的时间复杂度为 O(n)，排序循环的次数为 n-1，每次调整堆的时间复杂 度为 O(logn)，因此堆排序的时间复杂度在 不管什么情况下都是 O(nlogn)。

堆排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(nlogn) ，空间复 杂度为 O(1) ，不是稳定排序。




参考：

[javascript-algorithms/src/algorithms/sorting/heap-sort at master · trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/heap-sort)

[堆排序_brizer的博客-CSDN博客](https://blog.csdn.net/mevicky/article/details/46127541?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160629155819724836717735%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=160629155819724836717735&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v2~rank_blog_default-1-46127541.pc_v2_rank_blog_default&utm_term=%E5%A0%86%E6%8E%92%E5%BA%8F&spm=1018.2118.3001.4450)


[搞定JavaScript算法系列--堆排序](https://juejin.cn/post/6844903830258188296)



### 求解平方根（二分查找）（todo）





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


### 实现一个二叉搜索树转链表的方法（todo）




### 判断一个链表是否有环（todo）




### 反转单向链表

需要将一个单向链表反转。思路很简单，使用三个变量分别表示当前节点和当前 节点的前后节点，虽然这题很简单，但是却是 一道面试常考题。

思路是从头节点往后遍历，先获取下一个节点，然后将当前节点的 next 设置为 前一个节点，然后再继续循环。

方法一：遍历

先遍历到尾部

在遍历过程中让节点新增属性 pre 使单向链表变成双向链表

遍历到尾部时开始指向反转并删除节点的 pre 属性

边界条件：


在头部时，节点的 pre 属性为 null

到尾部时，节点的 next 属性为 null

``` js
function reverseList(head) {
    // 链表只有一个元素时
    if( head.next === null ) return head;
    // 否则
    let current = head.next,
        preNode = head;
    // 链表反向后原来的头就变成尾了
    preNode.pre = null; // 相当于 head.pre = null;
    while( current.next ){
        current.pre = preNode;  // 建立反向联系
        // 指针后移
        preNode = current;
        current = current.next;
    }
    current.pre = preNode;  // 建立最后一个元素和倒数第二个元素的联系

    // 至此，一个双向链表已经完成了
    // 然后就要开始往前遍历了
    while( current.pre ){
        // 指向反向
        current.next = current.pre;
        // 使"先指针"和"后指针"都指向当前对象
        preNode = current;
        // "先指针"前移
        current = current.pre;
        // 将初始从前向后遍历时新增的属性删掉
        delete preNode.pre;
    }
    // 修正原链表第一个元素的指向
    current.next = current.pre;
    delete current.pre;
}
```



方法二：递归

每次只对一个元素进行操作，如果当前元素的后一项不为空，则递归调用本函数，传入的值为当前元素的后一项

在每次递归形成的作用域中使后面的元素指向当前元素，当前元素指向空


边界条件：

当传入参数的属性 next 为 null时，说明这个元素是链表的最后一个元素

``` js
function reverseList(node) {  // 传入链表的头结点
    if( node.next === null ) {
        /*
        * 能走到这里的有只有两种情况：
        *   1.链表只有一个元素
        *   2.链表不止一个元素同时已经遍历到链表的最后一个元素了
        * */
        return node;
    } else{
        const nextNode = reverseList(node.next);
        nextNode.next = node;
        node.next = null;   // 如果不是原链表的第一个元素，则会在上一次递归的作用域中被修改
        return node;
    }
}
```


参考：

[leetcode206：反转链表 · Issue #14 · sisterAn/JavaScript-Algorithms](https://github.com/sisterAn/JavaScript-Algorithms/issues/14)




### 将一个嵌套的数组用深度遍历和广度遍历分别写出来(todo)



### 斐波那契数列（todo）

### 合并两个有序数组（todo）


### 动态规划

爬楼梯问题

有一座高度是 10 级台阶的楼梯，从下往上走，每跨一步只能向上 1 级或者 2 级 台阶。要求用程序来求出一共有多少种走法?
 
递归方法分析

由分析可知，假设我们只差最后一步就能走上第 10 级阶梯，这个时候一共有两种情况，因为每一步只允许走 1 级或 2 级阶梯， 因此分别为从 8 级阶梯和从 9
九级阶梯走上去的情况。

因此从 0 到 10 级阶梯的走法数量就等于从 0 到 9 级阶梯的走法数量加上 从 0 到 8 级阶梯的走法数量。

依次类推，我们可以得到一个递归关系，递归结束的标志为从 0 到 1 级阶梯的走法数量和从 0 到 2 级阶梯的 走法数量。

代码实现：

``` js
function getClimbingWays(n) {
  if (n < 1) {
    return 0;
  }
    if (n === 1) {
      return 1;
  }
  if (n === 2) {
    return 2;
  }
  return getClimbingWays(n - 1) + getClimbingWays(n - 2);
}
```

使用这种方法时整个的递归过程是一个二叉树的结构，因此该方法的时间复杂度 可以近似的看为 O(2^n)，空间复杂度 为递归的深度 O(logn)。
 
备忘录方法

分析递归的方法我们可以发现，其实有很多的计算过程其实是重复的，因此我们 可以使用一个数组，将已经计算出的值给 保存下来，每次计算时，先判断计算 结果是否已经存在，如果已经存在就直接使用。

``` js
let map = new Map(); 
function getClimbingWays(n) {
  if (n < 1) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  if (map.has(n)) {
    return map.get(n);
  } else {
    let value = getClimbingWays(n - 1) + getClimbingWays(n - 2); 
    map.set(n, value);
    return value;
  }
}

```

通过这种方式，我们将算法的时间复杂度降低为 O(n)，但是增加空间复杂度为 O(n)。

迭代法

通过观察，我们可以发现每一个值其实都等于它的前面两个值的和，因此我们可 以使用自底向上的方式来实现。

``` js
function getClimbingWays(n) {
  if (n < 1) {
    return 0;
  }
  if (n === 1) {
      return 1;
  }
  if (n === 2) {
    return 2; 
  }
  let a = 1, b = 2, temp = 0;
  for (let i = 3; i <= n; i++) { 
    temp = a + b;
    a = b;
    b = temp;
  }
  return temp;
}
```

通过这种方式我们可以将算法的时间复杂度降低为 O(n)，并且将算法的空间复 杂度降低为 O(1)。

参考：

[漫画：什么是动态规划？（整合版）](https://mp.weixin.qq.com/s?__biz=MzI1MTIzMzI2MA==&mid=2650561168&idx=1&sn=9d1c6f7ba6d651c75399c4aa5254a7d8&chksm=f1feec13c6896505f7886d9455278ad39749d377a63908c59c1fdceb11241e577ff6d66931e4&scene=21)

