let ajax = require('./ajax');
function getUser(url,callback) {
  ajax(url, (res)=> {
    let html = ``;
    let userList = document.getElementById('userList')
    res.forEach(item => {
      html+= `<li>${item.name}</li>`
    });
    userList.innerHTML = html;
    callback();
  });
}

module.exports = getUser;