## 1.JWT
JWT(json web token)是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准。
JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上。
因为数字签名的存在，这些信息是可信的，JWT可以使用HMAC算法或者是RSA的公私秘钥对进行签名

// session服务端

## 2.主要应用场景
身份认证在这种场景下，一旦用户完成了登陆，在接下来的每个请求中包含JWT，可以用来验证用户身份以及对路由，服务和资源的访问权限进行验证。
信息交换在通信的双方之间使用JWT对数据进行编码是一种非常安全的方式，由于它的信息是经过签名的，可以确保发送者发送的信息是没有经过伪造的

## 3.JWT的结构 JWT包含了使用.分隔的三部分
Header 头部 {typ:'JWT',alg:'HS256'}
Payload 负载 需要数据 {'id',username,address}
Signature 签名  xxxxqqq

// {typ:'JWT',alg:'HS256'}=>base64.{'id',username,address}=>base64.xxxxqqq

// 会存到localStorge

### 3.1 Header
在header中通常包含了两部分：token类型和采用的加密算法。

{ "alg": "HS256", "typ": "JWT"}
接下来对这部分内容使用Base64Url编码组成了JWT结构的第一部分。

### 3.2 Payload
负载就是存放有效信息的地方。这个名字像是指货车上承载的货物，这些有效信息包含三个部分

标准中注册 的声明
公共的声明
私有的声明

#### 3.2.1 标准中注册的声明 (建议但不强制使用)
iss: jwt签发者
sub: jwt所面向的用户
aud: 接收jwt的一方
exp: jwt的过期时间，这个过期时间必须要大于签发时间,这是一个秒数
nbf: 定义在什么时间之前，该jwt都是不可用的.
iat: jwt的签发时间

#### 3.2.2 公共的声明
公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密

#### 3.2.3 私有的声明
私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为base64是对称解密的，意味着该部分信息可以归类为明文信息

#### 3.2.4 负载使用的例子
{ "sub": "1234567890", "name": "zfpx", "admin": true}
上述的负载需要经过Base64Url编码后作为JWT结构的第二部分

### 3.3 Signature
创建签名需要使用编码后的header和payload以及一个秘钥
使用header中指定签名算法进行签名
例如如果希望使用HMAC SHA256算法，那么签名应该使用下列方式创建
HMACSHA256( base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
签名用于验证消息的发送者以及消息是没有经过篡改的
完整的JWT 完整的JWT格式的输出是以. 分隔的三段Base64编码
密钥secret是保存在服务端的，服务端会根据这个密钥进行生成token和验证，所以需要保护好。


// 用express 实现一个jwt 权限校验  vue

// 刚开始用户登录后可以进入 订单页
// /order -> /login
// /login -> /order

## 安装cli
- npm install -g @vue/cli
- vue create jwt-front
- npm install axios