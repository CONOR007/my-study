/**
 * 公共配置
 */
// 处理插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 处理路径
const path = require('path');
// 提供webpack打包的一个友好日志输出
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// 获取绝对路径
const resolve = file => path.resolve(__dirname, file);
// 是否是生产模式
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    //production:会对打包的代码进行优化如:压缩,而development不会
    mode: isProd ? 'production' : 'development',
    // 输出
    output: {
        path: resolve('../dist/'),
        publicPath: '/dist/',
        // 文件名hash
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            // 路径别名，@ 指向 src 
            '@': resolve('../src/')
        },
        // extensions 可以省略的扩展名 当省略扩展名的时候，按照从前往后的顺序依次解析 
        extensions: ['.js', '.vue', '.json']
    },
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    module: {
        rules: [
            // 处理图片资源
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            // 处理字体资源
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            // 处理 .vue 资源
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            // 处理 CSS 资源
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            // CSS 预处理器，参考:https://vue-loader.vuejs.org/zh/guide/pre- processors.html
            // 例如处理 Less 资源
            // {
            //   test: /\.less$/,
            // use: [
            //     'vue-style-loader',
            //     'css-loader',
            //     'less-loader'
            //   ]
            // },
        ],
    },
    plugins: [
        // VueLoaderPlugin:打包.vue文件必须要的一个插件
        new VueLoaderPlugin(), 
        // webpack错误日志输出
        new FriendlyErrorsWebpackPlugin()],
};
