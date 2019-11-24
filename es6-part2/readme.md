## 1.集合
### 1.1 Set
一个Set是一堆东西的集合,Set有点像数组,不过跟数组不一样的是，Set里面不能有重复的内容
```
var books = new Set();
books.add('js');
books.add('js');//添加重复元素集合的元素个数不会改变
books.add('html');
books.forEach(function(book){//循环集合
    console.log(book);
})
console.log(books.size);//集合中元数的个数
console.log(books.has('js'));//判断集合中是否有此元素
books.delete('js');//从集合中删除此元素
console.log(books.size);
console.log(books.has('js'));
books.clear();//清空 set
console.log(books.size);
```

### 1.2 数组去重
```
let arr = [1,2,3,4,5,4,3,2,1];
let set = new Set([...arr]);
console.log([...set]);
```

### 1.3 ∩ && ∪ && 差集
```
let arr1 = [1,2,3,4,5];
let arr2 = [4,5,6,7,8];

// 并集 
function union(arr1,arr2){
    return [...new Set([...arr1,...arr2])];
}
console.log(union(arr1,arr2));

// 交集
function intersection(arr1,arr2){
    return arr1.filter(item=>new Set(arr2).has(item));
}
console.log(intersection(arr1,arr2));

// 差集
function difference(arr1,arr2){
    return arr1.filter(item=>!new Set(arr2).has(item));
}
console.log(difference(arr1,arr2));
```

### 1.4 Map
可以使用 Map 来组织这种名值对的数据
```
var books = new Map();
books.set('js',{name:'js'});//向map中添加元素
books.set('html',{name:'html'});
console.log(books.size);//查看集合中的元素
console.log(books.get('js'));//通过key获取值
books.delete('js');//执照key删除元素
console.log(books.has('js'));//判断map中有没有key
books.forEach((value, key) => { //forEach可以迭代map
    console.log( key + ' = ' + value);
});
books.clear();//清空map
```

## 2.Class
### 2.1 类的继承方式
#### 2.1.1 继承实例属性
```
function Parent(){
    this.name = 'zfpx';
}
Parent.prototype.eat = function(){
    console.log('吃饭');
}
function Child(){
    Parent.call(this);
    this.age = 9
}
let child = new Child();
console.log(child);
```
#### 2.1.2 继承公有属性
- 方案(1)
```
function Parent(){
    this.name = 'zfpx';
}
Parent.prototype.eat = function(){
    console.log('吃饭');
}
function Child(){
    this.age = 9
}
// Child.prototype.__proto__ = Parent.prototype;
Object.setPrototypeOf(Child.prototype,Parent.prototype);
let child = new Child();
child.eat(); 
```

- 方案(2)
```
function Parent(){
    this.name = 'zfpx';
}
Parent.prototype.eat = function(){
    console.log('吃饭');
}
function Child(){
    this.age = 9
}
Child.prototype = Object.create(Parent.prototype,{constructor:{value:Child}});
let child = new Child();
child.eat();
```

#### 2.1.3 继承全部属性
```
function Parent(){
    this.name = 'zfpx';
}
Parent.prototype.eat = function(){
    console.log('吃饭');
}
function Child(){
    this.age = 9
}
Child.prototype = new Parent();
let child = new Child();
child.eat();
```


### 2.2 ES6中的类
```
class Parent {
    constructor(){
        this.name = 'zfpx';
    }
    static p(){
        return '嘿嘿'
    }
    eat(){
        console.log('eat');
    }
}
class Child extends Parent{
    constructor(){
        super();
        this.age = 9;
    }
}
```

## 2.3 类的实现
### 2.3.1 类的调用检测
```
function _classCallCheck(ctor, inst) {
    if (!(inst instanceof ctor)) {
        throw TypeError("Class constructor " + ctor.name + " cannot be invoked without 'new'");
    }
}
let Child = (function () {
    return function Child() {
        _classCallCheck(Child, this);
    }
})();
Child();
```
### 2.3.2 公有属性定义
```
function defineProperty(target,property){
    for (let i = 0; i < property.length; i++) {
        Object.defineProperty(target, property[i].key, {
            enumerable: true,
            writable: true,
            ...property[i]
        });
    }
}
function _createClass(ctor, protoProperties, staticProperties) {
    if(protoProperties.length){
        defineProperty(ctor.prototype,protoProperties);
    }
    if(staticProperties.length){
        defineProperty(ctor,staticProperties);
    }
}
let Child = (function () {
    function Child() {
        _classCallCheck(Child, this);
    }
    _createClass(Child, [
        {
            key: 'cry',
            value: function () {
                console.log('哭');
            }
        }
    ], [
            {
                key: 'myName',
                value: function () {
                    return '孩子'
                }
            }
        ]);
    return Child;
})();
let child = new Child;
```

### 2.3.3 类的继承
```
function _classCallCheck(ctor, inst) {
    if (!(inst instanceof ctor)) {
        throw TypeError("Class constructor " + ctor.name + " cannot be invoked without 'new'");
    }
}
function defineProperty(target,property){
    for (let i = 0; i < property.length; i++) {
        Object.defineProperty(target, property[i].key, {
            enumerable: true,
            writable: true,
            ...property[i]
        });
    }
}
function _createClass(ctor, protoProperties, staticProperties) {
    if(protoProperties.length){
        defineProperty(ctor.prototype,protoProperties);
    }
    if(staticProperties.length){
        defineProperty(ctor,staticProperties);
    }
}
let Parent = (function(){
    function Parent(){
        _classCallCheck(Child, this);
    }
    return Parent;
})();
function _inherits(Child,Parent){
    Child.prototype = Object.create(Parent.prototype,{constructor:{value:Child}});
    Child.__proto__ = Parent;
}
let Child = (function (Parent) {
    _inherits(Child,Parent);
    function Child() {
        Parent.call(this);
        _classCallCheck(Child, this);
    }
    _createClass(Child, [
        {
            key: 'cry',
            value: function () {
                console.log('哭');
            }
        }
    ], [
            {
                key: 'myName',
                value: function () {
                    return '孩子'
                }
            }
        ]);
    return Child;
})(Parent);
let child = new Child;
```

## 3.装饰器应用


## 4.箭头函数应用

## 5.模板字符串
### 5.1 模板字符串
模板字符串用反引号(数字1左边的那个键)包含，其中的变量用${}括起来
```
let name = 'JiangWen';
let age = 28;
let result = `My name is ${name} . I am ${age} years old`;
console.log(result); // My name is JiangWen . I am 28 years old
```

### 5.2 模板字符串实现
```
let name = 'JiangWen';
let age = 28;
let result = 'My name is ${name} . I am ${age} years old';
result = result.replace(/\$\{([^}]*)\}/g,function(){
    return eval(arguments[1]);
});
console.log(result);
```

### 5.3 模板字符串换行
```
let name = 'JiangWen';
let age = 28;
let userInfo = [name, age];
let lis = userInfo.map(function (info) {
    return `<li>${info}</li>`
});
let ul = `
    <ul>
        ${lis.join('')}
    </ul>
`;
console.log(ul);
```

### 5.4 模板标签
```
let name = 'JiangWen';
let age = 28;
function tag(strings) {
    let values = Array.prototype.slice.call(arguments, 1);
    let result = '';
    for (let key in values) {
        result += strings[key] + values[key].toString().toUpperCase();
    }
    result += strings[strings.length - 1];
    return result;
}
let result = tag`My name is ${name} . I am ${age} years old`;
console.log(result);
```