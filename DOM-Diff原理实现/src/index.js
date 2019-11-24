import { createElement, render,renderDom} from './element';
import diff from './diff';
import patch from './patch';
let vertualDom1 = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['1']),
  createElement('li', { class: 'item' }, ['2'])
]);
let vertualDom2 = createElement('ul', { class: 'list-group' }, [
  createElement('li', { class: 'item' }, ['2']),
  createElement('li', { class: 'item' }, ['1']),
  createElement('li', { class: 'item' }, ['1']),
]);

// 如果平级元素有互换 那会导致冲洗渲染
// 新增节点也不会被更新
// index



let el = render(vertualDom1);
renderDom(el, window.root);
let patches = diff(vertualDom1, vertualDom2)
// 给元素打补丁 重新更新视图
patch(el, patches);

// 将虚拟dom转化成了真实DOM渲染到页面上
// let el = render(vertualDom);
// renderDom(el,window.root);

// DOM Diff比较两个虚拟DOM区别 比较两个对象的区别
// dom diff作用 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom

