const marked = require('marked');

module.exports = source => {
    // source就是md的内容
    // console.log(source);
    // return 'console.log("hello ~");'

    //解析md内容成html
    const html = marked(source);
    //return `module.exports = ${JSON.stringify(html)}`
    return `export default ${JSON.stringify(html)}` //交给下一个html-loader处理html字符串

    //总结:其实loader就是一个管道
}