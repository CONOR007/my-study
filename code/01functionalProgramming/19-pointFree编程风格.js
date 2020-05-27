//pointFree(实际上就是函数的组合):定义一些辅助函数,然后把这些辅助函数组合起来,在这个过程中不需要指明需要的数据 const compns = fp.flowRight(fp.join('-'),fp.map(fp.toLower),fp.split(' '))
//不需要指明处理的数据
//只需要合成运算过程
//需要定义一些辅助的基本运算函数

//如把 Hello    World => hello_world
const fp = require('lodash/fp')
const fn = fp.flowRight(fp.replace(/\s+/g)('_'),fp.toLower)
console.log(fn('Hello    World'));