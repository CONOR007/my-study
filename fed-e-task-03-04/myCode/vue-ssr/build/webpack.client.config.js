/**
 * 客户端打包配置 
 */
// merge: 合并配置信息
const { merge } = require('webpack-merge');
// 导入webpack公共配置
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
module.exports = merge(baseConfig, {
    // 指定客户端打包入口
    entry: {
        //入口的相对路径是基于根路径进行打包的
        app: './src/entry-client.js',
    },
    module: {
        rules: [
            // ES6 转 ES5
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
        ],
    },
    // 重要信息:这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    optimization: {
        splitChunks: {
            name: 'manifest',
            minChunks: Infinity,
        },
    },
    plugins: [
        // 此插件在输出目录中生成 `vue-ssr-client-manifest.json`。它会描述打包过程中的一些依赖等打包信息
        new VueSSRClientPlugin(),
    ],
});
