## 1.解构赋值
分解一个对象的结构。
### 1.1 数组的解构
```
let arr = [1, 2, 3];
let a = arr[0];
let b = arr[1];
let c = arr[2];
// 等价于
let [a, b, c] = arr;
```
### 1.2 对象的解构
```
let { name, age } = { name: 'jw', age: 25 };
console.log(name, age); // jw 25
```

### 1.3 解构的重命名
```
let { name: myName, age: myAge } = { name: 'jw', age: 25 }
console.log(myName, myAge); // jw 25
```
### 1.4 复杂的解构
```
let [
    { name: myName, age: myAge },
    { hobby: [sleep] },
    address
] = [
        { name: 'jw', age: 25 },
        { hobby: ['sleep', 'coding'] },
        '回龙观'
    ]
console.log(myName, myAge, sleep, address);
```
### 1.5 默认解构
```
let { name, age = 8 } = { name: 'jw' };
console.log(name, age);
```

> 当对象中没有此属性时会采用默认值

### 1.6 省略解构
```
let [, , address] = ['jw', 25, '回龙观 '];
console.log(address);
```

### 1.7 应用场景
```
function ajax(options) {
    var method = options.method || "get";
    var data = options.data || {};
    //.....
}
function ajax({ method = "get", data }) {
    console.log(method, data);
}
ajax({
    method: "post",
    data: { "name": "jw" }
});
```


## 2.展开运算符
### 2.1 展开数组
```
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let result = [...arr1, ...arr2];
console.log(result); // [ 1, 2, 3, 4, 5, 6 ]
```
### 2.2 对象展开
```
let name = {name:'jw'};
let age = {age:8};
let result = {...name,...age}
console.log(result);// { name: 'jw', age: 8 }
```
### 2.3 应用场景
```
function max() {
    console.log(Math.max(...arguments));
}
max(1, 3, 4);
```

> 将类数组进行展开,当然我们也可以用这种方式将类数组转化成数组

## 3.对象的拷贝
### 3.1 浅拷贝
- Object.assign
```
var nameObj = { name: { school: 'jw' } };
var ageObj = { age: 25 };
var obj = {};
Object.assign(obj, nameObj, ageObj);
console.log(obj);
```
- 对象展开
```
var nameObj = { name: { school: 'jw' } };
var ageObj = { age: 25 };
console.log({ ...nameObj, ...ageObj });
```

### 3.2 深拷贝
- JSON.parse&&JSON.stringify
```
var nameObj = { name: { school: 'jw' } };
var ageObj = { age: 25 };
console.log(JSON.parse(JSON.stringify({ ...nameObj, ...ageObj })));
```
- 递归拷贝
```
function deepClone(obj){
    if(typeof obj !== 'object') return obj;
    if(obj === null) return obj;
    if(obj instanceof RegExp) return new RegExp(obj); 
    if(obj instanceof Date) return new Date(obj);
    let o = new obj.constructor();
    for(let key in obj){
        o[key] = deepClone(obj[key]);
    }
    return o;
}
```

## 4.Object.defineProperty
### 4.1基础用法
```
let school = {name:''}
let val;
Object.defineProperty(school, 'name', {
  enumerable: true, // 可枚举,
  configurable: true, // 可配置
  get() {
    // todo
    return val;
  },
  set(newVal) {
    // todo
    val = newVal
  }
});
school.name = 'jw';
console.log(school.name);
```

### 4.2 响应式变化
```
let obj = { name: 'zfpx',age:'99',name:{name:1}};
function defineReactive(obj,key,value){
    Object.defineProperty(obj,key,{
        get(){
            return value;
        },
        set(newValue){
            value = newValue;
            alert('视图需要更新')
        }
    })
}
function observe(obj){
    if(typeof obj !== 'object') return
    for(let key in obj){
        defineReactive(obj,key,obj[key]);
        observe(obj[key])
    }
}
observe(obj);
```

## 5.proxy应用
### 5.1基础用法
```
let obj = {name:'zfpx'}
let proxy = new Proxy(obj,{
    get(target,key){
        return target[key];
    },
    set(target,key,value){
        // 属性发生变化
        obj[key] = value;
    }
});
```

### 5.2 响应式变化
```
let obj = {name:{name:'zfpx'}}
function $set(obj,fn){
    let proxy = new Proxy(obj,{
        set(target,key,value){
            alert('属性变化');
            target[key] = value;
        }
    });
    fn(proxy)
}
$set(obj.name,(proxy)=>{
    proxy.name = 'jw';
});
```

## Array.from
类数组转化成数组
```
let obj = {0:1,1:2,length:2}
console.log(Array.from(obj));
```

> [...obj] 这种形式为什么不行呢？



## 6.Symbol
第七种数据类型:null undefined object boolean string number
### 6.1 永远不相等的Symbol
```
let symbo1 = Symbol();
let symbo2 = Symbol();
console.log(symbo1 === symbo2);
console.log(typeof symbol === 'symbol')
```
### 6.2 Symbol.for
记录symbol
```
let s = Symbol.for('zhufeng');
let s1 = Symbol.for('zhufeng');
console.log(s === s1);
```
### 6.3 Symbol.keyFor
```
let s = Symbol.for('zhufeng');
let desc = Symbol.keyFor(s);
console.log(desc); // 查找描述
```

### 6.4 内置Symbol.iterator
```
let obj = {0:1,1:2,length:2,[Symbol.iterator]:function *(){
    let index = 0;
    while(index !== this.length){
        yield this[index++]
    }   
}};
let arr = [...obj];
console.log(arr);
```

## 7.模板字符串
### 7.1 模板字符串
模板字符串用反引号(数字1左边的那个键)包含，其中的变量用${}括起来
```
let name = 'JiangWen';
let age = 28;
let result = `My name is ${name} . I am ${age} years old`;
console.log(result); // My name is JiangWen . I am 28 years old
```

### 7.2 模板字符串实现
```
let name = 'JiangWen';
let age = 28;
let result = 'My name is ${name} . I am ${age} years old';
result = result.replace(/\$\{([^}]*)\}/g,function(){
    return eval(arguments[1]);
});
console.log(result);
```

### 7.3 模板字符串换行
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

### 7.4 模板标签
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

> 我们可以自定义模板字符串的呈现方式

## 8.数组的常见方法
```
Array.prototype.myReduce = function (fn, prev) {
  for (let i = 0; i < this.length; i++) {
    if (typeof prev === 'undefined') {
      prev = fn(this[i], this[i + 1], i + 1, this);
      ++i; // 保证下次取值时是正确的结果
    } else {
      prev = fn(prev, this[i], i, this);
    }
  }
  return prev;
}
```

> find/map/reduce/filter/forEach/findIndex/every/some

## 9.集合
### 9.1 Set
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
### 9.2 Map
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

## 82原则