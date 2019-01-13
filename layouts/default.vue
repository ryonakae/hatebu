<template>
  <div class="app">
    <div class="app-inner">
      <Header />
      <Nav />
      <nuxt />
      <Nav />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Nav,
    Footer
  },

  computed: {
    siteInfo() {
      return this.$store.state.siteInfo
    }
  }
}
</script>
