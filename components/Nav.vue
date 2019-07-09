<template>
  <nav class="nav">
    <ul class="display">
      <li
        class="display-item link is-noborder"
        :class="{ 'is-active': displayMode === 'hotentry' }"
        @click.stop="changeDisplayMode('hotentry')"
      >
        人気
      </li>
      <li
        class="display-item link is-noborder"
        :class="{ 'is-active': displayMode === 'entrylist' }"
        @click.stop="changeDisplayMode('entrylist')"
      >
        新着
      </li>
    </ul>

    <div v-swiper:swiper="swiperOptions" class="category">
      <div class="swiper-wrapper">
        <div
          v-for="(categoryName, category) in categories"
          :key="category"
          class="swiper-slide category-item"
        >
          <a
            v-if="category === currentCategory"
            class="category-link is-noborder is-active"
            :href="'/' + category"
          >
            <span>{{ categoryName }}</span>
          </a>
          <nuxt-link v-else class="category-link is-noborder" :to="'/' + category">
            <span>{{ categoryName }}</span>
          </nuxt-link>
        </div>
        <div class="swiper-slide category-item">
          <a class="category-link is-noborder" href="https://kadenkaigi.com/" target="_blank">
            <span>家電</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  // data
  private swiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16,
    freeMode: true,
    freeModeMomentum: false,
    touchReleaseOnEdges: true,
    mousewheel: {
      releaseOnEdges: true
    },
    on: {
      init: (): void => {
        console.log('swiper init')
      }
    }
  }

  // computed
  get categories(): Categories {
    return this.$store.state.categories
  }

  get currentCategory(): string {
    return this.$store.state.currentCategory
  }

  get displayMode(): DisplayMode {
    return this.$store.state.displayMode
  }

  // watch
  @Watch('currentCategory')
  onCurrentCategoryChange(category: string): void {
    this.updateIndex(category)
  }

  // methods
  async changeDisplayMode(mode: DisplayMode): Promise<void> {
    await this.$store.dispatch('changeDisplayMode', {
      mode,
      category: this.$route.params.category
    })
  }

  updateIndex(category: string): void {
    console.log(category)
    const categories = Object.keys(this.categories)
    const currentIndex = categories.indexOf(category)
    this.swiper.slideTo(currentIndex, 0)
  }

  // lifecycle
  async mounted(): Promise<void> {
    await this.$nextTick()
    this.updateIndex(this.currentCategory)
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  width: 100%;
  height: 52px;
  overflow: hidden;
  font-size: var(--fontSize-nav);
  background-color: var(--color-bg-content);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.display {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  white-space: nowrap;
  list-style-type: none;
  background-color: var(--color-bg-content);
}

.display-item {
  height: 26px;
  padding: 0 10px;
  margin-left: 4px;
  line-height: 26px;
  color: inherit;
  background-color: var(--color-bg);
  border-radius: calc(26px / 2);

  &:first-child {
    margin-left: 0;
  }

  &.is-active {
    font-weight: bold;
    color: white;
    pointer-events: none;
    background-color: var(--color-key);
  }

  @media (hover) {
    &:hover {
      color: white;
      background-color: var(--color-key);
    }
  }
}

.category {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  padding: 0 16px 0 8px;
  overflow: hidden;
}

.category-item {
  width: auto;
}

.category-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: inherit;

  &.is-active,
  &.nuxt-link-active {
    font-weight: bold;
    color: var(--color-key);
  }

  @media (hover) {
    &:hover {
      color: var(--color-key);
    }
  }
}
</style>
