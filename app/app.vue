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
const store = useCommonStore()
const { start, finish } = useLoadingIndicator()

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
</script>

<style scoped>
.app {
  max-width: var(--content-width);
  min-height: 100svh;
  margin-right: auto;
  margin-left: auto;
  background-color: var(--color-bg-content);
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}
</style>
