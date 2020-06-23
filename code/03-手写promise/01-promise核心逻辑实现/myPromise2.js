const PENFDING = 'pending';
const FUFILLED = 'fufilled';
const REJECTZED = 'rejected';
class MyPromise {
    constructor(zhiXingQi){
        zhiXingQi(this.resolve,this.reject)
    }
    status = PENFDING;
    successInfo = undefined;
    errInfo = undefined;
    successCallBack = [];
    errCallBack = [];
    resolve = (value)=>{
        if(this.status !== PENFDING) return
        this.status = FUFILLED
        this.successInfo = value
        while(this.successCallBack.length){
            this.successCallBack.shift()(value);
        }
    }
    reject = (errInfo)=>{
        if(this.status !== PENFDING) return
        this.status = REJECTZED
        this.errInfo = errInfo
        while(this.errCallBack.length){
            this.errCallBack.shift()(errInfo);
        }
    }
    then(successCallBack,errCallBack){
        return new MyPromise((resolve,reject)=>{
            if(this.status === FUFILLED){
                const x = successCallBack(this.successInfo);
                //resolve(x);
                resolvePromise(x,resolve,reject)
            }else if(this.status === REJECTZED){
                errCallBack(this.errInfo);
            }else{
                this.successCallBack.push(successCallBack)
                this.errCallBack.push(errCallBack)
            }
        })
    }
}

function resolvePromise(x,resolve,reject){
    if(x instanceof MyPromise){
        x.then(resolve,reject)
    }else{
        resolve(x)
    }
}

function other (){
    return new MyPromise((resolve,reject)=>{
        resolve('other')
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