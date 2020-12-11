# Composition API

## 一. createApp, reactive, setup

### 1.createApp创建Vue对象

```html
<script type="module">
    import { createApp } from './node_modules/vue/dist/vue.esm-browser.js'
    const app = createApp({})
    app.mount('#app')
</script>
```

### 2.setup是compositionApi的入口.

**在props解析完毕之后组件实例创建之前执行. 所以在setup中无法获取组件实例的this,data,computed,method**

```js
<script type="module">
    import { createApp} from './node_modules/vue/dist/vue.esm-browser.js'
    const app = createApp({
      setup (props,context) {
        const position = {x: 0,y: 0};
        return {position}
      },
    })
    app.mount('#app')
</script>
```

### 3.reactive设置响应式数据,返回的是一个proxy对象

**reactive返回一个代理对象**

```js
<script type="module">
    import { createApp} from './node_modules/vue/dist/vue.esm-browser.js'
    const app = createApp({
      setup (props,context) {
        const position = reactive({x: 0,y: 0});
        return {position}
      },
    })
    app.mount('#app')
</script>
```

### 4.setup中的生命周期钩子函数

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208114118273.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzA4MzE2,size_16,color_FFFFFF,t_70)

### 5.ref函数和toRefs函数

**ref函数能把基本类型的数据转换成响应式数据**
**原理:把基本类型数据转换成具有value属性并具有get和set的响应式对象(`{value:0}`),如果ref传入的是一个对象那么就是调用reactive.**

```js
<script type="module">
    import { createApp, ref } from './node_modules/vue/dist/vue.esm-browser.js'
    function useCount () {
      const count = ref(0)
      return {
        count,
        increase: () => {
          count.value++
        }
      }
    }
    createApp({
      setup () {
        return {
          ...useCount()
        }
      }
    }).mount('#app')
</script>
```

**toRefs函数把代理对象中的所有属性都转换成响应式对象.**

```js
<script type="module">
    import { createApp, reactive, toRefs } from './node_modules/vue/dist/vue.esm-browser.js'
   function useMousePosition () {
      const position = reactive({
        x: 0,
        y: 0
      })
      return toRefs(position)
    }
    createApp({
      setup () {
        const { x, y } = useMousePosition()
        return {
          x,
          y
        }
      }
    }).mount('#app')
</script>
```

```js
const position = {x: 0,y: 0}=>{x:position.x,y:position.y}
```

### 6.Computed

**computed创建响应式数据,这个响应式数据依赖于其它响应式数据,当依赖的数据变化后会重新计算属性传入的函数**

```js
<script type="module">
  import { createApp, reactive, computed } from './node_modules/vue/dist/vue.esm-browser.js'
const data = [
  { text: '看书', completed: false },
  { text: '敲代码', completed: false },
  { text: '约会', completed: true }]

createApp({
  setup () {
    const todos = reactive(data)
    const activeCount = computed(() => {
      return todos.filter(item => !item.completed).length
    })

    return {
      activeCount,
      push: () => {
        todos.push({text: '开会',completed: false})
      }
    }
  }
}).mount('#app')
</script>
```

### 7.Watch和WatchEffect

**watch的三个参数**

- 第一个参数:要监听的数据
- 第二个参数:监听到数据变化后执行的函数,这个函数有两个参数分别是新值和旧值
- 第三个参数:选项对象,deep和immediate

**watch的返回值**

- 取消监听的函数

```js
<div id="app">
  <p>
  	请问一个 yes/no 的问题:
		<input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
import { createApp, ref, watch } from './node_modules/vue/dist/vue.esm-browser.js'
createApp({
  setup () {
    const question = ref('')
    const answer = ref('')
    watch(question, async (newValue, oldValue) => {
      const response = await fetch('https://www.yesno.wtf/api')
      const data = await response.json()
      answer.value = data.answer
    })
    return {question,answer}
  }
}).mount('#app')
```

**WatchEffect**

- 是watch函数的简化版本,也是用来监视数据的变化
- 接收一个函数作为参数,自执行一遍然后监听函数内响应式数据的变化
- 它返回一个函数,调用它取消对数据的监视

```js
<script type="module">
  import { createApp, ref, watchEffect } from './node_modules/vue/dist/vue.esm-browser.js'

createApp({
  setup () {
    const count = ref(0)
    const stop = watchEffect(() => {
      console.log(count.value)
    })

    return {
      count,
      stop,
      increase: () => {
        count.value++
      }
    }
  }
}).mount('#app')
</script>
```

