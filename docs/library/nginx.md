# Nginx

## 应用

### 遇到过code499没？是什么情况下会触发？

499对应的是 **“client has closed connection”**，客户端请求等待链接已经关闭，这很有可能是因为服务器端处理的时间过长，客户端等得“不耐烦”了。还有一种原因是**两次提交post过快**就会出现499。
解决方法：

- 前端将timeout最大等待时间设置大一些；

- nginx上配置proxy_ignore_client_abort on



### 服务端代理转发时，cookie丢失问题怎么解决？

1. 如果只是host、端口转换，则cookie不会丢失。例如：

```
    location /project {
        proxy_pass   http://127.0.0.1:8080/project;
    }
```


通过浏览器访问http://127.0.0.1/project时，浏览器的cookie内有jsessionid。再次访问时，浏览器会发送当前的cookie。

2.如果路径也变化了，则需要设置cookie的路径转换，nginx.conf的配置如下

``` 
    location /proxy_path {
        proxy_pass   http://127.0.0.1:8080/project;
        proxy_cookie_path  /project /proxy_path;
    }
```


参考：

[解决nginx使用proxy_pass反向代理时，cookie丢失的问题_Go2Shell-CSDN博客](https://blog.csdn.net/we_shell/article/details/45153885)

[Module ngx_http_proxy_module](http://nginx.org/en/docs/http/ngx_http_proxy_module.html?&_ga=1.161910972.1696054694.1422417685#proxy_cookie_path)

