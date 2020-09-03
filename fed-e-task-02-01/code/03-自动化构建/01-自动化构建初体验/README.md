### 1.自动化构建初体验

- Yarn init
- 新建scss/main.scss
- yarn add sass --dev
- 使用命令把scss编译成css **./node_modules/.bin/sass scss/main.scss css/style.css**

>以上每次把scss编译成css都会返回执行相同的命令,这里就有构建的必要了. 可以在package.json中添加**NPM Scripts**去定义一些与项目开发过程有关的脚本命令**build**,如下所示
>
>```
>  "scripts": {
>    "build":"sass scss/main.scss css/style.css --watch"
>  },
>```
>
>命令行npm run build或者yarn build即可. 另外NPM Scripts也是实现自动化构建最简单的方式:
>
>- 下载一个测试服务器 yarn add browser-sync --dev
>
>- 在package.json中配置好**serve**
>
>- ```
>    "scripts": {
>      "build": "sass scss/main.scss css/style.css",
>      "serve":"browser-sync ."
>    },
>  ```
>
>- npm run serve
>
>- 在npm run serve之前并没有去编译文件,可以借助钩子机制去定义一个**perserve**
>
>- ```
>    "scripts": {
>      "build": "sass scss/main.scss css/style.css",
>      "preserve":"yarn build",
>      "serve":"browser-sync ."
>    },
>  ```
>
>- 添加**--watch**能对sass文件热更新,但是运行的时候会出现阻塞的情况
>
>- ```
>    "scripts": {
>      "build": "sass scss/main.scss css/style.css --watch",
>      "preserve":"yarn build",
>      "serve":"browser-sync ."
>    },
>  ```
>
>- 对此要多个命令并行执行,需要安装**npm-run-all**模块 cnpm install npm-run-all --dev
>
>- ```
>    "scripts": {
>      "build": "sass scss/main.scss css/style.css --watch",
>      "serve":"browser-sync .",
>      "start": "run -p build serve"
>    },
>  ```
>
>- npm run start
>
>- 添加**--files \"css/*.css\"**能让browser-sync去监听项目中一些文件的变化,并对这些文件进行热更新
>
>- ```
>    "scripts": {
>      "build":"sass scss/main.scss css/style.css --watch",
>      "serve":"browser-sync . --files \"css/*.css\"",
>      "start":"run-p build serve"
>    },
>  ```
>
>- npm run start

### 2.常用的自动化构建工具

- Grunt 

  >由于它是基于**临时文件**去实现的所以它有比较频繁的磁盘操作导致在超大型项目中构建速度相对**较慢**

- Gulp

  >由于是基于**内存**实现的,所以速度快很多.也能同时执行多个任务,效率大大提高,而且它的使用方式相对于grunt也更加直观易懂,生态同样也十分完善.是目前市面上最流行的构建系统

- FIS

  >是百度的前端团队推出的构建系统,相对于前两种微内核特点,FIS更像是一种**捆绑套餐**,它把很多典型的需求都集成在内部了,如:资源加载,模块化开发,代码部署,性能优化.

### 3.Grunt

- #### Grunt的基本使用

- yarn init

- yarn add grunt

- 创建入口文件gruntfile.js,内容如下 

  ```
  //Grunt 的入口文件
  //用于定义一些需要Grunt自动执行的任务
  //需要导出一个函数 此函数接受一个grunt的新参,内部提供一些创建任务时可以用到的API
  module.exports = grunt => {
      grunt.registerTask('foo',()=>{
          console.log('hello Grunt')
      })
  }
  ```

- **yarn grunt foo**即可运行,foo是运行的名字

- grunt.registerTask的第二个参数如果是字符串那么代表是描述信息可以在**yarn grunt --help**中找到.

- 如果是**default**则可以直接**yarn grunt**运行 default一般用来映射其它任务的串联执行,如下

  ```
  module.exports = grunt => {
      grunt.registerTask('foo',()=>{
          console.log('hello foo')
      })
      grunt.registerTask('bar','任务描述',()=>{
          console.log('hello bar')
      })
      grunt.registerTask('default',['foo','bar'])
  }
  ```

- 处理异步操作:1.第一个函数不能是箭头函数,2.用done标识异步任务

  ```
  module.exports = grunt => {
      grunt.registerTask('async-task2',function(){
          const done = this.async();
          setTimeout(()=>{
              console.log('async-task working');
              done() //如果标记失败的话用done(false)
          },1000)
      })
  }
  ```

- 标记失败任务的操作:如果中途任务返回了false就会导致后面的任务被终止

  ```
  module.exports = grunt => {
      grunt.registerTask('foo',()=>{
          console.log('hello foo')
      })
      grunt.registerTask('bar','任务描述',()=>{
          console.log('hello bar')
      })
      grunt.registerTask('bad',function(){
          console.log('bad working')
          return false
      })
      grunt.registerTask('default',['foo','bad','bar'])//bar任务不会被执行
  }
  ```

- Grunt的配置方法 yarn grunt configMsg

  ```
  module.exports = grunt => {
      grunt.initConfig({
          foo:{
              bar:123
          }
      })
      grunt.registerTask('configMsg',function(){
          console.log(grunt.config('foo'))
      })
  }
  ```

- Grunt多目标任务 yarn grunt build

  ```
  module.exports = grunt => {
      grunt.initConfig({
          foo:{
              bar:123
          },
          build:{
              //options任务的配置选项
              options:{
                  foo:'bar'
              },
              css:{
                  //会覆盖上一层的配置
                  options:{
                      foo:'bar1'
                  },
              },
              js:'2',
          }
      })
      grunt.registerMultiTask('build',function(){
          console.log(this.options())
          console.log(`target:${this.target},data:${this.data}`)
      })
  }
  ```

- #### Grunt插件的使用

##### 文件清除插件

 - yarn add grunt-contrib-clean

 - yarn grunt clean 

   ```
   module.exports = grunt => {
       grunt.initConfig({
           clean:{
               temp:'temp/app.js',//删除temp下的所以app.js文件 
               // temp:'temp/*.txt', //删除temp下的所以txt文件 
               // temp:'temp/**',    //删除temp下的所以文件
           }
       })
       //通过loadNpmTasks引入插件中的任务,若任务需要配置信息
       grunt.loadNpmTasks('grunt-contrib-clean')
   }
   ```

##### sass预编译插件

- yarn add grunt-sass sass --dev

- yarn grunt sass

  ```
  const sass = require('sass')
  module.exports = grunt => {
      grunt.initConfig({
          sass:{
              options:{
                  sourceMap:true, //生成对应的main.css.map文件
                  implementation:sass
              },
              main:{
                  files:{
                      './scss/main.css':'./scss/main.scss' //'输出路径':'编译路径文件'
                  }
              }
          }
      })
      //通过loadNpmTasks引入插件中的任务,若任务需要配置信息
      grunt.loadNpmTasks('grunt-sass')
  ```

#### es6+ babel插件

- yarn add grunt-babel @babel/core @babel/preset-env --dev

- yarn add load-grunt-tasks --dev 能自动加载所有的grunt插件中的任务,不用一个个的去grunt.loadNpmTasks('...')

  ```
  //Grunt 的入口文件
  //用于定义一些需要Grunt自动执行的任务
  //需要导出一个函数 此函数接受一个grunt的新参,内部提供一些创建任务时可以用到的API
  const sass = require('sass')
  const loadGruntTasks = require('load-grunt-tasks')
  module.exports = grunt => {
      grunt.initConfig({
          sass:{
              options:{
                  sourceMap:true, //生成对应的main.css.map文件
                  implementation:sass
              },
              main:{
                  files:{
                      './dist/css/main.css':'./src/scss/main.scss' //'输出路径':'编译路径文件'
                  }
              }
          },
          babel:{
              options:{
                  sourceMap:true, //生成对应的main.css.map文件
                  presets:['@babel/preset-env'], //presets:需要转换哪些特性
              },            
              main:{
                  files:{
                      './dist/js/app.js':'./src/js/app.js'
                  }
              }
          }
      })
      //通过loadNpmTasks引入插件中的任务,若任务需要配置信息
      //grunt.loadNpmTasks('grunt-sass')
  
      //自动加载所有的grunt插件中的任务
      loadGruntTasks(grunt)
  }
  ```

- yarn grunt sass
- yarn grunt babel

#### es6+ babel插件

- yarn add grunt-contrib-watch --dev

- 进行配置

  ```
  //Grunt 的入口文件
  //用于定义一些需要Grunt自动执行的任务
  //需要导出一个函数 此函数接受一个grunt的新参,内部提供一些创建任务时可以用到的API
  const sass = require('sass')
  const loadGruntTasks = require('load-grunt-tasks')
  module.exports = grunt => {
      grunt.initConfig({
          sass:{
              options:{
                  sourceMap:true, //生成对应的main.css.map文件
                  implementation:sass
              },
              main:{
                  files:{
                      './dist/css/main.css':'./src/scss/main.scss' //'输出路径':'编译路径文件'
                  }
              }
          },
          babel:{
              options:{
                  sourceMap:true, //生成对应的main.css.map文件
                  presets:['@babel/preset-env'], //presets:需要转换哪些特性
              },            
              main:{
                  files:{
                      './dist/js/app.js':'./src/js/app.js'
                  }
              }
          },
          watch:{
              js:{
                  files:['src/js/*.js'],
                  tasks:['babel']
              },
              css:{
                  files:['src/scss/*.scss'],//scss是sass的新扩展名
                  tasks:['sass']
              }
          }
      })
      //通过loadNpmTasks引入插件中的任务,若任务需要配置信息
      //grunt.loadNpmTasks('grunt-sass')
  
      //自动加载所有的grunt插件中的任务
      loadGruntTasks(grunt)
  
      //watch运行的时候只会监听文件的变化而不会先去编译一次,所以这里需要顺序执行
      grunt.registerTask('default',['sass','babel','watch'])
  }
  ```

- yarn grunt watch
- yarn grunt

### 4.Gulp

- #### 基本使用

- yarn init --yes

- yarn add gulp --dev

- 新建gulpfile.js文件

  ```
  //Gulp 的入口文件
  //Gulp基于流的构建工具,引入了构建管道的概念 约定每个任务都是异步的,没有同步任务
  exports.foo = done=>{
      console.log('Gulp 的入口文件')
      done(); //标识任务完成
  }
  
  exports.default = done=>{
      console.log('default默认调用')
      done(); //标识任务完成
  }
  
  //gulp@4.0之前需要通过gulp模块的task注册任务.
  const gulp = require('gulp')
  gulp.task('bar',done=>{
      console.log('bar working')
      done(); //标识任务完成
  })
  ```

- yarn gulp foo

- 组合任务

  ```
  //组合任务
  const {series, parallel} = require('gulp');
  
  const task1 = done=>{
      setTimeout(()=>{
          console.log('task1 working~')
          done();
      },1000)
  }
  
  const task2 = done=>{
      setTimeout(()=>{
          console.log('task2 working~')
          done();
      },1000)
  }
  
  const task3 = done=>{
      setTimeout(()=>{
          console.log('task3 working~')
          done();
      },1000)
  }
  
  //series串行任务(同步:部署任务)
  exports.a = series(task1,task2,task3);
  //parallel并行任务(异步:编译css和js互不干扰)
  exports.b = parallel(task1,task2,task3);
  ```

- Gulp中处理异步流程的操作

  ```
  const fs = require('fs')
  //异步任务
  exports.callback = done=>{
      console.log('callback task~')
      done()
  }
  exports.callback_error = done=>{
      console.log('callback task~')
      done(new Error('task error!'))
  }
  exports.promise = done=>{
      console.log('promise task~')
      return Promise.resolve()
  }
  exports.promise_error = done=>{
      console.log('promise task~')
      return Promise.reject(new Error('promise error!'))
  }
  const timeout = time => {
      return new Promise((resoleve,reject)=>{
          console.log('dasdsdasadsdsa') //1
          setTimeout(resoleve('aaa'),time)
      })
  }
  exports.async = async()=>{
      let a = await timeout(1000)
      console.log(a)//2
      console.log('async task~')//3
  }
  exports.stream = (done) => {
      const readStream = fs.createReadStream('package.json') //读取内容
      const writeStream = fs.createWriteStream('temp.txt')   //生成文件
      readStream.pipe(writeStream)                           //注入内容 
      return readStream
      //stream中有对应的end事件,所以不需要done. 等同于下面的代码
      // readStream.on('end',()=>{
      //     done()
      // })
  }
  ```

- 模拟原始文件压缩操作

  ```
  const { Transform } = require('stream');
  //模拟文件压缩操作
  exports.default = ()=>{
      //文件读取流
      const read = fs.createReadStream('normalize.css');
      //文件写入流
      const write = fs.createWriteStream('normalize.min.css');
      //文件转化
      const transform = new Transform({
          transform:(chunk,encodeing,callback) => {
              //核心转换过程实现
              //chunk:读取流中读取到的内容(Buffer)
              console.log(chunk);
              const input = chunk.toString();
              //正则去掉空格和注释
              const output = input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'');
              callback(null,output);
          }
      })
      read
      .pipe(transform)//转化
      .pipe(write)//写入
      return read;
  }
  ```

- Gulp 操作API

- yarn add gulp-clean-css --dev

- yarn add gulp-rename --dev

  ```
  //Gulp 文件操作API
  const { src, dest } = require('gulp');
  const cleanCss = require('gulp-clean-css');
  const rename = require('gulp-rename');
  exports.GulpApi = ()=>{
      return src('src/*.css')                         //src创建文件的读取流
             .pipe(cleanCss())                        //cleanCss第三方转换流 打包压缩
             .pipe(rename({extname:'.min.css'}))      //rename第三方转换流   文件命名
             .pipe(dest('dist'))                      //dest写入流
  }
  //如上可见gulp的api比原始的样方便很多
  ```

  

- #### Gulp自动化构建案例

> 案例代码地址: git clone https://github.com/zce/zce-gulp-demo.git

#### sass文件编译任务:

- 引入**gulp**模块使用**src,dest**读取和创建文件,引入**gulp-sass**编译scss文件

- yarn add gulp --dev

- yarn add gulp-sass

  ```
  const { src, dest } = require('gulp');//dest:目标位置
  const sass = require('gulp-sass')
  
  const style = ()=>{
    return src('src/assets/styles/*.scss',{base:'src'}) //base:基准路径
           .pipe(sass({outputStyle:'expanded'}))       //sass:转换成css文件,但是_开头的文件会以为是辅助的文件会被忽略掉. {outputStyle:'expanded'}被编译之后的字符串展开{}
           .pipe(dest('dist')) //dist:发布文件
  }
  module.exports = {
    style
  }
  ```

- yarn gulp style

#### JS文件编译任务

- 引入**gulp**模块使用**src,dest**读取和创建文件,引入**gulp-babe**l编译js文件

- yarn add gulp-babel --dev

- yarn add @babel/core @babel/preset-env --dev (@babel/core:自动编译 @babel/preset-env:编译es6+的全部特性)

  ```
  const { src, dest } = require('gulp');//dest:目标位置
  const babel = require('gulp-babel')
  const script = () => {
    return src('src/assets/scripts/*.js',{base:'src'})
           .pipe(babel({presets:['@babel/preset-env']}))
           .pipe(dest('dist'))
  }
  module.exports = {
    script
  }
  ```

#### 页面模板编译

- yarn add gulp-swig --dev

  ```
  const { src, dest } = require('gulp');//dest:目标位置
  const swig = require('gulp-swig')
  //页面模板编译
  const page = () => {
    return src('src/*.html',{base:'src'}) //** scr下的任意文件的html文件
           .pipe(swig({data}))            //data:模板中对应的数据
           .pipe(dest('dist'))
  }
  module.exports = {
    page
  }
  ```

#### 组合以上三个任务

```
//组合以上三个任务
const {parallel} = require('gulp');
const compile = parallel(style,script,page);
module.exports = {
  compile
}
```

#### 字体和图片文件提取

- yarn add gulp-imagemin --dev

  ```
  const { src, dest } = require('gulp');//dest:目标位置
  //gulp-imagemin内部依赖的模块是通过c++完成的模块,需要下载二进制程序集,只能通过gitHub下载,镜像是下载不到的. 所以会容易出现一些问题也会有些慢
  const imagemin = require('gulp-imagemin')
  
  //提取图片文件
  const image = () => {
  	//scr下的任意文件的html文件
    return src('src/assets/images/**',{base:'src'}) 
           //imagemin:图片无损压缩,只是删除了一些元数据的信息
           .pipe(imagemin())
           .pipe(dest('dist'))
  }
  
  //提取字体文件
  const font = () => {
    //** scr下的任意文件的文件
    return src('src/assets/fonts/**',{base:'src'}) 
    				//字体文件中也用到了svg可以用imagemin去处理,至于不支持的压缩文件不受影响
           .pipe(imagemin())                       
           .pipe(dest('dist'))
  }
  //组合个任务
  const compile = parallel(image,font);
  module.exports = {
    compile
  }
  ```

  

#### 额外拷贝的任务和构建之前的删除任务

- yarn add del --dev

  ```
  const { src, dest, parallel, series, watch } = require('gulp');//dest:目标位置
  //删除任务
  const del = require('del')
  
  //额外拷贝的任务
  const extra = () => {
    return src('public/**',{base:'public'}) //** scr下的任意文件的html文件
           .pipe(dest('dist'))
  }
  
  //每次构建之前进行清除操作
  const clean = () => {
    return del(['dist'])
  }
  
  module.exports = {
    clean,
    extra
  }
  ```

#### 自动加载插件

>随着构建任务的复杂,使用到的插件也越来越多.可以通过**gulp-load-plugins**这个插件去自动加载所有插件 

- ```
  const { src, dest, parallel, series, watch } = require('gulp');//dest:目标位置
  //自动加载插件
  const loadPlugins = require('gulp-load-plugins')
  const plugins = loadPlugins();
  // 以下都不需要引入了
  // const sass = require('gulp-sass')
  // const babel = require('gulp-babel')
  // const swig = require('gulp-swig')
  // const imagemin = require('gulp-imagemin')
  const del = require('del')
  
  //提取图片文件
  const image = () => {
    return src('src/assets/images/**',{base:'src'}) 
    			 //对应的插件要用plugins.的方式使用
           .pipe(plugins.imagemin())
           .pipe(dest('dist'))
  }
  
  ```

#### 开发服务器

- yarn add browser-sync --dev

  ```
  //开发服务器
  const bs = require('browser-sync')
  const serve = ()=>{
    bs.init({                       //init:初始化配置
      notify:false,                 //关闭网页提示已连接服务的相关提示
      port:2080,                    //端口号
      open:true,                    //自动打开浏览器
      files:'dist/**',              //热更新服务的文件    
      server:{
        baseDir:'dist',             //web服务器的根目录,浏览器运行的代码
        routes:{                    //第三方的引用文件
          '/node_modules':'node_modules'
        }
      }
    })
  }
  
  module.exports = {
    serve
  }
  ```

  

#### 监视变化watch

```
//JS文件编译任务
const script = () => {
  return src('src/assets/scripts/*.js',{base:'src'})
         .pipe(plugins.babel({presets:['@babel/preset-env']}))
         .pipe(dest('dist'))
         .pipe(bs.reload({stream:true}))
}

const serve = ()=>{
  // watch:监听文件路径的通配符,自动编译到dist
  watch('src/assets/styles/*.scss',style)
  watch('src/assets/scripts/*.js',script)
  watch('src/*.html',page)
  ...
}
```

#### 构建优化

>主要考虑在开发环境和生产环境下哪些任务需要哪些任务不需要,如images,fonts,public下的文件在开发环境中不需要做过多的操作.

#### useref文件引入处理及文件压缩

>useref原理是通过构建注释去把对应的文件构建到对应的文件中,如:把bootstrap.css构建到vendor.css中,useref处理之后会生产一些比较大的未压缩的文件(html,js,css),这里分别需要:gulp-htmlmin gulp-uglify gulp-clean-css插件对不同的文件需要进行不同的压缩处理.而分而治之又需要gulp-if插件.

- yarn add gulp-useref --dev
- yarn add gulp-htmlmin gulp-uglify gulp-clean-css --dev
- yarn add gulp-if --dev

```

const useref = () => {
  return src('dist/*.html',{base:'dist'})
         //去dist路径中找文件,去根目录中找文件
         .pipe(plugins.useref({ searchPath :['dist','.']}))
         //useref处理之后会生产一些比较大的未压缩的文件(html,js,css),分别需要:gulp-htmlmin gulp-uglify gulp-clean-css插件
         //对不同的文件需要进行不同的处理,这里又需要gulp-if插件分别处理
         //需要有构建注释
         .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
         .pipe(plugins.if(/\.js$/,plugins.uglify()))
         //htmlmin默认只删除一些空格,这里要实现压缩需要指定collapseWhitespace.html中可能会有css和JS代码这里需要指定minifyCSS,minfyJS
         .pipe(plugins.if(/\.html$/,plugins.htmlmin({collapseWhitespace:true,minifyCSS:true,minfyJS:true}))) 
         //这里不能写在dist文件中,因为会出现一边读一边写的情况.造成问题
         //.pipe(dest('dist'))
         .pipe(dest('release'))
}
```

#### 整个构建任务规划

```
//dest:目标位置
const { src, dest, parallel, series, watch } = require('gulp');

//自动加载插件 
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins();

// 引入plugins 以下都不需要引入了 对应的插件要用plugins.的方式使用
// const plugins.sass = require('gulp-sass')
// const plugins.babel = require('gulp-babel')
// const plugins.swig = require('gulp-swig')
// gulp-imagemin内部依赖的模块是通过c++完成的模块,需要下载二进制程序集,只能通过gitHub下载,镜像是下载不到的. 所以会容易出现一些问题也会有些慢
// const plugins.imagemin = require('gulp-imagemin')

// 删除任务
const del = require('del')

// const browserSync = require('browser-sync')
// const loadPlugins = require('gulp-load-plugins')
// const plugins = loadPlugins()
// const bs = browserSync.create()

//模板字符串需要的数据
const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

//每次构建之前进行清除操作
const clean = () => {
  return del(['dist','static'])
}

//sass文件编译任务:
const style = ()=>{
         //base:基准路径
  return src('src/assets/styles/*.scss',{base:'src'}) 
         //sass:转换成css文件,但是_开头的文件会以为是辅助的文件会被忽略掉. {outputStyle:'expanded'}被编译之后的字符串展开{}
         .pipe(plugins.sass({outputStyle:'expanded'}))
         .pipe(dest('static')) //dist:发布文件
         .pipe(bs.reload({stream:true})) //以流的方式往浏览器中去推,文件变化了会触发刷新(热更新)
}

//JS文件编译任务
const script = () => {
  return src('src/assets/scripts/*.js',{base:'src'})
         .pipe(plugins.babel({presets:['@babel/preset-env']}))
         .pipe(dest('static'))
         .pipe(bs.reload({stream:true}))
}

//页面模板编译
const page = () => {
         //** scr下的任意文件的html文件
  return src('src/*.html',{base:'src'})
         //data:模板中对应的数据
         .pipe(plugins.swig({data}))
         .pipe(dest('static'))
         .pipe(bs.reload({stream:true}))
}

//提取图片文件
const image = () => {
  return src('src/assets/images/**',{base:'src'}) 
          //imagemin:图片无损压缩,只是删除了一些元数据的信息
         .pipe(plugins.imagemin())
         .pipe(dest('dist'))
}

//提取字体文件
const font = () => {
  return src('src/assets/fonts/**',{base:'src'}) 
          //字体文件中也用到了svg可以用imagemin去处理,至于不支持的压缩文件不受影响
         .pipe(plugins.imagemin())
         .pipe(dest('dist'))
}

//额外拷贝的任务
const extra = () => {
  return src('public/**',{base:'public'}) 
         .pipe(dest('dist'))
}

//开发服务器
const bs = require('browser-sync')
const serve = ()=>{
  // watch:监听文件路径的通配符,自动编译到dist
  watch('src/assets/styles/*.scss',style)
  watch('src/assets/scripts/*.js',script)
  watch('src/*.html',page)

  // 这边为了提高开发模式的构建效率对images,fonts,public下的文件不作操作.在发布生产的时候再做操作,但是这几个文件如果有更新呢?
  // watch('src/assets/images/**',image)
  // watch('src/assets/fonts/**',font)
  // watch('public/**',extra)
  // 这里解决文件更新问题,如下当文件发生变化时会触发bs的刷新操作. 同样也可通过pipe写到对应的操作函数中去
  watch(['src/assets/images/**','src/assets/fonts/**','public/**'],bs.reload)
  // init:初始化配置
  bs.init({
    //关闭网页提示已连接服务的相关提示
    notify:false,
    //端口号
    port:2080,
    //自动打开浏览器
    open:true,
    //热更新服务的文件,在js,html,css相关变化函数中加了.pipe(bs.reload({stream:true}))这里就不需要暴力的监听所以src下文件变化了
    //files:'dist/**',
    server:{
      //web服务器的根目录,当运行的代码找不到相关路径下的资源时会按照数组里配置的心意依次去找. 
      baseDir:['static','src','public'],
      //第三方的引用文件路由的映射,只在开发环境中有效.在生成环境下是没有这个文件的.
      //所以在生产构建的时候需要打包到代码中去.这里可借助gulp-useref插件去帮我们打包这些文件
      routes:{
        '/node_modules':'node_modules'
      }
    }
  })
}

//useref原理是通过构建注释去把对应的文件构建到对应的文件中,如下:把bootstrap.css构建到vendor.css中
// <!-- build:css assets/styles/vendor.css -->
// <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
// <!-- endbuild -->

const useref = () => {
  return src('static/*.html',{base:'static'})
         //去dist路径中找文件,去根目录中找文件
         .pipe(plugins.useref({ searchPath :['static','.']}))
         //useref处理之后会生产一些比较大的未压缩的文件(html,js,css),分别需要:gulp-htmlmin gulp-uglify gulp-clean-css插件
         //对不同的文件需要进行不同的处理,这里又需要gulp-if插件分别处理
         //需要有构建注释
         .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
         .pipe(plugins.if(/\.js$/,plugins.uglify()))
         //htmlmin默认只删除一些空格,这里要实现压缩需要指定collapseWhitespace.html中可能会有css和JS代码这里需要指定minifyCSS,minfyJS
         .pipe(plugins.if(/\.html$/,plugins.htmlmin({collapseWhitespace:true,minifyCSS:true,minfyJS:true}))) 
         //这里不能写在dist文件中,因为会出现一边读一边写的情况.造成问题
         //.pipe(dest('dist'))
         //这里有了static可以放dist了
         .pipe(dest('dist'))
}

//组合scr中处理的任务
const compile = parallel(style,script,page);

//上线模式
const build = series(clean,parallel(series(compile,useref),image,font,extra))

//开发模式
const start = series(compile,serve)

module.exports = {
  start,
  build,
  useref,
  compile
}
```

#### 5.FIX的基本使用

>目前已经没有维护了

- cnpm i fis3 -g

- fis3 release -d output  将根目录的代码移植到output中

- cnpm i fis-parser-node-sass -g sass文件的转译

- cnpm i fis-parser-babel-6.x -g js文件的转译

  ```
  //匹配js,scss,png文件 将它们放到assets下,$0是当前文件的意思. 主要是为了在一些前后端不分离项目中提高可移植性
  fis.match('*.{js,scss,png}',{
      release:'/assets/$0'
  })
  
  //任意目录下的scss文件
  fis.match('**/*.scss',{
      rExt:'.css',
      parser:fis.plugin('node-sass'),
      //压缩css
      optimizer:fis.plugin('clean-css')
  })
  
  //任意目录下的scss文件
  fis.match('**/*.js',{
      //目前没有维护了 使用只支持babel-6.x
      parser:fis.plugin('babel-6.x'),
      //压缩js
      optimizer:fis.plugin('uglify-js')
  })
  ```

  

 