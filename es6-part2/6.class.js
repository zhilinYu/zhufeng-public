// babel可以帮我们编译语法
// 安装全局命令工具 babel-cli 
// babel 6.class.js -o tt.js
class Parent{
    constructor(){
        this.aa = 1; 
    }
    // => 等价
    aa = 1;
}
