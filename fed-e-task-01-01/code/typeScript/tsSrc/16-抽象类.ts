export {}

//大的类目请使用抽象类 abstract 只能被继承不能被实例化
abstract class Animal {
    eat(food:string):void{
        console.log(`咕噜咕噜的迟:${food}`);
    }
    //abstract 抽象方法 不需要函数体
    abstract run(distance:number) :void
}
class Dog extends Animal {
    run(distance: number): void {
        console.log('爬行',distance);
    }
}
const d = new Dog()
d.eat('啛啛喳喳')
d.run(100)