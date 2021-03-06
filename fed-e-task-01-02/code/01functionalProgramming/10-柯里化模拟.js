//柯里化模拟
function sum (a,b,c){ //三个参数就是三元的意思
    return a+b+c
}
// const _ = require('lodash');
// const curry = _.curry(sum);
// console.log(curry(1,2,3));
// console.log(curry(1)(2,3));


//第一步 观察lodash中柯里化接受的参数 是一个函数
function curry (fn) {
    //第二步 lodash中返回的是一个接收参数的函数
  return function cry(...arg) {
      //第三部 判断是否满足参数个数
      if(arg.length >= fn.length){
            //满足=>直接返回
          return fn.apply(this,arg)
      }else{
          //不满足=>返回新的函数
          return function(...arguments){
              //第一次传进来的arg被缓存了,这里组合起来 再给cry判断一遍 如此重复直到满足为止
              let ary = arg.concat(arguments)
              return cry(...ary)
          }
      }
  }
}

const curryFun = curry(sum);
console.log(curryFun(1,2,3));
console.log(curryFun(1,2)(3));
console.log(curryFun(1)(2,3));

//箭头函数模拟柯里化
function curry2(fn) {
    return function cry(...arg){
        if(arg.length<fn.length){
            return function (){
                return cry(...arg.concat(Array.from(arguments)))
            }
        }
        return fn(...arg)
    }
}
const curryFun2 = curry2(sum);
console.log(curryFun2(1,2,3));
console.log(curryFun2(1,2)(3));
console.log(curryFun2(1)(2,3));