<template>
  <div class="toast" :class="{ 'is-visible': isVisible }">
    <span class="toast-text">{{ message }}</span>
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
    async show(msg) {
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
  position: fixed;
  right: 0;
  bottom: 20px;
  left: 0;
  display: none;

  &.is-visible {
    display: block;
  }
}
</style>
