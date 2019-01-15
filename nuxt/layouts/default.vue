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

  data() {
    return {
      isKeyUp: false
    }
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
    this.$nextTick(() => {
      // キーボードショートカットを設定
      window.addEventListener('keyup', this.onKeyUp, false)
    })
  },

  methods: {
    async onKeyUp(event) {
      if (this.isKeyUp) return

      this.isKeyUp = true

      const keyCode = event.keyCode
      const keyCodes = Vue.config.keyCodes

      // H: ホッテントリに切り替え
      if (keyCode === keyCodes.h) {
        await this.$store.dispatch('changeDisplayMode', {
          mode: 'hotentry',
          category: this.$route.params.category
        })
      }
      // N: 新着エントリに切り替え
      else if (keyCode === keyCodes.n) {
        await this.$store.dispatch('changeDisplayMode', {
          mode: 'entrylist',
          category: this.$route.params.category
        })
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
        this.isKeyUp = false
      }, 100)
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
