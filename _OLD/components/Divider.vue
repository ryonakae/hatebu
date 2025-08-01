<template>
  <div class="divider" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'Divider'
})
export default class extends Vue {}
</script>

<style scoped>
.divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-border);
}
</style>
