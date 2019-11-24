export default {
  init(cb){
    // window.addEventListener('error',fn,true)
    // promise失败了不能通过 onerror  .... 捕获promise错误
    window.onerror = function (message, source, lineno, colno, error) {
      console.dir(error); 
      let info = {
        message:error.message,
        name:error.name
      };
      let stack = error.stack;
      let matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
      console.log(matchUrl)
      info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0];
      this.console.log(info.filename)
      let [,row,colume] = matchUrl.match(/:(\d+):(\d+)/);
      info.row = row;
      info.colume = colume; // 上线的时候代码会压缩 source-map 找到对应的真实的报错
      cb(info);
    }
  }
}