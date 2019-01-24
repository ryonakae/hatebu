<template>
  <div class="toast" :class="{ 'is-visible': isVisible }">
    <span>{{ message }}</span>
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
.toast {
  display: none;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 24px;
  font-size: var(--fontSize-small);
  color: var(--color-key);
  background-color: var(--color-bg);
  border-radius: calc(24px / 2);

  &.is-visible {
    display: flex;
  }
}
</style>
