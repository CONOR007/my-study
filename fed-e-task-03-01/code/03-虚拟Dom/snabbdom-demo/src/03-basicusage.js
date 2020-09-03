//模块使用

import {h,thunk,init} from 'snabbdom';

//1.导入模块
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

//2.注册模块
let patch = init([
    style,
    eventlisteners
]);

//3.使用h()函数的第二个参数传入模块需要的数据(对象)
let vnode = h('div#container',{
    style:{
        backgroundColor:'red'
    },
    on:{
        click:eventHandler
    }
},[
    h('h1','hello snabbdom'),
    h('p','p标签'),
]);

function eventHandler (params) {
    console.log('点击我了');
}

let app = document.querySelector('#app');
let oldVnode = patch(app,vnode);

