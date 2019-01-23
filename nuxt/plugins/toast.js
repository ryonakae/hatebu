import Vue from 'vue'
import Toast from '~/components/Toast.vue'

export default (context, inject) => {
  inject('toast', {
    show: async msg => {
      console.log(msg)
    },
    hide: async msg => {
      console.log(msg)
    }
  })
}
