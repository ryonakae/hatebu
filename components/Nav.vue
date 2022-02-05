<template>
  <div class="nav" :class="{ 'is-top': isTop, 'is-bottom': isBottom }">
    <Divider v-if="isBottom" />
    <nav class="nav-content">
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
            :class="{ 'is-visible': isSwiperInit }"
          >
            <nuxt-link
              class="category-link is-noborder"
              :to="'/' + category"
              @click.native="onLinkClick(category)"
            >
              <span>{{ categoryName }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
    <Divider />
    <div v-if="isBottom" class="safe-area" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import { common } from '~/store/modules/common'

import Divider from '~/components/Divider.vue'

@Component({
  components: {
    Divider
  }
})
export default class extends Vue {
  // props
  @Prop({ type: Boolean, required: false, default: false })
  readonly isBottom!: boolean

  @Prop({ type: Boolean, required: false, default: false })
  readonly isTop!: boolean

  // data
  private isSwiperInit = false
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
        console.log('swiper init', this)
        this.onSwiperInit()
      }
    }
  }

  // computed
  get categories() {
    return common.categories
  }

  get currentCategory() {
    return common.currentCategory
  }

  get displayMode() {
    return common.displayMode
  }

  // watch
  @Watch('currentCategory')
  onCurrentCategoryChange(category: string): void {
    this.updateIndex(category)
  }

  // methods
  async changeDisplayMode(mode: DisplayMode): Promise<void> {
    await common.changeDisplayMode({
      mode,
      category: this.$route.params.category as Category
    })
  }

  updateIndex(category: string): void {
    console.log(category)
    const categories = Object.keys(this.categories)
    const currentIndex = categories.indexOf(category)
    this.swiper.slideTo(currentIndex, 0)
  }

  onLinkClick(category: Category): void {
    if (category === this.currentCategory) {
      this.reload()
    }
  }

  async reload(): Promise<void> {
    common.SET_RSS_DATA(null)

    const json = await common.getEntry({
      mode: this.displayMode,
      category: this.$route.params.category as Category
    })
    common.SET_RSS_DATA(json)
  }

  onSwiperInit() {
    console.log('onSwiperInit')
    this.isSwiperInit = true
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
  width: 100%;
  font-size: var(--fontsize-nav);
  background-color: var(--color-bg-content);
}

.nav-content {
  width: 100%;
  height: var(--nav-height);
  display: flex;
  overflow: hidden;
}

.safe-area {
  /* height: calc(var(--nav-height) + var(--safe-area-inset-bottom)); */
  height: var(--safe-area-inset-bottom);
  background-color: var(--color-bg-footer);
}

.display {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px 0 var(--padding-content-horizontal);
  white-space: nowrap;
  list-style-type: none;
  background-color: var(--color-bg-content);

  @media (--sp) {
    padding-right: 8px;
    padding-left: var(--padding-content-horizontal-sp);
  }
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
  visibility: hidden;
  pointer-events: none;

  &.is-visible {
    visibility: visible;
    pointer-events: auto;
  }
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
