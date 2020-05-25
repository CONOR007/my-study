//闭包:可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员(也就是延长了作用域)
//闭包本质:函数在执行的时候会放到一个执行栈上,当函数执行完毕之后会从执行栈上移除,但是堆上的作用域成员因为被外部引用不能被释放,因此内部函数依然可以访问外部函数成员
function makeFn (){
    let msg = "Hello Function";
    return function () {
        console.log(msg);
    }
}
makeFn()()

function once (fn) {
    let done = false;
    return function(){
        if(!done){
            done = true;
            return fn.apply(this,arguments)
        }
    }
}

let pay = once (function (money) {
    console.log('支付了'+ money)
})

pay(5)
pay(5)
pay(5)
pay(5)
pay(5)