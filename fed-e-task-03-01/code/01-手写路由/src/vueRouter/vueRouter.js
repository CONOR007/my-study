
let _Vue = null
export default class VueRouter {
  static install (Vue) {
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true
    _Vue = Vue
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          // 创建的时候vue肯定是可以拿到router的 这个时候把它给_Vue的原型
          _Vue.prototype.$router = this.$options.router
          // const vm = new Vue({
          //     注册 router 对象
          //     router,
          //     render: h => h(App)
          // }).$mount('#app')
          // 实例化的时候 new Vue中的对象都放在$options中去了. 所以该类中所有属性方法都能在this.$options.router中拿到.
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    // options是实例化路由对象时传进来的对象
    // {
    //     mode: 'history',
    //     routes
    // }
    this.options = options
    this.routeMap = {}
    // 双向绑定
    this.data = _Vue.observable({
      current: '/'
    })
  }

  createRouteMap () {
    this.options.routes.forEach(element => {
      this.routeMap[element.path] = element.component
    })
  }

  initComponents () {
    _Vue.component('router-link', {
      props: {
        to: String
      },
      // template : '<a :href="to"><solt></solt></a>',
      render (h) {
        // h函数(生成的目标元素,目标元素属性方法,内容部分插槽)
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHander
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHander (e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const self = this
    _Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents()
    this.initEvent()
  }

  //initEvent 用来注册popState事件监听浏览器历史的变化
  initEvent () {
    window.addEventListener('popstate',()=>{
      this.data.current = window.location.pathname
    })
  }
}
