let {removeNode,on} = require('./dom-fn');

// 默认的配置 jsdom  document body div span
it('remove node',()=>{
   document.body.innerHTML = '<div><span id="s"></span></div>';
   let s = document.getElementById('s');
   expect(s.nodeName.toLowerCase()).toBe('span');
   removeNode(s);
   s = document.getElementById('s');
   expect(s).toBeNull();
})
it('bind node',()=>{
  document.body.innerHTML = '<button id="btn">hello</button>';
  let btn = document.getElementById('btn');
  on(btn,'click',()=>{
    btn.innerHTML = 'world';
  });
  expect(btn.innerHTML).toBe('hello');
  btn.click();
  expect(btn.innerHTML).toBe('world1');
});

// 测dom 异步  想测试函数执行了几次