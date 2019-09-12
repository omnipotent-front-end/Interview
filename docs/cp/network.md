# 计算机网络

## HTTP

### http的methods有哪些？

可以参考[methods](https://github.com/jshttp/methods)中列出的一些。
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'

### http有哪些常用的head，说一下各自的作用？

#### Expires
HTTP1.0的内容，服务器使用Expires头来告诉Web客户端它可以使用当前副本，**直到指定的时间为止**。

#### Cache-Control
HTTP1.1引入了Cathe-Control，它**使用max-age指定资源被缓存多久**，主要是解决了Expires一个重大的缺陷，就是它设置的是一个固定的时间点，客户端时间和服务端时间可能有误差。

所以一般会把两个头都带上，这种缓存称为**强缓存**，表现形式为：


#### Last-Modified  /  If-Modified-Since

Last-Modified是服务器告诉浏览器该资源的**最后修改时间**，If-Modified-Since是请求头带上的，上次服务器给自己的该资源的最后修改时间。然后服务器拿去对比。

若资源的**最后修改时间大于If-Modified-Since，说明资源又被改动过**，则响应整片资源内容，返回状态码200；

若资源的最后修改时间小于或等于If-Modified-Since，说明资源无新修改，则响应**HTTP 304**，告知浏览器继续使用当前版本。

#### Etag  /  If-None-Match
前面提到由文件的修改时间来判断文件是否改动，还是会带来一定的误差，比如注释等无关紧要的修改等。所以推出了新的方式。

**Etag是由服务端特定算法生成的该文件的唯一标识**，而请求头把返回的Etag值通过If-None-Match再带给服务端，服务端通过比对从而决定是否响应新内容。这也是304缓存。


### Keep-alive如何开启？有什么用？原理是什么？

在 HTTP 1.0 中, 没有官方的 keepalive 的操作。通常是在现有协议上添加一个指数。如果浏览器支持 keep-alive，它会在请求的包头中添加：
`Connection: Keep-Alive`
然后当服务器收到请求，作出回应的时候，它也添加一个头在响应中：
`Connection: Keep-Alive`。
这样做，**连接就不会中断，而是保持连接**。当客户端发送另一个请求时，它会使用同一个连接。这一直继续到客户端或服务器端认为会话已经结束，其中一方中断连接。

在 **HTTP 1.1 中 所有的连接默认都是持续连接**，除非特殊声明不支持。


### http2多路复用是什么?解决了什么问题？

在 HTTP/1 中，每次请求都会建立一次HTTP连接，也就是我们常说的3次握手4次挥手，这个过程在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

第一个：串行的文件传输。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）

第二个：连接数过多。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6，也就是服务器能承载的最高并发为50，当第51个人访问时，就需要等待前面某个请求处理完成。

HTTP/2的多路复用就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是**帧（frame）和流（stream）**。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。

多路复用，就是**在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求**。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

### https的握手过程是什么样子的？
开始加密通信之前，客户端和服务端必须建立连接和交互参数，这个过程就是握手。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190712110314.png"/>

第一步：客户端 say hello, 向服务端发送自己生成的 random 数，和自己支持的加密方法。

第二步：服务端接收消息后，又向客户端发送自己生成的 random 数、SSL 证书，确定使用的加密方法。

第三步：客户端读取证书信息，确认证书有效，然后自己再生成一个 random 数，并使用证书的公钥进行加密，发送给服务端。

第四步：服务端使用自己本地的私钥，解密获取客户端的随机数。

第五步：客户端和服务端使用这三个随机数生成 对话密钥, 用来加密接下来的对话过程。

如果每次建立连接都去进行这五步，那么会很浪费时间。 所以这里有 sessionID 和 session ticket 两种。

session ID，记录有本次的握手存在，再次发送信息时，客户端发送该ID，服务器确认该编号存在，双方就不再进行握手阶段剩余的步骤，而直接用已有的对话密钥进行加密通信。

但是它的缺点在于session ID往往只保留在一台服务器上。所以，如果客户端的请求发到另一台服务器，就无法恢复对话。session ticket就是为了解决这个问题而诞生的，目前只有Firefox和Chrome浏览器支持。session ticket是加密的，只有服务器才能解密，其中包括本次对话的主要信息，比如对话密钥和加密方法。当服务器收到session ticket以后，解密后就不必重新生成对话密钥了。

参考：

[配置SSL，方法及须知原理](https://blog.csdn.net/dadadeganhuo/article/details/80265808)


### 想办法在https的网站下进行http的请求？

```
<script> 均默认阻止
XMLHttpRequest 阻止
<a> 不会产生混合内容
<img> 仍会加载混合内容图像，但也会向用户显示警告
```

或者加上
``` html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

### 如果登陆的请求是https，而其它的请求是http的会出现什么问题？

cookie会加密，可能导致其它请求无法通过身份验证。



### get和post有什么区别？越底层越好。

- GET在浏览器回退时是无害的，而POST会再次提交请求。

- GET产生的URL地址可以被Bookmark，而POST不可以。

- GET请求会被浏览器主动cache，而POST不会，除非手动设置。

- GET请求只能进行url编码，而POST支持多种编码方式。

- GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。

- GET请求在URL中传送的参数是有长度限制的，而POST么有。

- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。

- GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。

- GET参数通过URL传递，POST放在Request body中。

- **GET产生一个TCP数据包；POST产生两个TCP数据包**。

对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；

而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

当然每个浏览器实现不一致，但是这是标准规范。



参考：

[99%的人理解错 HTTP 中 GET 与 POST 的区别 - OSCHINA](https://www.oschina.net/news/77354/http-get-post-different)

### http状态码之304

参考[http有哪些常用的head，说一下各自的作用？](/cp/network.html#http%E6%9C%89%E5%93%AA%E4%BA%9B%E5%B8%B8%E7%94%A8%E7%9A%84head%EF%BC%8C%E8%AF%B4%E4%B8%80%E4%B8%8B%E5%90%84%E8%87%AA%E7%9A%84%E4%BD%9C%E7%94%A8%EF%BC%9F)中的304缓存来说。



## TCP

### 如何理解三次握手和四次挥手？

一张图片解决问题：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710171408.png"/>

## 其他

### ping ip到发包，发送了什么？

首先根据目的IP和路由表决定走哪个网卡，再根据网卡的子网掩码地址判断目的IP是否在子网内。

如果在相同网段直接先查询arp缓存，如果找到目标ip的mac地址，直接发送出去。 如果缓存中查不到，则从相同网段的网卡发arp问目标ip的mac地址，拿到mac地址后发送出去。

如果不在主机的网段里，会查询默认网关ip，接着查询arp缓存，是否有网关的mac地址记录，如果有，填充该mac地址，发送出去， 如果没有，发arp问网关的mac地址，得到结果，发送出去。

### 简单说下DNS解析的过程

DNS解析的过程就是一个网址到IP地址的转换。

DNS解析是一个递归查询的过程。流程图如下：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190816094319.png"/>


上述图片是查找www.google.com的IP地址过程。首先在本地域名服务器中查询IP地址，如果没有找到的情况下，**本地域名服务器会向根域名服务器**发送一个请求，如果根域名服务器也不存在该域名时，**本地域名会向com顶级域名服务器发送一个请求**，依次类推下去。直到最后**本地域名服务器得到google的IP地址并把它缓存到本地**，供下次查询使用。从上述过程中，可以看出网址的解析是一个从右向左的过程: `com -> google.com -> www.google.com`。但是你是否发现少了点什么，根域名服务器的解析过程呢？事实上，真正的网址是`www.google.com.`，并不是我多打了一个.，这个.对应的就是根域名服务器，默认情况下所有的网址的最后一位都是.，既然是默认情况下，为了方便用户，通常都会省略，浏览器在请求DNS的时候会自动加上，**所有网址真正的解析过程为: `. -> .com -> google.com. -> www.google.com.`。**

为了加快查找速度，会有**DNS缓存**：

DNS存在着多级缓存，从离浏览器的距离排序的话，有以下几种: **浏览器缓存，系统缓存，路由器缓存，IPS服务器缓存，根域名服务器缓存，顶级域名服务器缓存，主域名服务器缓存**。
- 在你的chrome浏览器中输入:chrome://dns/，你可以看到chrome浏览器的DNS缓存。
- 系统缓存主要存在/etc/hosts(Linux系统)中:

为了避免全部指向同一机器，会使用**DNS负载均衡**：

DNS可以返回一个合适的机器的IP给用户，例如可以根据每台机器的负载量，该机器离用户地理位置的距离等等，这种过程就是**DNS负载均衡，又叫做DNS重定向**。大家耳熟能详的**CDN(Content Delivery Network)就是利用DNS的重定向技术**，DNS服务器会返回一个跟用户最接近的点的IP地址给用户，CDN节点的服务器负责响应用户的请求，提供所需的内容。

