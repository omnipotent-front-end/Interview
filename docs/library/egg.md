# Egg

## 使用

### Egg-cluster和pm2有什么区别？

egg的cluster相比pm2，代码有所简化，**在传统的Master-worker的基础上，增加了agent**。变为Master-agetn-worker。

在大部分情况下，我们在写业务代码的时候完全不用考虑 Agent 进程的存在，但是**当我们遇到一些场景，只想让代码运行在一个进程上的时候，Agent 进程就到了发挥作用的时候**了。

由于 Agent 只有一个，而且会负责许多维持连接的脏活累活，因此它不能轻易挂掉和重启，所以 Agent 进程在监听到未捕获异常时不会退出，但是会打印出错误日志，我们需要对日志中的未捕获异常提高警惕。

``` bash
                +--------+          +-------+
                | Master +<-------->+ Agent |
                +---+----+          +-------+
                v   ^    v
               /    |     \
             /      |       \
           /        |         \
         ^          v          ^
+--------+-+   +----+-----+   ++---------+
| Worker 1 |   | Worker 2 |   | Worker 3 |
+----------+   +----------+   +----------+

```


参考：

[Egg.js 进程管理为什么没有选型 PM2 ？ - 知乎](https://www.zhihu.com/question/298718190/answer/511704261?from=singlemessage&isappinstalled=0&utm_medium=social&utm_oi=41809770184704&utm_source=wechat_session&s_r=0)

[nest如何实现多进程间通信和egg类似的agent机制 - CNode技术社区](https://cnodejs.org/topic/5b60495e58db3ccf66a450c6)

### Agent的使用场景有哪些？

有些工作其实不需要每个 Worker 都去做，如果都做，一来是浪费资源，更重要的是可能会**导致多进程间资源访问冲突**。举个例子：生产环境的日志文件我们一般会按照日期进行归档，在单进程模型下这再简单不过了：

- 每天凌晨 0 点，将当前日志文件按照日期进行重命名
- 销毁以前的文件句柄，并创建新的日志文件继续写入

试想如果现在是 4 个进程来做同样的事情，是不是就乱套了。所以，对于这一类后台运行的逻辑，我们希望将它们放到一个单独的进程上去执行，这个进程就叫 Agent Worker，简称 Agent。Agent 好比是 Master 给其他 Worker 请的一个『秘书』，它不对外提供服务，只给 App Worker 打工，专门处理一些公共事务。

---

## 原理

### 有没有系统看过egg相关源码？大致是怎样工作的？

通过loader，在不同的文件夹下找到对象，mixin到ctx原型上。命令行工具common-bin思路也是如此。

- [egg相关生态源码分析](https://github.com/FunnyLiu/egg/tree/readsource)

核心依赖项
- [koa源码分析](https://github.com/FunnyLiu/koa/tree/readsource) - egg的ctx，app等均继承自koa，所以koa源码是基本。
- [egg-core源码分析](https://github.com/FunnyLiu/egg-core/tree/readsource) - 核心的loader和controller，service，app，等均在此封装
- [egg-bin源码分析](https://github.com/FunnyLiu/egg-bin/tree/readsource) - 提供一些cli命令，继承自common-bin模块。封装了dev、test等cli命令。
- [egg-script源码分析](https://github.com/FunnyLiu/egg-scripts/tree/readsource) - 提供start/stop命令。继承自common-bin模块。
- [common-bin源码分析](https://github.com/FunnyLiu/common-bin/tree/readsource) - cli基本类，通过load文件夹内容的规约方式来注册命令。
- [egg-cluster源码分析](https://github.com/FunnyLiu/egg-cluster/tree/readsource) - egg多进程模型启动，具体实现。提供startCluster方法供egg-bin dev和egg-scripts start使用。

内部集成插件依赖

- [egg-logger源码分析](https://github.com/FunnyLiu/egg-logger/tree/readsource) - 分级日志logger和transform在此封装。
- [egg-onerror源码分析](https://github.com/FunnyLiu/egg-onerror/tree/readsource) - 内置的异常处理插件，基于koa-onerror，拦截异常上报和错误页渲染模板。
- [egg-session源码分析](https://github.com/FunnyLiu/egg-session/tree/readsource) - 将koa-session作为中间件挂载，并提供了sessionStore，方便自定义存取器，供给config.session.store。
- [egg-watcher源码分析](https://github.com/FunnyLiu/egg-watcher/tree/readsource) - 底层基于ws模块负责文件监听，这里进行了配置和默认eventSource的封装。库本身是继承自sdk-base。 文件监听后对外抛出事件。
- [egg-multipart源码分析](https://github.com/FunnyLiu/egg-multipart/tree/readsource) - 基于co-busboy模块，解析multipart，挂载ctx.request.files和ctx.request.body。
- [egg-security源码分析](https://github.com/FunnyLiu/egg-security/tree/readsource) - 提供一系列转义的helper方法，和一系列安全的中间件，加上各种响应头。
- [egg-development源码分析](https://github.com/FunnyLiu/egg-development/tree/readsource) - __loader_trace__显示追踪调用数据，agent基于egg-watcher模块挂载的ctx.watcher开启文件监听，通过process.send给master进程发消息。app简单的增加中间件。