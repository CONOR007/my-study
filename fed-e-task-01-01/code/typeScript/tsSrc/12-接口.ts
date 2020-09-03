export {}

//接口就是约束 只是在编译阶段约束
interface Post {
    title : string ;
    content : string ;
    subTitle?: string ; //可有可无
    readonly summary: string ; //只读
}

function printPost (post : Post) {
    console.log(post.title);
    console.log(post.content);
}

const hello : Post = {
    title : 'string' ,
    content : 'string' ,
    summary : 'readonly'
}

//hello.summary = 'ssss' //报错
printPost(hello)

//添加任意的key
interface Cache {
    [key:string]:string
}
const Cache: Cache = {}
Cache.foo = 'ss'
//Cache.fooo = 122 //报错