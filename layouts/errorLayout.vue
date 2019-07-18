<template>
  <nuxt />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  async mounted(): Promise<void> {
    await this.$nextTick()
    console.log('error layout mounted')
  }
}
</script>
