# Shell

## 应用

### 如何替换一个文件中的内容？（todo）

sed;那还有没有其它命令;cut

### awk有什么用？（todo）

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

