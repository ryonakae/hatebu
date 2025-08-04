<template>
  <div class="error">
    <div class="content">
      <h1 class="title">
        エラーが発生しました
      </h1>
      <NuxtLink to="/">俺のはてブ トップへ</NuxtLink>
    </div>

    <div class="detail">
      <small>{{ error.statusCode }}</small>
      <small>{{ error.statusMessage }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

onMounted(() => {
  console.error(props.error)
})
</script>

<style scoped>
.error {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding: var(--padding-content-horizontal);
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1em;
}

.title {
  font-size: var(--fontsize-title);
}

.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: var(--color-sub);
}
</style>
