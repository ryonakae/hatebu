<template>
  <div class="app">
    <Header />
    <Nav />
    <nuxt />
    <Nav />
    <Footer />
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

<style scoped>
.app {
  max-width: var(--content-width);
  margin-right: auto;
  margin-left: auto;
  background-color: var(--color-contentBg);
}
</style>
