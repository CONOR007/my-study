<template>
  <Layout>
    <div>
      <h1>{{ $page.post.id }}</h1>
      <h1>{{ $page.post.title }}</h1>
      <h1>{{ $page.post.content }}</h1>
    </div>
  </Layout>
</template>

<page-query>
  query($id:ID!) {
    post (id:$id){
      id
      title
      content
    }
  }
</page-query>

<script>
import axios from 'axios'

export default {
  name: 'Posts',
  metaInfo () {
    return {
      title : this.$page.post.title
    }
  }
}
</script>

<style>

</style>
