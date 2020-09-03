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