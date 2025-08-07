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

const store = useCommonStore()
const { start, finish } = useLoadingIndicator({
  throttle: 0,
})

// headとmeta情報を設定
useHead({
  htmlAttrs: {
    lang: 'ja',
  },
  title: siteInfo.title,
  link: [
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'favicon', href: '/favicon.ico' },
  ],
  meta: [
    { name: 'description', content: siteInfo.description },
    { name: 'color-scheme', content: 'light dark' },
    { name: 'theme-color', content: '#fff', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#1a1a1a', media: '(prefers-color-scheme: dark)' },
  ],
})
useSeoMeta({
  ogTitle: siteInfo.title,
  ogSiteName: siteInfo.title,
  ogDescription: siteInfo.description,
  ogUrl: siteInfo.url,
  ogImage: siteInfo.url + '/ogp.png',
  twitterCard: 'summary',
  ogType: 'website',
  ogLocale: 'ja_JP',
})

// store.loadingを監視
// LoadingIndicatorを開始/終了する
watch(
  () => store.loading,
  loading => loading ? start() : finish(),
)

// キーボードショートカットの設定
onMounted(() => {
  // H: ホッテントリに切り替え
  hotkeys('h', (event) => {
    event.preventDefault()
    navigateTo(`/hotentry/${store.currentCategory}`)
  })

  // N: 新着エントリに切り替え
  hotkeys('n', (event) => {
    event.preventDefault()
    navigateTo(`/entrylist/${store.currentCategory}`)
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
