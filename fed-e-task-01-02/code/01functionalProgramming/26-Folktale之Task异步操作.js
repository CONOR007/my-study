//task实现过于复杂,这边就不模拟了
//folktale 2.x与1.x 中的task区别比较大,1.0中更接近我们现在演示的函子
//这里以2.3.2来演示
const {task} = require('folktale/concurrency/task');
const _ = require('lodash/fp');
const fs = require('fs');
function readFile (fileName) {
    return task(resolver => {
        fs.readFile(fileName,'utf-8',(err,data)=>{
            if(err) resolver.reject(err)
            resolver.resolve(data)
        })
    })
}
// readFile('package.json').run().listen({
//     onRejected(err){
//         console.log(err);
//     },
//     onResolved(data){
//         console.log(data);
//     }
// })

readFile('package.json')
.map(_.split('\n'))
.map(_.find(x=>x.includes('version')))
.run()
.listen({
    onRejected(err){
        console.log(err);
    },
    onResolved(data){
        console.log('解析version',data);
    }
})