//纯函数: 执行多次函数的输入和输出始终能保持一致
//好处1 可缓存:因为纯函数对相同的输入始终都有相同的输出,所以它的结果可以通过闭包被缓存下来(记忆函数)
//好处2 可测试:纯函数让测试更方便(因为纯函数始终有输入和输出,而单元测试就是在断言这个结果)
//好处3 并行处理(web worker):在多线程环境下并行操作共享的内存数据很可能会出现意外情况. 纯函数不需要访问共享的内存数据,所以在并行环境下可以任意运行纯函数

const _ = require('lodash')
function getArea (r) {
    console.log(r);
    return Math.PI * r * r
}
let getAreaWithMemory = _.memoize(getArea);
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));

//模拟memoize
function memoize (getArea){
    let cache = {};
    return function(){
        cache[arguments] = cache[arguments] || getArea.apply(this,arguments);
        return cache[arguments]
    }
}
let memoizeFun = memoize(getArea)
console.log(memoizeFun(4));
console.log(memoizeFun(4));
console.log(memoizeFun(4));
console.log(memoizeFun(4));

//纯函数的副作用
//如果纯函数内部的变量依赖于外部的边量就会导致不纯,又如果在内部写死的话会导致硬编码.
//外部变量(副作用)的来源: 全局变量 配置文件 数据库 获取用户的输入(跨站脚本攻击)...
//所有外部的交互都可能带来副作用,副作用不可能完全禁止,但要尽可能控制它们在可控范围内发生
//柯里化就用来解决这个问题