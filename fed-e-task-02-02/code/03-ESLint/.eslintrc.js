module.exports = {
  env: {
    //标记运行环境-browser:浏览器
    browser: true,
    es2020: true,
  },
  extends: [
    //继承,可同时继承多个配置
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2015
  },
  rules: {

  },
  globals:{
    "JQuery":"readonly"
  },
  //配置注释
}
