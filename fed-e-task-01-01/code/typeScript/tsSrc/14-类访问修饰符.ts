export {}

class Person {
    public name:string;         //默认是public 共有
    private age:number;         //私有 只能自己用
    protected gender:boolean;   //受保护的 自己和被继承的子类能用
    readonly readonly:string = '这是只读属性';   //不允许被修改了
    constructor(name:string,age:number){
        this.name = name;//需要先定义 否则报错
        this.age = age;
        this.gender = false;
    }
    sayHi(msg:string):void{
        console.log(this.name);
        console.log(this.age);
        console.log(this.gender);
    }
}
class Student extends Person {
    //设置了private 不能被继承和实例化 protected允许继承
    private constructor(name:string,age:number){
        super(name,age);
        console.log(this.gender);
    }

    //可以在内部实例化
    static created(name:string,age:number) {
        return new Student(name,age)
    }
}

const tom = new Person('tom',18)
//console.log(tom.age); 
console.log(tom.name); 
//console.log(tom.protected); 

//const toom = new Student('jack',18);
const jack = Student.created('jack',18);