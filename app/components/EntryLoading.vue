<template>
  <div class="loading">
    <span>読み込み中…</span>
  </div>
</template>

<style scoped>
.loading {
  min-height: calc(100svh - var(--header-height) - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & span {
    font-size: var(--fontsize-nav);
    color: var(--color-sub);
  }
}
</style>
