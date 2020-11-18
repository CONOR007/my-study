<template>
  <Layout>
    <div>
      <h1>Posts 2</h1>
      <ul>
        <li v-for="post in $page.posts.edges" :key="post.node.id">
          <g-link :to="post.node.path">{{ post.node.title }}</g-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<page-query>
query {
  posts:allPost{
    edges{
      node{
        id
        title
        path
      }
    }
  }
}
</page-query>

<script>
import axios from 'axios'

export default {
  name: 'Posts2',
}
</script>

<style>

</style>
