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
    },

    categories() {
      return this.$store.state.categories
    },

    currentCategory() {
      return this.$store.state.currentCategory
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
          this.getAdjacentCategory('previous')
        }
        // →: 一つ後のカテゴリを表示
        else if (keyCode === keyCodes.rightarrow) {
          this.getAdjacentCategory('next')
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
    },

    getAdjacentCategory(side) {
      let sideCategory, sideIndex

      Object.keys(this.categories).forEach((category, index) => {
        if (category === this.currentCategory) {
          console.log('current', category, index)

          if (side === 'previous') {
            sideIndex = index - 1
          } else if (side === 'next') {
            sideIndex = index + 1
          }

          Object.keys(this.categories).forEach((category, index) => {
            if (index === sideIndex) {
              sideCategory = category
            }
          })

          console.log(side, sideCategory, sideIndex)
        }
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
