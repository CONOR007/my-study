#!/usr/bin/env node
//Node CLI应用入口必须要有一个文件头 => #!/usr/bin/env node
//需要修改本文件的读写权限为755 => sudo chmod -R 755 cli.js

//脚手架的工资过程:
//1.通过命令行交互询问用户问题
//2.根据用户回答的结果生成文件
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path')
const ejs = require('ejs')
inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:"Project name ?"
    }
])
.then(anwsers=>{
    console.log(anwsers)
    //根据用户回答的结果生成文件
    //模板目录
    const tmplDir = path.join(__dirname,'templates')
    //目标目录
    const destDir = process.cwd()
    fs.readdir(tmplDir,(err,files)=>{
        if(err) throw err
        files.forEach(file=>{
            console.log(file)
            //通过模板引擎渲染文件
            ejs.renderFile(path.join(tmplDir,file),anwsers,(err,result)=>{
                if (err) throw err
                console.log(result)
                fs.writeFileSync(path.join(destDir,file),result)
            })
        })
    })
})