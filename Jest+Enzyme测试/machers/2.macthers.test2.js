// 2.machers 相等 包含 逻辑运算
let a = {b:null},b={}
it('equal', () => {
  expect(1).toBe(1);
  expect(1).toBe(1);
  expect(a).not.toEqual(b);
  expect(a.b).toBeNull();
  expect(a.c).toBeUndefined();
});

it('contain',()=>{
  expect('123').toContain('1');
  expect([1,2,3]).toContain(1);
  expect(a).toHaveProperty('b');
  expect('hello world').toMatch(/o w/)
});

it('logic',()=>{
  expect(3).toBeLessThan(5);
  expect(3).toBeGreaterThan(1);
});