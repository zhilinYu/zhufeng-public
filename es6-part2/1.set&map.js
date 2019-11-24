let set = new Set([1,2,3,3,2,1]);
set.add(5);
// console.log(set);
// 默认和我们的值相等
// forEach 不能break of数组  in 对象 有什么区别
for(let [key,value] of set.entries()){
    console.log(key,value);
}

// 数组去重 求并集
function union(arr1,arr2){
    return [...new Set([...arr1,...arr2])]
}
console.log(union([1,2,3],[2,3,4,5]));

// 求并集 交集 差集
function insetction(arr1,arr2){
    return arr1.filter(item=> new Set(arr2).has(item));
}
console.log(insetction([1,2,3],[2,3,4,5]))

function diffrence(arr1,arr2){
    return arr1.filter(item=> !new Set(arr2).has(item));
}
console.log(diffrence([1,2,3],[2,3,4,5]));

// map 集合  要key => value 不能放重复的

let  map =  new Map();
map.set('js','node');
map.set('js','js');
console.log(map);
for(let [key,value] of map.entries()){
    console.log(key,value);
}

// 对象遍历 {"name":"zfpx","age":9}
// es5 
console.log(Object.keys({"name":"zfpx","age":9}));
console.log(Object.values({"name":{name:1},"age":9}));


