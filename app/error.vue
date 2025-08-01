<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

onMounted(() => {
  console.error(props.error)
})
</script>

<template>
  <div class="error">
    <div class="content">
      <h1 class="title">
        エラーが発生しました
      </h1>
      <NuxtLink
        to="/"
        class="link"
      >俺のはてブ トップへ</NuxtLink>
    </div>

    <div class="detail">
      <small>{{ error.statusCode }}</small>
      <small>{{ error.message }}</small>
    </div>
  </div>
</template>

<style scoped>
.error {
  text-align: center;
}

.content {
  position: fixed;
  top: 50%;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--padding-content-horizontal);
  transform: translateY(-50%);
}

.title {
  font-size: var(--fontsize-title);
}

.link {
  margin-top: 1em;
}

.detail {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--padding-content-horizontal);
  color: var(--color-sub);
}
</style>
