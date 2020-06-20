//首先要手写promise,必须先知道promise的使用
//1.promse就是一个类 在执行这个类的时候 需要传递一个执行器 执行器立即执行
//2.promse有三种状态,等待:pending 成功:rejected 失败fulfilled  一旦状态确认就不可更改
//3.resolve和reject分别改变状态为成功和失败 调用resolve是pending->fulfilled  调用reject是pending->rejected
// let promise = new Promise((resolve,reject)=>{
//     resolve('成功');
//     reject('失败');
// })
//4.then方法内部做的事情就是判断状态,如果状态成功调用成功的回调 如果状态是失败则调用失败的回调函数
//5.成功回调参数:value 失败回调参数:errInfo
// promise.then(value=>{
//     console.log(value)
// },(errInfo)=>{
//     console.log(errInfo)
// })


const MyPromise = require('./myPromise');
let PROMISE = new MyPromise((resolve,reject)=>{
    resolve('成功');
    reject('失败');
})
PROMISE.then(value=>{
    console.log(value)
}, errInfo =>{
    console.log(errInfo)
})