# git


## git应用

### git和svn的区别在哪里

git 和 svn 最大的区别在于 git 是分布式的，而 svn 是集中式的。因此我们不能再离线的 情况下使用 svn。如果服务器
出现问题，我们就没有办法使用 svn 来提交我们的代码。

svn 中的分支是整个版本库的复制的一份完整目录，而 git 的分支是指针指向某次提交，因此 git 的分支创建更加开销更小
并且分支上的变化不会影响到其他人。svn 的分支变化会影响到所有的人。

svn 的指令相对于 git 来说要简单一些，比 git 更容易上手。
  
参考：

[对比Git 与 SVN，这篇讲的很易懂](https://juejin.cn/post/6844903702374023182)




### git fetch和git pull的区别

git pull：相当于是从远程获取最新版本并merge到本地

git fetch：相当于是从远程获取最新版本到本地，不会自动merge

### git merge和git rebase的区别

git merge 和 git rebase 都是用于分支合并，关键在 commit 记录的处理上不同。

git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。

git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之 后的所有 commit 记录，然后将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。

[参考](https://zhuanlan.zhihu.com/p/75499871)