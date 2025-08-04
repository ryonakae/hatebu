<template>
  <NuxtLoadingIndicator :color="'#2b4fb7'" />
  <div class="app">
    <AppHeader />
    <AppNav />
    <div class="content">
      <NuxtPage />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import hotkeys from 'hotkeys-js'

const store = useCommonStore()
const { start, finish } = useLoadingIndicator({
  throttle: 0,
})
const siteInfo = {
  title: '俺のはてブ',
  description: '俺のためのはてブ',
  url: 'https://hatebu.brdr.jp',
}

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
    store.changeDisplayMode({
      mode: 'hotentry',
      category: store.currentCategory,
    })
  })

  // N: 新着エントリに切り替え
  hotkeys('n', (event) => {
    event.preventDefault()
    store.changeDisplayMode({
      mode: 'entrylist',
      category: store.currentCategory,
    })
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

.content {
  flex: 1;
}
</style>
