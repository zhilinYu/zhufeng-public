## 同源策略
协议 域名 端口 同域

http://www.zf.cn:8081
https://a.zf.cn:8081


## 为什么浏览器不支持跨域
cookie LocalStorage  
DOM元素也有同源策略 iframe
ajax 也不支持跨域

## 实现跨域
- jsonp 
- cors
- postMessage
- window.name
- location.hash
- http-proxy
- nginx
- websocket
- document.domain