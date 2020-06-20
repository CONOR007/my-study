//2.promse有三种状态,等待:pending 成功:rejected 失败fulfilled
//把状态定义成常量的好处是:1.复用性 2.编辑器会有提示,而字符串是没有提示的
const PENDING = 'pending';      //等待
const FULFILLED = 'fulfilled';  //成功
const REJECTED = 'rejected';    //失败

class MyPromise {
    //1.promse就是一个类 在执行这个类的时候 需要传递一个执行器 执行器立即执行
    constructor (executor) {   
        //executor:立即执行的执行器,它的两个回调函数分别是resolve,reject
        executor(this.resolve,this.reject);
    }

    //状态
    status = PENDING;
    //成功值
    value = undefined;
    //失败原因
    errInfo = undefined;     

    //3.resolve和reject分别改变状态为成功和失败 调用resolve是pending->fulfilled  调用reject是pending->rejected
    //resolve和reject之所以定义成箭头函数就是为了让其内部this指向MyPromise
    resolve = (value) => {
        //一旦状态确认就不可更改
        if(this.status !== PENDING) return;
        //将状态更改为成功
        this.status = FULFILLED;
        //保存成功之后的值
        this.value = value;
    }

    reject = (errInfo) => {
        //一旦状态确认就不可更改
        if(this.status !== PENDING) return;
        //将状态更改为失败
        this.status = REJECTED;
        //保存失败之后的值
        this.errInfo = errInfo;
    }
    
    then (successCallback,failCallback) {
        //4.then方法内部做的事情就是判断状态,如果状态成功调用成功的回调 如果状态是失败则调用失败的回调函数
        //5.成功回调参数:this.value 失败回调参数:errInfo
        if(this.status === FULFILLED) successCallback(this.value);
        if(this.status === REJECTED) failCallback(this.errInfo);
    }
}

// let PROMISE = new MyPromise((resolve,reject)=>{
//     resolve('成功');
//     reject('失败');
// })
// PROMISE.then(value=>{
//     console.log(value)
// },(errInfo)=>{
//     console.log(errInfo)
// })

module.exports = MyPromise