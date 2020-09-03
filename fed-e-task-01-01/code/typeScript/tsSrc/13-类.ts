export {}

class Person {
    name:string; //= 'init name'
    age:number;
    constructor(name:string,age:number){
        this.name = name;//需要先定义 否则报错
        this.age = age;
    }
    sayHi(msg:string):void{
        console.log(this.name);
    }
}