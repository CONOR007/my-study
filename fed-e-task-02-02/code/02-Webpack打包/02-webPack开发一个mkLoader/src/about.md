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

