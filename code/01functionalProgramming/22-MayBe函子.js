//MayBe:的作用就是可以对外部的控制情况做处理(控制副作用在允许的范围)
class MayBe {
    static of (value) {
        return new MayBe(value)
    }
    constructor(value) {
        this.value = value
    }
    map(fn){
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value))
    }
    isNothing(){
        return this.value === null || this.value === undefined
    }
}

console.log(MayBe.of('hello word').map(x=>x.toUpperCase())); //{ value: 'HELLO WORD' }
console.log(MayBe.of(null).map(x=>x.toUpperCase()));         //{ value: null }

//问题:当链式调用非常多的时候,其中一步的值置为nullMayBe函子无法准确定位被赋值为null的步数.  Either函数就用来处理这个问题
let r = MayBe.of('hello word')
.map(x=>x.toUpperCase())
.map(x=>null)
.map(x=>x+1)
console.log(r);