<template>
  <div class="nav">
    <nav class="nav-content">
      <ul class="display">
        <NuxtLink
          :to="`/hotentry/${route.params.category || 'all'}`"
          class="display-item link is-noborder"
          :class="{ 'is-active': route.params.type === 'hotentry' || route.path === '/' }"
        >
          人気
        </NuxtLink>
        <NuxtLink
          :to="`/entrylist/${route.params.category || 'all'}`"
          class="display-item link is-noborder"
          :class="{ 'is-active': route.params.type === 'entrylist' }"
        >
          新着
        </NuxtLink>
      </ul>

      <ClientOnly>
        <swiper-container
          ref="swiperRef"
          :init="false"
          class="category"
          :class="{ 'is-visible': isSwiperInit }"
        >
          <swiper-slide
            v-for="(categoryName, category) in store.categories"
            :key="category"
            class="category-item"
          >
            <NuxtLink
              class="category-link is-noborder"
              :class="{ 'is-active': category === 'all' && route.path === '/' }"
              :to="`/${route.params.type || 'hotentry'}/${category}`"
              prefetch
              @click="onLinkClick(category)"
            >
              <span>{{ categoryName }}</span>
            </NuxtLink>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const store = useCommonStore()

// Swiper
const swiperRef = ref(null)
const isSwiperInit = ref(false)
const swiperOptions = {
  slidesPerView: 'auto' as const,
  spaceBetween: 16,
  freeMode: true,
  freeModeMomentum: false,
  touchReleaseOnEdges: true,
  mousewheel: {
    releaseOnEdges: true,
  },
  on: {
    init: async () => {
      console.log('swiper init')
      isSwiperInit.value = true
      await nextTick()
      updateSwiperIndex(store.currentCategory)
    },
  },
}

// Init Swiper
const swiper = useSwiper(swiperRef, swiperOptions)

// Methods
function updateSwiperIndex(category: string) {
  console.log('updateSwiperIndex', category)

  const categoryKeys = Object.keys(store.categories)
  const currentIndex = categoryKeys.indexOf(category)

  swiper.instance.value?.slideTo(currentIndex, 0)
}

function onLinkClick(category: Category) {
  console.log('onLinkClick', category, store.currentCategory)
  store.currentCategory = category
  console.log('currentCategory updated', store.currentCategory)
}

// Watch
watch(
  () => store.currentCategory,
  (newCategory) => {
    console.log('currentCategory updated', newCategory)
    updateSwiperIndex(newCategory)
  },
)
</script>

<style scoped>
.nav {
  width: 100%;
  font-size: var(--fontsize-nav);
  background-color: var(--color-bg-content);
}

.nav-content {
  display: flex;
  width: 100%;
  height: var(--nav-height);
  overflow: hidden;
}

.display {
  background-color: var(--color-bg-content);
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  padding-left: var(--padding-content-horizontal);
  padding-right: 16px;
  white-space: nowrap;
  list-style-type: none;

  @media (--sp) {
    padding-right: 8px;
    padding-left: var(--padding-content-horizontal-sp);
  }
}

.display-item {
  background-color: var(--color-bg);
  height: 24px;
  padding-inline: 8px;
  line-height: 24px;
  color: inherit;
  border-radius: calc(24px / 2);

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
  pointer-events: none;
  visibility: hidden;

  &.is-visible {
    pointer-events: auto;
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

  &.is-active,
  &.router-link-active {
    font-weight: bold;
    color: var(--color-key);
    pointer-events: none;
  }

  @media (hover) {
    &:hover {
      color: var(--color-key);
    }
  }
}
</style>
