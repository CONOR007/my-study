# 简答题

## 第一题

#### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
 el: '#el',
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```

`答`:在vue.js中行曾`set`方法,在点击事件中调用`this.set(this.dog,'name','Trump')`,代码实现如下:

```js
class Vue {
    constructor (options) {
				...
        this.observer = new Observer (this.$data);
    }
		...
    set(obj, key, value) {
        this.observer.defineReactive(obj,key,value)
    }
}
```

如上,重新给新增的对象的key进行劫持即可

### 2、请简述 Diff 算法的执行过程

#### 执行过程:
要对比两棵树的差异，可以取第一棵树的每一个节点依次和第二课树的每一个节点比较,然后对比每一次的差异,这样的时间复杂度为 `O(n^3)`,显然这样很低效.然而在DOM 操作时很少会把一个父节点移动/更新到某一个子节点,因此只需要找`同级别子节点依次比较`，然后依次再找下一级别的节点比较，这样算法的时间复杂度为 `O(n)` .所以diff算法的核心是对比新旧节点的childern,更新DOM.**为了保证真实DOM中的`顺序`和新节点保持一致可以用`while循环`对`首尾节点`进行对比,同时对新老节点数组的开始和结尾节点设置`标记索引`，循环的过程中向中间`移动索引`,这样既能实现`排序`也能`减小时间复杂度`**.

- **当新开始节点索引<=新结束索引**且**当旧开始节点索引<=旧结束索引**,`while循环开始`
  - 两两节点比较，有`四种`比较方式(**必须按顺序**):
    - `旧开始节点` 与 `新开始节点`比较,如果匹配上了(key 和 sel 相同),那么`旧开始节点`(真实dom)`不动`.
      (同时++oldStartIdx,++newStartIdx)开始下一次while循环.
    - `旧结束节点` 与 `新结束节点`比较,如果匹配上了(key 和 sel 相同),那么`旧结束节点`(真实dom)`不动`.
      (同时--oldEndIdx,--newEndIdx)开始下一次while循环.
    - `旧开始节点` 与 `新结束节点`比较,如果匹配上了(key 和 sel 相同),那么把`旧开始节点`(真实dom)`移动到旧结束节点的后面`.(同时++oldStartIdx,--newEndIdx)开始下一次while循环.
    - `旧结束节点` 与 `新开始节点`比较,如果匹配上了(key 和 sel 相同),那么把`旧结束节点`(真实dom)`移动到旧开始节点的前面`.
      (同时--oldEndIdx,++newStartIdx)开始下一次while循环.
  - 如果不是以上四种情况
    - 遍历新节点，使用`新节点的 key `在老节点数组中`找相同节点`
      - **如果匹配上了并且是相同节点**,把该旧节点(elmToMove.elm)`移到旧开始节点的前面`.
        (同时++newStartIdx)开始下一次while循环.
      - **如果匹配上了但不是相同节点**,创建该新节点并插入到`旧开始节点的前面`.
        (同时++newStartIdx)开始下一次while循环.
      - **如果没有匹配上**,`创建新节点`并插入到`旧开始节点的前面`.
        (同时++newStartIdx)开始下一次while循环.
- **当新开始节点索引>新结束索引**或者**当旧开始节点索引>旧结束索引**,`while循环结束`
  - **如果老节点的所有子节点先遍历完** (`oldStartIdx > oldEndIdx`).说明`新节点有剩余`，**把newStartIdx到newEndIdx中间剩余节点**`批量插入`到`旧结束节点的后面`.循环结束
  - **如果新节点的数组先遍历完**(`newStartIdx > newEndIdx`)，说明`老节点有剩余`，**把oldStartIdx到oldEndIdx之间剩余节点**`批量删除`.循环结束

## 第二题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

```js
let _Vue = null
export default class VueRouter {
  // install是一个静态方法,用来实现vue的插件机制
  static install (Vue) {
    // 1.判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2.把Vue构造函数记录到全局变量
    _Vue = Vue
    // 3.把创建Vue实例时传入的router注入到_Vue上. 混入
    _Vue.mixin({
      beforeCreate () {
        // 只需要在实例化的时候执行
        if (this.$options.router) {
          // const vm = new Vue({
          //     注册 router 对象
          //     router,
          //     render: h => h(App)
          // }).$mount('#app')
          // 实例化的时候 new Vue中的对象都放在$options中去了. 所以该类中所有属性方法都能在this.$options.router中拿到.
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  // 构造函数初始化 属性值
  constructor (options) {
    // options是实例化路由对象时传进来的对象
    // {
    //     mode: 'history',
    //     routes
    // }
    // 是记录构造函数传入的对象,比如记录我们在new VueRouter的时候传入的routes对象规则;
    this.options = options
    // 是一个对象用来记录路由地址和组件的对应关系,将来我们会将options对应到routeMap中来
    this.routeMap = {}
    // 通过vue.obsverber存储响应式数据的,因为路由地址更改过户对应的组件要更新. 它里边有一个属性current是用来记录当前路由地址的
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  // 遍历路由规则,解析成键值对存储在routeMap中
  createRouteMap () {
    this.options.routes.forEach(element => {
      // 键是路由的地址,值是路由的组件
      this.routeMap[element.path] = element.component
    })
  }

  // 创建<route-link>和<route-view>这两个组件
  initComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // 注意:完整版本的Vue支持template编译 运行时不支持template如果要使用需要在vue.config.js中配置 runtimeCompiler 或者配置render函数
      // template: '<a :href="to"><slot></slot></a>'
      render (h) {
        // h函数(生成的目标元素,目标元素属性,内容部分插槽)
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler (e) {
          this.$router.mode(() => {
            history.pushState({}, '', this.to)
            this.$router.data.current = this.to
          }, () => {
            window.location.hash = this.to
          })
          // 组织a标签的默认事件
          e.preventDefault()
        }
      }
    })

    const self = this
    Vue.component('router-view', {
      render (h) {
        // component 当前路由地址
        const component = self.routeMap[self.data.current]
        // h可以帮我们创建虚拟DOM
        return h(component)
      }
    })
  }

  // initEvent 用来注册popState事件监听浏览器历史的变化
  initEvent () {
    const self = this
    window.addEventListener('popstate', () => {
      this.mode(() => {
        self.data.current = window.location.pathname
      }, () => {})
    })
    window.addEventListener('hashchange', () => {
      this.mode(() => {
        self.data.current = window.location.pathname
      }, () => {
        if (self.data.current !== window.location.hash) self.data.current = window.location.hash.substr(1)
      })
    })
  }

  // 模式判断
  mode (his, mode) {
    if (this.options.mode === 'history') {
      his()
    } else if (this.options.mode === 'mode') {
      mode()
    }
  }
}

```

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

在compiler.js中添加updater功能函数

```js
htmlUpdater (value,node,key) {
  node.innerHTML = value;
  new Watcher(this.vm,key,(newValue)=>{
    node.innerHTML = newValue;
  })
}
onclickUpdater (value,node,key) {
  node.onclick= eval(key)
}
```

给v-on:click属性值去冒号

```js
compileElementNode (node) {
  if(!node.attributes.length) return;
  Array.from(node.attributes).forEach(attr=>{
    let name = attr.name.substr(2);
    const key = attr.value;
    const value = this.vm[key];
    if(name.indexOf(':')>0) name = name.replace(':','');
    this.updater(name,value,node,key);
  })
}
```

html中

```html
...  
<div id="app">
    <div v-on:click="()=>{console.log('111')}">v-on</div>
</div>
...
```

### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：

![snabbdm电影列表](./static/snabbdm电影列表.png)

代码在:https://github.com/CONOR007/fed-e-task-03-01/tree/master/code/03-%E8%99%9A%E6%8B%9FDom/snabbdom-demo/src/07-animation.js

