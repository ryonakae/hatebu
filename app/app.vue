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
