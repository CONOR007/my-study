const _ = require('lodash');
// const compose = _.flowRight(_.curry(_.first()) ,_.curry(_.reverse()))

const reverse = (arr)=>arr.reverse();
const first = (arr)=>arr[0];
const upperCase = (str)=>str.toUpperCase();
const log = (val)=>{
    console.log(val);
    return val
}
const compose = _.flowRight(upperCase,log,first,log,reverse);
// console.log(compose([1,5,6,4,8,6,'dsadasdsd']));

//模拟flowRight
function flowRight(...arg){
    return function(value){
        let res = value;
        for(let i of arg.reverse()){
            res = i(res)
        }
        return res;
    }
}
const compose2 = flowRight(upperCase,log,first,log,reverse);
// console.log(compose2([1,5,6,4,8,6,'dsadasdsd']));


//或者
function flowRight2(...arg){
    return function(value){
        return arg.reverse().reduce(function(cur,fn){
            //console.log(cur,fn);
            return fn(cur);
        },value)
    }
}
const compose3 = flowRight2(upperCase,log,first,log,reverse);
console.log(compose3([1,5,6,4,8,6,'dsadasdsd']));

//箭头函数简写
const flowRight3 = (...arg)=>value=>arg.reverse().reduce((cur,fn)=>fn(cur),value);
const compose4 = flowRight3(upperCase,log,first,log,reverse);
console.log(compose4([1,5,6,4,8,6,'dsadasdsd']));

//同事满足结合律
const compose5 = flowRight3(upperCase,log,flowRight3(first,log,reverse));
console.log(compose5([1,5,6,4,8,6,'dsadasdsd']));
