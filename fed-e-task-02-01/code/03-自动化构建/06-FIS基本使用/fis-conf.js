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