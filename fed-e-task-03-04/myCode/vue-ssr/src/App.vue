<template>
    <div id="app">
        <h1>{{message}}</h1>
        <h2>客户端动态交互</h2>
        <div>
            <input v-model="message">
        </div>
        <div>
            <button @click="onClick">点击测试</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message:'湿哒哒所多撒'
        }
    },
    methods: {
        onClick () {
            console.log('Hello World')
        }
    },
}
</script>