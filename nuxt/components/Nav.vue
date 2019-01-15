<template>
  <nav
    class="nav"
    @mouseenter.stop="isActive = true"
    @mouseleave.stop="isActive = false"
    @touchstart.stop="isActive = true"
    @touchend.stop="isActive = false"
  >
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

    <div v-swiper:swiper="swiperOptions" class="category" :class="{ 'is-visible': isVisible }">
      <div class="swiper-wrapper">
        <div
          v-for="(categoryName, category) in categories"
          :key="category"
          class="swiper-slide category-item"
        >
          <nuxt-link class="category-link is-noborder" :to="'/' + category">
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

<script>
export default {
  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true,
        freeModeMomentum: false,
        mousewheel: {
          releaseOnEdges: true
        },
        touchReleaseOnEdges: true,
        on: {
          init: () => {
            console.log('swiper init')
            this.isVisible = true
          },
          progress: () => {
            if (!this.swiper) return

            // アクティブなNaviのtranslateの情報だけをstoreに格納する
            if (this.isActive) {
              this.$store.commit('SET_SWIPER_TRANSLATE', this.swiper.getTranslate())
            }
          }
        }
      },
      isVisible: false,
      isActive: false
    }
  },

  computed: {
    categories() {
      return this.$store.state.categories
    },

    displayMode() {
      return this.$store.state.displayMode
    },

    swiperTransrate() {
      return this.$store.state.swiperTransrate
    }
  },

  watch: {
    swiperTransrate(translate) {
      // アクティブじゃないNaviだけtranslateを更新する
      if (!this.isActive) {
        this.swiper.setTranslate(translate)
      }
    }
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
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  width: 100%;
  height: 50px;
  overflow: hidden;
  font-size: var(--fontSize-nav);
  background-color: var(--color-contentBg);
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
  background-color: var(--color-contentBg);
}

.display-item {
  height: 26px;
  padding: 0 10px;
  margin-left: 2px;
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
    background-color: var(--color-key);
  }

  @media (hover) {
    &:hover {
      color: var(--color-key);
    }

    &.is-active:hover {
      color: white;
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
  visibility: hidden;

  &.is-visible {
    visibility: visible;
  }
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
