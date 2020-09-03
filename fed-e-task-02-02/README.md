# 简答题

## 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack打包的整个过程。

```apl
		Webpack构建运行在node.js环境下，它的配置文件遵循CommonJS规范，webpack.config.js导出一个Object对象（或者导出一个Function，或者导出一个Promise函数，还可以导出一个数组包含多份配置）。Webpack从入口文件开始，识别出源码中的模块化导入语句，递归地找出所有依赖，然后把入口文件和所有依赖打包到一个单独的文件中(即一个chunk)，这就是所谓的模块打包。最新版的Webpack，已经支持了ES6/CommonJS/AMD等模块化语句。
Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
		#构建流程:
    1.初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
    2.开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
    3.确定入口：根据配置中的 entry 找出所有的入口文件；
    4.编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
    5.完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
    6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
    7.输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
    8.在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
		#其基础配置参照webpack官网配置项,其中:
    Entry:入口，这是Webpack执行构建的第一步，可理解为输入。
    Module:模块，在Webpack中一切皆模块，一个模块即为一个文件。Webpack会从Entry开始递归找出所有的依赖模块。
    Chunk:代码块，一个Chunk由多个模块组合而成，它用于代码合并与分割。
    Loader:模块转换器，用于将模块的原内容按照需求转换成新内容。
    Plugin:扩展插件，在Webpack构建过程的特定时机注入扩展逻辑，用来改变或优化构建结果。
    Output:输出结果，源码在Webpack中经过一系列处理后而得出的最终结果。
```

```javascript
//基础配置项
module.exports = {
  entry: '',
  output: {
    path: '',
    filename: '',
    publicPath: '',
    library: '',
    libraryTarget: '',
    pathinfo: '',
    chunkFilename: ''
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 参数传递
            }
          }
        ],
        include: [],
        exclude: []
      }
    ],
    noParse: []
  },
  plugins: [],
  rosolve: {
    modules: [],
    extensions: [],
    alias: []
  },
  performance: {
    hints: '',
    maxAssetSize: 20000,
    maxEntrypointSize: 40000
  },
  devTool: '',
  context: '',
  target: '',
  externals: {},
  stats: {},
  devServer: {
    proxy: '',
    contentBase: '',
    compress: '',
    hot: '',
    https: '',
    cache: '',
    watch: '',
    profile: true
  },
  watchOptions: {
    ignored: '',
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

```apl
#loader:加载器
		加载器是用来加载文件的,webpack本身只能加载JS文件(内置babel-loader)加载其它文件就需要另外安装loader,比如css-loader可以把CSS转成style标签,又比如file-loader可以加载图片对图片进行一些优化.

#plugin:插件
		插件是用来增强功能的,比如HtmlWebpackPlugin是用来生成HTML的,比如MiniCssExtractPlugin它是用来抽取css生成css文件的.loader可以理解为是一个管道,顺序是从rules数组的最后一个运行起的.

#开发思路:
		'Loader'像一个"翻译官"把读到的源文件内容转义成新的文件内容，并且每个Loader通过链式操作，将源文件一步步翻译成想要的样子。
		编写Loader时要遵循单一原则，每个Loader只做一种转义工作。 每个Loader的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用this.callback()方法，将内容返回给webpack。 还可以通过 this.async()生成一个callback函数，再用这个callback将处理后的内容输出出去。 此外webpack还为开发者准备了开发loader的工具函数集——loader-utils。
		相对于Loader而言，'Plugin'的编写就灵活了许多。 webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
```

# 编程题

### [点击跳转到Webpack 实现 Vue 项目打包任务](https://gitee.com/conorCode/fed-e-task-02-02/tree/master/notes/task)

