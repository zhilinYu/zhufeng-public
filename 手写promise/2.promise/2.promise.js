function Promise(executor) {
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onResolved = [];
  self.onRejected = [];
  function resolve(value) {
    if (self.status === 'pending') {
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
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  // 这个方法是处理所有promise的实现
  let called; // 用来防止多次调用
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then; // {then:{}}
      if (typeof then === 'function') { // 姑且的认为他是promise
        // 让返回的这个x 也就是返回的promise执行用他的状态让promise2成功或者失败
        // 因为这里还涉及到别人promise 有的人写的promise 会成功还会调用失败
        then.call(x, (y) => {
          if (called) return;
          called = true;
          // 递归解析 如果resolve的是一个promise 就要不停的让resolve的结果进行处理
          resolvePromise(promise2, y, resolve, reject);
        }, (e) => {
          if (called) return;
          called = true;
          reject(e);
        });
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else { // x就是一个普通值 (就用这个值让返回的promise成功即可)
    resolve(x);
  }
}
Promise.prototype.then = function (onfulfilled, onrejected) {
  // onfulfilled / onrejected是一个可选的参数
  onfulfilled = typeof onfulfilled == 'function' ? onfulfilled :  val=>val;
  onrejected = typeof onrejected === 'function' ? onrejected :err => {
    throw err;
  }
  let self = this;
  // 需要判断onfulfilled/onrejected执行的结果和promise2的关系
  // 
  let promise2;
  promise2 = new Promise((resolve, reject) => {
    if (self.status === 'resolved') {
      setTimeout(() => {
        try {
          let x = onfulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject); // 解析x 和 promise2的关系
        } catch (e) {
          reject(e);
        }
      }, 0);
    }
    if (self.status === 'rejected') {
      setTimeout(() => {
        try {
          let x = onrejected(self.reason);
          resolvePromise(promise2, x, resolve, reject); // 解析x 和 promise2的关系
        } catch (e) {
          reject(e);
        }
      }, 0);
    }
    if (self.status === 'pending') {
      self.onResolved.push(function () {
        setTimeout(() => {
          try {
            let x = onfulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject); // 解析x 和 promise2的关系
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
      self.onRejected.push(function () {
        setTimeout(() => { // 方便测试 要和原生的一样 符合规范
          try {
            let x = onrejected(self.reason);
            resolvePromise(promise2, x, resolve, reject); // 解析x 和 promise2的关系
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }
  })
  return promise2;
}
// 测试代码是否符合a+ 规范 为了让其能测试
// npm install promises-aplus-tests -g
// promises-aplus-tests 文件名 可以测试
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = Promise

// 作业 es6  promise
