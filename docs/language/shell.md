# Shell

## 应用

### 如何替换一个文件中的内容？

1、vi/vim编辑

2、sed和grep配合

命令：sed -i s/yyyy/xxxx/g `grep yyyy -rl --include="*.txt" ./`

作用：将当前目录(包括子目录)中所有txt文件中的yyyy字符串替换为xxxx字符串。其中，

-i 表示操作的是文件，``括起来的grep命令，表示将grep命令的的结果作为操作文件。

s/yyyy/xxxx/表示查找yyyy并替换为xxxx，后面跟g表示一行中有多个yyyy的时候，都替换，而不是仅替换第一个

另外，如果不需要查找子目录，仅需要在当前目录替换，用sed命令就行了，命令如下：`sed -i s/xxxx/yyyy/g ./*.txt`

3、find

命令格式：find -name '要查找的文件名' | xargs perl -pi -e 's|被替换的字符串|替换后的字符串|g'

#查找替换当前目录下包含字符串并进行替换
```
find -name '*.txt' | xargs perl -pi -e 's|智慧乡村|北部山区|g'
```
#递归查找替换
```
find . -type f -name '*.html' | xargs perl -pi -e 's|智慧乡村|北部山区|g'

```

### awk有什么用？

相对于grep的查找，sed的编辑，awk在其对数据分析并生成报告时，显得尤为强大。简单来说awk就是把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行各种分析处理。

### 对一个文件如何只查看特定行的内容

cat/more/less/head/tail

cat可以文件整体内容；

more可以指定从第几行开始，已分页的方式展示文件内容；

less比more更加强大，解决了more不能往后翻的问题，且less不会一次性加载所有文件内容；

head用来看一个文件的前多少行；

tail用来看一个文件的最后多少行；


所以这个需求需要多个命令配合：

【一】从第3000行开始，显示1000行。即显示3000~3999行

cat filename | tail -n +3000 | head -n 1000

 

【二】显示1000行到3000行

cat filename| head -n 3000 | tail -n +1000 



### rcp和scp有什么区别？

rcp通过rsh方式远端复制文件或目录。
scp通过ssh方式远端复制文件或目录。scp更加安全，可以理解为rcp的取代品。

