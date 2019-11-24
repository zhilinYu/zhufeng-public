class Scope{
  constructor(){
    this.$$watchers = [];
  }
  $watch(exp,fn){
    this.$$watchers.push({
      exp,
      fn,
      last:this[exp]
    })
  }
  $digestOne(){
    let dirty = false
    this.$$watchers.forEach(watcher=>{
      let oldVal = watcher.last;
      let newVal = this[watcher.exp];
      if(newVal!== oldVal){
        dirty = true;
        watcher.fn(newVal,oldVal);
        watcher.last = newVal;
      }
    });
    return dirty;
  }
  $digest(){
    let dirty = true;
    let count = 9;
    do{
      dirty = this.$digestOne();
      if(!count)throw new Error('10 interators Aborting')
    }while (dirty&&count--);
  }
  $apply(){
    this.$digest();
  }
}
let scope = new Scope();
scope.a = 'zfpx';
scope.b = '9';
scope.$watch('a',function (newVal,oldVal) {
  scope.a = Math.random();
});
scope.$watch('b',function (newVal,oldVal) {
  scope.a = 'hello zfpx'
});
scope.b = 'hello zfpx';
scope.$apply();