## 使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

### 项目打包思路

```apl
1.找到项目的入口文件
2.下载webpack及webpack/cli
3.根据规则对webpack进行入口和出口配置
4.在package.json中进行script命令映射.执行相应的打包任务
5.打包任务执行会有一连串的报错,针对报错下载相应的loader和plugin
6.最后成功把页面成功展示到界面上
```

### 配置文件最终结果

```javascript
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    mode : 'none',
    entry : './src/main.js',
    output : {
        filename:'js/[bundle].[contenthash:8].js',
        path:path.join(__dirname,'dist'),
    },
    module : {
        rules : [
            {
                test : /\.(png|jpe?g|gif)$/,
                use : {
                    loader : 'url-loader',
                    options : {
                        limit : 6 * 1024, //kb
                        name:'img/[name].[contenthash:6].[ext]',
                        esModule:false,
                    }
                }
            },
            {
                test : /\.css$/,
                use : ['style-loader','css-loader']
            },
            {
                test : /\.vue$/,
                use : 'vue-loader'
            },            
            {
                test : /\.less$/,
                use : ['style-loader','css-loader','less-loader']
            },
        ]
    },
    devServer : {
        contentBase: path.join(__dirname,'public'),
    },
    plugins : [
        new VueLoaderPlugin (),
        new HtmlWebpackPlugin ({
            template:'./public/index.html',
            title:'conor page',
        }),
        new webpack.DefinePlugin({
            BASE_URL:'"/"'
        }),
    ]
}
```

### 包文件下载

```nginx
npm i
```

### 项目打包运行

```nginx
npm run build
```

### 本地服务运行

```nginx
npm run serve
```