//Monad函子是可以变扁的Pointed函子, IO(IO(x))
//一个函子如果具有join和of两个方法并遵守一些定律就是一个Monad
//如果说函数嵌套可以用函数组合,那么函子嵌套就可以用Monad


const _ = require('lodash/fp');
class IO {
    //of静态方法是为了避免new来创建对象,更深层的含义是用来把值放到上下文context中(就是把值放到容器中,方便使用map来处理值)
    static of (value) { //of方法还是接收一个值,只不过这个值把这个值封装到了函数里 
        return new IO(function(){ 
            return value
        })
    }
    constructor(fn){
        this.value = fn //接受一个函数 缩小副作用
    }
    map(fn){//map是处理值的操作
        return new IO(_.flowRight(fn,this.value)) //所谓减少副作用既输入一定有输出,这里始终输出的是一个函数并保存到了value中
    }
    join(){//是配合flatMap的操作
        return this.value();
    }
    flatMap(fn){//flatMap是处理嵌套函子从而避免重复.value()的操作
        return this.map(fn).join();
    }
}


//IO函子的问题(做一个读取文件的函数)
const fs = require('fs');
let readFile = function(fileName){
    return new IO(function(){
        return fs.readFileSync(fileName,'utf-8')
    })
}
let print = function(x){
    return new IO(function(){
        //console.log(x);
        return x
    })
}
// ff拿到的是一个嵌套的函子 ==> IO(IO)
let ff = _.flowRight(print,readFile);
console.log(ff('package.json'));//IO { value: [Function] }

// console.log(readFile('package.json').flatMap(print).value());
console.log(
        readFile('package.json')
        .flatMap(print)
        .map(_.split('\n'))         
        .map(_.find(x=>x.includes('version')))
        .join()
);