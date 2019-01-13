<template>
  <header class="header">
    <h1 class="title"><nuxt-link to="/" class="is-noborder">俺のはてブ</nuxt-link></h1>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
}

.title {
  font-size: var(--fontSize-title);
}
</style>
