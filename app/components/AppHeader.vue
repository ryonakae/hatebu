<template>
  <div>
    <header class="header">
      <h1 class="title">
        <NuxtLink
          to="/"
          class="is-noborder"
        >俺のはてブ</NuxtLink>
      </h1>
    </header>
    <CommonDivider />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
  padding-bottom: 16px;
}

.title {
  font-size: var(--fontsize);
}
</style>
