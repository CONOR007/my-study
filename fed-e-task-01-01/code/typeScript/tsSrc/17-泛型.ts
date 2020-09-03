export {}

function createNumberArray(length:number,value:number):number[]{
    const arr = Array<number>(length).fill(value)
    return arr
}
const res = createNumberArray(3,100);

function createArray<T>(length:T,value:T):T[]{
    const arr = Array<T>(length).fill(value)
    return arr
}

const res2 = createArray<string>('ss','sss');