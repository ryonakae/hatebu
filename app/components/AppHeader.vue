<template>
  <header class="header">
    <h1 class="title">
      <NuxtLink
        to="/"
        class="is-noborder"
      >俺のはてブ</NuxtLink>
    </h1>
  </header>
</template>

<style scoped>
.header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: var(--fontsize);
}
</style>
