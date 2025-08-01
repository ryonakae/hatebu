<template>
  <div
    class="nav"
    :class="{ 'is-top': isTop, 'is-bottom': isBottom }"
  >
    <CommonDivider v-if="isBottom" />
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

      <ClientOnly>
        <swiper-container
          ref="swiperRef"
          :init="false"
          class="category"
        >
          <swiper-slide
            v-for="(categoryName, category) in categories"
            :key="category"
            class="category-item"
            :class="{ 'is-visible': isSwiperInit }"
          >
            <NuxtLink
              class="category-link is-noborder"
              :to="'/' + category"
              @click="onLinkClick(category)"
            >
              <span>{{ categoryName }}</span>
            </NuxtLink>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </nav>
    <CommonDivider />
    <div
      v-if="isBottom"
      class="safe-area"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isBottom?: boolean
  isTop?: boolean
}

withDefaults(defineProps<Props>(), {
  isBottom: false,
  isTop: false,
})

const route = useRoute()
const store = useCommonStore()

// Swiper関連
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
    init: () => {
      console.log('swiper init')
      onSwiperInit()
    },
  },
}

const swiper = useSwiper(swiperRef, swiperOptions)

// Computed
const categories = computed(() => store.categories)
const currentCategory = computed(() => store.currentCategory)
const displayMode = computed(() => store.displayMode)

// Methods
async function changeDisplayMode(mode: DisplayMode) {
  await store.changeDisplayMode({
    mode,
    category: route.params.category as Category,
  })
}

function updateIndex(category: string) {
  console.log(category)
  const categoryKeys = Object.keys(categories.value)
  const currentIndex = categoryKeys.indexOf(category)
  if (swiper.instance?.value) {
    swiper.instance.value.slideTo(currentIndex, 0)
  }
}

function onLinkClick(category: Category) {
  if (category === currentCategory.value) {
    reload()
  }
}

async function reload() {
  store.rssData = null

  const json = await store.getEntry({
    mode: displayMode.value,
    category: route.params.category as Category,
  })
  store.rssData = json
}

function onSwiperInit() {
  console.log('onSwiperInit')
  isSwiperInit.value = true
}

// Watch
watch(
  currentCategory,
  (category) => {
    updateIndex(category)
  },
)

// Lifecycle
onMounted(async () => {
  await nextTick()
  updateIndex(currentCategory.value)
})
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
  height: 24px;
  padding: 0 8px;
  margin-left: 4px;
  line-height: 24px;
  color: inherit;
  background-color: var(--color-bg);
  border-radius: calc(24px / 2);

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
  pointer-events: none;
  visibility: hidden;

  &.is-visible {
    pointer-events: auto;
    visibility: visible;
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
