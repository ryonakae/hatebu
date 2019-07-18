/* eslint-disable import/no-mutable-exports */
import { Context } from '@nuxt/vue-app'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios!: NuxtAxiosInstance

export default (ctx: Context): void => {
  $axios = ctx.$axios
}

export { $axios }
