# 浏览器相关


## 应用

### 常见的浏览器内核有哪些？


<table><thead><tr><th>浏览器 / RunTime</th><th>内核（渲染引擎）</th><th>JavaScript 引擎</th></tr></thead><tbody><tr><td>Chrome</td><td>webkit-&gt;blink</td><td>V8</td></tr><tr><td>FireFox</td><td>Gecko</td><td>SpiderMonkey</td></tr><tr><td>Safari</td><td>Webkit</td><td>JavaScriptCore</td></tr><tr><td>Edge</td><td>EdgeHTML</td><td>Chakra(for JavaScript)</td></tr><tr><td>IE</td><td>Trident</td><td>JScript（IE3.0-IE8.0）</td></tr><tr><td>Opera</td><td>Presto-&gt;blink</td><td>Linear A（4.0-6.1）/ Linear B（7.0-9.2）/ Futhark（9.5-10.2）/ Carakan（10.5-）</td></tr><tr><td>Node.js</td><td>-</td><td>V8</td></tr></tbody></table>


### 移动端浏览器点击事件触发顺序

touchstart --> touchmove --> touchend --> mouseover(有的浏览器没有实现) --> mousemove(一次) -->mousedown --> mouseup --> click

mouseover: 当指针设备移动到存在监听器的元素或其子元素的时候

mouseenter: 当指针设备( 通常指鼠标 )在元素上移动时



### DOMContentLoaded 与 load 的区别

*   DOMContentLoaded 事件触发时：仅当 DOM 解析完成后，不包括样式表，图片等资源。
    
*   onload 事件触发时, 页面上所有的 DOM, 样式表, 脚本, 图片等资源已经加载完毕。


那我们可以聊一聊它们与 async 和 defer 区别

[async和defer的用法参考](/language/html.html#script标签的的defer和async有什么区别？)

> 带 async 的脚本一定会在 load 事件之前执行，可能会在 DOMContentLoaded 之前或之后执行。

*   情况 1： HTML 还没有被解析完的时候，async 脚本已经加载完了，那么 HTML 停止解析，去执行脚本，脚本执行完毕后触发 DOMContentLoaded 事件
    
*   情况 2： HTML 解析完了之后，async 脚本才加载完，然后再执行脚本，那么在 HTML 解析完毕、async 脚本还没加载完的时候就触发 DOMContentLoaded 事件
    

> 如果 script 标签中包含 defer，那么这一块脚本将不会影响 HTML 文档的解析，而是等到 HTML 解析完成后才会执行。而 DOMContentLoaded 只有在 defer 脚本执行结束后才会被触发。

*   情况 1：HTML 还没解析完成时，defer 脚本已经加载完毕，那么 defer 脚本将等待 HTML 解析完成后再执行。defer 脚本执行完毕后触发 DOMContentLoaded 事件
    
*   情况 2：HTML 解析完成时，defer 脚本还没加载完毕，那么 defer 脚本继续加载，加载完成后直接执行，执行完毕后触发 DOMContentLoaded 事件
    

### 为什么操作DOM会慢？

一些 DOM 的操作或者属性访问可能会引起页面的回流（重排）和重绘，从而引起性能上的消耗。可以了解下[重排和重绘是什么？](/cp/browser.html#%E9%87%8D%E6%8E%92%E5%92%8C%E9%87%8D%E7%BB%98%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)和[如何避免重排和重绘？](/cp/browser.html#%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E9%87%8D%E6%8E%92%E5%92%8C%E9%87%8D%E7%BB%98%EF%BC%9F)


### 什么是浏览器的同源政策？

这里的同源的指的是两个域的协议、域名、端口号必须相同，否则则不属于同 一个域。同源政策主要限制了三个方面:

第一个是当前域下的 js 脚本不能够访问其他域下的 cookie、localStorage 和 indexDB。 

第二个是当前域下的 js 脚本不能够操作访问操作其他域下的 DOM。

第三个是当前域下 ajax 无法发送跨域请求。

### 如何解决跨域问题？

(1)将 document.domain 设置为主域名，来实现相同子域名的跨域操作，这个时候主域名下 的 cookie 就能够被子域名所访问。同时如果文档中含有主域名相同，子域名不同的 iframe 的话，我们也可以对这个 iframe 进行操作。
如果是想要解决不同跨域窗口间的通信问题，比如说一个页面想要和页面的中的不同源的 iframe 进行通信的问题，我们可以使用 location.hash 或者 window.name 或者 postMessage 来解决。

(2)使用 location.hash 的方法，我们可以在主页面动态的修改 iframe 窗口的 hash 值， 然后在 iframe 窗口里实现监听函数来实现这样一个单向的通信。因为在 iframe 是没有办法 访问到不同源的父级窗口的，所以我们不能直接修改父级窗口的 hash 值来实现通信，我们可 以在 iframe 中再加入一个 iframe ，这个 iframe 的内容是和父级页面同源的，所以我们可 以 window.parent.parent 来修改最顶级页面的 src，以此来实现双向通信。

(3)使用 window.name 的方法，主要是基于同一个窗口中设置了 window.name 后不同源的 页面也可以访问，所以不同源的子页面可以首先在 window.name 中写入数据，然后跳转到一 个和父级同源的页面。这个时候级页面就可以访问同源的子页面中 window.name 中的数据了， 这种方式的好处是可以传输的数据量大。

(4)使用 postMessage 来解决的方法，这是一个 h5 中新增的一个 api。通过它我们可以实 现多窗口间的信息传递，通过获取到指定窗口的引用，然后调用 postMessage 来发送信息， 在窗口中我们通过对 message 信息的监听来接收信息，以此来实现不同源间的信息交换。如果 是像解决 ajax 无法提交跨域请求的问题，我们可以使用 jsonp、cors、websocket 协议、 服务器代理来解决问题。

(5)使用 jsonp 来实现跨域请求，它的主要原理是通过动态构建 script 标签来实现跨域 请求，因为浏览器对 script 标签的引入没有跨域的访问限制 。通过在请求的 url 后指定一 个回调函数，然后服务器在返回数据的时候，构建一个 json 数据的包装，这个包装就是回调 函数，然后返回给前端，前端接收到数据后，因为请求的是脚本文件，所以会直接执行，这样我 们先前定义好的回调函数就可以被调用，从而实现了跨域请求的处理。这种方式只能用于 get 请求。

(6)使用 CORS 的方式，CORS 是一个 W3C 标准，全称是"跨域资源共享"。CORS 需要浏览器 和服务器同时支持。目前，所有浏览器都支持该功能，因此我们只需要在服务器端配置就行。浏 览器将 CORS 请求分成两类:简单请求和非简单请求。对于简单请求，浏览器直接发出 CORS 请 求。具体来说，就是会在头信息之中，增加一个 Origin 字段。Origin 字段用来说明本次请 求来自哪个源。服务器根据这个值，决定是否同意这次请求。对于如果 Origin 指定的源，不 在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包 含 Access-Control-Allow-Origin 字段，就知道出错了，从而抛出一个错误，ajax 不会收 到响应信息。如果成功的话会包含一些以 Access-Control- 开头的字段。非简单请求，浏览 器会先发出一次预检请求，来判断该域名是否在服务器的白名单中，如果收到肯定回复后才会发 起请求。
                                                                                                                         
(7)使用 websocket 协议，这个协议没有同源限制。

(8)使用服务器来代理跨域的访问请求，就是有跨域的请求操作时发送请求给后端，让后端代为请求，然后最后将获取的结果发返回。因为服务器的没有跨域接口的限制的。

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


### 简单聊一下cookie

 cookie 是服务器提供的一种用于维护会话状态信息的数据，通过服务器发送 到浏览器，浏览器保存在本地，当下一次有同源的请求时，将保存的 cookie 值添加到请求头 部，发送给服务端。这可以用来实现记录用户登录状态等功能。cookie 一般可以存储 4k 大小 的数据，并且只能够被同源的网页所共享访问。

 服务器端可以使用 Set-Cookie 的响应头部来配置 cookie 信息。一条 cookie 包括了 5 个属性值 expires、domain、path、secure、HttpOnly。其中 expires 指定了 cookie 失 效的时间，domain 是域名、path 是路径，domain 和 path 一起限制了 cookie 能够被哪些 url 访问。secure 规定了 cookie 只能在确保安全的情况下传输（即https下传输），HttpOnly 规定了这个 cookie 只能被服务器访问，不能使用 js 脚本访问。在发生 xhr 的跨域请求的时候，即使是 同源下的 cookie，也不会被自动添加到请求头部，除非显示地规定。

### Cookie的SameSite属性做什么的？

SameSite Cookie 表示同站 cookie，避免 cookie 被第三方所利用。

将 SameSite 设为 strict ，这种称为严格模式，表示这个 cookie 在任何情况下都不可能作 为第三方 cookie。
         
将 SameSite 设为 Lax ，这种模式称为宽松模式，如果这个请求是个 GET 请求，并且这个请 求改变了当前页面或者打开了新的页面，那么这个 cookie 可以作为第三方 cookie，其余情况下都不能作为第三方 cookie。

使用这种方法的缺点是，因为它不支持子域，所以子域没有办法与主域共享登录信息，每次转入子域的网站，都回重新登录。还有一个问题就是它的兼容性不够好。

参考：

[SameSite cookies - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite)


### 检测浏览器版本版本有哪些方式?
 
检测浏览器版本一共有两种方式:

一种是检测 window.navigator.userAgent 的值，但这种方式很不可靠，因为 userAgent 可 以被改写，并且早期的浏览器如 ie，会通过伪装自己的 userAgent 的值为 Mozilla 来躲过 服务器的检测。


第二种方式是功能检测，根据每个浏览器独有的特性来进行判断，如 ie 下独有的 ActiveXObject。

### URI和URL的区别？

URI: Uniform Resource Identifier             指的是统一资源标识符 

URL: Uniform Resource Location                 指的是统一资源定位符 

URN: Universal Resource Name                     指的是统一资源名称


URI 指的是统一资源标识符，用唯一的标识来确定一个资源，它是一种抽象的定义，也就是说， 不管使用什么方法来定义，只要能唯一的标识一个资源，就可以称为 URI。

URL 指的是统一资源定位符，URN 指的是统一资源名称。URL 和 URN 是 URI 的子集，URL 可 以理解为使用地址来标识资源，URN 可以理解为使用名称来标识资源。




参考：

[HTTP 协议中 URI 和 URL 有什么区别？ - 知乎](https://www.zhihu.com/question/21950864)


 

## 原理

### Chrome的架构和多进程模型？

首先看看2008年的架构图：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119163601.png"/>

然后是目前（2020）：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119163650.png"/>

以及对未来的规划：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119163728.png"/>

### 谈一谈浏览器的缓存机制

web 资源的缓存策略一般由服务器来指定，可以分为两种，分别是强缓存策略和协商 缓存策略。使用强缓存策略时，如果缓存资源有效，则直接使用缓存资源，不必再向服务器发起 请求。

强缓存策略可以通过两种方式来设置，分别是 http 头信息中的 Expires 属性和 Cache-Control 属性。

服务器通过在响应头中添加 Expires 属性，来指定资源的过期时间。 在过期时间以内，该资源可以被缓存使用，不必再向服务器发送请求。这个时间是一个绝对时间， 它是服务器的时间，因此可能存在这样的问题，就是客户端的时间和服务器端的时间不一致，或 者用户可以对客户端时间进行修改的情况，这样就可能会影响缓存命中的结果。

在 http 1.1 中提出了一个新的头部属性就是 Cache-Control 属性，它提供了对资源的缓存的更精确的控制，来解决http1.0 中的Expire的一些缺点。它有很多不同的值，常用的比 如我们可以通过设置 max-age 来指定资源能够被缓存的时间的大小，这是一个相对的时间，它 会根据这个时间的大小和资源第一次请求时的时间来计算出资源过期的时间，因此相对于 Expires 来说，这种方式更加有效一些。常用的还有比如 private ，用来规定资源只能被客户 端缓存，不能够代理服务器所缓存。还有如 no-store ，用来指定资源不能够被缓存，no-cache 代表该资源能够被缓存，但是立即失效，每次都需要向服务器发起请求。一般来说只需要设置其 中一种方式就可以实现强缓存策略，当两种方式一起使用时，Cache-Control 的优先级要高于 Expires 。


使用协商缓存策略时，会先向服务器发送一个请求，如果资源没有发生修改，则返回一个 304 状 态，让浏览器使用本地的缓存副本。果资源发生了修改，则返回修改后的资源。协商缓存也可以通过两种方式来设置，分别是 http 头信息中的 Etag 和 Last-Modified 属性。

服务器通过在响应头中添加 Last-Modified 属性来指出资源最后一次修改的时间，当浏 览器下一次发起请求时，会在请求头中添加一个 If-Modified-Since 的属性，属性值为上一 次资源返回时的 Last-Modified 的值。当请求发送到服务器后服务器会通过这个属性来和资 源的最后一次的修改时间来进行比较，以此来判断资源是否做了修改。如果资源没有修改，那么 返回 304 状态，让客户端使用本地的缓存。如果资源已经被修改了，则返回修改后的资源。使 用这种方法有一个缺点，就是 Last-Modified 标注的最后修改时间只能精确到秒级，如果某 些文件在 1 秒钟以内，被修改多次的话，那么文件已将改变了但是 Last-Modified 却没有改 变，这样会造成缓存命中的不准确。因为 Last-Modified 的这种可能发生的不准确性。

http 中 提供了另外一种方式，那就是 Etag 属性。服务器在返回资源的时候，在头信息中添加了 Etag 属性，这个属性是资源生成的唯一标识符，当资源发生改变的时候，这个值也会发生改变。在下 一次资源请求时，浏览器会在请求头中添加一个 If-None-Match 属性，这个属性的值就是上 次返回的资源的 Etag 的值。服务接收到请求后会根据这个值来和资源当前的 Etag 的值来进 行比较，以此来判断资源是否发生改变，是否需要返回资源。通过这种方式，比 Last-Modified的方式更加精准。当 Last-Modified 和 Etag 属性同时出现的时候，Etag 的优先级更高。使用协商缓存 的时候，服务器需要考虑负载平衡的问题，因此多个服务器上资源的 Last-Modified 应该保 持一致，因为每个服务器上 Etag 的值都不一样，因此在考虑负载平衡时，最好不要设置 Etag 属性。

强缓存策略和协商缓存策略在缓存命中时都会直接使用本地的缓存副本，区别只在于协商 缓存会向服务器发送一次请求。它们缓存不命中时，都会向服务器发送请求来获取资源。在实际 的缓存机制中，强缓存策略和协商缓存策略是一起合作使用的。浏览器首先会根据请求的信息判 断，强缓存是否命中，如果命中则直接使用资源。如果不命中则根据头信息向服务器发起请求， 使用协商缓存，如果协商缓存命中的话，则服务器不返回资源，浏览器直接使用本地资源的副本， 如果协商缓存不命中，则浏览器返回最新的资源给浏览器。




### 请求时浏览器缓存 from memory cache 和 from disk cache 的区别是什么？

**Memory Cache 也就是内存中的缓存**，主要包含的是当前中页面中已经抓取到的资源,例如页面上**已经下载的样式、脚本、图片等**。

读取内存中的数据肯定比磁盘快,内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。

当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存。

**Disk Cache 也就是存储在硬盘中的缓存**，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。

- 对于大文件来说，大概率是不存储在内存中的，反之优先
- 当前系统内存使用率高的话，文件优先存储进硬盘



参考地址：
[深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)


### 简单说下V8引擎工作原理

在为数不多 JavaScript 引擎中，V8 无疑是最流行的，Chrome 与 Node.js 都使用了 V8 引擎，Chrome 的市场占有率高达 60%，而 Node.js 是 JS 后端编程的事实标准。

JavaScript 是一门动态类型语言，这会给编译器增加很大难度，因此专家们觉得它的性能很难提高，但是 V8 居然做到了，生成了非常高效的 machine code，这使得 JS 可以应用在各个领域，比如 Web、APP、桌面端、服务端以及 IOT。

V8 由许多子模块构成，其中这 4 个模块是最重要的：

*   [Parser](https://v8.dev/blog/scanner)：负责将 JavaScript 源码转换为 Abstract Syntax Tree (AST)
*   [Ignition](https://v8.dev/docs/ignition)：interpreter，即解释器，负责将 AST 转换为 Bytecode，解释执行 Bytecode；同时收集 TurboFan 优化编译所需的信息，比如函数参数的类型；
*   [TurboFan](https://v8.dev/docs/turbofan)：compiler，即编译器，利用 Ignitio 所收集的类型信息，将 Bytecode 转换为优化的机器代码；
*   [Orinoco](https://v8.dev/blog/trash-talk)：garbage collector，[垃圾回收](https://blog.fundebug.com/2019/07/03/javascript-garbage-collection/)模块，负责将程序不再需要的内存空间回收；


其编译过程如图：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119174301.png"/>

简单地说，Parser 将 JS 源码转换为 AST，然后 Ignition 将 AST 转换为 Bytecode，最后 TurboFan 将部分热点代码 Bytecode 转换为经过优化的 Machine Code。

*   如果函数没有被调用，则 V8 不会去编译它。
*   如果函数只被调用 1 次，则 Ignition 将其编译 Bytecode 就直接解释执行了。TurboFan 不会进行优化编译，因为它需要 Ignition 收集函数执行时的类型信息。这就要求函数至少需要执行 1 次，TurboFan 才有可能进行优化编译。
*   如果函数被调用多次，则它有可能会被识别为热点函数，且 Ignition 收集的类型信息证明可以进行优化编译的话，这时 TurboFan 则会将 Bytecode 编译为 Optimized Machine Code，以提高代码的执行性能。


至于垃圾回收，可以参考[谈谈v8中的gc策略](/cp/browser.html#%E8%B0%88%E8%B0%88v8%E4%B8%AD%E7%9A%84gc%E7%AD%96%E7%95%A5)


参考：

[v8官网](https://v8.dev/)

[JavaScript深入浅出第4课：V8引擎是如何工作的？](https://blog.fundebug.com/2019/07/16/how-does-v8-work/)

### V8做了哪些事情来优化浏览器的性能？

1、脚本流(script streaming)

以前的chrome里，网络拿到数据之后，必须经过chrome主线程转发到流解析器。但是，当网络数据到达之后，主线程有可能被其他事情占住，比如HTML解析，布局，其他JS执行。这样这些数据就没办法被即使解析。

从Chrome 75开始，V8可以将脚本直接从网络流传输到流解析器中，而无需等待chrome主线程。

这意味着脚本一旦开始加载，V8就会在单独的线程上解析。这样下载脚本完成后几乎立即完成解析，从而缩短页面加载时间。

2、字节码缓存

首次访问页面的时候，JS代码会被编译成字节码。当再次访问同一个页面的时候，会直接复用首次解析出来的字节码。这样就省去了下载，解析，编译的步骤，可以使chrome节省大约40%的时间。

3、内联

如果一个函数内部调用其他函数，那么编译器会直接函数中将要执行的内容放到主函数里。

4、隐藏类

对于C++/Java，访问指令可以在编译阶段生成。

因为它们的每一个变量都有指定的类型。所以一个对象包含什么成员，这些成员是什么类型，在对象中的偏移量都可以在编译阶段就确定了。那么在CPU执行的时候就轻松了，要访问这个对象中的某个变量的时候，直接用对象的首地址加偏移量就可以访问到。

但是JS是动态语言，运行的时候不仅可以随意换类型，还可以动态添加删除属性。所以访问对象属性完全得运行的时候才能决定。

如果JS引擎每次都需要进行动态查询，会造成大量的性能损耗。所以V8引入了隐藏类机制。在初始化对象时候，会给他创建一个隐藏类，而后增删属性都会在创建一个隐藏类或者查找之前已经创建好的类。

那么这些隐藏类里的成员对于这个类来说就是固定的。所以他们的偏移量对于这个类来说也是固定的，那么在后续再次调用的时候就能很快的定位到他的位置。

``` javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

var daisy = new Person("daisy", 32);
var alice = new Person("alice", 20);

daisy.email = "daisy@qq.com";
daisy.job = "engineer";

alice.job = "engineer";
alice.email = "alice@qq.com";

```

对于这段代码，它的隐藏类的生成过程如下：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200803173218.png"/>

首先两个new Person（）的时候，生成的隐藏类为C0，因为此时没有任何属性。当执行this.name = name;的时候多了一个属性，于是又生成了C1。后面同理，到C2生成的时候，daisy跟alice的隐藏类都是一样的，就是C2，此时有两个属性。

但是后面由于动态添加属性的顺序不同，就造成了属性在类中的偏移量不同，也会生成不同的隐藏类。这样就没办法共享隐藏类，导致浪费资源生成新的隐藏类。

所以我们动态赋值的时候，尽量保证顺序也是一致的。

5、热点函数会被直接编译成机器码

v8在运行的时候，会采集JS代码运行数据。当发现某个函数被频繁调用，那么就会将它标记成热点函数，并且认为他是一个类型稳定的函数。这时候会将它生成更为高效的机器码。

但是在后面的运行中，万一类型发生变化，V8又要回退到字节码。




参考：

[从敲下一行JS代码到这行代码被执行，中间发生了什么？](https://mp.weixin.qq.com/s/D2aPqf9qcfFJLSGTE4G8kg)

### 谈谈V8中的GC策略

Nodejs和chrome都是基于V8引擎来渲染的，所以了解V8引擎是至关重要的。

简单来说，垃圾回收是指回收那些在应用程序中不在引用的对象，当一个对象无法从根节点访问这个对象就会做为垃圾回收的候选对象。这里的根对象可以为全局对象、局部变量，无法从根节点访问指的也就是不会在被任何其它活动对象所引用。

**V8的内存限制**：内存在服务端本来就是一个寸土寸金的东西，**在 V8 中限制 64 位的机器大约 1.4GB**，32 位机器大约为 0.7GB。因此，对于一些大内存的操作需谨慎否则**超出 V8 内存限制将会造成进程退出**。

垃圾针对栈和堆是不同的处理。

针对栈，当**一个函数执行结束之后**，JavaScript引擎会通过向下移动ESP（记录当前执行状态的指针）来**销毁该函数保存在栈中的执行 上下文**：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119165700.png"/>

针对堆，在栈内容回收后，堆里的内容不会回收，要回收堆中的垃圾数据，就需要用到JavaScript中 的垃圾回收器了。

在V8中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放
的生存时间久的对象。 **新生区通常只支持1〜8M的容量，而老生区支持的容量就大很多了**。对于这两块区域，V8分别使用两个不同的垃圾回收器，以便更高效地实施垃圾回收。

副垃圾回收器，主要负责新生代的垃圾回收。

主垃圾回收器，主要负责老生代的垃圾回收。 

不论什么 类型的垃圾回收器，它们都有一套共同的执行流程。

第一步是**标记**空间中活动对象和非活动对象。所谓活动对象就是还在使用的对象，非活动对象就是可以进行 垃圾回收的对象。

第二步是**回收非活动对象所占据的内存**。其实就是在所有的标记完成之后，统一清理内存中所有被标记为可 回收的对象。

第三步是做**内存整理**。一般来说，频繁回收对象后，内存中就会存在大量不连续空间，我们把这些不连续的 内存空间称为内存碎片。当内存中出现了大量的内存碎片之后，如果需要分配较大连续内存的时候，就有可 能出现内存不足的情况。所以最后一步需要整理这些内存碎片。

针对副垃圾回收器（也就是新生代垃圾回收）。而通常情况下，大多数小的对象都会被分配到新生区，所以说这 个区域虽然不大，但是垃圾回收还是比较频繁的。
新生代中用Scavenge算法来处理。

所谓**Scavenge算法**，是把新生代空间对半划分为两个区域，一半是对象 区域，一半是空闲区域，如下图所示:

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119171209.png"/>

新加入的对象都会存放到对象区域，当对象区域快被写满时，就需要执行一次垃圾清理操作。

在垃圾回收过程中，首先要对对象区域中的垃圾做标记;

标记完成之后，就进入垃圾清理阶段，副垃圾回收 器会把这些存活的对象复制到空闲区域中，同时它还会把这些对象有序地排列起来，所以**这个复制过程，也 就相当于完成了内存整理操作**，复制后空闲区域就没有内存碎片了。


完成复制后，对象区域与空闲区域**进行⻆色翻转**，也就是原来的对象区域变成空闲区域，原来的空闲区域变 成了对象区域。这样就完成了垃圾对象的回收操作，同时这种⻆色翻转的操作还能让新生代中的这两块区域 无限重复使用下去。

由于新生代中采用的Scavenge算法，所以每次执行清理操作时，都需要将存活的对象从对象区域复制到空 闲区域。但**复制操作需要时间成本，如果新生区空间设置得太大了，那么每次清理的时间就会过久，所以为 了执行效率，一般新生区的空间会被设置得比较小**。

也正是因为新生区的空间不大，所以很容易被存活的对象装满整个区域。为了解决这个问题，JavaScript引 擎采用了**对象晋升策略**，也就是经过两次垃圾回收依然还存活的对象，会被移动到老生区中。

针对主垃圾回收器（也就是老生代），由于老生区的对象比较大，若要在老生区中使用Scavenge算法进行垃圾回收，复制这些大的对象将会花费 比较多的时间，从而导致回收执行效率不高，同时还会浪费一半的空间。因而，主垃圾回收器是采用**标记- 清除**(Mark-Sweep)的算法进行垃圾回收的。

当栈中的垃圾回收后：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119171636.png"/>

对垃圾进行标记。遍历调用栈，是不会找到引用1003地址的变量，也就意味着1003这块数据 为垃圾数据，被标记为红色。由于1050这块数据被变量b引用了，所以这块数据会被标记为活动对象。这就 是大致的标记过程。

而清除过程和副垃圾回收器的垃圾清除过程完全不同，你可以理解这个过程是清除掉红 色标记数据的过程，可参考下图大致理解下其清除过程:

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119171800.png"/>

产生了大量的内存碎片，于是又产生了另外一种算法---**标 记-整理**(Mark-Compact)，让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119171947.png"/>


在垃圾回收的基础上，由于一旦执行垃圾回收算法，都需要将正在执行的JavaScript脚本暂停下来，待垃圾回收完毕后再恢复 脚本执行。

所以为了降低老生代的垃圾回收而造成的卡顿，V8将标记过程分为一个个的子标记过程，同时让垃圾回收标记 和JavaScript应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为**增量标记**(Incremental Marking)算法，如下图：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119172139.png"/>

把一个完整的垃圾回收任务拆分为很多小的任务，这些小的任务执行时间比较短， 可以穿插在其他的JavaScript任务中间执行。

参考：

[Node.js内存管理和V8垃圾回收机制](https://zhuanlan.zhihu.com/p/72380507?utm_source=wechat_session&utm_medium=social&utm_oi=41809770184704&from=singlemessage&isappinstalled=0&wechatShare=1&s_r=0)

[引擎V8推出“并发标记”，可节省60%-70%的GC时间 - 前端 - 掘金](https://juejin.im/entry/5b1fa706e51d4506a14dd041)


### 标记清除和引用计数的区别？

标记清除法

垃圾回收机制获取根并标记他们，然后访问并标记所有来自它们的引用，然后在访问这些对象并标记它们的引用…如此递进结束后若发现有没有标记的（不可达的）进行删除，进入执行环境的不能进行删除

引用计数法

当声明一个变量并给该变量赋值一个引用类型的值时候，该值的计数+1，当该值赋值给另一个变量的时候，该计数+1，当该值被其他值取代的时候，该计数-1，当计数变为0的时候，说明无法访问该值了，垃圾回收机制清除该对象。

引用计数存在循环引用的问题。为此放弃了引用计数方式，转而采用标记清除来实现其垃圾收集机制。



### 谈谈浏览器加载的逻辑

当浏览器获得一个html文件时，会”自上而下“加载，并在加载过程中进行解析渲染。 

加载过程中遇到外部css文件，浏览器另外发出一个请求，来获取css文件。 

遇到图片资源，浏览器也会另外发出一个请求，来获取图片资源。

**css/图片这些异步请求，并不会影响html文档进行加载**。

但是**当文档加载过程中遇到js文件，html文档会挂起渲染（加载解析渲染同步）的线程，不仅要等待文档中js文件加载完毕，还要等待解析执行完毕，才可以恢复html文档的渲染线程**。

一个**不太严谨但方便记忆的口诀：JS 全阻塞，CSS 半阻塞JS**

- JS会阻塞后续 DOM 解析以及其它资源(如 CSS，JS 或图片资源)的加载。
- CSS不阻塞DOM的加载和解析（它只阻塞DOM的渲染呈现。这里谈加载），不会阻塞其它资源(如图片)的加载，但是会阻塞 后续JS 文件的执行（原因之一是，js执行代码可能会依赖到css样式。css只阻塞执行而不阻塞js的加载）。
- 鉴于上面的特性，当css后面存在js的时候，css会间接地阻塞js后面资源的加载（css阻塞js，js阻塞其他资源 ）。
- 现代浏览器会进行 prefetch 优化，浏览器在获得 html 文档之后会对页面上引用的资源进行提前下载 。       

外联js文件使用defer属性和asyn可以达到异步非阻塞加载的效果，**由于现代浏览器都存在 prefetch，所以 defer, async 可能并没有太多的用途**，可以作为了解扩展知识，仅仅将脚本文件放到 body 底部(但还是在</body>之前)就可以起到很不错的优化效果（遵循先解析再渲染再执行script这个顺序）。当把js放在最后的时候，其实浏览器将自动忽略`</body>`标签，从而自动在最后的最后补上`</body>`。


### 加载css会阻塞吗？

首先了解[谈谈浏览器加载的逻辑](/cp/browser.html#%E8%B0%88%E8%B0%88%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8A%A0%E8%BD%BD%E7%9A%84%E9%80%BB%E8%BE%91)。

css 加载不会阻塞 HTML 解析，但会阻塞 DOM 渲染。css 加载会阻塞后面 js 的执行。

由于 JavaScript 是可操纵 DOM 和 css 的，如果在修改这些元素属性同时渲染界面，会造成冲突。

为了防止渲染出现不可预期的结果，浏览器设置 GUI 渲染线程与 JavaScript 引擎为互斥的关系。

所以 css 会阻塞后面 js 的执行。

参考：

[「浏览器渲染流程」中的 9 个面试点](https://juejin.cn/post/6860088295905296397)

### 加载js会阻塞吗？

首先了解[谈谈浏览器加载的逻辑](/cp/browser.html#%E8%B0%88%E8%B0%88%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8A%A0%E8%BD%BD%E7%9A%84%E9%80%BB%E8%BE%91)。

js会阻塞页面加载。

因为 GUI 渲染线程与 JS 引擎线程是互斥的，js 引擎线程会阻塞 GUI 渲染线程。

浏览器渲染的时候遇到 `<script>` 标签，就会停止 GUI 的渲染，js 线程开始工作。

等 js 执行完毕，GUI 线程才会继续执行，所以 js 可能会造成页面卡顿。





参考：

[「浏览器渲染流程」中的 9 个面试点](https://juejin.cn/post/6860088295905296397)

### 谈谈浏览器解析过程

1、浏览器通过请求的 URL 进行域名解析，向服务器发起请求，接收文件（HTML、CSS、JS、Images等等）。

2、HTML 文件加载后，开始构建 DOM Tree（DOM树）

3、CSS 样式文件加载后，开始解析和构建 CSS Rule Tree

4、Javascript 脚本文件加载后， 通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree


### 谈谈浏览器渲染过程


<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119163834.png"/>

结合上图，一个完整的渲染流程大致可总结为如下:
1. 渲染进程将HTML内容转换为能够读懂的DOM树结构。
2. 渲染引擎将CSS样式表转化为浏览器可以理解的styleSheets，计算出DOM节点的样式。
3. 创建布局树，并计算元素的布局信息。
4. 对布局树进行分层，并生成分层树。
5. 为每个图层生成绘制列表，并将其提交到合成线程。
6. 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。
7. 合成线程发送绘制图块命令DrawQuad给浏览器进程。
8. 浏览器进程根据DrawQuad消息生成⻚面，并显示到显示器上。


### 重排和重绘是什么？

由于**节点的几何属性发生改变或者由于样式发生改变**而**不会影响布局**的，称为**重绘**，例如outline, visibility, color、background-color等，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。

**重排**是布局或者几何属性需要改变。重排是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的重排可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的重排。

**重排必定会发生重绘，重绘不一定会引发重排。**

### 如何避免重排和重绘？

js方面：

现代浏览器做了一定的优化，通过队列机制来批量更新布局，浏览器会把修改操作放在队列中，至少一个帧（即16.6ms）才会清空队列，但当你获取布局信息的时候，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发重排与重绘来确保返回正确的值。

主要包括以下属性或方法：

offsetTop、offsetLeft、offsetWidth、offsetHeight
scrollTop、scrollLeft、scrollWidth、scrollHeight
clientTop、clientLeft、clientWidth、clientHeight

width、height

getComputedStyle()


所以，我们应该**避免频繁的使用上述的属性，他们都会强制渲染刷新队列**。


css方面：

- 使用 transform 替代 top

- 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局

- 避免使用table布局，可能很小的一个小改动会造成整个 table 的重新布局。

- 尽可能在DOM树的最末端改变class，回流是不可避免的，但可以减少其影响。尽可能在DOM树的最末端改变class，可以限制了回流的范围，使其影响尽可能少的节点。

- 避免设置多层内联样式，CSS 选择符从右往左匹配查找，避免节点层级过多。

- 将动画效果应用到position属性为absolute或fixed的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 requestAnimationFrame，详见探讨 requestAnimationFrame。

- 避免使用CSS表达式，可能会引发回流。

- 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，例如will-change、video、iframe等标签，浏览器会自动将该节点变为图层。

- CSS3 硬件加速（GPU加速），使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。



### 浏览器中输入url到页面呈现到底发生了什么？

完整流程：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200119160626.png"/>


总体分为以下几个步骤：

1、DNS解析

先进行DNS域名解析，先查看本地hosts文件，查看有没有当前域名对应的ip地址，若有直接发起请求，没有的话会在本地域名服务器去查找，该查找属于递归查找，如果本地域名服务器没查找到，会从根域名服务器查找，该过程属于迭代查找，根域名会告诉你从哪个与服务器查找，最后查找到对应的ip地址后把对应规则保存到本地的hosts文件中。

如果想加速以上及之后的http请求过程的话可以使用缓存服务器CDN，CDN过程如下：

用户输入url地址后，本地DNS会解析url地址，不过会把最终解析权交给CNAME指向的CDN的DNS服务器

CDN的DNS服务器会返回给浏览器一个全局负载均衡IP

用户会根据全局负载均衡IP去请求全局负载均衡服务器

全局负载均衡服务器会根据用户的IP地址，url地址，会告诉用户一个区域负载均衡设备，让用户去请求它。

区域负载均衡服务器会为用户选择一个离用户较近的最优的缓存服务器，并把ip地址给到用户

用户想缓存服务器发送请求，如果请求不到想要的资源的话，会一层层向上一级查找，知道查找到为止。




2、TCP连接

3、发送HTTP请求

4、服务器处理请求并返回HTTP报文

服务器处理，可能返回304也可能返回200

返回304说明客户端缓存可用，直接使用客户端缓存即可，该过程属于协商缓存

返回200的话会同时返回对应的数据

5、浏览器解析渲染页面

客户端自上而下执行代码

其中遇到CSS加载的时候，CSS不会阻塞DOM树的解析，但是会阻塞DOM树的渲染，并且CSS会阻塞下面的JS的执行

然后是JS加载，JS加载会影响DOM的解析，之所以会影响，是因为JS可能会删除添加节点，如果先解析后加载的话，DOM树还得重新解析，性能比较差。如果不想阻塞DOM树的解析的话，可以给script添加一个defer或者async的标签。

defer：不会阻塞DOM解析，等DOM解析完之后在运行，在DOMContentloaed之前

async: 不会阻塞DOM解析，等该资源下载完成之后立刻运行

进行DOM渲染和Render树渲染

获取html并解析为Dom树

解析css并形成一个cssom（css树）

将cssom和dom合并成渲染树（render树）

进行布局（layout）

进行绘制（painting）

回流重绘

回流必将引起重绘，重绘不一定引起回流

6、连接结束



DNS解析参考：[简单说下dns解析的过程](/cp/network.html#%E7%AE%80%E5%8D%95%E8%AF%B4%E4%B8%8Bdns%E8%A7%A3%E6%9E%90%E7%9A%84%E8%BF%87%E7%A8%8B)

TCP连接参考：[如何理解三次握手和四次挥手？](/cp/network.html#%E5%A6%82%E4%BD%95%E7%90%86%E8%A7%A3%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%92%8C%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%EF%BC%9F)

HTTP参考：[https的握手过程是什么样子的？](/cp/network.html#https%E7%9A%84%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E6%98%AF%E4%BB%80%E4%B9%88%E6%A0%B7%E5%AD%90%E7%9A%84%EF%BC%9F)

浏览器加载渲染参考：[谈谈浏览器加载的逻辑](/cp/browser.html#%E8%B0%88%E8%B0%88%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8A%A0%E8%BD%BD%E7%9A%84%E9%80%BB%E8%BE%91)

浏览器渲染逻辑参考：[谈谈浏览器渲染过程](/cp/browser.html#%E8%B0%88%E8%B0%88%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E8%BF%87%E7%A8%8B)



### 浏览器的事件流模型是什么样子的？为什么一般在冒泡阶段处理事件？如何在冒泡阶段处理？

模型为：

捕获-》目标-》冒泡

在冒泡阶段处理的原因是：

1、兼容性：

对于绑定事件，ie低版本的浏览器是用attachEvent，而高版本ie和标准浏览器用的是addEventListener，**attachEvent不能指定绑定事件发生在捕获阶段还是冒泡阶段，它只能将事件绑定到冒泡阶段**，但是并不意味这低版本的ie没有事件捕获，它也是先发生事件捕获，再发生事件冒泡，只不过这个过程无法通过程序控制。

2、为事件代理(委托)提供条件，即事件代理依赖事件冒泡。

通过addEventListener的第三个参数来决定，为true则是捕获，为false或默认都是冒泡。


参考：

[浏览器事件模型中捕获阶段、目标阶段、冒泡阶段实例详解 - 本期节目 - SegmentFault 思否](https://segmentfault.com/a/1190000003482372)

[浏览器事件有哪些过程? 为什么一般在冒泡阶段，而不是在捕获阶段注册监听? · Issue #11 · maoxiaoke/one-day-one-puzzle](https://github.com/maoxiaoke/one-day-one-puzzle/issues/11)

### 浏览器每一帧到底做了什么？

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200603112032.png"/>

一帧包含了用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。
假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调，如下图所示：

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200603112123.png"/>

requestIdleCallback利用的是帧的空闲时间，所以就有可能出现浏览器一直处于繁忙状态，导致回调一直无法执行。

参考：

[你应该知道的requestIdleCallback - 掘金](https://juejin.im/post/5ad71f39f265da239f07e862)


### 如何暂停和恢复一个函数？

首先了解[简单说下generator的用法？](/language/javascript.html#%E7%AE%80%E5%8D%95%E8%AF%B4%E4%B8%8Bgenerator%E7%9A%84%E7%94%A8%E6%B3%95%EF%BC%9F)

然后了解[什么是协程，和线程什么关系？](/cp/os.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8D%8F%E7%A8%8B%EF%BC%8C%E5%92%8C%E7%BA%BF%E7%A8%8B%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB%EF%BC%9F)

看看generator是怎么和协程联系起来的？

1、通过调用生成器函数genDemo来创建一个协程gen，创建之后，gen协程并没有立即执行。 

2、要让gen协程执行，需要通过调用gen.next。 

3、当协程正在执行的时候，可以通过yield关键字来暂停gen协程的执行，并返回主要信息给父协 程。 

4、如果协程在执行期间，遇到了return关键字，那么JavaScript引擎会结束当前协程，并将 return后面的内容返回给父协程。