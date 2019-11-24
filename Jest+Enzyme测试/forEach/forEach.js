function forEach(arr, callback) {
  for(let i = 0;i<arr.length;i++){
    callback(arr[i]);
  }
}

module.exports = forEach;

