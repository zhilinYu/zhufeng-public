function $set(data,fn){ // 修改原有set方法
  let once = false;
  let proxy = new Proxy(data,{
    set(target, key, value) {
      if(target[key] !== value){ // 如果俩值相等 那好就不要更新了
        console.log('更新');
        return Reflect.set(target,key,value); //采用默认方式
      }else{
        return true
      }
    }
  });
  fn(proxy);
}
let data = {name:1,age:[1,2,3,4,5]};
$set(data.age,function (d) {
  d.push(4);
  console.log(d.length)
});