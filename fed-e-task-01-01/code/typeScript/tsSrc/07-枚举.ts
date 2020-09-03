export {}
// const postStatus = {
//     Draft:0,
//     Uppublished:1,
//     Published:2
// }

enum postStatus {
    Draft = 0, //0
    Uppublished = 1,//1
    Published = 2//2
}
postStatus[0] //Draft
const post = {
    title:"hello",
    status:postStatus.Published
}

enum postStatus2 {
     Draft , //0
     Uppublished ,//1
     Published //2
}

enum postStatus3 {
    Draft = 6 , //6
    Uppublished ,//7
    Published //8
}

enum postStatus4 {
    Draft = 'aaa' , //6
    Uppublished = 'bbb',//7
    Published = 'ccc'//8
}

//常亮枚举
const enum postStatus5 {
    Draft = 'aaa' , //6
    Uppublished = 'bbb',//7
    Published = 'ccc'//8
}
const post2 = {
    title:"hello",
    status:postStatus5.Published
}
