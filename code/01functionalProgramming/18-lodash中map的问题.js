//lodash中map和fp模块汇总的map的区别
const _ = require('lodash');
const fp = require('lodash/fp');

console.log(_.map(['25','23','10'], parseInt)); //[ 25, NaN, 2 ]
//_.map(collection, iteratee) 因为iteratee函数默认接收三个参数 分别是(值,索引,原数组)
//而parseInt默认接收两个参数分别是(值,进制数)
//所以最后是这样的 parseInt('25',0) parseInt('23',1) parseInt('10',2) 不同的进制转换的数据不同,如果未传入第二个参数，则前缀为“x”的字符串被视为十六进制。所有其他字符串都被视为十进制。

//所以fp模块就没有这个问题,因为他是别柯里化过的 只接收一个参数
console.log(fp.map(parseInt)(['25','23','10']));