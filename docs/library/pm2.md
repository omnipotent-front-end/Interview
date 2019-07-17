# PM2

## 应用

### PM2的fork模式和cluster模式的有什么区别？

fork模式使用最基本的进程运行方式，只是**单实例运行server**，无法实现TCP连接共享；好处是可以修改exec_interpreter，使用pm2运行js之外的语言，例如php或者python

``` bash
pm2 --interpreter [bash|python|...]
```

cluster模式是基于Node的Cluster模块实现，**只能用于启动node进程**，无法应用于其他语言。可以**启动多个server实例，并在各个实例之间实现负载均衡而且共享TCP连接，可以提升服务器的响应性能**。



