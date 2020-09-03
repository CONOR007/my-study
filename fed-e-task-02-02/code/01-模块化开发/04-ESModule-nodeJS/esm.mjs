
//加载模块函数:require
//模块对象:module
//导出对象别名:exports
//当前文件的绝对路径:__filename
//当前文件所在目录:__dirname

//ESM中没有CommonJS中的以上这些模块全局成员,前三种可以用import和export代替
//__filename和__dirname可以通过 import.meta.url
console.log(import.meta.url)
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)

//__dirname
import {dirname} from 'path';
const __dirname = dirname(__filename);
console.log(__dirname)