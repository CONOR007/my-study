//Grunt 的入口文件
//用于定义一些需要Grunt自动执行的任务
//需要导出一个函数 此函数接受一个grunt的新参,内部提供一些创建任务时可以用到的API
module.exports = grunt => {
    grunt.registerTask('foo',()=>{
        console.log('hello foo')
    })

    grunt.registerTask('bar','任务描述',()=>{
        console.log('hello bar')
    })

    grunt.registerTask('default',['foo','bad','bar'])

    grunt.registerTask('async-task1',()=>{
        setTimeout(()=>{
            console.log('async-task working')
        },1000)
    })
    
    grunt.registerTask('async-task2',function(){
        const done = this.async();
        setTimeout(()=>{
            console.log('async-task working');
            done()
        },1000)
    })

    grunt.registerTask('bad',function(){
        console.log('bad working')
        return false
    })

    grunt.initConfig({
        foo:{
            bar:123
        },
        build:{
            //options任务的配置选项
            options:{
                foo:'bar'
            },
            css:{
                //会覆盖上一层的配置
                options:{
                    foo:'bar1'
                },
            },
            js:'2',
        }
    })
    grunt.registerTask('configMsg',function(){
        console.log(grunt.config('foo'))
    })

    grunt.registerMultiTask('build',function(){
        console.log(this.options())
        console.log(`target:${this.target},data:${this.data}`)
    })
}