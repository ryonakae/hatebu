<template>
  <div class="app">
    <Header />
    <Nav />
    <nuxt />
    <Nav />
    <Footer />
    <no-ssr><Toast /></no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

import Header from '~/components/Header.vue'
import Nav from '~/components/Nav.vue'
import Footer from '~/components/Footer.vue'
import Toast from '~/components/Toast.vue'

@Component({
  components: {
    Header,
    Nav,
    Footer,
    Toast
  }
})
export default class extends Vue {
  // data
  private isKeyUp = false

  // computed
  get categories(): Categories {
    return this.$store.state.categories
  }

  get currentCategory(): string {
    return this.$store.state.currentCategory
  }

  // methods
  async onKeyUp(event: KeyboardEvent): Promise<void> {
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

    setTimeout((): void => {
      this.isKeyUp = false
    }, 100)
  }

  moveAdjacentCategory(side: 'previous' | 'next') {
    const categories = Object.keys(this.categories)
    const currentIndex = categories.indexOf(this.currentCategory)

    let sideIndex!: number

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

  // lifecycle
  async mounted(): Promise<void> {
    await this.$nextTick()
    // キーボードショートカットを設定
    window.addEventListener('keyup', this.onKeyUp, false)
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
</style>
