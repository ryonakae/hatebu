<template>
  <div class="toastArea" :class="{ 'is-visible': isVisible }">
    <div class="toast">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { common } from '~/store/modules/common'

@Component
export default class extends Vue {
  message = ''
  isVisible = false

  get isToastShow() {
    return common.isToastShow
  }

  @Watch('isToastShow')
  onIsToastShowChange(isToastShow: boolean): void {
    if (isToastShow) {
      console.log('toast show')
      this.show('読み込み中…')
    } else {
      console.log('toast hide')
      this.hide('読み込み完了', 500)
    }
  }

  show(msg: string): void {
    this.message = msg
    this.isVisible = true
  }

  hide(msg: string, delay: number): Promise<void> {
    return new Promise(resolve => {
      this.message = msg
      setTimeout(() => {
        this.isVisible = false
        resolve()
      }, delay)
    })
  }
}
</script>

<style scoped>
.toastArea {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: none;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: var(--padding-notice);
  pointer-events: none;

  &.is-visible {
    display: flex;
  }
}

.toast {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 25px;
  font-size: var(--fontSize-small);
  color: var(--color-key);
  background-color: var(--color-bg);
  border-radius: calc(25px / 2);
}
</style>
