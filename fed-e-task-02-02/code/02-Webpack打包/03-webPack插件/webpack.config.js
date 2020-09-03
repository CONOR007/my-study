const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
const webpack = require('webpack');
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap(pluginName, compilation => {
            //compilation打包上下文
            console.log(compilation.assets)
            for(const name in compilation.assets){
                console.log(name);
                console.log(compilation.assets[name].source());
                if(name.endsWith('.js')){
                    const contents = compilation.assets[name].source();
                    const withoutComments =contents.replace(/\/\*\*+\*\//g,'');
                    compilation.assets[name] = {
                        source : () => withoutComments,
                        size:() => withoutComments.length,
                    }
                }
            }
        });
    }
}
module.exports = {
    mode:'none',
    entry:'./src/main.js', //打包入口文件
    output:{
        filename:'bundle.js', //输出文件名称
        path:path.join(__dirname,'outPut'), //输出文件路径
        // publicPath:'outPut/',//网站打包的路径
    },
    optimization:{
        usedExports:true, //标记无用代码 查找枯树枝
        //minimize:true,    //清除无用代码 摇掉他们
        concatenateModules: true
    },
    //source-map 
    //eval:将模块代码放入eval函数中去执行,通过sourceUrl去标注文件的路径,不会生成source-map文件. 所以构建速度是最快的也只能定位文件,不能定位具体位置.
    //eval-source-map:将模块代码放入eval函数中去执行,但是生成了source-map文件,能定位文件和具体的行列.
    //cheap-eval-source-map:阉割版的source-map,将模块代码放入eval函数中去执行,生成了source-map文件,只能定位文件和具体的行信息. 生成速度要快点.
    //cheap-module-eval-source-map:与上面的不同之处是它能直接定义手写原代码,而cheap-eval-source-map是定位编译过后的代码.
    //inline-source-map:是以url的形式嵌入到代码中,eval也是(不可用)
    //hidden-source-map:生成了source-map但是不引用它,只有在报错的时候才会用到. 开发第三方包的时候用的比较多
    //nosources-source-map:能看到错误提示的位置但是看不到源代码,保护在生成环境中源代码不会暴露的一种方式.

    //选择:
    //开发模式可以选择:cheap-module-eval-source-map  1.代码要求每行不会超过80个字符 2.使用框架比较多所以需要module 3.启动打包的速度慢些无所谓,因为使用的是webpack dev server以监视者模式开发再次打包的话也会比较快

    //生产模式选择:none 1.source-map会暴露源代码到生成环境 2.调试是开发阶段的事情 3.实在需要检测建议使用nosources-source-map模式
    // devtool:'eval',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        //服务器必须支持CORS才能使用代理,CORS(跨域资源共享)
        proxy: {
            '/api': {
                //localhost:8080/api -> https://api.github.com/api/users
                target: 'https://api.github.com',
                //代理路径重写,把api替换掉
                pathRewrite: {'^/api' : ''},
                //不使用localhost:8080作为请求GitHub的主机名
                changeOrigin: true
            }
        },
        //hot:true
        hotOnly:true,//如果代码有报错那就不进行替换,这样更方便找到问题
    },
    module:{
        rules:[
            {
                test:/.js$/,
                use:{
                    loader:'babel-loader', 
                    //babel它只是一个平台,需要通过配置去完成想用的功能
                    options:{
                        presets:[
                            ['@babel/preset-env',{modules:false}]
                        ]
                    }
                }
            },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        //用于生成index.html
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: './src/index.html', //模板文件
            meta: { //添加meta属性
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'theme-color': '#4285f4'
              }
        }),
        //用于生成额外的html
        new HtmlWebpackPlugin({
            filename: 'index.[contenthash].html'
        }),
        new ConsoleLogOnBuildWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new CopyWebpackPlugin([
        //     { from: 'public', to: 'outPut' }
        // ]),
    ],
}