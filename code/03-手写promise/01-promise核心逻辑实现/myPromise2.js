const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
    constructor (runNow) {
        try {
            runNow(this.resolve,this.reject);
        }catch(err){
            this.reject(err);
        }
    }
    status = PENDING;
    successInfo = undefined;
    errInfo = undefined;
    successCallBackAry = [];
    failCallBackAry = [];
    resolve = (successInfo) => {
        if(this.status !== PENDING) return;
        this.status = FULFILLED;
        this.successInfo = successInfo;
        while(this.successCallBackAry.length){
            this.successCallBackAry.shift()();
        }
    }
    reject = (errInfo) => {
        if(this.status !== PENDING) return;
        this.status = REJECTED;
        this.errInfo = errInfo;
        while(this.failCallBackAry.length){
            this.failCallBackAry.shift()();
        }        
    }
    then(successCallBack,failCallBack){
        successCallBack = successCallBack ? successCallBack : successInfo => successInfo;
        failCallBack = failCallBack ? failCallBack : errInfo => {throw errInfo};
        const CurPromise = new MyPromise((resolve,reject)=>{
            if(this.status === FULFILLED){
                setTimeout(()=>{
                    try{
                        let CurReturnVal = successCallBack(this.successInfo);
                        resolvePromise(CurPromise,CurReturnVal,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                },0)
            }else if (this.status === REJECTED){
                setTimeout(()=>{
                    try{
                        let CurReturnVal = failCallBack(this.errInfo);
                        resolvePromise(CurPromise,CurReturnVal,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                },0)               
            }else {
                this.successCallBackAry.push(()=>{
                    setTimeout(()=>{
                        try{
                            let CurReturnVal = successCallBack(this.successInfo);
                            resolvePromise(CurPromise,CurReturnVal,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    },0)  
                });
                this.failCallBackAry.push(()=>{
                    setTimeout(()=>{
                        try{
                            let CurReturnVal = failCallBack(this.errInfo);
                            resolvePromise(CurPromise,CurReturnVal,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    },0)                    
                });
            }
        })
        return CurPromise;
    }
    
    static all (array) {
        let result = [];
        let index = 0;
        return new MyPromise((resolve,reject)=>{
            function addData(value,i){
                result[i] = value;
                index ++;
                if(index === result.length){
                    resolve(result)
                }
            }
            for(let i = 0 ; i < array.length ; i++){
                if(array[i] instanceof MyPromise){
                    array[i].then((value)=>{
                        addData(value,i)
                    },(err)=>{reject(err)})
                }else{
                    addData(array[i],i)
                }
            }
        })
    }

    static resolve (val) {
        if(val instanceof MyPromise) return val;
        return new MyPromise((resolve,reject)=>{resolve(val)});
    }

    finally (callback) {
        return this.then((value)=>{
            return MyPromise.resolve(callback(value));
        },(err)=>{
            return MyPromise.resolve(callback(err));
        })
    }

    catch (failCallBack){
        this.then(undefined,failCallBack);
    }
}

function resolvePromise (CurPromise,CurReturnVal,resolve,reject) {
    if(CurPromise ===  CurReturnVal) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(CurReturnVal instanceof MyPromise){
        CurReturnVal.then(resolve,reject);
    }else {
        resolve(CurReturnVal);
    }
}