# 简答题

#### 1、请简述 Vue 首次渲染的过程。

- 在首次渲染之前,首先进行Vue初始化,初始化实例成员和静态成员
- 当初始化结束之后,要调用Vue的构造函数`new Vue()`,在构造函数中调用了`_init()`方法,这个方法相当于我们整个Vue的入口
- 在`_init`方法中,最终调用了`$mount`,一共有两个`$mount`,第一个定义在`entry-runtime-with-compiler.js`文件中,也就是我们的入口文件`$mount`,这个`$mount()`的核心作用是帮我们把模板编译成`render`函数，但它首先会判断一下当前是否传入了`render`选项，如果没有传入的话，它会去获取我们的`template`选项，如果`template`选项也没有的话，他会把`el`中的内容作为我们的模板，然后把模板编译成`render`函数，它是通过`compileToFunctions()`函数，帮我们把模板编译成`render`函数的,当把`render`函数编译好之后，它会把`render`函数存在我们的`options.render`中。
- 接着会调用`src/platforms/web/runtime/index.js`文件中的`$mount`方法,在这个中首先会重新获取`el`，因为如果是运行时版本的话，是不会走`entry-runtime-with-compiler.js`这个入口中获取el，所以如果是运行时版本的话，我们会在runtime/index.js的$mount()中重新获取el。
- 接下来调用`mountComponent()`,这个方法在`src/core/instance/lifecycle.js`中定义的，在`mountComponent()`中，首先会判断`render`选项，如果没有`render`选项，但是我们传入了模板，并且当前是开发环境的话会发送一个警告，目的是如果我们当前使用运行时版本的Vue,而且我们没有传入render,但是传入了模版,告诉我们运行时版本不支持编译器。接下来会触发beforeMount这个生命周期中的钩子函数，也就是开始挂载之前。
- 然后定义了updateComponent()，在这个函数中，调用`vm._render`和`vm._update`，`vm._render`的作用是生成虚拟DOM，`vm._update`的作用是将虚拟`DOM`转换成真实`DOM`，并且挂载到页面上
- 创建`Watcher`对象，在创建`Watcher`时，传递了`updateComponent`这个函数，这个函数最终是在`Watcher`内部调用的。在`Watcher`内部会用了`get`方法，当Watcher创建完成之后,会触发生命周期中的`mounted`钩子函数,在get方法中，会调用`updateComponent()`
- 挂载结束，最终返回Vue实例。

### 2、请简述 Vue 响应式原理

- 在生成vue实例时，为对传入的data进行遍历，使用`Object.defineProperty`把这些属性转为`getter/setter`.
- 每个vue实例都有一个watcher实例，它会在实例渲染时记录这些属性，并在setter触发时重新渲染。
  - Vue 无法检测到对象属性的添加或删除,但是可以使用 `Vue.set(object, propertyName, value)`方法向嵌套对象添加响应式属性。
  - Vue无法利用索引直接设置一个数组项但是可以使用`vm.$set(vm.items, indexOfItem, newValue)`解决,无法通过length修改数组的长度但是可以使用`vm.items.splice(newLength)`解决。

### 3、请简述虚拟 DOM 中 Key 的作用和好处

- 在虚拟DOM的diff算法中,Key能更加精准的判断同级节点是否是相同节点,从而最大限度减少DOM操作,在数据运算量大的情况能有效提升效率。

### 4、请简述 Vue 中模板编译的过程

- 缓存公共的 mount 函数，并重写浏览器平台的 mount
- 判断是否传入了 render 函数，没有的话，是否传入了 template ，没有的话，则获取 el 节点的 outerHTML 作为 template
- 调用 baseCompile 函数
- **解析器(parse) 将模板字符串的模板编译转换成 AST 抽象语法树**
- **优化器(optimize) - 对 AST 进行静态节点标记，主要用来做虚拟DOM的渲染优化**
- **通过 generate 将 AST 抽象语法树转换为 render 函数的 js 字符串**
- 将 render 函数 通过 createFunction 函数 转换为 一个可以执行的函数
- 将 最后的 render 函数 挂载到 option 中
- 执行 公共的 mount 函数