//folktale是一个标准的函数式编程库
//和lodash,ramada不同的是,他没有提供很多的功能函数
//只提供了一些函数式处理的操作,如:compose,curry等,以及一些函子:Task(异步操作),Either,MayBe等.
//下载: cnpm i folktale

// folktale库中的 compose(函数组合和lodash中的flowRight一样),curry
const {compose,curry} = require('folktale/core/lambda');
const {first,toUpper} = require('lodash/fp');

const f = curry(2,(x,y)=>x+y); //它有两个参数,第一个参数指明后面的函数有几个参数
console.log(f(1,2));
console.log(f(1)(2));

const f2 = compose(toUpper,first)
console.log(f2(['sdsds','opps']));