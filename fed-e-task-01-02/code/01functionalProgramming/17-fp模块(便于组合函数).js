//调试组合函数 fp模块中的参数都是被柯里化过的 它只接受一个参数
//NEVER SAY DIE  --> never-say-die
const fp = require('lodash/fp');

const compns = fp.flowRight(fp.join('-'),fp.map(fp.toLower),fp.split(' '))
console.log(compns('NEVER SAY DIE'));
// _.split(string, separator, limit)
// _.join(array, separator)
// _.map(collection, iteratee)