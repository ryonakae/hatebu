<template>
  <div class="error">
    <div class="content">
      <h1 class="title">エラーが発生しました</h1>
      <a href="/" class="link">俺のはてブ トップへ</a>
    </div>

    <div class="detail">
      <small>{{ error.statusCode }}</small>
      <small>{{ error.message }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { NuxtError } from '@nuxt/types/app'
import { common } from '~/store/modules/common'

@Component
export default class extends Vue {
  static layout = 'errorLayout'

  // props
  @Prop({ type: Object, required: true })
  readonly error!: NuxtError

  // lifecycle
  async mounted(): Promise<void> {
    await this.$nextTick()
    console.error(this.error)
  }
}
</script>

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
