//Gulp 的入口文件
//约定每个任务都是异步的,没有同步任务
exports.foo = done=>{
    console.log('Gulp 的入口文件')
    done(); //标识任务完成
}

exports.default = done=>{
    console.log('default默认调用')
    done(); //标识任务完成
}

//gulp@4.0之前需要通过gulp模块的task注册任务.
const gulp = require('gulp')

gulp.task('bar',done=>{
    console.log('bar working')
    done(); //标识任务完成
})

//组合任务
const {series, parallel} = require('gulp');
const fs = require('fs')

const task1 = done=>{
    setTimeout(()=>{
        console.log('task1 working~')
        done();
    },1000)
}

const task2 = done=>{
    setTimeout(()=>{
        console.log('task2 working~')
        done();
    },1000)
}

const task3 = done=>{
    setTimeout(()=>{
        console.log('task3 working~')
        done();
    },1000)
}

//串行任务(同步:部署任务)
exports.a = series(task1,task2,task3);
//并行任务(异步:编译css和js互不干扰)
exports.b = parallel(task1,task2,task3);

//异步任务
exports.callback = done=>{
    console.log('callback task~')
    done()
}
exports.callback_error = done=>{
    console.log('callback task~')
    done(new Error('task error!'))
}
exports.promise = done=>{
    console.log('promise task~')
    return Promise.resolve()
}
exports.promise_error = done=>{
    console.log('promise task~')
    return Promise.reject(new Error('promise error!'))
}
const timeout = time => {
    return new Promise((resoleve,reject)=>{
        console.log('dasdsdasadsdsa') //1
        setTimeout(resoleve('aaa'),time)
    })
}
exports.async = async()=>{
    let a = await timeout(1000)
    console.log(a)//2
    console.log('async task~')//3
}
exports.stream = (done) => {
    const readStream = fs.createReadStream('package.json') //读取内容
    const writeStream = fs.createWriteStream('temp.txt')   //生成文件
    readStream.pipe(writeStream)                           //注入内容 
    return readStream
    //stream中有对应的end事件,所以不需要done. 等同于下面的代码
    // readStream.on('end',()=>{
    //     done()
    // })
}


const { Transform } = require('stream');
//模拟文件压缩操作
exports.default = ()=>{
    //文件读取流
    const read = fs.createReadStream('normalize.css');
    //文件写入流
    const write = fs.createWriteStream('normalize.min.css');
    //文件转化
    const transform = new Transform({
        transform:(chunk,encodeing,callback) => {
            //核心转换过程实现
            //chunk:读取流中读取到的内容(Buffer)
            console.log(chunk);
            const input = chunk.toString();
            //正则去掉空格和注释
            const output = input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'');
            callback(null,output);
        }
    })
    read
    .pipe(transform)//转化
    .pipe(write)//写入
    return read;
}

//Gulp 文件操作API
const { src, dest } = require('gulp');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
exports.GulpApi = ()=>{
    return src('src/*.css')                         //src创建文件的读取流
           .pipe(cleanCss())                        //cleanCss第三方转换流 打包压缩
           .pipe(rename({extname:'.min.css'}))      //rename第三方转换流   文件命名
           .pipe(dest('dist'))                      //dest写入流
}
//如上可见gulp的api比原始的样方便很多
