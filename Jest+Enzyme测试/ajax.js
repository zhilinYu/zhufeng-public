function ajax(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    callback(xhr.response);
  }
  xhr.send();
}

module.exports = ajax;