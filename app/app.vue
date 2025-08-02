<template>
  <div class="app">
    <AppHeader />
    <AppNav :is-top="true" />
    <div class="content">
      <NuxtPage />
    </div>
    <AppNav :is-bottom="true" />
    <AppFooter />
  </div>
</template>

<script>
import '~/assets/styles/main.css'
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
