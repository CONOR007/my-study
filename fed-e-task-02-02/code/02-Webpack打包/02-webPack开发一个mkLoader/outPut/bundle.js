/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "outPut/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _about_md__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

document.write(_about_md__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1 id=\"webpack打包\">webpack打包</h1>\n<h3 id=\"1webpack快速上手\">1.webpack快速上手</h3>\n<ul>\n<li><p>1.下载相关依赖</p>\n<pre><code class=\"language-nginx\">yarn add webpack webpack-cli --dev</code></pre>\n</li>\n<li><p>2.约定src/index.js作为入口文件,打包成功后在dist文件中有一个main.js</p>\n<pre><code class=\"language-nginx\">yarn webpack</code></pre>\n<p>webpack打包会把import和exprot转换掉所以在index.html中就不需要type=&quot;module&quot;标注</p>\n</li>\n</ul>\n<h3 id=\"2webpack配置文件\">2.webpack配置文件</h3>\n<ul>\n<li><p>在项目根目录下新建webpack.config.js文件,写入对应配置即可</p>\n<pre><code class=\"language-javascript\">const path = require(&#39;path&#39;)\nmodule.exports = {\n    entry:&#39;./src/index.js&#39;, //打包入口文件\n    output:{\n        filename:&#39;bundle.js&#39;, //输出文件名称\n        path:path.join(__dirname,&#39;outPut&#39;), //输出文件路径\n    }\n}</code></pre>\n</li>\n</ul>\n<h3 id=\"3webpack工作模式\">3.webPack工作模式</h3>\n<ul>\n<li><p>yarn webpack默认打包出来的是生产环境的压缩代码,不方便阅读.在开发环境中打包可以使用一下命令,它在打包的过程中会做一些优化</p>\n<pre><code class=\"language-nginx\">yarn webpack --mode development</code></pre>\n</li>\n<li><p>而最原始的打包,不作任何优化的也可以使用:</p>\n<pre><code class=\"language-nginx\">yarn webpack --mode none</code></pre>\n</li>\n<li><p>以上命令具体可参照webpack官方文档,具体写法可以写入cofing配置文件当中:</p>\n<pre><code class=\"language-javascript\">module.exports = {\n    mode:&#39;development&#39;,\n        ...\n}</code></pre>\n</li>\n<li><p>webpack打包结果运行原理可以将mode设置为none,打包之后去bundle.js中去断点代码的运行</p>\n<p>(代码折叠可用ctrl+k ctrl+0)</p>\n</li>\n</ul>\n<h3 id=\"4webpack模块加载\">4.webpack模块加载</h3>\n<blockquote>\n<p>webpack兼容各个模块化标准</p>\n<ul>\n<li>遵循ES Modules标准的import声明</li>\n<li>遵循CommonJS标准的require函数</li>\n<li>遵循AMD标准的define函数和require函数</li>\n</ul>\n</blockquote>\n<ul>\n<li><p>webpack默认只会对js文件进行打包</p>\n</li>\n<li><p>打包不同文件,需要下载不同的loader.比如打包CSS文件</p>\n<pre><code class=\"language-nginx\">yarn add css-loader --dev #打包css\nyarn add style-loader --dev</code></pre>\n<p>Webpack.config.js配置</p>\n<blockquote>\n<p>其中,use数组中的loader是从后往前执行的.先用css-loader把css文件转成js模块才能正常打包,再用style-loader把css-loader转换好的模块以标签的形式放入页面中去</p>\n</blockquote>\n</li>\n</ul>\n<pre><code class=\"language-javascript\">const path = require(&#39;path&#39;)\n\nmodule.exports = {\n    mode:&#39;none&#39;,\n    entry:&#39;./src/main.css&#39;, //打包入口文件\n    output:{\n        filename:&#39;bundle.js&#39;, //输出文件名称\n        path:path.join(__dirname,&#39;outPut&#39;), //输出文件路径\n    },\n    module:{\n        rules:[\n            {\n                test:/.css$/,\n                use:[&#39;style-loader&#39;,&#39;css-loader&#39;], \n            }\n        ]\n    }\n}</code></pre>\n<p>  有了以上配置,就可以再js文件中导入css资源文件了</p>\n<pre><code class=\"language-javascript\">import createHeading from &#39;./heading.js&#39;\nimport &#39;./main.css&#39;\nconst heading = createHeading();\ndocument.body.append(heading);</code></pre>\n<h3 id=\"5webpack资源加载器\">5.webpack资源加载器</h3>\n<ul>\n<li><h4 id=\"常用加载器分类\">常用加载器分类</h4>\n<blockquote>\n<ul>\n<li><strong>编译转换类</strong>,如css-loader</li>\n<li><strong>文件操作类</strong>,如file-loader</li>\n<li><strong>代码检查类</strong>,如eslint-loader</li>\n</ul>\n</blockquote>\n<p>以下介绍两个常用的加载器:</p>\n</li>\n</ul>\n<h4 id=\"文件资源加载器\">文件资源加载器</h4>\n<pre><code class=\"language-nginx\">yarn add file-loader --dev</code></pre>\n<p>  Webpack.config.js配置</p>\n<blockquote>\n<p>webpack在打包时遇到了图片文件,根据配置文件所配置的信息匹配到对应的文件加载器,此时文件加载器就开始工作了.文件加载器先将文件拷贝到输出的目录并默认这个路径是根目录,然后再将拷贝的文件名当作返回值返回.这样对于我们的应用来说所需要发布的资源就发布出来了,同时如果index.html不在这个目录,也可以通过模块的导出成员<strong>publicPath</strong>拿到文件的路径.得到完整的资源文件路径.</p>\n</blockquote>\n<pre><code class=\"language-javascript\">const path = require(&#39;path&#39;)\n\nmodule.exports = {\n    mode:&#39;none&#39;,\n    entry:&#39;./src/main.js&#39;, \n    output:{\n        filename:&#39;bundle.js&#39;, \n        path:path.join(__dirname,&#39;outPut&#39;), \n        publicPath:&#39;outPut/&#39;,//网站打包的路径\n    },\n    module:{\n        rules:[\n            {\n                test:/.png$/,\n                use:&#39;file-loader&#39;\n            }\n        ]\n    }\n}</code></pre>\n<h4 id=\"data-url加载器\">DATA URL加载器</h4>\n<pre><code class=\"language-nginx\">yarn add url-loader --dev</code></pre>\n<p>  Webpack.config.js配置</p>\n<blockquote>\n<p>Data URLs加载器能对图片进行base64转码,小文件使用它能减少请求次数. 如下所示10kb以转的png图片会被转换成dataUrl形式,但是这里还是需要file-loader这个加载器.因为10K以上的图片要用到它.</p>\n</blockquote>\n<pre><code class=\"language-javascript\">const path = require(&#39;path&#39;)\n\nmodule.exports = {\n    mode:&#39;none&#39;,\n    entry:&#39;./src/main.js&#39;, \n    output:{\n        filename:&#39;bundle.js&#39;, \n        path:path.join(__dirname,&#39;outPut&#39;), \n        publicPath:&#39;outPut/&#39;,\n    },\n    module:{\n        rules:[\n            {\n                test:/.png$/,\n                use:{\n                    loader:&#39;url-loader&#39;,\n                    options:{\n                        limit:10*1024,\n                    }\n                }\n            }\n        ]\n    }\n}</code></pre>\n<h4 id=\"babel加载器\">babel加载器</h4>\n<pre><code class=\"language-nginx\">yarn add babel-loader @babel/core @babel/preset-env --dev</code></pre>\n<p>  Webpack.config.js配置</p>\n<blockquote>\n<p>webpack打包默认不会转换ES6的特性,加载器可以用来编译转化代码,如babel-loader</p>\n</blockquote>\n<p>  ​     </p>\n<pre><code class=\"language-javascript\">const path = require(&#39;path&#39;)\nmodule.exports = {\n    mode:&#39;none&#39;,\n    entry:&#39;./src/main.js&#39;,\n    output:{\n        filename:&#39;bundle.js&#39;,\n        path:path.join(__dirname,&#39;outPut&#39;),\n        publicPath:&#39;outPut/&#39;,\n    },\n    module:{\n        rules:[\n            {\n                test:/.js$/,\n                use:{\n                    loader:&#39;babel-loader&#39;, \n                    //babel它只是一个平台,需要通过配置去完成想用的功能\n                    options:{\n                        presets:[&#39;@babel/preset-env&#39;]\n                    }\n                }\n            },\n        ]\n    }\n}</code></pre>\n<h4 id=\"html资源加载\">html资源加载</h4>\n<pre><code class=\"language-nginx\">yarn add html-loader --dev</code></pre>\n<p>  Webpack.config.js配置</p>\n<blockquote>\n<p>对标签属性的处理要用到<strong>attributes</strong></p>\n</blockquote>\n<pre><code class=\"language-javascript\">{\n    test: /\\.(html)$/,\n    use: {\n        loader: &#39;html-loader&#39;,\n        options: {\n        attributes: {\n            list: [\n                {\n                tag: &#39;a&#39;,\n                attribute: &#39;href&#39;,\n                type: &#39;src&#39;,\n                },                          \n            ],\n        }\n        }\n    }\n}</code></pre>\n");

/***/ })
/******/ ]);