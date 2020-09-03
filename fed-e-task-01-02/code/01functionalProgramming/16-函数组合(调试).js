//调试组合函数
//NEVER SAY DIE  --> never-say-die
const _ = require('lodash');

//由于lodash中提供的split,join,map的参数位置不适合函数组合(数据优先,函数至后),这里无奈只能用到柯里化把参数对调,并在组合函数中传入部分参数,剩余参数从右至左传入. 这种方法比较麻烦,所以lodash中出现了fp模块(函数优先,数据至后)
const split = _.curry((separator,string)=>_.split(string, separator));
const join = _.curry((separator,string)=>_.join(string, separator));
const map = _.curry((iteratee,collection)=>_.map(collection, iteratee));
const trace = _.curry((wz,log)=>{console.log(wz,log);return log;})

const compns = _.flowRight(join('-'),trace('2222'),map(_.toLower),trace('1111'),split(' '))
console.log(compns('NEVER SAY DIE'));
// _.split(string, separator, limit)
// _.join(array, separator)
// _.map(collection, iteratee)