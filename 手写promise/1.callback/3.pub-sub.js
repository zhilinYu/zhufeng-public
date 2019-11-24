let fs = require('fs');

// 发布 订阅 发布者和订阅者是没有依赖关系的
// 观察者模式 发布和订阅的 被观察者是依赖于观察者的
let dep = {
  arr:[],
  on(callback){
    this.arr.push(callback)
  },
  emit(){
    this.arr.forEach(item => {
      item();
    });
  }
}
let school = {}
dep.on(function () {
  if (Object.keys(school).length === 2) {
    console.log(school);
  }
});
fs.readFile('./age.txt', 'utf8', function (err, data) {
  school['name'] = data;
  dep.emit();
});
fs.readFile('./name.txt', 'utf8', function (err, data) {
  school['age'] = data;
  dep.emit();
});