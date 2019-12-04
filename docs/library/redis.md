# Redis

## 应用

### redis如何做持久化？（todo）

持久化有两种方案，具体忘了叫啥了。一种是隔一段时间备份数据，另一种是备份命令，按照命令备份数据。回来一查是 RDB 和 AOF

### 如何实现一个分布式锁？（todo）

set key value EX 60 NX

### 有没有用过LUA（todo）
并没有，但不能说没有啊。于是说我看过一个关于 rate limit 的库的源码，里边的 redis 就是用的 lua 脚本



## 原理