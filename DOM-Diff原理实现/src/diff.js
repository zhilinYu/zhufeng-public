function diff(oldTree,newTree) {
  let patches = {}
  let index = 0;
  // 递归树 比较后的结果放到补丁包种
  walk(oldTree,newTree,index,patches);
  return patches;
}
function diffAttr(oldAttrs,newAttrs) {
    let patch = {};
    // 判断老的属性种和新的属性的关系
    for(let key in oldAttrs){
      if(oldAttrs[key] !== newAttrs[key]){
        patch[key] = newAttrs[key]; // 有可能时undefined
      }
    }
    for(let key in newAttrs){
      // 老节点没有新节点的属性
      if(!oldAttrs.hasOwnProperty(key)){
        patch[key] = newAttrs[key];
      }
    }
    return patch;
}
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE'
let Index = 0;
function diffChildren(oldChildren,newChildren,patches) {
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child,idx) => {
    // 索引不应该是index了 ------------------
    // index 每次传递给waklk时 index是递增的,所有的人都基于一个序号来实现
    walk(child, newChildren[idx], ++Index,patches);
  });
}
function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]';
}
// inde被私有化到了walk作用域内
function walk(oldNode,newNode,index,patches) {
  let currentPatch = []; // 每个元素都有一个补丁对象
  if(!newNode){
    currentPatch.push({ type: REMOVE, index })
  }else if(isString(oldNode)&&isString(newNode)){ // 判断文本是否一致
    if(oldNode !== newNode){
      currentPatch.push({ type: TEXT,text:newNode});
    }
  }else if(oldNode.type === newNode.type){
    // 比较属性是否有更改
    let attrs = diffAttr(oldNode.props,newNode.props);
    if(Object.keys(attrs).length>0){
      currentPatch.push({ type: ATTRS,attrs})
    }
    // 如果有儿子节点 遍历儿子
    diffChildren(oldNode.children,newNode.children,patches);
  }else{
    // 说明节点被替换了
    currentPatch.push({ type: REPLACE, newNode });
  }
  if(currentPatch.length>0){ // 当前元素确实有补丁
    // 将元素和补丁对应起来 放到大补丁包中
    patches[index] = currentPatch;
  }
}
export default diff;