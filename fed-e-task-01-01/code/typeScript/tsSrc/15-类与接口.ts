export {}

//一个类型实现多个接口
interface eatAndRun {
    eat(food:string):void
    run(food:number):void
}

interface Eat {
    eat(food:string):void
}
interface Run {
    run(food:number):void
}
class Person implements eatAndRun {
    eat(food:string):void{
        console.log(`优雅的进餐:${food}`);
    }
    run(distance:number){
        console.log(`直立行走:${distance}`);
    }    
}
class Animal implements Eat,Run {
    eat(food:string):void{
        console.log(`咕噜咕噜的迟:${food}`);
    }
    run(distance:number){
        console.log(`爬行:${distance}`);
    }
}
//不同的类型实现了相同的接口