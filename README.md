

### 一、Vue 3.0 性能提升主要是通过哪几方面体现的？

1. **使用Proxy代理对象重写了响应式**
   `Proxy`**可以监听`对象动态新增的属性`,`删除属性`,`数组的索引`和`length`**

2. **对`编译器`作了优化**

   Vue2.x中通过**标记静态根节点**优化diff过程

   Vue3.0中标记和**提升所以的静态根节点**,diff只需对比动态节点内容

   - `Fragments`(没有根节点同样会生成一个树形代码片段)
   - `对静态节点进行提升`
   - `Patch flag` 标记动态节点属性和内容
   - `缓存事件处理函数`
     [Vue 3 Template Explorer 测试](https://vue-next-template-explorer.netlify.app/#{"src"%3A"\n  <%2Ftransition>\n  \n  21321321<%2Fp>\n  21321321<%2Fp>\n  21321321<%2Fp>\n  21321321<%2Fp>\n  {{ab}}<%2Fp>\n  电机架<%2Fbutton>\n  <%2Fdiv>\n\n"%2C"options"%3A{"mode"%3A"module"%2C"prefixIdentifiers"%3Afalse%2C"optimizeImports"%3Afalse%2C"hoistStatic"%3Atrue%2C"cacheHandlers"%3Atrue%2C"scopeId"%3Anull%2C"inline"%3Afalse%2C"ssrCssVars"%3A"{ color }"%2C"bindingMetadata"%3A{"TestComponent"%3A"setup"%2C"foo"%3A"setup"%2C"bar"%3A"props"}}})![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207174914171.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzA4MzE2,size_16,color_FFFFFF,t_70)

3. **优化了打包体积**

   - Vue3.0中**移除了一些不常用的API**,如:inline-template,filter等
   - **Tree-shaking不打包没有用到的API,但是核心的API都会被打包**

### 二、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

  `CompositionAPI`解决2.0使用optionsAPI不好**重用**与**拆分**的问题

  **Options API**

在vue2中我们会在一个vue文件中data，methods，computed，watch中定义属性和方法，共同处理页面逻辑. 一个功能往往需要在不同的vue配置项中定义属性和方法，比较分散.即使通过Mixins重用逻辑代码，也容易发生命名冲突且关系不清.

**Composition API**

在vue3 Composition API 中，代码是根据逻辑功能来组织的，一个功能的所有api会放在一起（高内聚，低耦合），这样做，即时项目很大，功能很多，都能快速的定位到这个功能所用到的所有API.提高可读性和可维护性，而且基于函数组合的 API 更好的重用逻辑代码.

### 三、Proxy 相对于 Object.defineProperty 有哪些优点？

`Proxy`**可以监听`对象动态新增的属性`,`删除属性`,`数组的索引`和`length`**

### 四、Vue 3.0 在编译方面有哪些优化？

1. **快速冷启动**

   `Vite 无需打包即可直接运行项目`.提升了开发效率.而Vue-cli开发模式下必须对项目打包才能运行

2. **按需编译**

3. **模块热更新**

4. **Vite在生产环境下使用Rollup打包**

   - `Rollup基于ESModule的方式打包`,不需要像webpack一样使用babel把import转换成require以及一些辅助函数.因此它的打包体积比webpack更小.

### 5、Vue.js 3.0 响应式系统的实现原理？

https://blog.csdn.net/qq_42308316/article/details/111181443