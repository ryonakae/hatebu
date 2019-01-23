<template>
  <div class="toast" :class="{ 'is-visible': isVisible }">
    <span class="toast-text">{{ msg }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      isVisible: false
    }
  },

  methods: {
    async show(msg) {
      this.msg = msg
      this.isVisible = true
    },

    async hide(msg, delay) {
      return new Promise(resolve => {
        this.msg = msg
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
}
</style>
