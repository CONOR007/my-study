//1. yarn add typescript --下载
//2. yarn tsc init --显示配置文件tsconfig.json
//3. yarn tsc --执行编译文件
//4. yarn tsc --locale zh-CN --报错显示中文信息
const hello = (name:any) => {
    console.log(`hello,${name}`);
}
hello('100')