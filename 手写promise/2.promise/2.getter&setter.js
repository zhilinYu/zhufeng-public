let x = {
 
}
Object.defineProperty(x,'then',{
  get(){
    throw new Error();
  }
})
console.log(x.then)