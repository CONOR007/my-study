//dest:目标位置
const { src, dest, parallel, series, watch } = require('gulp');
const cwd = process.cwd();
let config = {
  //default config
  build:{
    src:'src',
    dist:'dist',
    static:'static',
    public:'public',
    paths:{
      styles:'assets/styles/*.scss',
      scripts:'assets/scripts/*.js',
      pages:'*.html',
      images:'assets/images/**',
      fonts:'assets/fonts/**',
    }
  }
}
try {
  const loadConfig = require(`${cwd}/pages.config.js`)
  config = Object.assign({},config,loadConfig)
}catch(e){}
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

//每次构建之前进行清除操作
const clean = () => {
  return del([config.build.dist,config.build.static])
}

//sass文件编译任务:
const style = ()=>{
         //base:基准路径
  return src(config.build.paths.styles,{base:config.build.src,cwd:config.build.src}) 
         //sass:转换成css文件,但是_开头的文件会以为是辅助的文件会被忽略掉. {outputStyle:'expanded'}被编译之后的字符串展开{}
         .pipe(plugins.sass({outputStyle:'expanded'}))
         .pipe(dest(config.build.static)) //dist:发布文件
         .pipe(bs.reload({stream:true})) //以流的方式往浏览器中去推,文件变化了会触发刷新(热更新)
}

//JS文件编译任务
const script = () => {
  return src(config.build.paths.scripts,{base:config.build.src,cwd:config.build.src})
         .pipe(plugins.babel({presets:['@babel/preset-env']}))
         .pipe(dest(config.build.static))
         .pipe(bs.reload({stream:true}))
}

//页面模板编译
const page = () => {
         //** scr下的任意文件的html文件
  return src(config.build.paths.pages,{base:config.build.src,cwd:config.build.src})
         //data:模板中对应的数据
         .pipe(plugins.swig({data:config.data}))
         .pipe(dest(config.build.static))
         .pipe(bs.reload({stream:true}))
}

//提取图片文件
const image = () => {
  return src(config.build.paths.images,{base:config.build.src,cwd:config.build.src}) 
          //imagemin:图片无损压缩,只是删除了一些元数据的信息
         .pipe(plugins.imagemin())
         .pipe(dest(config.build.dist))
}

//提取字体文件
const font = () => {
  return src(config.build.paths.fonts,{base:config.build.src,cwd:config.build.src}) 
          //字体文件中也用到了svg可以用imagemin去处理,至于不支持的压缩文件不受影响
         .pipe(plugins.imagemin())
         .pipe(dest(config.build.dist))
}

//额外拷贝的任务
const extra = () => {
  return src('**',{base:config.build.public,cwd:config.build.public}) 
         .pipe(dest(config.build.dist))
}

//开发服务器
const bs = require('browser-sync')
const serve = ()=>{
  // watch:监听文件路径的通配符,自动编译到dist
  watch(config.build.paths.styles,{cwd:config.build.src},style)
  watch(config.build.paths.scripts,{cwd:config.build.src},script)
  watch(config.build.paths.pages,{cwd:config.build.src},page)

  // 这边为了提高开发模式的构建效率对images,fonts,public下的文件不作操作.在发布生产的时候再做操作,但是这几个文件如果有更新呢?
  // watch(config.build.paths.images,image)
  // watch(config.build.paths.fonts,font)
  // watch('public/**',extra)
  // 这里解决文件更新问题,如下当文件发生变化时会触发bs的刷新操作. 同样也可通过pipe写到对应的操作函数中去
  watch([config.build.paths.images,config.build.paths.fonts],{cwd:config.build.src},bs.reload)
  watch('**',{cwd:config.build.src},bs.reload)
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
      baseDir:[config.build.static,config.build.src,config.build.public],
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
  return src(config.build.paths.pages,{base:config.build.static,cwd:config.build.src})
         //去dist路径中找文件,去根目录中找文件
         .pipe(plugins.useref({ searchPath :[config.build.static,'.']}))
         //useref处理之后会生产一些比较大的未压缩的文件(html,js,css),分别需要:gulp-htmlmin gulp-uglify gulp-clean-css插件
         //对不同的文件需要进行不同的处理,这里又需要gulp-if插件分别处理
         //需要有构建注释
         .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
         .pipe(plugins.if(/\.js$/,plugins.uglify()))
         //htmlmin默认只删除一些空格,这里要实现压缩需要指定collapseWhitespace.html中可能会有css和JS代码这里需要指定minifyCSS,minfyJS
         .pipe(plugins.if(/\.html$/,plugins.htmlmin({collapseWhitespace:true,minifyCSS:true,minfyJS:true}))) 
         //这里不能写在dist文件中,因为会出现一边读一边写的情况.造成问题
         //.pipe(dest(config.build.dist))
         //这里有了static可以放dist了
         .pipe(dest(config.build.dist))
}

//组合scr中处理的任务
const compile = parallel(style,script,page);

//上线模式
const build = series(clean,parallel(series(compile,useref),image,font,extra))

//开发模式
const start = series(compile,serve)

module.exports = {
  clean,
  start,
  build
}