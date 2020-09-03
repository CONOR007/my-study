# 简答题

## 第一题

- 工作原理:设置引用数,判断当前引用数是否为0
- 优点:发现垃圾时能及时回收,最大限度减少程序暂停
- 缺点:无法回收循环阴引用对象,时间开销大

## 第二题

- 工作流程:分为标记和清除两个阶段,遍历所有对象活动对象.清除没有标记的对象,清除之后抹掉第一次标记的对象,回收相应的空间.

## 第三题

- v8新生代就是存活时间较短的对象,存储在小空间中(32位16M 64位32M). 新生代空间也分成两个等量大小的空间,使用空间为from,空闲空间为to 活动对象存储于from标记整理后的活动对象拷贝到to from和to交换空间完成释放. 拷贝过程中可能会出现晋升(从新生代移动到老生代,一轮GC还存活的新生代需要晋升,to空间使用率超过25%需要晋升)

## 第四题

- 增量标记用于老年代内存回收的效率优化,工作原理是使用程序执行和标记算法去交替执行

# 代码题

## 第一题

```
const fp = require('lodash/fp');
const cars = [
    {name:'Ferrari FF',horsepower:660,dollar_value:700000,in_stock:true},
    {name:'Spyker C12 Zagato',horsepower:650,dollar_value:648000,in_stock:false},
    {name:'Jaguar XKR-S',horsepower:550,dollar_value:132000,in_stock:false},
    {name:'Audi R8',horsepower:525,dollar_value:114200,in_stock:false},
    {name:'Aston Martin One-77',horsepower:750,dollar_value:185000,in_stock:true},
    {name:'pagani Huayra',horsepower:700,dollar_value:1300000,in_stock:true},
]
```

### 练习1

- 使用组合函数实现获取最后一条数据的in_stock的属性值

```
const isLastInStock = fp.flowRight(fp.prop('in_stock'),fp.last)
```

### 练习2

- 获取第一个car的name

```
const isFirstName = fp.flowRight(fp.prop('name'),fp.first)
```

### 练习3

- 使用函数组合的方式实现_average

```
const _average = function(xs){
    return fp.reduce(fp.add, 0, xs)/xs.length
}
const averageDollarValue = fp.flowRight(_average,fp.map(x=>x.dollar_value))
```

### 练习4

- 使用函数组合实现返回一个下划线连接小写字符串把数组总的name转换成hello_world

```
let _underscore = fp.replace(/\W+/g,'_')
const sanitizeNames = fp.flowRight(fp.map(x=>fp.flowRight(_underscore,fp.toLower)((x.name))))
```

# 代码题2

```
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
```

### 练习1

- 实现一个能让functor里的值增加的函数

```
const fp = require('lodash/fp')
let maybe = Maybe.of([5,6,1])
let ex1 = (x)=>maybe.map(fp.map(fp.add(x)))._value
```

### 练习2

- 实现一个函数,能够使用fp.first获取列表的第一个元素

```
let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
let ex2 = ()=>xs.map(fp.first)._value
console.log(ex2());
```

### 练习3

- 实现一个函数找到user的首字母

```
let safeProp = fp.curry((x,o)=>Maybe.of(o[x]))
let user = {id:2,name:'Albert'}
let ex3 = fp.flowRight((x)=>x.map(fp.first)._value,safeProp('name'))
console.log(ex3(user));
```

### 练习4

- 使用Maybe重写ex4,不能有if

```
const fp = require('lodash/fp')
let ex4 = function (n) {
    if(n) {
        return parseInt(n)
    }
}
let EX4 = fp.flowRight(x=>x.map(parseInt)._value,Maybe.of)
console.log(EX4(4.65));
```

