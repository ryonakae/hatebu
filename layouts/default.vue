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
  },

  head() {
    return {
      titleTemplate: '%s | ' + this.siteInfo.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.siteInfo.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.siteInfo.name
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.siteInfo.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.siteInfo.url
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.siteInfo.url + '/ogp.png'
        },
        {
          property: 'og:site_name',
          content: this.siteInfo.name
        }
      ]
    }
  },

  computed: {
    siteInfo() {
      return this.$store.state.siteInfo
    }
  }
}
</script>
