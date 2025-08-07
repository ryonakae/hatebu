<template>
  <div class="nav">
    <nav class="nav-content">
      <ul class="type">
        <button
          type="button"
          class="type-item link is-noborder"
          :class="{ 'is-active': store.entryType === 'hotentry' }"
          @click="onEntryTypeClick('hotentry')"
        >
          人気
        </button>
        <button
          type="button"
          class="type-item link is-noborder"
          :class="{ 'is-active': store.entryType === 'entrylist' }"
          @click="onEntryTypeClick('entrylist')"
        >
          新着
        </button>
      </ul>

      <ClientOnly>
        <swiper-container
          ref="swiperRef"
          :init="false"
          class="category"
          :class="{ 'is-visible': isSwiperInit }"
        >
          <!-- すべて (/) -->
          <swiper-slide class="category-item">
            <NuxtLink
              class="category-link is-noborder"
              :class="{ 'is-active': route.path === '/' }"
              to="/"
              prefetch
              @click="onAllClick"
            >
              <span>すべて</span>
            </NuxtLink>
          </swiper-slide>

          <!-- 各カテゴリ -->
          <swiper-slide
            v-for="(categoryName, category) in store.categories"
            :key="category"
            class="category-item"
          >
            <NuxtLink
              class="category-link is-noborder"
              :to="`/${route.params.type || 'hotentry'}/${category}`"
              prefetch
              @click="onCategoryClick(category)"
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
  spaceBetween: 0,
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

      if (store.currentCategory === null) {
        updateSwiperIndex(0)
      }
      else {
        updateSwiperIndex(store.currentCategory)
      }
    },
  },
}

// Init Swiper
const swiper = useSwiper(swiperRef, swiperOptions)

// Methods
function updateSwiperIndex(category: keyof Categories | number) {
  console.log('updateSwiperIndex:', category)
  let currentIndex: number

  if (typeof category === 'number') {
    currentIndex = category
  }
  else {
    const categoryKeys = Object.keys(store.categories)
    currentIndex = categoryKeys.indexOf(category) + 1 // 「すべて」を考慮
  }

  swiper.instance.value?.slideTo(currentIndex, 0)
}

function onEntryTypeClick(type: EntryType) {
  console.log('onEntryTypeClick:', type)
  store.entryType = type
}

function onAllClick() {
  console.log('onAllClick')
  store.currentCategory = null
}

function onCategoryClick(category: Category) {
  console.log('onCategoryClick:', category, store.currentCategory)
  store.currentCategory = category
}

// Watch
watch(
  () => store.currentCategory,
  (newCategory) => {
    console.log('currentCategory updated:', newCategory)

    if (newCategory === null) {
      updateSwiperIndex(0)
    }
    else {
      updateSwiperIndex(newCategory)
    }
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

.type {
  background-color: var(--color-bg-content);
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  padding-left: var(--padding-content-horizontal);
  padding-right: 24px;
  white-space: nowrap;
  list-style-type: none;

  @media (--sp) {
    padding-inline: var(--padding-content-horizontal-sp);
  }
}

.type-item {
  background-color: var(--color-bg);
  height: 24px;
  padding-inline: 8px;
  line-height: 24px;
  color: inherit;
  border-radius: calc(24px / 2);

  &.is-active {
    font-weight: bold;
    color: white;
    background-color: var(--color-key);
    pointer-events: none;
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
  padding-right: 16px;
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
