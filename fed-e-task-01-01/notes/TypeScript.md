# TypeScript

## 简介

### 什么是TypeScript

[TypeScript](http://www.typescriptlang.org/) 是 JavaScript 的一个超集，主要提供了**类型系统**和**对 ES6 的支持**，它由 Microsoft 开发，代码[开源于 GitHub](https://github.com/Microsoft/TypeScript) 上

### TypeSCript的优点

- TypeScript 增加了代码的可读性和可维护性
- TypeScript 拥有活跃的社区
- TypeScript 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等。这里推荐使用VS Code,它本身也是使用TS编写的

### TypeScript 的缺点

- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 集成到构建流程需要一些工作量

### 安装TypeScript

```bash
npm install -g typescript
```

编译一个TypeScript文件

```bash
tsc hello.ts
```

## 基础

### 1.原始数据类型

JavaScript 的类型分为两种：**原始数据类型**和**对象类型**。

原始数据类型包括：布尔值、数值、字符串、`null`、`undefined`、`void` 以及 [ES6 中的新类型 `Symbol`](http://es6.ruanyifeng.com/#docs/symbol)。这些类型在ts中通过如下定义:

```js
const a: string = 'foobar'
const b: number = 123 //NaN Infinity
const c: boolean = true //false
const d: void = undefined //void声明一个变量的时候只有两个值：undefined、null
const e: null = null
const f: undefined = undefined
const g: symbol = Symbol()
```

### 2.任意类型`any`

声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

```js
let something: any;
something = 'seven';
something = 7;
```

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

```js
let something;
```

等价于

```js
let something: any;
```

### 3.类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

```js
let myFavoriteNumber = 'seven';//推论出是string类型了
myFavoriteNumber = 7;//报错
```

### 4.联合类型`|`

联合类型（Union Types）表示取值可以为多种类型中的一种。联合类型使用 `|` 分隔每个类型。

```js
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

访问 string 和 number 的共有属性是没问题的,如果不是共同属性就会报错.比如`length`

```js
function getString(something: string | number): string {
    return something.toString();
}
```

### 5.对象类型声明

```js
const foo:object = function(){} //[] {}
const obj:{} = {}
const obj2:{foo:number,bar:string} = {foo:123,bar:'sss'}
```

### 6.对象类型-接口`Interfaces`

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

接口一般首字母大写。

赋值的时候，变量的形状必须和接口的形状保持一致。

```js
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

#### 可选属性`?`

可选属性的含义是该属性可以不存在。

```js
interface Person {
    name: string;
    age?: number;
}
```

#### 任意属性`[xx:xx]:xx`

```js
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}
```

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。

**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**,如下

```js
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}
```

#### 只读属性`readonly`

用 `readonly` 定义只读属性.**只读特性只存在于第一次给`对象`赋值之后，而不是给只读`属性`赋值的时候**

```js
interface Person {
    readonly id: number;
}
let tom: Person = {
    id: 89757,
};
```

### 7.数组类型声明

#### 用「类型 + 方括号」来表示数组

```js
const arr2: number[] = [1,2,3]
```

数组的项中**不允许**出现其他的类型

```js
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```

用 `any` 表示数组中允许出现任意类型

#### 数组泛型`: Array<any>`

```js
const arr1: Array<number> = [1,2,3]
```

#### 接口也可以用来描述数组

```js
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。

#### 类数组

类数组（Array-like Object）不是数组类型，但是能通过剩余参数转成数组,比如 `arguments`：

```js
function sum(...args:number[]){
    console.log(args)
}
sum(1,2,3)
```

其实类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等

```js
function sum() {
    let args: IArguments = arguments;
}
```

其中 `IArguments` 是 TypeScript 中定义好了的类型，它实际上就是：

```js
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

### 8.函数的类型

#### 函数声明

输入多余的（或者少于要求的）参数，是不被允许的：

```js
function sum(x: number, y: number): number {
    return x + y;
}
```

#### 函数表达式

```js
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

#### 用接口定义函数`interface`

```js
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {}
```

采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

#### 可选参数

用 `?` 表示可选的参数,该参数可填可不填. 可选参数后面不允许再出现参数了.

```js
function buildName(firstName: string, lastName?: string) {}
```

#### 参数默认值

```js
function buildName(firstName: string, lastName: string = 'Cat') {}
```

#### 剩余参数`...`

rest 参数只能是最后一个参数

```js
function push(array: any[], ...items: any[]) {}
let a = [];
push(a, 1, 2, 3);
```

### 9.类型断言`值 as 类型`

类型断言（Type Assertion）可以用来手动指定一个值的类型。

```js
值 as 类型 //推荐
```

或

```js
<类型>值
```

#### 将一个联合类型断言为其中一个类型(慎用)

```js
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```

#### 将一个父类断言为更加具体的子类

```js
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}
//Error是父类 它的两个子类是 ApiError 和 HttpError
function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

或

```js
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}
```

但如果是instanceof接口定义的,那就只能使用断言了. 否则会报错

```js
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

#### 将任何一个类型断言为 any

Ts的错误提示显然是非常有用的。但有的时候，我们非常确定这段代码不会出错，比如下面这个例子：

```js
window.foo = 1;
// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```

此时我们可以使用 `as any` 临时将 `window` 断言为 `any` 类型：

```js
(window as any).foo = 1;
```

在 `any` 类型的变量上，访问任何属性都是允许的。

#### 将 `any` 断言为一个具体的类型

在日常的开发中，我们不可避免的需要处理 `any` 类型的变量.通过类型断言及时的把 `any` 断言为精确的类型，亡羊补牢

```js
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

上面的例子中，我们调用完 `getCacheData` 之后，立即将它断言为 `Cat` 类型。这样的话明确了 `tom` 的类型，后续对 `tom` 的访问时就有了代码补全，提高了代码的可维护性。

#### 类型断言的限制

...

### 9.声明文件

### 10.内置对象

JavaScript 中有很多[内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它们可以直接在 TypeScript 中当做定义好了的类型。

而他们的定义文件，则在 [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中。

注意，TypeScript 核心库的定义中不包含 Node.js 部分。

#### ECMAScript 的内置对象

`Boolean`、`Error`、`Date`、`RegExp` 等

```js
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

#### DOM 和 BOM 的内置对象

`Document`、`HTMLElement`、`Event`、`NodeList` 等。

```js
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {});
```

#### 用 TypeScript 写 Node.js

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```bash
npm install @types/node --save-dev
```

## 进阶

### 1.类型别名`type`

使用 `type` 创建类型别名,类型别名用来给一个类型起个新名字。

```js
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

### 2.字符串字面量类型

使用 `type` 创建字符串字面量类型,用来约束取值只能是某几个字符串中的一个。

```js
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}
handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
```

### 3.元祖

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

```js
let tom: [string, number] = ['Tom', 25];
```

当赋值或访问一个已知索引的元素时，会得到正确的类型：

```js
let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;

tom[0].slice(1);
tom[1].toFixed(2);
```

也可以只赋值其中一项：

```js
let tom: [string, number];
tom[0] = 'Tom';
```

但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。

```js
let tom: [string, number];
tom = ['Tom', 25];
let tom: [string, number];
tom = ['Tom'];

// Property '1' is missing in type '[string]' but required in type '[string, number]'.
```

#### 越界的元素

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

```js
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);

// Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

### 4.枚举`enum`

#### 简单的使用

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

```js
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

被编译成

```js
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
```

结果为

```js
0: "Sun"
1: "Mon"
2: "Tue"
3: "Wed"
4: "Thu"
5: "Fri"
6: "Sat"
Fri: 5
Mon: 1
Sat: 6
Sun: 0
Thu: 4
Tue: 2
Wed: 3
```

枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```js
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 0); // true
console.log(Days[6] === "Sat"); // true
```

#### 手动赋值

```js
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
```

未手动赋值的枚举项会接着上一个枚举项递增,如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的,所以使用的时候需要注意，最好不要出现这种覆盖的情况。

手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 

```js
enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
```

当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 `1`：

```js
enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1.5); // true
```

#### 常数项和计算所得项

前面的例子都是常数项，计算所得项的例子如下：

```js
enum Color {Red, Green, Blue = "blue".length};
```

但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：

```js
enum Color {Red = "red".length, Green, Blue};

// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

#### 常数枚举`const enum`

```js
const enum Directions {Up,Down,Left,Right}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

上例的编译结果是：

```js
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

#### 外部枚举`declare enum`

使用 `declare enum` 定义外部枚举类型,`declare` 定义的类型只会用于编译时的检查，编译结果中会被删除。

```js
declare enum Directions {Up,Down,Left,Right}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

上例的编译结果是：

```js
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

同时使用 `declare` 和 `const` 也是可以的：

```js
declare const enum Directions {Up,Down,Left,Right}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

编译结果：

```js
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

### 5.ES6,ES7中的类

#### 类的概念

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

#### ES6中类的属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例的时候，会自动调用构造函数。

```js
class Animal {
    public name;
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
}
let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

#### ES6中类的继承`extends`

使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

```js
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

#### ES6类的存取器`get set`

使用 getter 和 setter 可以改变属性的赋值和读取行为:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

#### ES6类的静态方法`static`

使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```js
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

####  ES7中类的实例属性

ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义：

```js
class Animal {
  name = 'Jack';
  constructor() {
    // ...
  }
}
let a = new Animal();
console.log(a.name); // Jack
```

#### ES7中类的静态属性`static`

ES7 提案中，可以使用 `static` 定义一个静态属性：

```js
class Animal {
  static num = 42;
  constructor() {
    // ...
  }
}
console.log(Animal.num); // 42
```

### 6.TypeScript 中的类`class`

#### 三种访问修饰符:public private 和 protected

- `public` 公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 私有的，不能在声明它的类的外部访问
- `protected` 受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

#### 注意

- TypeScript 编译之后的代码中，并没有限制 `private` 属性在外部的可访问性。
- 当构造函数修饰为 `private` 时，该类不允许被继承或者实例化
- 当构造函数修饰为 `protected` 时，该类只允许被继承不允许被实例化

```js
class Animal {
  private name;
  protected age;
  protected constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  private constructor(name,age) {
    super(name,age);
    console.log(this.name); //报错
    console.log(this.age);  //不报错
  }
}
```

#### 参数属性

修饰符和只读属性关键字`readonly`还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```js
class Animal {
  // public name: string;
  public constructor(public name , public readonly age) {
    // this.name = name;
  }
}
```

#### 抽象类

`abstract` 用于定义抽象类和其中的抽象方法。

- 抽象类是不允许被实例化的
- 抽象类中的抽象方法必须被子类实现

```js
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}
//let Animal = new Animal('Tom'); 报错
class Cat extends Animal {
  public sayHi() { //必须使用到,具体执行在子类中实现
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat('Tom');
```

需要注意的是，即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类，上面的代码的编译结果是：

```js
var __extends =
  (this && this.__extends) ||
  function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  };
var Animal = (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var Cat = (function (_super) {
  __extends(Cat, _super);
  function Cat() {
    _super.apply(this, arguments);
  }
  Cat.prototype.sayHi = function () {
    console.log('Meow, My name is ' + this.name);
  };
  return Cat;
})(Animal);
var cat = new Cat('Tom');
```

#### 类的类型

给类加上 TypeScript 的类型很简单，与接口类似：

```js
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

### 类与接口

#### 类实现接口

不同类有公共的特性时，可以把公共的特性提取成接口（interfaces），用 `implements` 关键字来实现。

比如,门和车都有报警器,那么可以把报警器提取出来作为一个接口,然后去实现它:

```js
interface Alarm {
  alert():void;
}
interface Light {
  lightOn():void;
}
class Door {}
//一个类可以实现多个接口：
class Car implements Alarm,Light{
  alert() {
    console.log('car alert')
  }
  lightOn() {
    console.log('lightOn alert')
  }
}
class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor')
  }
}
```

#### 接口继承接口

```js
interface Alarm {
  alert():void;
}
interface LightableAlarm extends Alarm {
  lightOn():void;
}
```

#### 接口继承类

```js
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

当在声明 `class Point` 时，除了会创建一个名为 `Point` 的类之外，同时也创建了一个名为 `Point` 的实例的类型。

但是这个 `Point` 类型只包含其中的实例属性和实例方法。

所以既可以使用 `new Point` 创建它的实例,也可以使用 `: Point` 表示参数的类型。

```js
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
function printPoint(p: Point) {
    console.log(p.x, p.y);
}
printPoint(new Point(1, 2));
```

等价于

```js
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
interface PointInstanceType {
    x: number;
    y: number;
}
function printPoint(p: PointInstanceType) {
    console.log(p.x, p.y);
}
printPoint(new Point(1, 2));
```

### 7.泛型`<T>`

泛型是指在定义函数、接口或类时，先不指定类型，而在使用的时候再指定。

```js
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

上例中，在函数名后添加了`<T>` `，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>`中即可使用了。

#### 多个类型的参数

```js
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]
```

上例中，定义了一个 `swap` 函数，用来交换输入的元组。

#### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```js
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}
// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```js
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

上例中,使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性否则的话编译是不通过的。

多个类型参数之间也可以互相约束：

```js
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });
```

上例中，使用了两个类型参数，其中要求 `T` 继承 `U`，这样就保证了 target 中有的字段source中一定会有,这样赋值操作才会顺利。

#### 泛型接口

注意，在使用泛型接口的时候，需要定义泛型的类型。

```js
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

#### 泛型类

与泛型接口类似，泛型也可以用于类的类型定义中

```js
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

#### 泛型默认参数

```js
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```

### 声明合并

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：

#### 函数合并

```js
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

#### 接口合并

注意，**合并的属性的类型必须是唯一的**,否则编译不会通过

```js
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错
    weight: number;
   alert(s: string, n: number): string;
}
```

相当于：

```js
interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
```

#### 类的合并

类的合并与接口的合并规则一致。

### TypeScript作用域

为了避免当前ts文件中变量在其它文件使用而导致无法编译通过,可以使用export {}把当前作用域定义成模块作用域

```js
const a:number = 123;
export {}
```

相当于

```js
 (function(){
     const a:number = 123;
 })();
```