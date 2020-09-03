//IO函子:与之前的函子不同的是IO函子维护的value是一个函数而不是一个值,目的是把可能不纯的函数存储到value中并延迟执行它(就是交给调用者去执行,惰性执行)
const _ = require('lodash/fp');
class IO {
    static of (value) { //of方法还是接收一个值,只不过这个值把这个值封装到了函数里
        return new IO(function(){ 
            return value
        })
    }
    constructor(fn){
        this.value = fn
    }
    map(fn){
        return new IO(_.flowRight(fn,this.value)) //所谓减少副作用既输入一定有输出,这里始终输出的是一个函数并保存到了value中
    }
}

const f = IO.of(5).map(x=>x+1)
console.log(f.value()); //把可能不纯的函数存储到value中并延迟执行它(就是交给调用者去执行,惰性执行)



//IO函子的问题(做一个读取文件的函数)
const fs = require('fs');
let readFile = function(fileName){
    return new IO(function(){
        return fs.readFileSync(fileName,'utf-8')
    })
}
let print = function(x){
    return new IO(function(){
        console.log(x);
        return x
    })
}
// ff拿到的是一个嵌套的函子 ==> IO(IO)
let ff = _.flowRight(print,readFile);
console.log(ff('package.json'));//IO { value: [Function] }
console.log(ff('package.json').value().value()); //问题描述:当我去调用嵌套函子执行结果时要.value().value(),这样书写很不友好. 可以用Monad函子来扁平化