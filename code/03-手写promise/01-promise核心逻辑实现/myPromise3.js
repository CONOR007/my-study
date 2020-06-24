const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';

class MyPromise {
    constructor(actuator){
        try{
            actuator(this.resolve,this.reject);
        }catch(err){
            this.reject(err)
        }
    }
    status = PENDING;
    successInfo = undefined;
    errorInfo = undefined;
    collectSuccessCallback = [];
    collectErrorCallback = [];

    resolve = (info) => {
        if(this.status !== PENDING)return
        this.status = FULFILLED;
        this.successInfo = info;
        while(this.collectSuccessCallback.length){
            this.collectSuccessCallback.shift()()
        }
    }

    reject = (info) => {
        if(this.status !== PENDING)return
        this.status = REJECTED;
        this.errorInfo = info;
        while(this.collectErrorCallback.length){
            this.collectErrorCallback.shift()()
        }
    }

    then (successCallBack,failCallBack) {
        successCallBack = successCallBack ? successCallBack : successInfo => successInfo;
        failCallBack = failCallBack ? failCallBack : (errInfo) => {throw errInfo};
        const curPromise = new MyPromise((resolve,reject)=>{
            if(this.status === FULFILLED){
                setTimeout(()=>{
                    try{
                        const curReturn = successCallBack(this.successInfo);
                        resolvePromise(curPromise,curReturn,resolve,reject);
                    }catch(err){
                        reject(err)
                    }                    
                },0)                
            }else if (this.status === REJECTED){
                setTimeout(()=>{
                    try{
                        const curReturn = failCallBack(this.errorInfo);
                        resolvePromise(curPromise,curReturn,resolve,reject);
                    }catch(err){
                        reject(err)
                    }
                },0)                
            }else{
                this.collectSuccessCallback.push(
                    ()=>{
                        setTimeout(()=>{
                            try{
                                const curReturn = successCallBack(this.successInfo);
                                resolvePromise(curPromise,curReturn,resolve,reject);
                            }catch(err){
                                reject(err)
                            }
                        },0)
                    }
                );
                this.collectErrorCallback.push(
                    ()=>{
                        setTimeout(()=>{
                            try{
                                const curReturn = failCallBack(this.errorInfo);
                                resolvePromise(curPromise,curReturn,resolve,reject);
                            }catch(err){
                                reject(err)
                            }
                        },0)
                    }
                );
            }
        })
        return curPromise
    }

    static all (array) {
        let result = [];
        let index = 0;
        return new MyPromise((resolve,reject)=>{
            function addData (value,i) {
                index ++;
                result[i] = value;
                if(index === result.length) resolve(result);
            }
            for(let i = 0 ; i < array.length ; i++ ){
                if(array[i] instanceof MyPromise){
                    array[i].then(value=>{addData(value,i)})
                }else{
                    addData(array[i],i)
                }
            }
        })
    }

    static resolve (val) {
        if (val instanceof MyPromise) return val;
        else return new MyPromise((resolve,rejecte)=>{resolve(val)});
    }

    finally(callBack){
        return this.then((val)=>{
            return MyPromise.resolve(callBack(val)).then(value=>value,(errInfo)=>{throw errInfo})
        },(err)=>{
            return MyPromise.resolve(callBack(err)).then(value=>value,(errInfo)=>{throw errInfo})
        })
    }

    catch(failCallback){
        return this.then(undefined,failCallback)
    }
}

function resolvePromise (curPromise,curReturn,resolve,reject) {
    if(curPromise === curReturn){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(curReturn instanceof MyPromise){
        curReturn.then(resolve,reject)
    }else{
        resolve(curReturn)
    }
}


function P1 () {
    return new MyPromise((resolve,reject)=>{
        setTimeout(()=>{reject('ss')},1000)
    })
}


P1()
.then()
.catch(errInfo=>console.log(errInfo))