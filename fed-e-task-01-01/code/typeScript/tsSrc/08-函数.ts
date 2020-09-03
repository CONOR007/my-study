export {}
function func1(a:number=10,b?:number,...rest:number[]):string{
    return 'func1'
}
func1(1,2)
func1(1,2,3,4,5)

const func2:(a: number, b: number) => string = function (a:number,b:number):string{
    return 'func2'
}