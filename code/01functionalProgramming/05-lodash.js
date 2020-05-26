//纯函数: 执行多次函数的输入和输出始终能保持一致
const _ = require('lodash');
const array = ['jacs','conor','lucy','kate'];
console.log(_.first(array));
console.log(_.toUpper(array));
console.log(_.last(array));
console.log(_.reverse(array));
_.each(array,(i,index)=>{
    console.log(i,index)
})
console.log(_.includes(array,'conor'));
console.log(_.find(array, (i)=>i=='conor'));
console.log(_.findIndex(array,  (i)=>i=='conor'));