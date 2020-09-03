# webpack打包

### 1.webpack快速上手

- 1.下载相关依赖

  ```nginx
  yarn add webpack webpack-cli --dev
  ```

- 2.约定src/index.js作为入口文件,打包成功后在dist文件中有一个main.js

  ```nginx
  yarn webpack
  ```

  webpack打包会把import和exprot转换掉所以在index.html中就不需要type="module"标注

### 2.webpack配置文件

- 在项目根目录下新建webpack.config.js文件,写入对应配置即可

  ```javascript
  const path = require('path')
  module.exports = {
      entry:'./src/index.js', //打包入口文件
      output:{
          filename:'bundle.js', //输出文件名称
          path:path.join(__dirname,'outPut'), //输出文件路径
      }
  }
  ```

### 3.webPack工作模式

- yarn webpack默认打包出来的是生产环境的压缩代码,不方便阅读.在开发环境中打包可以使用一下命令,它在打包的过程中会做一些优化

  ```nginx
  yarn webpack --mode development
  ```

- 而最原始的打包,不作任何优化的也可以使用:

  ```nginx
  yarn webpack --mode none
  ```

- 以上命令具体可参照webpack官方文档,具体写法可以写入cofing配置文件当中:

  ```javascript
  module.exports = {
      mode:'development',
  		...
  }
  ```

- webpack打包结果运行原理可以将mode设置为none,打包之后去bundle.js中去断点代码的运行

  (代码折叠可用ctrl+k ctrl+0)

### 4.webpack模块加载

>webpack兼容各个模块化标准
>
>- 遵循ES Modules标准的import声明
>- 遵循CommonJS标准的require函数
>- 遵循AMD标准的define函数和require函数

- webpack默认只会对js文件进行打包

- 打包不同文件,需要下载不同的loader.比如打包CSS文件

  ```nginx
  yarn add css-loader --dev #打包css
  yarn add style-loader --dev
  ```

  Webpack.config.js配置

  >其中,use数组中的loader是从后往前执行的.先用css-loader把css文件转成js模块才能正常打包,再用style-loader把css-loader转换好的模块以标签的形式放入页面中去

  

  ```javascript
  const path = require('path')
  
  module.exports = {
      mode:'none',
      entry:'./src/main.css', //打包入口文件
      output:{
          filename:'bundle.js', //输出文件名称
          path:path.join(__dirname,'outPut'), //输出文件路径
      },
      module:{
          rules:[
              {
                  test:/.css$/,
                  use:['style-loader','css-loader'], 
              }
          ]
      }
  }
  ```

  有了以上配置,就可以再js文件中导入css资源文件了

  ```javascript
  import createHeading from './heading.js'
  import './main.css'
  const heading = createHeading();
  document.body.append(heading);
  ```

### 5.webpack资源加载器

- #### 常用加载器分类

  >- **编译转换类**,如css-loader
  >- **文件操作类**,如file-loader
  >- **代码检查类**,如eslint-loader

  以下介绍两个常用的加载器:

  

  #### 文件资源加载器

  ```nginx
  yarn add file-loader --dev
  ```

  Webpack.config.js配置

  >webpack在打包时遇到了图片文件,根据配置文件所配置的信息匹配到对应的文件加载器,此时文件加载器就开始工作了.文件加载器先将文件拷贝到输出的目录并默认这个路径是根目录,然后再将拷贝的文件名当作返回值返回.这样对于我们的应用来说所需要发布的资源就发布出来了,同时如果index.html不在这个目录,也可以通过模块的导出成员**publicPath**拿到文件的路径.得到完整的资源文件路径.

  

  ```javascript
  const path = require('path')
  
  module.exports = {
      mode:'none',
      entry:'./src/main.js', 
      output:{
          filename:'bundle.js', 
          path:path.join(__dirname,'outPut'), 
          publicPath:'outPut/',//网站打包的路径
      },
      module:{
          rules:[
              {
                  test:/.png$/,
                  use:'file-loader'
              }
          ]
      }
  }
  ```

  #### DATA URL加载器

  ```nginx
  yarn add url-loader --dev
  ```

  Webpack.config.js配置

  >Data URLs加载器能对图片进行base64转码,小文件使用它能减少请求次数. 如下所示10kb以转的png图片会被转换成dataUrl形式,但是这里还是需要file-loader这个加载器.因为10K以上的图片要用到它.

  

  ```javascript
  const path = require('path')
  
  module.exports = {
      mode:'none',
      entry:'./src/main.js', 
      output:{
          filename:'bundle.js', 
          path:path.join(__dirname,'outPut'), 
          publicPath:'outPut/',
      },
      module:{
          rules:[
              {
                  test:/.png$/,
                  use:{
                      loader:'url-loader',
                      options:{
                          limit:10*1024,
                      }
                  }
              }
          ]
      }
  }
  ```

  #### babel加载器

  ```nginx
  yarn add babel-loader @babel/core @babel/preset-env --dev
  ```

  Webpack.config.js配置

  >webpack打包默认不会转换ES6的特性,加载器可以用来编译转化代码,如babel-loader

  ​	 

  ``` javascript
  const path = require('path')
  module.exports = {
      mode:'none',
      entry:'./src/main.js',
      output:{
          filename:'bundle.js',
          path:path.join(__dirname,'outPut'),
          publicPath:'outPut/',
      },
      module:{
          rules:[
              {
                  test:/.js$/,
                  use:{
                      loader:'babel-loader', 
                      //babel它只是一个平台,需要通过配置去完成想用的功能
                      options:{
                          presets:['@babel/preset-env']
                      }
                  }
              },
          ]
      }
  }
  ```

  #### html资源加载

  ```nginx
  yarn add html-loader --dev
  ```

  Webpack.config.js配置

  >对标签属性的处理要用到**attributes**

  

  ```javascript
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
  ```

###  6.webpack Plugin插件

>解决除打包之外其它自动化工作,例如打包之前清除dist目录或者拷贝文件,压缩代码等

- #### 自动清除输出目录插件

  ```nginx
  yarn add clean-webpack-plugin --dev
  ```

  Webpack.config.js配置

  ```javascript
  const path = require('path')
  const {CleanWebpackPlugin} = require('clean-webpack-plugin')
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
  
          ],
      },
      plugins:[
          new CleanWebpackPlugin()
      ],
  }
  ```

  

- 自动生成HTML插件

  ```nginx
  yarn add html-webpack-plugin --dev
  ```

  Webpack.config.js配置

  ```javascript
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  module.exports = {
      mode:'none',
      entry:'./src/main.js',
      output:{
          filename:'bundle.js', 
          path:path.join(__dirname,'outPut'), 
      },
      plugins:[
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
      ],
  }
  ```

- #### 写一个清除bundle注释的webpack插件

  > 主要是通过在生命周期的钩子中挂载函数从而实现扩展.webpack **插件**是一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 属性的 JavaScript 对象。`apply` 属性会被 webpack compiler 调用，并且 compiler 对象可在**整个**编译生命周期访问。

  

  ```javascript
  const path = require('path')
  const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
  class ConsoleLogOnBuildWebpackPlugin {
      apply(compiler) {
          //emit:生成资源到 output 目录之前。
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
      entry:'./src/main.js', 
      output:{
          filename:'bundle.js', 
          path:path.join(__dirname,'outPut'),
      },
      module:{
          rules:[],
      },
      plugins:[
          new ConsoleLogOnBuildWebpackPlugin(),
      ],
  }
  ```

### 7.webpack其它功能扩展

- #### webpack自动编译

  ```nginx
  yarn webpack --watch
  ```

- #### 自动刷新浏览器

  ```nginx
  browser-sync --files '**/*'
  ```

- #### webpack Dev Server

  ```nginx
  yarn add webpack-dev-server --dev #下载
  ```

  ```nginx
  yarn webpack-dev-server / yarn webpack-dev-server --open #快速开发
  ```

  

- #### webpack Dev Server静态资源访问

  >contentBase额外为开发服务器指定查找资源目录,解决在开发环境中频繁拷贝静态资源的问题

  

  ```javascript
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  ```

  

- #### webpack Dev Server代理API

  >当我们的项目还处于开发阶段的时候,本地的环境去请求服务器接口会存在跨域问题.如果服务器支持CORS这里就可以使用代理.

  

  ```javascript
      devServer: {
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
          }
      },
  ```

  

- #### Source Map (源代码地图)

  ```javascript
  devtool:'source-map',
  ```

  >- **SourceMap**:主要用于帮开发者在开发阶段调试或定位错误,解决了源代码与运行代码不一致所产生的问题.主要原理是连接转换过后的代码与源代码的关系.对生产环境没什么意义.
  >- **eval**:将模块代码放入eval函数中去执行,通过sourceUrl去标注文件的路径,不会生成source-map文件. 所以构建速度是最快的也只能定位文件,不能定位具体位置.
  >- **eval-source-map**:将模块代码放入eval函数中去执行,但是生成了source-map文件,能定位文件和具体的行列.
  >- **cheap-eval-source-map**:阉割版的source-map,将模块代码放入eval函数中去执行,生成了source-map文件,只能定位文件和具体的行信息. 生成速度要快点.
  >- **cheap-module-eval-source-map**:与上面的不同之处是它能直接定义手写原代码,而cheap-eval-source-map是定位编译过后的代码.
  >- **inline-source-map**:是以url的形式嵌入到代码中,eval也是(不可用)
  >- **hidden-source-map**:生成了source-map但是不引用它,只有在报错的时候才会用到. 开发第三方包的时候用的比较多
  >- **nosources-source-map**:能看到错误提示的位置但是看不到源代码,保护在生成环境中源代码不会暴露的一种方式.

  

  **怎样选择?**

  >**开发模式**可以选择:cheap-module-eval-source-map 
  >
  >- 1.一般代码要求每行不会超过100个字符
  >- 2.使用框架比较多的话大量的代码会被babel转码,所以需要module定位源代码的位置
  >- 3.虽然启动打包的速度慢些,但是如果使用了webpack dev server以监视者模式开发再次打包的话也会比较快
  >
  >**生产模式**最好是none
  >
  >- 1.source-map会暴露源代码到生成环境
  >- 2.调试是开发阶段的事情
  >- 3.实在需要检测建议使用nosources-source-map模式

  

- #### webpack模块HMR热更新

  >HMR只将修改的模块实时替换到应用中,极大的提高了工作效率.
  >
  >它集成在webpack-dev-server中,或通过配置文件配置.
  >
  >通过简易的配置之后样式文件的热更新可以开箱即用,但是js文件并不可以开箱即用它需要手动处理模块热替换逻辑,所以还需要些额外的配置,主要是通过HotModuleReplacementPlugin提供的**module.hot.accepet('./project',()=>{})**对每一个js模块进行配置.
  >
  >一些成熟的框架都有特定的HMR规范,这也是它们流行的原因.

  

  ```nginx
  webpack-dev-server --hot
  ```

  ```javascript
  const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
  module.exports = {
    ...
    devServer: {
      //hot:true
      hotOnly:true,//如果代码有报错那就不进行替换,这样更方便找到问题
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin(),
    ],
  }
  ```

- #### DefinePlugin 插件

  >`DefinePlugin`可在全局配置常量。这对于在开发版本和生产版本之间很有用。

  

  ```javascript
  new webpack.DefinePlugin({
    // Definitions...
  });
  ```

- #### Tree Shaking(生产模式自动启用)

  >*Tree Shaking*是JavaScript上下文中常用于消除冗余代码的术语。它依赖于ES2015模块语法的[静态结构](http://exploringjs.com/es6/ch_modules.html#static-module-structure)，即[`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)和[`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)。所以前提是使用ESM实现代码

  

  ```javascript
  module.exports = {
     ...
      optimization:{
          usedExports:true, //标记无用代码 查找枯树枝
          minimize:true,    //清除无用代码 摇掉他们
        	concatenateModules: true,//webpack3中提供 : 原本是一个模块对应一个函数,而设置了concatenateModules的话尽可能的将所有模块合并到一个函数中减少体积
          sideEffects:true, //webpack4中提供: 同时需要在package.json中配置sideEffects:false,在项目中被引入但是没有被使用的模块不会被打包进去,前提要确认这些引入的模块不会有副作用否则的话会被误删.或者通过标识哪些文件有副作用
      },
  }
  ```

  ```javascript
  {
  	...
    "sideEffects":[
      "./src/extend.js"
    ]
  }
  ```

- #### Tree Shaking 与Babel冲突的问题

>由于Tree Shaking默认支持的是ESM的方式,而低版本中的Babel/preset-env会把ESM代码转换成CommonJS,导致Tree Shaking失效.为了保险起见可以如下配置:

```javascript
module.exports = 
    ...
    optimization:{
        usedExports:true, //标记无用代码 查找枯树枝
        minimize:true,    //清除无用代码 摇掉他们
        concatenateModules: true,//
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
}
```

- #### webpack 代码分割

  >代码的打包不能过于极端,意思是既不能*太碎片化*(并行加载的数量有上限会导致资源的浪费)也不能使单个文件过大.所以当bundle.js*文件过大*时就需要对代码进行适当的分割了,这里有以下两点方案
  >
  >- 多入口打包
  >- 动态导入

  

  ##### 多入口打包

  - 应用于多页面应用

  

  ##### 按需加载

  - 动态导入的模块会被自动分包和按需加载

  - 其核心就是应该了ESM的动态加载方法 

    ```javascript
    import('./posts/posts').then(module=>{})
    ```

  - 魔法注释(给分包文件命名,文件名一样就会打包到一个文件)

    ```javascript
    import(/*webpackChunkName:'post'*/'./posts/posts').then(module=>{})
    ```

  - MiniCssExtractPlugin 提取CSS到单个文件

    ```nginx
    yarn add mini-css-extract-plugin -dev
    ```

    

- #### webpack静态资源缓存

  >生产模式下添加hash缓存,一共有三种方式设置.其中chunkhash最适合解决缓存问题

  

  ```javascript
  name: '**/[name]-[hash:8].[ext]' //项目级别的hash,一旦重新打包所有文件名都会变化
  ```

  ```javascript
  name: '**/[name]-[chunkhash:8].[ext]' //块级别的hash,一旦重新打包被修改的块级文件名会关联性的发生变化
  ```

  ```javascript
  name: '**/[name]-[contenthash:8].[ext]' //文件内容级别的hash,一旦重新打包别修改的块级文件会发生变化
  ```

  

  