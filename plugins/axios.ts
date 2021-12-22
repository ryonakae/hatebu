/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/named */
import { Context } from '@nuxt/types/app'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios!: NuxtAxiosInstance
let $redirect!: any

export default (ctx: Context): void => {
  $axios = ctx.$axios
  $redirect = ctx.redirect
}

export { $axios, $redirect }
