//map
const map = (arr,fn)=>{
    let res = [];
    for(let i of arr){
        res.push(fn(i))
    }
    return res;
}
let newAry = map([1,23,4,5,6],item=>item**2)
console.log(newAry)

//every
const every = (arr,fn)=>{
    let res2 = true;
    for(let i of arr){
        res2 = fn(i);
        console.log(i)
        if(!res2){
           break;
        }
    }
    return res2
}
let ary = every([12,10,11,12,13],i=>i>10)
console.log(ary)

//some
const some = (arr,fn)=>{
    let res = false;
    for(let i of arr){
        res = fn(i);
        if(res){
            break
        }
    }
    return res
}
let res3 = some ([1,3,5],(i)=>i%2 === 0);
console.log(res3)