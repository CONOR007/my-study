//lodash 中的 curry : 可以把任意多元参数的函数转化成为一个一元参数的函数,如下
const _ = require('lodash');
function sum (a,b,c){ //三个参数就是三元的意思
    return a+b+c
}
const curry = _.curry(sum);

console.log(curry(1,2,3));
console.log(curry(1)(2,3));

//如下就是把一个三元参数的函数转为一元的函数
const yiyuan = curry(1,2);
console.log(yiyuan(3));