# Nginx

## 应用

### 遇到过code499没？是什么情况下会触发？

499对应的是 **“client has closed connection”**，客户端请求等待链接已经关闭，这很有可能是因为服务器端处理的时间过长，客户端等得“不耐烦”了。还有一种原因是**两次提交post过快**就会出现499。
解决方法：

- 前端将timeout最大等待时间设置大一些；

- nginx上配置proxy_ignore_client_abort on

