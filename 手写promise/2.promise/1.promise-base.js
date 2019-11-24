function Promise(executor) {
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onResolved = []; // 专门存放成功的回调
  self.onRejected = []; // 专门存放失败的回调
  function resolve(value) {
    if (self.status === 'pending') {
      // 将成功的原因保留起来
      self.value = value;
      self.status = 'resolved';
      self.onResolved.forEach(fn => fn());
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
      self.onRejected.forEach(fn => fn());
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
Promise.prototype.then = function (onfulfilled, onrejected) {
  let self = this;
  if (self.status === 'resolved') {
    onfulfilled(self.value);
  }
  if (self.status === 'rejected') {
    onrejected(self.reason);
  }
  if (self.status === 'pending') {
    self.onResolved.push(function () {
      onfulfilled(self.value);
    });
    self.onRejected.push(function () {
      onrejected(self.reason);
    });
  }
}
module.exports = Promise