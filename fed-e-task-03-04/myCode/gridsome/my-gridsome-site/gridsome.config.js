// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'conor',
  siteUrl:'liucong.icu',
  siteDescription:'web前端开发',//meta的content值,对网站的介绍内容
  plugins: [],
  templates: {
    Post: [
      {
        path: '/posts/:id',
        component: './src/templates/Posts.vue'
      }
    ]
  }
}
