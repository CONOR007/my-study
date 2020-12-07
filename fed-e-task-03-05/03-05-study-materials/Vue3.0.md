##  **一. 源码组织方式变化**
 1. **源码采用typeScript重写**
 2. 使用`Monorepo`管理项目结构,**把不同功能的代码放入不同的packages中进行管理,这样有利于功能和模块划分明确,并且每个功能模块都能单独测试单独发布单独使用**
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207163846245.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzA4MzE2,size_16,color_FFFFFF,t_70)

##  **二. 增加Composition**
  `CompositionAPI`解决2.0使用optionsAPI不好**重用**与**拆分**的问题

##  **三. 性能提升**

  1. **使用Proxy代理对象重写了响应式**
     `Proxy`**可以监听`对象动态新增的属性`,`删除属性`,`数组的索引`和`length`**

  2. **对`编译器`作了优化**

     Vue2.x中通过**标记静态根节点**优化diff过程

     Vue3.0中标记和**提升所以的静态根节点**,diff只需对比动态节点内容

      - `Fragments`(没有根节点同样会生成一个树形代码片段)
      - `对静态节点进行提升`
      - `Patch flag` 标记动态节点属性和内容
      - `缓存事件处理函数`
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207174914171.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyMzA4MzE2,size_16,color_FFFFFF,t_70)

  3. **优化了打包体积**
     - Vue3.0中**移除了一些不常用的API**,如:inline-template,filter等
     - **Tree-shaking不打包没有用到的API,但是核心的API都会被打包**

##  **四. Vite开发工具**

  1. **快速冷启动**

     `Vite 无需打包即可直接运行项目`.提升了开发效率.而Vue-cli开发模式下必须对项目打包才能运行

  2. **按需编译**
  3. **模块热更新**
  4. **Vite在生产环境下使用Rollup打包**
     
- `Rollup基于ESModule的方式打包`,不需要像webpack一样使用babel把import转换成require以及一些辅助函数.因此它的打包体积比webpack更小.
     
  5. 使用

     ```bash
     # vite创建项目
     npm init vite-app
     cd <project-name>
     npm i
     npm run dev
     # vite基于模板创建项目
     npm init vite-app --template react
     npm init vite-app --template preact
     ```

     