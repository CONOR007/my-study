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
console.log(compose([1,5,6,4,8,6,'dsadasdsd']));
