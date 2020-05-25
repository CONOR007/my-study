function forEach (arr,fu){
    for(let i=0 ; i<arr.length ; i++){
        fu(arr[i]);
    }
}
forEach([1,2,3,4],function(item){
    console.log(item)
})

function filter(arr,fn){
    let res = [];
    for(let i=0 ; i<arr.length ;i++){
        if(fn(arr[i])){
            res.push(arr[i])
        }
    }
    return res
}
//高阶函数
//不需要关注具体是实现细节
//主要用来抽象通用问题
let ary = filter([1,2,34,5,6],function(item){
    return item%2 === 0;
})
console.log(ary);