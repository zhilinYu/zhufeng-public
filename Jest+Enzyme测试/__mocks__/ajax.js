function ajax(url, cb) {
  setTimeout(() => {
    cb([
      { "name": "zfpx" },
      { "name": "jw" },
      { "name": "jw" }
    ]);
  }, 100);
}
module.exports = ajax;