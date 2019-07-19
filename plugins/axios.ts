/* eslint-disable import/no-mutable-exports */
import { Context, ErrorParams } from '@nuxt/vue-app'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios!: NuxtAxiosInstance
let $redirect!: any

export default (ctx: Context): void => {
  $axios = ctx.$axios
  $redirect = ctx.redirect
}

export { $axios, $redirect }
