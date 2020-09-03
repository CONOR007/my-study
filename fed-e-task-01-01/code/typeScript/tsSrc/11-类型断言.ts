export {}
const nums = [0,1,5,3,8]
const res = nums.find(i=>i>0)
// const square = res * res
const num1 = res as number //类型断言 不是类型转换 只是在编译阶段有效
const num2 = <number>res   //JSX不能使用这种方式 会有冲突