//纯函数是建立在数学的函数上的
//函子是建立在数学的范畴论上的,可用来控制纯函数的副作用
//容器:包含值以及处理这个值的函数
//函子:是一个class类(对象),维护一个值,通过map方法去接收一个处理值的函数,并返回一个新的函子
class Container {
    constructor(value){
        this.value = value; //维护一个值
    }
    map(fn){//通过map方法去接收一个处理值的函数
        return new Container(fn(this.value));//并返回一个新的函子,因为返回的是一个新的函子所以可以无限map对这个值进行链式编程
    }
}
const f = new Container(5).map(x=>x+1).map(x=>x-1).map(x=>x**2)
console.log(f);


//但是每次调用map的时候都要去new一下,所以需要封装一下
class Container2 {
    //static 创建静态对象,可以直接通过类来调用
    static hz (val) {
        return new Container2(val)
    }
    constructor(value){
        this.value = value; 
    }
    map(fn){
        return Container2.hz(fn(this.value));
    }
}
const f2 = Container2.hz(5).map(x=>x+1).map(x=>x+1)
console.log(f2);

//总结
//函数式编程的运算不直接操作值,而是由函子完成
//函子就是一个实现了map契约的对象
//可以把函子想象成一个盒子,这个盒子里封装了一个值
//想要处理值,需要给map传递一个处理值的纯函数
//最终map返回一个包含新值的函子

//演示副作用
//Container2.hz(null).map(x=>x.toUpperCase());//会报错 也就是有输入但是没有输出,被输入导致不纯(可以通过MayBe解决)