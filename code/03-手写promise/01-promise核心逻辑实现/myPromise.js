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

    //成功回调
    successCallback = [];
    //失败回调
    failCallback = [];

    //3.resolve和reject分别改变状态为成功和失败 调用resolve是pending->fulfilled  调用reject是pending->rejected
    //resolve和reject之所以定义成箭头函数就是为了让其内部this指向MyPromise

    //传递成功的函数
    resolve = (value) => {
        //一旦状态确认就不可更改
        if(this.status !== PENDING) return;
        //将状态更改为成功
        this.status = FULFILLED;
        //保存成功之后的值
        this.value = value;
        //判断成功回调是否是异步执行
        //this.successCallback && this.successCallback(value);
        while(this.successCallback.length){
            //7.then方法多次调用,依次执行
            this.successCallback.shift()(value);
        }
    }

    //传递失败对应的函数
    reject = (errInfo) => {
        //一旦状态确认就不可更改
        if(this.status !== PENDING) return;
        //将状态更改为失败
        this.status = REJECTED;
        //保存失败之后的值
        this.errInfo = errInfo;
        //判断失败回调是否是异步执行
        // this.failCallback && this.failCallback(errInfo);     
        while(this.failCallback.length){
            //then方法多次调用,依次执行
            this.failCallback.shift()(errInfo);
        }
    }
    
    //查看状态的函数
    then (successCallback,failCallback) {
        //8.实现链式调用,每次都返回一个新的实例
        return new MyPromise((resolve,reject)=>{
            //4.then方法内部做的事情就是判断状态,如果状态成功调用成功的回调 如果状态是失败则调用失败的回调函数
            //5.成功回调参数:this.value 失败回调参数:errInfo
            if(this.status === FULFILLED) {
                const x = successCallback(this.value);
                //9.这里的x不确定是一个值还是一个promise对象. 需要对他进行判断,如果是promise则需要对它返回的值进行判断,同样成功调用resolve,失败调用reject
                resolvePromise(x,resolve,reject);
                //resolve(x);
            }
            if(this.status === REJECTED) failCallback(this.errInfo);
            if(this.status === PENDING) {
                //6.在promise中加入异步代码
                this.successCallback.push(successCallback);
                this.failCallback.push(failCallback);
            }
        })
    }
}

function resolvePromise (x,resolve,reject) {
    //如何判断x是不是prmise 就判断它是不是MyPromise的实例
    if(x instanceof MyPromise){
        //是promise就需要调用then去查看它对应的状态,成功的调用resolve传递下去,失败调用reject
        x.then(value=>resolve(value),errInfo=>reject(errInfo))
    }else{
        resolve(x);
    }
}

function other () {
    return new MyPromise((resolve,reject)=>{
        resolve('other');
    })
}

let promise = new MyPromise((resolve,reject)=>{
    resolve('成功');
}).then((res)=>{
    console.log(res);
    return other()
}).then((res)=>{
    console.log(res);
})
// module.exports = MyPromise