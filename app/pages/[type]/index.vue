<template>
  <TopContent />
</template>

<script setup lang="ts">
const route = useRoute()

// meta
useSeoMeta({
  title: route.params.type === 'hotentry' ? 'すべての人気エントリー' : 'すべての新着エントリー',
})
</script>
