import { camelCase } from 'lodash'
import qs from 'query-string'
qs.parse('?key=value&key2=value2')

//declare 主要是为了兼容一些普通的没有声明的模块 或者是下载一些类型声明模块如@types/lodash
declare function camelCase (input:string) :string
const res = camelCase('hello typed')