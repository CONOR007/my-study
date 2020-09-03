const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'none',
    entry:'./src/main.js', //打包入口文件
    output:{
        filename:'bundle.js', //输出文件名称
        path:path.join(__dirname,'outPut'), //输出文件路径
        publicPath:'outPut/',//网站打包的路径
    },
    module:{
        rules:[
            {
                test:/.js$/,
                use:{
                    loader:'babel-loader', //babel它只是一个平台,需要通过配置去完成想用的功能
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/.css$/,
                //use从后往前执行 先用css-loader把css文件转成js模块才能正常打包,
                //再用style-loader把css-loader转换好的模块以标签的形式放入页面中去
                use:['style-loader','css-loader'], 
            },
            {
                test:/.png$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:10*1024,//10kb以下转换成dataUrl
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: {
                  loader: 'html-loader',
                  options: {
                    attributes: {
                        list: [
                          {
                            tag: 'a',
                            attribute: 'href',
                            type: 'src',
                          },                          
                        ],
                    }
                  }
                }
            }
        ],
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ],
}