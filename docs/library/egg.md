# Egg

## 使用

### Egg-cluster和pm2有什么区别？

egg的cluster相比pm2，代码有所简化，**在传统的Master-worker的基础上，增加了agent**。变为Master-agetn-worker。

在大部分情况下，我们在写业务代码的时候完全不用考虑 Agent 进程的存在，但是当我们遇到一些场景，只想让代码运行在一个进程上的时候，Agent 进程就到了发挥作用的时候了。

由于 Agent 只有一个，而且会负责许多维持连接的脏活累活，因此它不能轻易挂掉和重启，所以 Agent 进程在监听到未捕获异常时不会退出，但是会打印出错误日志，我们需要对日志中的未捕获异常提高警惕。



参考：

[Egg.js 进程管理为什么没有选型 PM2 ？ - 知乎](https://www.zhihu.com/question/298718190/answer/511704261?from=singlemessage&isappinstalled=0&utm_medium=social&utm_oi=41809770184704&utm_source=wechat_session&s_r=0)

[nest如何实现多进程间通信和egg类似的agent机制 - CNode技术社区](https://cnodejs.org/topic/5b60495e58db3ccf66a450c6)