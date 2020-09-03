//Grunt 的入口文件
//用于定义一些需要Grunt自动执行的任务
//需要导出一个函数 此函数接受一个grunt的新参,内部提供一些创建任务时可以用到的API
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt => {
    grunt.initConfig({
        sass:{
            options:{
                sourceMap:true, //生成对应的main.css.map文件
                implementation:sass
            },
            main:{
                files:{
                    './dist/css/main.css':'./src/scss/main.scss' //'输出路径':'编译路径文件'
                }
            }
        },
        babel:{
            options:{
                sourceMap:true, //生成对应的main.css.map文件
                presets:['@babel/preset-env'], //presets:需要转换哪些特性
            },            
            main:{
                files:{
                    './dist/js/app.js':'./src/js/app.js'
                }
            }
        },
        watch:{
            js:{
                files:['src/js/*.js'],
                tasks:['babel']
            },
            css:{
                files:['src/scss/*.scss'],//scss是sass的新扩展名
                tasks:['sass']
            }
        }
    })
    //通过loadNpmTasks引入插件中的任务,若任务需要配置信息
    //grunt.loadNpmTasks('grunt-sass')

    //自动加载所有的grunt插件中的任务
    loadGruntTasks(grunt)

    //watch运行的时候只会监听文件的变化而不会先去编译一次,所以这里需要顺序执行
    grunt.registerTask('default',['sass','babel','watch'])
}