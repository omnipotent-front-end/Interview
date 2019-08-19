# Web安全

## 网络攻击

### CDN劫持如何防护？

[使用SRI解决CDN劫持问题](https://github.com/omnipotent-front-end/blog/blob/master/2019/07/20190704%E4%BD%BF%E7%94%A8SRI%E8%A7%A3%E5%86%B3CDN%E5%8A%AB%E6%8C%81%E9%97%AE%E9%A2%98.md)

### XSS和CSRF了解吗？为什么既要有cookie又要有token？

首先了解token和cookie的区别。

cookie：

登陆后后端生成一个sessionid放在cookie中返回给客户端，并且服务端一直记录着这个sessionid，客户端以后每次请求都会带上这个sessionid，**服务端通过这个sessionid来验证身份之类的操作**。所以**别人拿到了cookie拿到了sessionid后，就可以完全替代你**。

token：

登陆后后端返回一个token给客户端，客户端将这个token存储起来，然后每次客户端请求都需要开发者手动**将token放在header中带过去**，服务端每次只需要对这个token进行验证就能使用token中的信息来进行下一步操作了。

XSS攻击：

用户通过各种方式将恶意代码注入到其他用户的页面中。就可以通过脚本获取信息，发起请求，之类的操作。

CSRF操作：

跨站请求攻击，简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如发邮件，发消息，甚至财产操作如转账和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行

以一个CSRF例子来说明：

假如一家银行用以运行转账操作的URL地址如下： 

`http://www.examplebank.com/withdraw?account=AccoutName&amount=1000&for=PayeeName`

那么，一个恶意攻击者可以在另一个网站上放置如下代码： `<img src="<http://www.examplebank.com/withdraw?account=Alice&amount=1000&for=Badman>">`
如果有账户名为Alice的用户访问了恶意站点，而她之前刚访问过银行不久，登录信息尚未过期，那么她就会损失1000资金。

上面的两种攻击方式，如果被xss攻击了，不管是token还是cookie，都能被拿到，所以对于xss攻击来说，cookie和token没有什么区别。但是对于csrf来说就有区别了。

以上面的csrf攻击为例：


cookie：用户点击了链接，cookie未失效，导致发起请求后后端以为是用户正常操作，于是进行扣款操作。

token：用户点击链接，**由于浏览器不会自动带上token，所以即使发了请求，后端的token验证不会通过，所以不会进行扣款操作**。

所以总结下来：

1、token不是防止XSS的，而是为了防止CSRF的；

2、CSRF攻击的原因是**浏览器会自动带上cookie，而浏览器不会自动带上token**

参考地址：

[一题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/31)

---

### Https中间人攻击是什么？如何防护？

首先需要熟悉[https的握手原理](/cp/network.html#https的握手过程是什么样子的？)


中间人攻击过程如下：

1、服务器向客户端发送公钥。

2、攻击者截获公钥，保留在自己手上。

3、然后攻击者自己生成一个【伪造的】公钥，发给客户端。

4、客户端收到伪造的公钥后，生成加密hash值发给服务器。

5、攻击者获得加密hash值，用自己的私钥解密获得真秘钥。

6、同时生成假的加密hash值，发给服务器。

7、服务器用私钥解密获得假秘钥。

8、服务器用加秘钥加密传输信息

防范方法：

服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性。





### XSS是什么，攻击原理，怎么预防？

跨站脚本攻击XSS(cross site scripting)，简单来说，就是用户通过各种方式将恶意代码注入到其他用户的页面中。就可以通过脚本获取信息，发起请求，之类的操作。

攻击类型主要有两种：反射型和存储型。

存储型XSS，持久化，代码是存储在服务器中的，如在个人信息或发表文章等地方，加入代码，**如果没有过滤或过滤不严，那么这些代码将储存到服务器中，用户访问该页面的时候触发代码执行**。这种XSS比较危险，容易造成蠕虫，盗窃cookie等。

反射型XSS，非持久化，需要欺骗用户自己去点击链接才能触发XSS代码（服务器中没有这样的页面和内容），一般容易出现在搜索页面。

简单说了一下如何防御：

- 转义
    前后端在对应的输入展示处进行转义处理。对诸如`<script>、<img>、<a>`等标签进行过滤。

- cookie安全设置
    设置HttpOnly以避免cookie劫持的危险

- CSP
    CSP(content security policy)，是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。

参考：

[内容安全策略( CSP ) - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)



