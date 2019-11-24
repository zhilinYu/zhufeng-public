
jest.mock('./ajax'); // manual mock / mock.fn();
jest.mock('jquery');
let getUser = require('./getUser'); 
it('test getUser',(done)=>{
    document.body.innerHTML = `<div id="userList"></div>`;
    getUser('./user.json',()=>{
      let d = document.getElementById('userList');
      let lis = d.querySelectorAll('li');
      expect(lis.length).toBe(3);
      done();
    })
});
let $ = jqeury;
$();

// 6期开课 讲promise