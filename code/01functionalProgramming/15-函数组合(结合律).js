//函数组合要满足结合律:(a×b)×c=a×(b×c)
const _ = require('lodash');


const reverse = (arr)=>arr.reverse();
const first = (arr)=>arr[0];
const upperCase = (str)=>str.toUpperCase();
const log = (val)=>{
    console.log(val);
    return val
}
const compose = _.flowRight(_.upperCase,log,_.first,log,_.reverse);
console.log(compose([1,5,6,4,8,6,'dsadasdsd']));

//结合律
const compose2 = _.flowRight(_.upperCase,log,_.flowRight(_.first,log,_.reverse));
console.log(compose2([1,5,6,4,8,6,'dsadasdsd']));