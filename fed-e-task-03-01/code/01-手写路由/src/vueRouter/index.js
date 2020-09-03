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
        return h('a',{
          attrs : {
            href : this.to
          },
          on : {
            click:this.clickHandler
          },
        },[this.$slots.default])
      },
      methods: {
        clickHandler (e) {
          history.pushState({},'',this.to)
          this.$router.data.current = this.to
          //组织a标签的默认事件
          e.preventDefault();
        }
      },
    })
    
    const self = this
    Vue.component('router-view', {
      render(h) {
        // component 当前路由地址
        const component = self.routeMap[self.data.current]
        // h可以帮我们创建虚拟DOM
        return h(component)
      },
    })
  }

  //initEvent 用来注册popState事件监听浏览器历史的变化
  initEvent () {
    window.addEventListener('popstate',()=>{
      this.data.current = window.location.pathname
    })
  }
}
