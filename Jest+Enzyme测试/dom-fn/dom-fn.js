// 删除dom元素

function removeNode(node) {
  node.parentNode.removeChild(node);
}


function on(node,type,callback) {
  node.addEventListener(type,callback,false);
}

exports.removeNode = removeNode;
exports.on = on;