<template>
  <NuxtLoadingIndicator :color="'#2b4fb7'" />
  <div class="app">
    <AppHeader />
    <CommonDivider />
    <AppNav />
    <CommonDivider />
    <div class="page">
      <NuxtPage />
    </div>
    <CommonDivider />
    <AppNav />
    <CommonDivider />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import hotkeys from 'hotkeys-js'

const route = useRoute()
const store = useCommonStore()
const { start: startLoading, finish: finishLoading } = useLoadingIndicator({
  throttle: 0,
})

// headとmeta情報を設定
useHead({
  htmlAttrs: {
    lang: 'ja',
  },
  link: [
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'favicon', href: '/favicon.ico' },
    {
      rel: 'canonical',
      href: route.path === '/' ? siteInfo.url : `${siteInfo.url}/${route.path}`,
    },
  ],
})
useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${siteInfo.title}` : `${siteInfo.title}`
  },
  description: siteInfo.description,
  ogSiteName: siteInfo.title,
  ogUrl: route.path === '/' ? siteInfo.url : `${siteInfo.url}/${route.path}`,
  ogImage: siteInfo.url + '/ogp.png',
  ogType: 'website',
  ogLocale: 'ja_JP',
  twitterCard: 'summary',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', content: '#fff' },
    { media: '(prefers-color-scheme: dark)', content: '#1a1a1a' },
  ],
  robots: 'index,follow,noarchive',
})

// store.loadingを監視
// LoadingIndicatorを開始/終了する
watch(
  () => store.loading,
  loading => loading ? startLoading() : finishLoading(),
)

// キーボードショートカットの設定
onMounted(() => {
  // H: ホッテントリに切り替え
  hotkeys('h', (event) => {
    event.preventDefault()
    navigateTo(store.currentCategory ? `/hotentry/${store.currentCategory}` : '/hotentry')
  })

  // N: 新着エントリに切り替え
  hotkeys('n', (event) => {
    event.preventDefault()
    navigateTo(store.currentCategory ? `/entrylist/${store.currentCategory}` : '/entrylist')
  })

  // ←: 一つ前のカテゴリに遷移
  hotkeys('left', (event) => {
    event.preventDefault()
    store.moveAdjacentCategory('previous')
  })

  // →: 一つ後のカテゴリに遷移
  hotkeys('right', (event) => {
    event.preventDefault()
    store.moveAdjacentCategory('next')
  })
})
onUnmounted(() => {
  hotkeys.unbind('h')
  hotkeys.unbind('n')
  hotkeys.unbind('left')
  hotkeys.unbind('right')
})
</script>

<style scoped>
.app {
  background-color: var(--color-bg-content);
  max-width: var(--content-width);
  min-height: 100svh;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
}

.page {
  flex: 1;
}
</style>
