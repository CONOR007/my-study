// hello world

//var snabbdom = require('snabbdom');
import {h,thunk,init} from 'snabbdom';
let patch = init([])
// 使用h函数创建虚拟DOM
let vnode = h('div#container.cls',{
    hook: {
        init(vnode){
            console.log(vnode);
        },
        create(emptyVnode,vnode) {
            console.log(vnode.elm);
        },
    }
},'Hello World')
let app = document.querySelector('#app')
// 使用patch函数将真实DOM转换成虚拟DOM然后对比他们的差异,更新到真实DOM并返回一个虚拟DOM
let oldVnode = patch(app,vnode)
vnode = h('div','Hello Snabbdom')
patch(oldVnode,vnode)
