import Vue from 'vue'
import Toast from '~/components/Toast.vue'

const ToastComponent = Vue.extend(Toast)
let toast

function destroyToast() {
  toast.$destroy()
  toast.$el.parentNode.removeChild(toast.$el)
  toast = null
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default (context, inject) => {
  inject('toast', {
    show: msg => {
      console.log('show toast')

      // 既にトーストが表示されている場合は前のトーストをdestroyして続行
      if (toast) {
        destroyToast()
      }

      toast = new ToastComponent({
        el: document.createElement('div')
      })
      document.querySelector('.notice').appendChild(toast.$el)
      toast.show(msg)
    },

    hide: async (msg, delay) => {
      // トーストがない場合は処理をキャンセル
      if (!toast) {
        return
      }
      // トーストがある場合は少し処理を待ってから続行
      else {
        await wait(200)
      }

      console.log('hide toast')

      await toast.hide(msg, delay)
      destroyToast()
    }
  })
}
