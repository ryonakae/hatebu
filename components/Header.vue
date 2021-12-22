<template>
  <div>
    <header class="header">
      <h1 class="title"><a href="/" class="is-noborder">俺のはてブ</a></h1>
    </header>
    <Divider />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Divider from '~/components/Divider.vue'

@Component({
  name: 'Header',
  components: {
    Divider
  }
})
export default class extends Vue {}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
}

.title {
  font-size: var(--fontsize);
}
</style>
