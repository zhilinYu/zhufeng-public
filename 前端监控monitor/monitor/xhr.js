export default {
  init(cb){
    // 发送请求 fetch xhr
    let xhr = window.XMLHttpRequest;
    let oldOpen = xhr.prototype.open;
    xhr.prototype.open = function (method,url,async,username,password) {
      this.info = {
        method, url, async, username, password
      }
      return oldOpen.apply(this,arguments);
    }
    let oldSend = xhr.prototype.send;
    xhr.prototype.send = function (value) {
      let start = Date.now();
      let fn = (type) => ()=>{
        this.info.time = Date.now() - start;
        this.info.requestSize = value? value.length:0;
        // 相应体的总长度
        this.info.responseSize = this.responseText.length;
        this.info.type = type;
        cb(this.info); // 把收集的ajax 数据传递出去
      }
      this.addEventListener('load', fn('load') ,false);
      this.addEventListener('error', fn('error') ,false);
      this.addEventListener('abort', fn('abort') ,false);
      return oldSend.apply(this,arguments);
    }
  }
  // window.fetch fecth也给重写 加上自己的监控代码
}