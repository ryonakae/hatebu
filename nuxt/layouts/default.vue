<template>
  <div class="app">
    <Header />
    <Nav />
    <nuxt />
    <Nav />
    <Footer />
    <div class="notice" />
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
      // ←: 一つ前のカテゴリに遷移
      else if (keyCode === keyCodes.leftarrow) {
        this.moveAdjacentCategory('previous')
      }
      // →: 一つ後のカテゴリに遷移
      else if (keyCode === keyCodes.rightarrow) {
        this.moveAdjacentCategory('next')
      }

      setTimeout(() => {
        this.isKeyUp = false
      }, 100)
    },

    moveAdjacentCategory(side) {
      const categories = Object.keys(this.categories)
      const currentIndex = categories.indexOf(this.currentCategory)

      let sideIndex

      if (side === 'previous') {
        sideIndex = currentIndex - 1

        if (sideIndex < 0) {
          sideIndex = categories.length - 1
        }
      } else if (side === 'next') {
        sideIndex = currentIndex + 1

        if (sideIndex > categories.length - 1) {
          sideIndex = 0
        }
      }

      const sideCategory = categories[sideIndex]

      this.$router.push('/' + sideCategory)
    }
  }
}
</script>

<style scoped>
.app {
  max-width: var(--content-width);
  margin-right: auto;
  margin-left: auto;
  background-color: var(--color-bg-content);
}

.notice {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: var(--padding-notice);
  pointer-events: none;
}
</style>
