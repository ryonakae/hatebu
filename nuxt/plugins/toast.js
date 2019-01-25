import Vue from 'vue'
import Toast from '~/components/Toast.vue'

const ToastComponent = Vue.extend(Toast)
let toast

function destroyToast() {
  toast.$destroy()
  toast.$el.parentNode.removeChild(toast.$el)
  toast = null
}

export default (context, inject) => {
  inject('toast', {
    show: msg => {
      if (toast) destroyToast()

      toast = new ToastComponent({
        el: document.createElement('div')
      })
      document.querySelector('.notice').appendChild(toast.$el)
      toast.show(msg)
    },

    hide: async (msg, delay) => {
      if (!toast) return

      await toast.hide(msg, delay)
      destroyToast()
    }
  })
}
