//使用基于Benchmark.js中的https://jsperf.com/
//本质上就是采集大量的执行样本进行数学统计和分析

//使用gitHub账号登录
//填写个人信息
//填写详细的测试用例信息(title,slug)
//填写准备代码
//填写必要setup与tearddown代码
//填写测试代码片段

//1.全局变量和局部变量的性能比较
var i,str='';
for(i=0;i<1000;i++){
    str += i
}

for(let i=0; i<1000; i++){//性能更好 
    let str = ''
    str += i
}

//2.构造函数中添加方法和构造函数原型添加方法的性能比较
var fn1 = function(){
    this.foo = function () {
        console.log(1111);
    }
}
let f1 = new fn1()

var fn2 = function(){}
fn2.prototype.foo = function(){//性能更好 
    console.log(2222);
}
let f2 = new fn2()

//3.避免属性访问方法使用
function Person() {
    this.name = 'icoder'
    this.age = 18
    this.getAge = function ( ) {
        return this.age
    }
}
const p1 = new Person();
const a = p1.getAge()


function Person2(){ //性能更好
    this.name = 'icoder'
    this.age = 18
}
const p2 = new Person2()
const b = p2.age

//4.for循环的优化
var arrL = []
arrL[10000] = 'icoss'
for(var i = 0 ; i < arrL.length; i++){
    console.log(arrL[i]);
}

for(var i = arrL.length; i ; i--){ //性能更好
    console.log(arrL[i]);
}

//5.节点添加优化
for (var i =0 ; i <10 ;i++){
    var op = document.createElement('p')
    op.innerHTML = i
    document.body.appendChild(op)
}

//创建文档碎片
const fragEle = document.createDocumentFragment();//性能更好
for (var i =0 ; i <10 ;i++){
    var op = document.createElement('p')
    op.innerHTML = i
    fragEle.appendChild(op)
}
document.body.appendChild(fragEle)

//6.克隆优化节点操作
for (var i = 0; i<3 ; i++){
    var oP = document.createElement('p');
    oP.innerHTML = i 
    document.body.appendChild(oP)
}

var oldP = document.getElementById('box1')//性能更好
for (var i =0; i<3;i++){
    var newP = oldp.cloneNode(false)
    newP.innerHTML = i;
    document.body.appendChild(newP)
}

//直接量替换 new Object
var aa = [1,2,3] //性能更好

var aaa = new Array(3)
aaa[0] = 1;
aaa[1] = 2;
aaa[2] = 3;
 
