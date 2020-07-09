# 计算机网络

## HTTP


### Http请求的完整过程

流览器中的HTTP请求从发起到结束一共经历了如下八个阶段:构建请求、查找缓存、准备IP和端口、等待TCP队列、建立TCP连接、发起HTTP请求、服务器处理请求、服务器返回请求和断开连接。

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119161844.png"/>

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




### 开发中常用的几种 Content-Type?

(1)application/x-www-form-urlencoded

浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。该种方式提交的数据放在 body 数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL
转码。

(2)multipart/form-data

该种方式也是一个常见的 POST 提交方式，通常表单上传文件时使用该种方式。

(3)application/json

告诉服务器消息主体是序列化后的 JSON 字符串。

(4)text/xml

该种方式主要用来提交 XML 格式的数据。

参考：

[常用的几种 Content-Type | 独 奏](https://honglu.me/2015/07/13/%E5%B8%B8%E7%94%A8%E7%9A%84%E5%87%A0%E7%A7%8DContent-Type/)


### Keep-alive如何开启？有什么用？原理是什么？

在 HTTP 1.0 中, 没有官方的 keepalive 的操作。通常是在现有协议上添加一个指数。如果浏览器支持 keep-alive，它会在请求的包头中添加：
`Connection: Keep-Alive`
然后当服务器收到请求，作出回应的时候，它也添加一个头在响应中：
`Connection: Keep-Alive`。
这样做，**连接就不会中断，而是保持连接**。当客户端发送另一个请求时，它会使用同一个连接。这一直继续到客户端或服务器端认为会话已经结束，其中一方中断连接。

在 **HTTP 1.1 中 所有的连接默认都是持续连接**，除非特殊声明不支持。

### 介绍下 http1.0、1.1、2.0 协议的区别？

[参考](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/232#issuecomment-516664634)

HTTP/2引入了“服务端推（server push）”的概念，它允许服务端在客户端需要数据之前就主动地将数据发送到客户端缓存中，从而提高性能。

HTTP/2提供更多的加密支持

HTTP/2使用多路技术，允许多个消息在一个连接上同时交差。

它增加了头压缩（header compression），因此即使非常小的请求，其请求和响应的header都只会占用很小比例的带宽。







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

第三步：客户端读取证书信息，如果证书无效，则提示告警；如果证书有效，然后自己再生成一个 random 数，并使用证书的公钥进行加密，发送给服务端。

第四步：服务端使用自己本地的私钥，解密获取客户端的随机数。

第五步：客户端和服务端使用这三个随机数生成 对话密钥, 用来加密接下来的对话过程。

如果每次建立连接都去进行这五步，那么会很浪费时间。 所以这里有 sessionID 和 session ticket 两种。

session ID，记录有本次的握手存在，再次发送信息时，客户端发送该ID，服务器确认该编号存在，双方就不再进行握手阶段剩余的步骤，而直接用已有的对话密钥进行加密通信。

但是它的缺点在于session ID往往只保留在一台服务器上。所以，如果客户端的请求发到另一台服务器，就无法恢复对话。session ticket就是为了解决这个问题而诞生的，目前只有Firefox和Chrome浏览器支持。session ticket是加密的，只有服务器才能解密，其中包括本次对话的主要信息，比如对话密钥和加密方法。当服务器收到session ticket以后，解密后就不必重新生成对话密钥了。


当客户端想要通过 HTTPS 请求访问服务端时，**整个过程需要经过 7 次握手并消耗 9 倍的延迟**:

1、TCP 协议需要通过三次握手建立 TCP 连接保证通信的可靠性（1.5-RTT）；

2、TLS 协议会在 TCP 协议之上通过四次握手建立 TLS 连接保证通信的安全性（2-RTT）；

3、HTTP 协议会在 TCP 和 TLS 上通过一次往返发送请求并接收响应（1-RTT）；

需要注意的是，本文对往返延时的计算都基于特定的场景以及特定的协议版本，网络协议的版本在不断更新和演进，过去忽略的问题最开始都会通过补丁的方式更新，但是最后仍然会需要从底层完成重写。

HTTP/3 就是一个这样的例子，它会使用**基于 UDP 的 QUIC 协议进行握手，将 TCP 和 TLS 的握手过程结合起来，把 7 次握手减少到了 3 次握手**，直接建立了可靠并且安全的传输通道，将原本 ~900ms 的耗时降低至 ~500ms



参考：

[配置SSL，方法及须知原理](https://blog.csdn.net/dadadeganhuo/article/details/80265808)

[为什么 HTTPS 需要 7 次握手以及 9 倍时延 - 面向信仰编程](https://draveness.me/whys-the-design-https-latency/)

### https是对称还是非对称加密？


首先了解[非对称加密、对称加密和单向散列加密的区别？](/web/safe.html#%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E3%80%81%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E5%92%8C%E5%8D%95%E5%90%91%E6%95%A3%E5%88%97%E5%8A%A0%E5%AF%86%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F)。

非对称加密的加解密效率是非常低的，而 http 的应用场景中通常端与端之间存在大量的交互，非对称加密的效率是无法接受的；

另外，在 HTTPS 的场景中只有服务端保存了私钥，一对公私钥只能实现单向的加解密，所以 **HTTPS 中内容传输加密采取的是对称加密，而不是非对称加密**。

参考：

[HTTPS就安全了吗？会被抓包吗？看完这篇你有对答如流](https://mp.weixin.qq.com/s/i5hWcq0__YGxJKaXQ-0T_A)

### 为什么需要 CA 认证机构颁发证书？

首先了解[https中间人攻击是什么？如何防护？](/web/safe.html#https%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F%E5%A6%82%E4%BD%95%E9%98%B2%E6%8A%A4%EF%BC%9F)，如果不是CA认证，就会出现中间人攻击的问题。

参考：

[HTTPS就安全了吗？会被抓包吗？看完这篇你有对答如流](https://mp.weixin.qq.com/s/i5hWcq0__YGxJKaXQ-0T_A)

### 浏览器如何验证证书的合法性？

浏览器发起 HTTPS 请求时，服务器会返回网站的 SSL 证书，浏览器需要对证书做以下验证：

1、验证域名、有效期等信息是否正确。证书上都有包含这些信息，比较容易完成验证；

2、判断证书来源是否合法。每份签发证书都可以根据验证链查找到对应的根证书，操作系统、浏览器会在本地存储权威机构的根证书，利用本地根证书可以对对应机构签发证书完成来源验证；

3、判断证书是否被篡改。需要与 CA 服务器进行校验；

4、判断证书是否已吊销。通过CRL（Certificate Revocation List 证书注销列表）和 OCSP（Online Certificate Status Protocol 在线证书状态协议）实现，其中 OCSP 可用于第3步中以减少与 CA 服务器的交互，提高验证效率

以上任意一步都满足的情况下浏览器才认为证书是合法的。



参考：

[HTTPS就安全了吗？会被抓包吗？看完这篇你有对答如流](https://mp.weixin.qq.com/s/i5hWcq0__YGxJKaXQ-0T_A)


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


### 301重定向和302重定向的区别

301重定向是永久的重定向，**搜索引擎在抓取新的内容的同时也将旧的网址替换为了重定向之后的网址**。

302重定向只是暂时的重定向，**搜索引擎会抓取新的内容而保留旧的地址**。

301请求是可以缓存的， 即通过看status code，可以发现后面写着from cache。



参考：

[状态码301和302的区别 - Wayne-Zhu - 博客园](https://www.cnblogs.com/zhuzhenwei918/p/7582620.html)




### 如果作为短链服务的重定向，选301还是302？

301 是永久重定向，302 是临时重定向。短地址一经生成就不会变化，所以用 301 是符合 http 语义的，浏览器会记录跳转地址，同时对服务器压力也会有一定减少。

但是如果使用了 301，我们就无法统计到短地址被点击的次数了，如果对数据统计有要求的话，使用302跳转可能比较好一些！

## 跨域

### 什么是同源策略

同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源
### 同源策略的限制内容

同源策略限制内容有：

* Cookie、LocalStorage、IndexedDB 等存储性内容
* DOM 节点
* AJAX 请求不能发送

但是有三个标签是允许跨域加载资源：

* `<img src=XXX>`
* `<link href=XXX>`
* `<script src=XXX>`

> 特别说明两点：<br/>
第一：如果是协议和端口造成的跨域问题“前台”是无能为力的。<br/>
第二：在跨域问题上，仅仅是通过“URL的首部”来识别而不会根据域名对应的IP地址是否相同来判断。“URL的首部”可以理解为“协议, 域名和端口必须匹配”。

> 请求跨域了，那么请求到底发出去没有？<br/>
跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。

## 跨域解决方案

### jsonp

JSONP原理: 利用`<script>` 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP请求一定需要对方的服务器做支持才可以。

优点：JSONP优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。

缺点：缺点是仅支持get方法具有局限性,不安全可能会遭受XSS攻击。

### CORS跨域如何实现？

服务端设置 Access-Control-Allow-Origin 就可以开启 CORS

### CORS情况下，简单请求和复杂请求有什么区别？

规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（**特别是 GET 以外的 HTTP 请求**，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。

服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

所以说复杂请求会多一次option的通信。

若请求满足所有下述条件，则该请求可视为“简单请求”：

* 使用下列方法之一：
    * GET
    * HEAD
    * POST
* 除了被用户代理自动设置的首部字段（例如 Connection ，User-Agent）和在 Fetch 规范中定义为 禁用首部名称 的其他首部，允许人为设置的字段为 Fetch 规范定义的 对 CORS 安全的首部字段集合。该集合为：
    * Accept
    * Accept-Language
    * Content-Language
    * Content-Type （需要注意额外的限制）
    * DPR
    * Downlink
    * Save-Data
    * Viewport-Width
    * Width
* Content-Type 的值仅限于下列三者之一：
    * text/plain
    * multipart/form-data
    * application/x-www-form-urlencoded
* 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。
* 请求中没有使用 ReadableStream 对象。

参考：

[HTTP访问控制（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

### postMessage

postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：

* 页面和其打开的新窗口的数据传递
* 多窗口之间消息传递
* 页面与嵌套的iframe消息传递
* 上面三个场景的跨域数据传递

### nginx反向代理

通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录

## TCP

### 如何理解三次握手和四次挥手？

一张图片解决问题：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20190710171408.png"/>

首先，建立连接阶段。这个阶段是通过“三次握手”来建立客戶端和服务器之间的连接。TCP 提供面向连 接的通信传输。面向连接是指在数据通信开始之前先做好两端之间的准备工作。所谓三次握手，是指在建 立一个TCP连接时，客戶端和服务器总共要发送三个数据包以确认连接的建立。

其次，传输数据阶段。在该阶段，接收端需要对每个数据包进行确认操作，也就是接收端在接收到数据包 之后，需要发送确认数据包给发送端。所以当发送端发送了一个数据包之后，在规定时间内没有接收到接 收端反馈的确认消息，则判断为数据包丢失，并触发发送端的重发机制。同样，一个大的文件在传输过程 中会被拆分成很多小的数据包，这些数据包到达接收端后，接收端会按照TCP头中的序号为其排序，从而 保证组成完整的数据。

最后，断开连接阶段。数据传输完毕之后，就要终止连接了，涉及到最后一个阶段“四次挥手”来保证双 方都能断开连接。


### TCP为什么要三次握手？

TCP 建立连接时通过三次握手可以有效地避免历史错误连接的建立，减少通信双方不必要的资源消耗，三次握手能够帮助通信双方获取初始化序列号，它们能够保证数据包传输的不重不丢，还能保证它们的传输顺序，不会因为网络传输的问题发生混乱，到这里不使用『两次握手』和『四次握手』的原因已经非常清楚了：

- 『两次握手』：无法避免历史错误连接的初始化，浪费接收方的资源；
- 『四次握手』：TCP 协议的设计可以让我们同时传递 ACK 和 SYN 两个控制信息，减少了通信次数，所以不需要使用更多的通信次数传输相同的信息；

参考：

[为什么 TCP 建立连接需要三次握手 - 面向信仰编程](https://draveness.me/whys-the-design-tcp-three-way-handshake/)

### TCP为什么可靠？

TCP的可靠是针对UDP不可靠而言的。

首先了解UDP:

IP通过IP地址信息把数据包发送给指定 的电脑，而UDP通过端口号把数据包分发给正确的程序。

和IP头一样，端口号会被装进UDP头里面，UDP头 再和原始数据包合并组成新的UDP数据包。

UDP头中除了目的端口，还有源端口号等信息。

在使用UDP发送数据时，有各种因素会导致数据包出错，虽然**UDP可以校验数据是否正确**，但是对于错误的数据包，**UDP并不提供重发机制**，只是丢弃当前的包，而且UDP在发送之后也无法知道是否能达到目的地。所以说**UDP不可靠**。

TCP(Transmission Control Protocol，传输控制协议)是一种面向 连接的、可靠的、基于字节流的传输层通信协议。相对于UDP，TCP有下面两个特点:

- 对于数据包丢失的情况，**TCP提供重传机制**; 

- **TCP引入了数据包排序机制**，用来保证把乱序的数据包组合成一个完整的文件。

TCP单个数据包的传输流程和UDP流程差不 多，不同的地方在于，通过**TCP头的信息保证了一块大的数据传输的完整性**。


### 既然TCP可靠，UDP不可靠，那为什么有那么多基于UDP的协议呢？

因为 upd 报文小，udp 头部8个字节，tcp 头部20个字节。，TCP为了保证数据传输的可靠性，牺牲了数据包的传输速度，因为“三次握 手”和“数据包校验机制”等把传输过程中的数据包的数量提高了一倍。

虽说UDP不能保证数据可靠性，但是**传输速度却非常快**，所以UDP会应用在一些**关注速度、但不那么严格要求数据完整性**的领域，如**在线视频、互动游戏**等

可以参考一个包大小对比图：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200929170556.png"/>

### TCP的性能问题，究竟在哪里？

- TCP 的拥塞控制在发生丢包时会进行退让，减少能够发送的数据段数量，但是丢包并不一定意味着网络拥塞，更多的可能是网络状况较差；
- TCP 的三次握手带来了额外开销，这些开销不只包括需要传输更多的数据，还增加了首次传输数据的网络延迟；
- TCP 的重传机制在数据包丢失时可能会重新传输已经成功接收的数据段，造成带宽的浪费；

为了解决 TCP 的性能问题，目前业界有两种解决方案：

- 使用 UDP 构建性能更加优异、更灵活的传输协议，例如：QUIC19 等；
- 通过不同的手段优化 TCP 协议的性能，例如：选择性 ACK（Selective ACK, SACK），TCP 快开启（TCP Fast Open, TFO）；

由于 TCP 协议在操作系统内核中，不利于协议的更新，所以第一种方案目前发展的更好，HTTP/3 就使用了 QUIC 作为传输协议20。

参考：

[为什么 TCP 协议有性能问题 - 面向信仰编程](https://draveness.me/whys-the-design-tcp-performance/)

### 现代浏览器在与服务器建立了一个 TCP 连接后是否会在一个 HTTP 请求完成后断开？什么情况下会断开？

在 HTTP/1.0 中，一个服务器在发送完一个 HTTP 响应后，会断开 TCP 链接。

但是这样每次请求都会重新建立和断开 TCP 连接，代价过大。所以虽然标准中没有设定，某些服务器对 Connection: keep-alive 的 Header 进行了支持。意思是说，完成这个 HTTP 请求之后，不要断开 HTTP 请求使用的 TCP 连接。这样的好处是连接可以被重新使用，之后发送 HTTP 请求的时候不需要重新建立 TCP 连接，以及如果维持连接，那么 SSL 的开销也可以避免。

HTTP/1.1 就把 Connection 头写进标准，并且默认开启持久连接，除非请求中写明 Connection: close，那么浏览器和服务器之间是会维持一段时间的 TCP 连接，不会一个请求结束就断掉。

所以默认情况下建立 TCP 连接不会断开，只有在请求报头中声明 Connection: close 才会在请求完成后关闭连接。

参考：

[面试官问我：一个 TCP 连接可以发多少个 HTTP 请求？我竟然回答不上来...](https://mp.weixin.qq.com/s?__biz=MzI5ODI5NDkxMw==&mid=2247489132&idx=1&sn=c15c4bf118abad5bea9afc287585f760&chksm=eca95d82dbded494d33755649ad9879e32a3fe8b287cb2ecadb173238aa4ac65df3b6cf16aa7&scene=21#wechat_redirect)

### 一个 TCP 连接可以对应几个 HTTP 请求？

首先了解[现代浏览器在与服务器建立了一个-tcp-连接后是否会在一个-http-请求完成后断开？什么情况下会断开？](/cp/network.html#%E7%8E%B0%E4%BB%A3%E6%B5%8F%E8%A7%88%E5%99%A8%E5%9C%A8%E4%B8%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%BB%BA%E7%AB%8B%E4%BA%86%E4%B8%80%E4%B8%AA-tcp-%E8%BF%9E%E6%8E%A5%E5%90%8E%E6%98%AF%E5%90%A6%E4%BC%9A%E5%9C%A8%E4%B8%80%E4%B8%AA-http-%E8%AF%B7%E6%B1%82%E5%AE%8C%E6%88%90%E5%90%8E%E6%96%AD%E5%BC%80%EF%BC%9F%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E6%96%AD%E5%BC%80%EF%BC%9F)，然后得知答案肯定不只1个了，如果维持连接，一个 TCP 连接是可以发送多个 HTTP 请求的。



参考：

[面试官问我：一个 TCP 连接可以发多少个 HTTP 请求？我竟然回答不上来...](https://mp.weixin.qq.com/s?__biz=MzI5ODI5NDkxMw==&mid=2247489132&idx=1&sn=c15c4bf118abad5bea9afc287585f760&chksm=eca95d82dbded494d33755649ad9879e32a3fe8b287cb2ecadb173238aa4ac65df3b6cf16aa7&scene=21#wechat_redirect)


### 一个 TCP 连接中 HTTP 请求发送可以一起发送么（比如一起发三个请求，再三个响应一起接收）？

HTTP/1.1 存在一个问题，单个 TCP 连接在同一时刻只能处理一个请求，意思是说：两个请求的生命周期不能重叠，任意两个 HTTP 请求从开始到结束的时间在同一个 TCP 连接里不能重叠。

虽然 HTTP/1.1 规范中规定了 Pipelining 来试图解决这个问题，但是这个功能在浏览器中默认是关闭的。

但是在实践中会出现许多问题：

- 一些代理服务器不能正确的处理 HTTP Pipelining。

- 正确的流水线实现是复杂的。

- Head-of-line Blocking 连接头阻塞：在建立起一个 TCP 连接之后，假设客户端在这个连接连续向服务器发送了几个请求。按照标准，服务器应该按照收到请求的顺序返回结果，假设服务器在处理首个请求时花费了大量时间，那么后面所有的请求都需要等着首个请求结束才能响应。

所以现代浏览器默认是不开启 HTTP Pipelining 的。

但是，HTTP2 提供了 Multiplexing 多路传输特性，可以在一个 TCP 连接中同时完成多个 HTTP 请求。至于多路复用，参考[http2多路复用是什么-解决了什么问题？](/cp/network.html#http2%E5%A4%9A%E8%B7%AF%E5%A4%8D%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88-%E8%A7%A3%E5%86%B3%E4%BA%86%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98%EF%BC%9F)

所以在 HTTP/1.1 存在 Pipelining 技术可以完成这个多个请求同时发送，但是由于浏览器默认关闭，所以可以认为这是不可行的。**在 HTTP2 中由于 Multiplexing 特点的存在，多个 HTTP 请求可以在同一个 TCP 连接中并行进行**。


参考：

[面试官问我：一个 TCP 连接可以发多少个 HTTP 请求？我竟然回答不上来...](https://mp.weixin.qq.com/s?__biz=MzI5ODI5NDkxMw==&mid=2247489132&idx=1&sn=c15c4bf118abad5bea9afc287585f760&chksm=eca95d82dbded494d33755649ad9879e32a3fe8b287cb2ecadb173238aa4ac65df3b6cf16aa7&scene=21#wechat_redirect)

### 为什么有的时候刷新页面不需要重新建立 SSL 连接？

先明白[现代浏览器在与服务器建立了一个-tcp-连接后是否会在一个-http-请求完成后断开？什么情况下会断开？](/cp/network.html#%E7%8E%B0%E4%BB%A3%E6%B5%8F%E8%A7%88%E5%99%A8%E5%9C%A8%E4%B8%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%BB%BA%E7%AB%8B%E4%BA%86%E4%B8%80%E4%B8%AA-tcp-%E8%BF%9E%E6%8E%A5%E5%90%8E%E6%98%AF%E5%90%A6%E4%BC%9A%E5%9C%A8%E4%B8%80%E4%B8%AA-http-%E8%AF%B7%E6%B1%82%E5%AE%8C%E6%88%90%E5%90%8E%E6%96%AD%E5%BC%80%EF%BC%9F%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E6%96%AD%E5%BC%80%EF%BC%9F)，由于TCP可以维持，所以SSL自然可以保持连接。




参考：

[面试官问我：一个 TCP 连接可以发多少个 HTTP 请求？我竟然回答不上来...](https://mp.weixin.qq.com/s?__biz=MzI5ODI5NDkxMw==&mid=2247489132&idx=1&sn=c15c4bf118abad5bea9afc287585f760&chksm=eca95d82dbded494d33755649ad9879e32a3fe8b287cb2ecadb173238aa4ac65df3b6cf16aa7&scene=21#wechat_redirect)


### 浏览器对同一 Host 建立 TCP 连接到数量有没有限制？

假设我们还处在 HTTP/1.1 时代，那个时候没有多路传输，当浏览器拿到一个有几十张图片的网页该怎么办呢？肯定不能只开一个 TCP 连接顺序下载，那样用户肯定等的很难受，但是如果每个图片都开一个 TCP 连接发 HTTP 请求，那电脑或者服务器都可能受不了，要是有 1000 张图片的话总不能开 1000 个TCP 连接吧，你的电脑同意 NAT 也不一定会同意。

所以答案是：有。Chrome 最多允许对同一个 Host 建立六个 TCP 连接。不同的浏览器有一些区别。


参考：

[面试官问我：一个 TCP 连接可以发多少个 HTTP 请求？我竟然回答不上来...](https://mp.weixin.qq.com/s?__biz=MzI5ODI5NDkxMw==&mid=2247489132&idx=1&sn=c15c4bf118abad5bea9afc287585f760&chksm=eca95d82dbded494d33755649ad9879e32a3fe8b287cb2ecadb173238aa4ac65df3b6cf16aa7&scene=21#wechat_redirect)


### 收到的 HTML 如果包含几十个图片标签，这些图片是以什么方式、什么顺序、建立了多少连接、使用什么协议被下载下来的呢？

如果图片都是 HTTPS 连接并且在同一个域名下，那么浏览器在 SSL 握手之后会和服务器商量能不能用 HTTP2，如果能的话就使用 Multiplexing 功能在这个连接上进行多路传输。不过也未必会所有挂在这个域名的资源都会使用一个 TCP 连接去获取，但是可以确定的是 Multiplexing 很可能会被用到。

如果发现用不了 HTTP2 呢？或者用不了 HTTPS（现实中的 HTTP2 都是在 HTTPS 上实现的，所以也就是只能使用 HTTP/1.1）。那浏览器就会在一个 HOST 上建立多个 TCP 连接，连接数量的最大限制取决于浏览器设置，这些连接会在空闲的时候被浏览器用来发送新的请求，如果所有的连接都正在发送请求呢？那其他的请求就只能等等了。


参考：

[面试官问我：一个 TCP 连接可以发多少个 HTTP 请求？我竟然回答不上来...](https://mp.weixin.qq.com/s?__biz=MzI5ODI5NDkxMw==&mid=2247489132&idx=1&sn=c15c4bf118abad5bea9afc287585f760&chksm=eca95d82dbded494d33755649ad9879e32a3fe8b287cb2ecadb173238aa4ac65df3b6cf16aa7&scene=21#wechat_redirect)



### TCP粘包是什么？

TCP是流协议，根本不存在所谓粘包一说。粘包并不是 TCP 协议造成的，它的出现是因为应用层协议设计者对 TCP 协议的错误理解，忽略了 TCP 协议的定义并且缺乏设计应用层协议的经验。

粘包问题出现的核心原因：

1、TCP 协议是基于字节流的传输层协议，其中不存在消息和数据包的概念；

2、应用层协议没有使用基于长度或者基于终结符的消息边界，导致多个消息的粘连；

所以“粘包”其实是应用程序中没有处理好数据包分割，两个应用层的数据包粘在一块了。

参考：

[为什么 TCP 协议有粘包问题 - 面向信仰编程](https://draveness.me/whys-the-design-tcp-message-frame/)

[怎么解决TCP网络传输「粘包」问题？ - 知乎](https://www.zhihu.com/question/20210025)





## DNS



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

### 什么叫递归DNS和权威DNS？（todo）


### 你工作中哪些场景使用的DNS相关技术？

首先明白[简单说下dns解析的过程](/cp/network.html#%E7%AE%80%E5%8D%95%E8%AF%B4%E4%B8%8Bdns%E8%A7%A3%E6%9E%90%E7%9A%84%E8%BF%87%E7%A8%8B)。

每一个url，都会经历dns，参考[浏览器中输入url到页面呈现到底发生了什么？](/cp/browser.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E8%BE%93%E5%85%A5url%E5%88%B0%E9%A1%B5%E9%9D%A2%E5%91%88%E7%8E%B0%E5%88%B0%E5%BA%95%E5%8F%91%E7%94%9F%E4%BA%86%E4%BB%80%E4%B9%88%EF%BC%9F)

在负载均衡方面，也会用到dns轮询相关技术，参考[如何针对接入层制定最佳解决方案？](/web/backend.html#%E5%A6%82%E4%BD%95%E9%92%88%E5%AF%B9%E6%8E%A5%E5%85%A5%E5%B1%82%E5%88%B6%E5%AE%9A%E6%9C%80%E4%BD%B3%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%EF%BC%9F)

在cdn方面，其实也是dns-server来通过用户id来决定将哪个机房的nginxip给用户，参考[cdn的原理是什么？](/cp/network.html#cdn%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)


### DNS基于TCP还是UDP，为什么？

DNS 不仅使用了 UDP 协议，也使用了 TCP 协议，[网络分层和常见协议？](/cp/network.html#%E7%BD%91%E7%BB%9C%E5%88%86%E5%B1%82%E5%92%8C%E5%B8%B8%E8%A7%81%E5%8D%8F%E8%AE%AE%EF%BC%9F)中也有记载。

DNS 查询的类型不止包含 A 记录、CNAME 记录等常见查询，还包含 AXFR 类型的特殊查询，这种特殊查询主要用于 DNS 区域传输，它的作用就是在多个命名服务器之间快速迁移记录，由于 DNS 区域传输的功能对于数据的准确有着较强的需求，所以我们必须使用 TCP 或者其他的可靠协议来处理 AXFR 类型的请求；

参考：

[为什么 DNS 使用 UDP 协议 - 面向信仰编程](https://draveness.me/whys-the-design-dns-udp-tcp/)

## 其他

### 网络分层和常见协议？

一张图解决问题：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/1496311432734799.png"/>


### ping ip到发包，发送了什么？

首先根据目的IP和路由表决定走哪个网卡，再根据网卡的子网掩码地址判断目的IP是否在子网内。

如果在相同网段直接先查询arp缓存，如果找到目标ip的mac地址，直接发送出去。 如果缓存中查不到，则从相同网段的网卡发arp问目标ip的mac地址，拿到mac地址后发送出去。

如果不在主机的网段里，会查询默认网关ip，接着查询arp缓存，是否有网关的mac地址记录，如果有，填充该mac地址，发送出去， 如果没有，发arp问网关的mac地址，得到结果，发送出去。

### CDN的原理是什么？

根据客户端ip来分配最近的服务器机房访问，

(1)电信用户想要访问某一个服务器资源

(2)浏览器向dns-server发起服务器域名解析请求

(3)dns-server识别出访问者是电信用户

(4)dns-server将电信机房的nginx外网ip返回给访问者

(5)访问者就近访问


### MAC地址是唯一的吗？相同的MAC地址会有什么影响？为什么？

MAC 地址（Media access control address）是分配给网络接口控制器（Network interface controller, NIC）的唯一标识符，它会在网络段中充当网络地址使用1，所有具有网卡的主机都有单独的 MAC 地址，该地址总共包含 48 位，占 6 字节的空间，可以表示 281,474,976,710,656 个网络设备，一个正常的 MAC 地址如下所示的格式表示，每个字节都会使用两位 16 进制的数字：

```
6e:77:0f:b8:8b:6b
```

MAC 地址需要保证唯一，所以 IEEE 会根据设备的制造商分配地址段，48 位 MAC 地址的前 24 位是设备制造商的标识符2，也就是组织唯一标识符（Organizationally Unique Identifier，OUI），后面的 24 位是序列号；如果每个设备制造商都能保证在同一个命名空间中的全部 MAC 地址唯一，那么全世界所有的 MAC 地址就可以保证唯一。

然而在实际的网络场景中，我们不需要保证如此强的限制：

MAC 地址可以通过软件进行修改，而第三方的山寨厂商不会在 IEEE 中申请独立的 MAC 地址段，它们也可能会盗用其他厂商申请的 MAC 地址；

如果保证 MAC 地址在局域网中唯一就不会造成网络问题，不同局域网中的 MAC 地址可以相同；

至于局域网内MAC为什么要唯一，参考[局域网内机器互联的原理？](/cp/network.html#%E5%B1%80%E5%9F%9F%E7%BD%91%E5%86%85%E6%9C%BA%E5%99%A8%E4%BA%92%E8%81%94%E7%9A%84%E5%8E%9F%E7%90%86%EF%BC%9F)


参考：

[为什么 Mac 地址不需要全球唯一 - 面向信仰编程](https://draveness.me/whys-the-design-non-unique-mac-address/)


### 局域网内机器互联的原理？

局域网中的数据传输不是通过网络层的 IP 地址进行路由和转发的，然而 IP 地址一般都是发送数据主机知道的唯一信息，想要在局域网中发送数据，还是需要知道它们的 MAC 地址。当我们的设备想要向其他的设备发送数据时，它会先通过 ARP(Address Resolution Protocol，地址解析协议) 在局域网中获取目的 IP 地址对应的 MAC 地址。

在局域网中我们一般会使用集线器（Hub）或者交换机（Switch）来连接不同的网络设备。因为在集线器连接的局域网中，所有的数据帧都会被广播给局域网内的全部主机，所以使用相同的 MAC 地址一般也不会出现太多的问题；但是交换机会学习局域网中不同设备的 MAC 地址并将数据帧转发给特定主机，所以如果局域网是由交换机构成的，就会影响网络的通信。

假设局域网中的具有两台 MAC 地址完全相同的网络设备 A 和 B，即 6e:77:0f:b8:8b:6b，当设备 A 想要向设备 B 发送以太网帧时会遇到如下所示的情况：

1、设备 A 在构造的以太网帧中将源地址和目的地址都设置为 6e:77:0f:b8:8b:6b 并向交换机发送数据；

2、交换机接收到了设备 A 发送的数据帧后，会从数据帧的源地址学习到设备 A 的 MAC 地址并将 6e:77:0f:b8:8b:6b -> A 这条记录插入本地缓存中；

3、交换机发现收到数据帧的目的地址会指向了网络设备 A，所以它会将该数据转发回 A；

因为交换机的 MAC 地址学习策略，所以我们不能在同一个局域网中使用相同的 MAC 地址，但是因为 MAC 地址是链路层网络中的概念，跨局域网的网络传输需要通过网络层的 IP 协议，所以在不同的局域网中使用相同的 MAC 地址就不存在类似的问题了。


参考：

[为什么 Mac 地址不需要全球唯一 - 面向信仰编程](https://draveness.me/whys-the-design-non-unique-mac-address/)



