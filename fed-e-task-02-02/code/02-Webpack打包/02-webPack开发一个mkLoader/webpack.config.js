const path = require('path')

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
          //其实loader就是一个管道,顺序是从数组的最后一个运行起的
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
            },
            {
                test:/.md$/,
                use:'./markdown-loader'
            },
        ]
    }
}