<template>
  <div class="toastArea" :class="{ 'is-visible': isVisible }">
    <div class="toast">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isVisible: false
    }
  },

  computed: {
    isToastShow() {
      return this.$store.state.isToastShow
    }
  },

  watch: {
    isToastShow(isToastShow) {
      if (isToastShow) {
        console.log('toast show')
        this.show('読み込み中…')
      } else {
        console.log('toast hide')
        this.hide('読み込み完了', 500)
      }
    }
  },

  methods: {
    show(msg) {
      this.message = msg
      this.isVisible = true
    },

    async hide(msg, delay) {
      return new Promise(resolve => {
        this.message = msg
        setTimeout(() => {
          this.isVisible = false
          resolve()
        }, delay)
      })
    }
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
