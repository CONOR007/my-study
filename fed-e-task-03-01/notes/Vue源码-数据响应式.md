# 模拟VueJS响应式原理

## Vue2数据响应式核心原理

### 定义

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

### 语法

```js
Object.defineProperty(obj, prop, descriptor)
```

### 参数

`obj:`要定义属性的对象。

`prop:`要定义或修改的属性的名称或 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 。

`descriptor:`要定义或修改的属性描述符。

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些 property 全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

### 模拟代码

```js
// 模拟 Vue 中的 data 选项
let data = {
  msg: 'hello',
  count: 10
}

// 模拟 Vue 的实例
let vm = {}

proxyData(data)

function proxyData(data) {
  // 遍历 data 对象的所有属性
  Object.keys(data).forEach(key => {
    // 把 data 中的属性，转换成 vm 的 setter/setter
    Object.defineProperty(vm, key, {
      // 可枚举（可遍历）
      enumerable: true,
      // 可配置（可以使用 delete 删除，可以通过 defineProperty 重新定义）
      configurable: true,
      // 当获取值的时候执行
      get () {
        console.log('get: ', key, data[key])
        return data[key]
      },
      // 当设置值的时候执行
      set (newValue) {
        console.log('set: ', key, newValue)
        if (newValue === data[key]) {
          return
        }
        data[key] = newValue
      }
    })
  })
}

// 测试
vm.msg = 'Hello World'
console.log(vm.msg)
```

## Vue3数据响应式核心原理

### 定义

**Proxy** 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。

**Proxy**别Object.defineProperty在语法上更加简单,在性能上更加优越

### 语法

```js
const p = new Proxy(target, handler)
```

### 参数

`target:`要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

`handler:`一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

### 模拟代码

```js
// 模拟 Vue 中的 data 选项
let data = {
  msg: 'hello',
  count: 0
}

// 模拟 Vue 实例
let vm = new Proxy(data, {
  // 执行代理行为的函数
  // 当访问 vm 的成员会执行
  get (target, key) {
    console.log('get, key: ', key, target[key])
    return target[key]
  },
  // 当设置 vm 的成员会执行
  set (target, key, newValue) {
    console.log('set, key: ', key, newValue)
    if (target[key] === newValue) {
      return
    }
    target[key] = newValue
    document.querySelector('#app').textContent = target[key]
  }
})

// 测试
vm.msg = 'Hello World'
console.log(vm.msg)
```

## 发布订阅模式

### 定义

基于一个自定义事件通道，收集与之相关的订阅成员，通过发布自定义事件的方式通知各个订阅成员。

### Vue中的语法

```js
// Vue 自定义事件
let vm = new Vue()

// 注册事件(订阅消息)
vm.$on('dataChange', () => {
  console.log('')
})

vm.$on('dataChange', () => {
  console.log('dataChange1')
})
// 触发事件(发布消息)
vm.$emit('dataChange')
// dataChange dataChange1
```

如上所示,`收集之后的订阅成员关系可以简单理解为`{ 'dataChange': [fn1, fn2]}`.vue通过`$on`注册事件,通过`$emit`发布时间.其实就是循环调用了对象中key值对应的数组中的方法.

### 模拟Vue中的发布订阅

经过分析我们已经知道了收集者是一个对象,注册事件是通过`$on`,发布事件是通过`$emit`.那么我们先简单实现这个类.

```js
// 事件触发器
class EventEmittter {
  constructor() {
    this.subscribe = Object.create(null)
  }
  //注册事件
  $on(enentType, hander) {}
  //触发时间
  $emit(enentType) {}
}
```

注意这里的`subscribe`就是定义中说的**自定义事件通道**.创建对象可以用到`Object.create(null)`,通过它创建出来的对象是没有原型的,可以提高性能.

**$on注册事件**

```js
$on(enentType, hander) {
  this.subscribe[enentType] = this.subscribe[enentType] || []
  this.subscribe[enentType].push(hander)
}
```

如上`enentType`是自定义事件名,`hander`是该自定义事件下的订阅成员.他们被收集到了subscribe中.

**$emit发布事件**

通过传入的自定义事件名去发布对应订阅成员.

```js
$emit(enentType) {
  if (this.subscribe[enentType]) {
    this.subscribe[enentType].forEach(hander => {
      hander();
    });
  }
}
```

**测试**

```js
let em = new EventEmittter();
em.$on('click', () => {
  console.log('click111');
})
em.$on('click', () => {
  console.log('click222');
})
em.$emit('click');// click111 click222
```

