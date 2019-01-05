<template>
  <div id="app">
    <Header />
    <Menu />
    <nuxt />
    <Menu />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Menu from '~/components/Menu.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Menu,
    Footer
  }
}
</script>
