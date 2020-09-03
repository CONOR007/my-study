// module.exports = {
//     foo:'commonjs exports value'
// }

// 不能在node的commonjs中通过require载入ESM,但是在webpack中可以
// const mod = require('./index.mjs')
// console.log(mod)

//CommonJS始终导出一个默认成员,所以接收的时候不能用{}
exports.off="commonjs exports value"