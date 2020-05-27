//把一个字符串中的首字母提取并转换成大写适应 . 作为分隔符
//world wild web ==> W. W. W
const fp = require('lodash/fp');
const f1 = fp.flowRight(fp.join('. '),fp.map(fp.first),fp.split(' '),fp.toUpper)
console.log(f1('world wild web'));
// _.toUpper(string)
//_.split(string, separator, limit)