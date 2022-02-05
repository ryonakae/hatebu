/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/named */
import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios!: NuxtAxiosInstance
let $redirect!: any

export default (ctx: Context): void => {
  $axios = ctx.$axios
  $redirect = ctx.redirect

  $axios.onRequest(() => {
    console.log('axios onRequest')
    if (process.client) {
      window.$nuxt.$loading.start()
    }
  })
  $axios.onResponse(() => {
    console.log('axios onResponse')
    if (process.client) {
      window.$nuxt.$loading.finish()
    }
  })
}

export { $axios, $redirect }
