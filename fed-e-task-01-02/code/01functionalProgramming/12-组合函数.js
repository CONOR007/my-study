//组合函数:如果一个函数要经过对个函数处理才能得到最终的值,这个时候可以把中间过程的函数合并成一个函数
//函数就是数据的管道,把多个管道连接起来,让数据穿过形成最终的结果
//函数组合默认是从右到左执行,每一个函数接收一个参数并且返回相应的结果

//最简单的组合函数,实现取出数组中的最后一个元素
function compose (f,g){
    return function (value) {
        return f(g(value))
    }
}

function reverse (ary){
    return ary.reverse();
}

function first (ary){
    return ary[0];
}

const c = compose(first,reverse);
console.log(c([1,2,1,5,6]));

//虽然取出最后一个元素有N种方法,但是要注意的是通过组合的方式可以随意组合不同的函数实现不同的功能,且复用性非常强,功能强大.