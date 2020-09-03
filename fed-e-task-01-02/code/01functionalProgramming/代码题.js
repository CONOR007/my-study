// const fp = require('lodash/fp');
// const cars = [
//     {name:'Ferrari FF',horsepower:660,dollar_value:700000,in_stock:true},
//     {name:'Spyker C12 Zagato',horsepower:650,dollar_value:648000,in_stock:false},
//     {name:'Jaguar XKR-S',horsepower:550,dollar_value:132000,in_stock:false},
//     {name:'Audi R8',horsepower:525,dollar_value:114200,in_stock:false},
//     {name:'Aston Martin One-77',horsepower:750,dollar_value:185000,in_stock:true},
//     {name:'pagani Huayra',horsepower:700,dollar_value:1300000,in_stock:true},
// ]
// //练习1 使用函数组合实现获取最后一条数据的in_stock属性值
// const isLastInStock = fp.flowRight(fp.prop('in_stock'),fp.last)
// console.log(isLastInStock(cars));

// //练习2
// const isFirstName = fp.flowRight(fp.prop('name'),fp.first)

// console.log(isFirstName(cars));

// //练习3
// const _average = function(xs){
//     return fp.reduce(fp.add, 0, xs)/xs.length
// }
// const averageDollarValue = fp.flowRight(_average,fp.map(x=>x.dollar_value))
// console.log(averageDollarValue(cars));

// let _underscore = fp.replace(/\W+/g,'_')
// const sanitizeNames = fp.flowRight(fp.map(x=>fp.flowRight(_underscore,fp.toLower)((x.name))))
// console.log(sanitizeNames(cars));

class Container {
    static of (value){
        return new Container(value)
    }
    constructor (value){
        this._value = value
    }
    map(fn){
        return Container.of(fn(this._value))
    }
    join(){
        return this._value
    }

}

class Maybe {
    static of (x){
        return new Maybe(x)
    }
    isNothing(){
        return this._value === null || this._value === undefined
    }
    constructor (value){
        this._value = value
    }
    map(fn){
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}

const fp = require('lodash/fp')

let maybe = Maybe.of([5,6,1])
let ex1 = (x)=>maybe.map(fp.map(fp.add(x)))._value
console.log(ex1(2))

// let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
// let ex2 = ()=>xs.map(fp.first)
// console.log(ex2());

// let safeProp = fp.curry((x,o)=>Maybe.of(o[x]))
// let user = {id:2,name:'Albert'}
// let ex3 = fp.flowRight((x)=>x.map(fp.first)._value,safeProp('name'))
// console.log(ex3(user));

// const fp = require('lodash/fp')
// let ex4 = function (n) {
//     if(n) {
//         return parseInt(n)
//     }
// }
// let EX4 = fp.flowRight(x=>x.map(parseInt)._value,Maybe.of)
// console.log(EX4(4.65));