//1.创建一个Promise的类,接受一个自执行函数并接收成功和失败两个回调参数.
//2.Promise有三种状态.失败rejected,挂起pending和完成fulfilled.
//3.Promise状态不可逆
//4.resolve改变状态为完成并记录成功值,reject改变状态为失败并记录失败值
//5.then接收成功和失败回调,状态成调用成功回调,状态失败调用失败回调
//6.then处理异步
//7.实现then的同步链式调用
//8.实现then的异步链式调用
//9.实现then回调中返回一个promise的链式调用
//10.处理返回同一个promise时造成死循环的情况,抛出 'Chaining cycle detected for promise #<Promise>'
//11.then参数可选
//12.静态方法all实现
//13.静态方法resolve的实现 如果接受的是一个值,那么创建一个promise对象并把该直接传递下去 如果接受的是一个promise对象,那么直接返回该对象
//14.finally的实现 无论当前promise的执行是成功还是失败,finally当中的函数始终都会执行一次 在finally后可以通过链式调用拿到当前的结果
//15.catch的实现 在then中可以不传递失败回调,通过catch去捕获失败的回调
const REJECTED = "REJECTED";
const PENDING = "PENDING";
const FULFILLED = "FULFILLED"
class Promise {
    constructor (actuator) {
        this.status = PENDING;
        this.successInfo = null;
        this.errorInfo = null;
        this.successCallBackArray = [];
        this.errorCallBackArray = [];
        try {
            actuator(this.resolve,this.reject);
        } catch (error) {
            this.reject(error);
        }
    }
    resolve = (successInfo) => {
        if(this.status !== PENDING) return;
        this.status = FULFILLED;
        this.successInfo = successInfo;
        while (this.successCallBackArray.length) this.successCallBackArray.shift()(this.successInfo);
    }
    reject = (errorInfo) => {
        if(this.status !== PENDING) return;
        this.status = REJECTED;
        this.errorInfo = errorInfo;
        while (this.errorCallBackArray.length) this.errorCallBackArray.shift()(this.errorInfo);
    }
    then = (successCallBack,errorCallBack) => {
        successCallBack = successCallBack ? successCallBack : res=>res;
        errorCallBack = errorCallBack ? errorCallBack : err=>{throw err};
        const curPromise = new Promise((resolve,reject)=>{
            if ( this.status === FULFILLED ){
                try {
                    setTimeout(() => {
                        const x = successCallBack(this.successInfo);
                        Promise.isResolvePromise(curPromise,x,resolve,reject);                        
                    }, 0);
                } catch (error) {
                    reject(error)
                }
            }else if( this.status === REJECTED ){
                try {
                    setTimeout(() => {
                        const x = errorCallBack(this.errorInfo);
                        Promise.isResolvePromise(curPromise,x,resolve,reject);
                    }, 0);
                } catch (error) {
                    reject(error)
                }                
            }else if( this.status === PENDING ){
                this.successCallBackArray.push(
                    ()=>{
                        try {
                            setTimeout(() => {
                                const x = successCallBack(this.successInfo);
                                Promise.isResolvePromise(curPromise,x,resolve,reject);
                            }, 0);
                        } catch (error) {
                            reject(error)
                        }
                    }
                );
                this.errorCallBackArray.push(
                    ()=>{
                        try {
                            setTimeout(() => {
                                const x = errorCallBack(this.errorInfo);
                                Promise.isResolvePromise(curPromise,x,resolve,reject);
                            }, 0);
                        } catch (error) {
                            reject(error)
                        }                        
                    }
                );
            }
        })
        return curPromise;
    }
    finally = (callback) => {
        return this.then((res)=>{
            return Promise.resolve(callback(res)).then(res=>res);
        },(err)=>{
            return Promise.resolve(callback(err)).then(res=>res,err=>{throw err});
        })
    }
    catch = (callback) => {
        return this.then(null,callback);
    }
    static all (arr) {
        return new Promise ((resolve,reject)=>{
            const result = [];
            let num = 0;
            const countNum = (index,value) => {
                num ++ ;
                result[index] = value;
                if(num === result.length)resolve(result)
            };
            arr.forEach((value,index) => {
                if(value instanceof Promise){
                    value.then(res=>{
                        countNum(index,res);
                    },err=>{
                        reject(err)
                    })
                }else {
                    countNum(index,value);
                }
            });
        })
    }
    static resolve (value) {
        const result = value instanceof Promise ?  value : new Promise ((resolve)=>{resolve(value)});
        return result;
    }
    static isResolvePromise(curPromise,x,resolve,reject){
        if(curPromise === x) {
            reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
        }
        if(x instanceof Promise){
            x.then(res => {resolve(res)},err=>{reject(err)})
        }else {
            resolve(x)
        }
    }
}