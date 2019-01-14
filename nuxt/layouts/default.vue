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
import Vue from 'vue'

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
  },

  mounted() {
    let isKeyUp = false

    // キーボードショートカットを設定
    window.addEventListener(
      'keyup',
      async e => {
        if (isKeyUp) return

        isKeyUp = true

        const keyCode = e.keyCode
        const keyCodes = Vue.config.keyCodes

        // H: ホッテントリに切り替え
        if (keyCode === keyCodes.h) {
          await this.changeDisplayMode('hotentry')
        }
        // N: 新着エントリに切り替え
        else if (keyCode === keyCodes.n) {
          await this.changeDisplayMode('entrylist')
        }
        // ←: 一つ前のカテゴリを表示
        else if (keyCode === keyCodes.leftarrow) {
          console.log('prev')
        }
        // →: 一つ後のカテゴリを表示
        else if (keyCode === keyCodes.rightarrow) {
          console.log('next')
        }

        setTimeout(() => {
          isKeyUp = false
        }, 100)
      },
      false
    )
  },

  methods: {
    async changeDisplayMode(mode) {
      await this.$store.dispatch('changeDisplayMode', {
        mode: mode,
        category: this.$route.params.category
      })
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
