// querystring {name:'zfpx',age:9} => name=zfpx&age=9
// parse "name=zfpx" => {name:'zfpx'}

function parse(str) {
  let obj = {}
  str.replace(/([^=&]*)=([^=&]*)/g, function () {
    obj[arguments[1]] = arguments[2];
  })
  return obj;
}
function stringify(obj) {
  let arr = [];
  for (let key in obj) {
    arr.push(`${key}=${obj[key]}`);
  }
  return arr.join('&')
}
exports.parse = parse;
exports.stringify = stringify;


// 我们写完用例 无法保存，污染源代码，看起来不直观,所有的用例都会混起来
// 测试框架 断言 asset  chai
// jestmine ng / mocha  karam runner
// jest react koa rn 0配置
// 1.测试能不能正常运行  用例 
// console.log(parse('name=zfpx'));
// console.log(parse('name=zfpx&age=9'));
// console.log(stringify({name:'zfpx'}));
// console.log(stringify({name:'zfpx',age:9}));


// 测试测的都是模块 