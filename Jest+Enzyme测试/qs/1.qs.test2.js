
// 分组 > 用例 > 断言
let { parse, stringify } = require('./1.qs');
describe('parse',()=>{
  it('parse one', () => {
    // macthers
    expect(parse('name=zfpx')).toEqual({ name: 'zfpx' });
  });
  it('parse two', () => {
    expect(parse('name=zfpx')).toEqual({ name: 'zfpx' });
  });
})
describe('stringify',()=>{
  it('stringify one', () => {
    expect(stringify({ name: 'zfpx' })).toEqual('name=zfpx');
  })
})
