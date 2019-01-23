import Vue from 'vue'
import Toast from '~/components/Toast.vue'

const ToastComponent = Vue.extend(Toast)
let toast

export default (context, inject) => {
  inject('toast', {
    show: async msg => {
      toast = new ToastComponent({
        el: document.createElement('div')
      })
      document.querySelector('.app').appendChild(toast.$el)
      toast.show('aaaaaaaaaa')
    },

    hide: async msg => {
      await toast.hide('bbbbb', 1000)
      toast.$destroy()
      toast.$el.parentNode.removeChild(toast.$el)
    }
  })
}
