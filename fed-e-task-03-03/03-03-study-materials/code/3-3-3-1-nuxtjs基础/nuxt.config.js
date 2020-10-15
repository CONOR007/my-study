module.exports = {
    router : {
        base:'/abc',
        extendRoutes(routes, resolve) {
            routes.push({
                mode: 'hash',
                name: 'hello',
                path: '/hello',
                component: resolve(__dirname, 'pages/about.vue')
            })
        }
    }
}