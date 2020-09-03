//div中放置子元素h1 ,p

import {h,thunk,init} from 'snabbdom';
let patch = init([]);
let vnode = h('div#container',[
    h('h1','hello snabbdom'),
    h('p','p标签'),
    h('p','p标签'),
]);
let app = document.querySelector('#app');
let oldVnode = patch(app,vnode);
setTimeout(() => {
    vnode = h('div#container',[
        h('h1','hello wold'),
        h('p','p标签1'),
    ]);
    //patch(oldVnode,vnode);
    patch(oldVnode, h('!'))
}, 2000);
