//柯里化案例:如果要提取字符串中的空格和数字
//面向过程的方法
''.match(/\s+/g);
''.match(/\d+/g);
//柯里化的方法
const _ = require('lodash');
function match (reg,str) {
    return str.match(reg)
}
//生产一个柯里化函数,它接受两个参数
const thisMatch = _.curry(match);

const haveSpace = thisMatch(/\s+/g)
console.log(haveSpace('hello word'));
console.log(haveSpace('helloword'));

const haveNum = thisMatch(/\d+/g)
console.log(haveNum('155656'));
console.log(haveNum('dadsdsa'));

//简写
const matchf = _.curry((reg,str)=>str.match(reg))
const matchS = matchf(/\s+/g)('hello word')
const matchN = matchf(/\d+/g)('155656')
console.log(matchS,matchN);
