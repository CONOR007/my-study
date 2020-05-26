//柯里化: 调用一个函数只传递部分参数(这部分参数永远不变),然后返回一个新的函数并接收剩余的参数并返回结果
function checkAge(age){
    let min = 18; //硬编码
    return age >= min
}

//普通纯函数
function checkAge2(age,min){
    return age >= min
}

//普通纯函数会带来一些重复的代码,如:
checkAge2(18,20);
checkAge2(18,21);
checkAge2(18,22);

//模拟柯里化
function checkAge3(min){
    return function(age){
        return age >= min
    }
}
let age18 = checkAge3(18);

console.log(age18(22));
console.log(age18(55));
console.log(age18(17));

//箭头函数实现柯里化
const checkAge4 = min=>age=>age >= min
let age182 = checkAge4(18);

console.log(age182(22));
console.log(age182(55));
console.log(age182(17));