let forEach  = require('./forEach');


it('test forEach',()=>{
  let fn = jest.fn(); // 生成模拟的函数
  forEach([1, 2, 3], fn); // [[[1],[2],[3]]]
  expect(fn.mock.calls.length).toBe(3);
  expect(fn.mock.calls[0][0]).toBe(1);
  expect(fn.mock.calls[1][0]).toBe(2);
  expect(fn.mock.calls[2][0]).toBe(3);
});

