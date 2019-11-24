// babel-loader

import './index.less'
class School {
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
}
let school = new School('zfpx',9);
console.log(school);
// fileloader 的原理 会先生成一张图片 之后把生成的图片地址给photo 属性
import photo from './public.jpg';
console.log(photo);
let img = document.createElement('img');
img.src = photo;
document.body.appendChild(img);