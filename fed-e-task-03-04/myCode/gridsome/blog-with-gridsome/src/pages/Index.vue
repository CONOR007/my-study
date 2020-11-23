<template>
  <Layout>
    <!-- Page Header -->
    <header class="masthead"  :style="{backgroundImage: `url(${GRIDSOME_API_URL + '/img/home-bg.jpg'})`}">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>Clean Blog</h1>
              <span class="subheading">A Blog Theme by Start Bootstrap</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-preview" v-for="(edge, index) in $page.posts.edges" :key="index">
            <g-link :to="`/post/${edge.node.id}`">
              <h2 class="post-title">
                {{edge.node.title}}
              </h2>
              <!-- <h3 class="post-subtitle">
                {{item.node.title}}
              </h3> -->
            </g-link>
            <p class="post-meta">Posted by
              <a href="#">CONOR</a>
              on {{ edge.node.created_at}}
            </p>
            <p>
              <span  v-for="(tag, index) in edge.node.tags" :key="index">
                <a href="#">{{ tag.title }}</a>
                &nbsp;
              </span>
            </p>
              <hr>
          </div>
          <!-- Pager -->
          <div class="clearfix">
            <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </Layout>
</template>

<page-query>
query {
  posts : allStrapiPost{
    edges{
      node{
        title
        id
        created_at
        tags {
          id
          title
        }
      }
    }
  }
}
</page-query>
<script>
export default {
  name:'index',
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>

</style>
