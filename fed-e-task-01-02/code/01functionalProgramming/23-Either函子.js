//Either:类似于if...else 异常会让函数边的不纯,Either函子可以用来做异常处理
class Left {
    static of (value) {
        return new Left(value)
    }

    constructor(value){
        this.value = value
    }

    map(fn){
        return this
    }
}

class Right {
    static of (value) {
        return new Right(value)
    }

    constructor(value){
        this.value = value
    }

    map(fn){
        console.log('ssss');
        return Right.of(fn(this.value))
    }
}
console.log(Right.of(12).map(x=>x+2));
function parseJSON (str) {
    try {
        return Right.of(JSON.parse(str))
    }catch(err){
        return Left.of({error:err.message});
    }
}

console.log(parseJSON('{name:conor}'));
//console.log(parseJSON('{"name":"conor"}'));