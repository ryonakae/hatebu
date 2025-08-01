// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  modules: ['@pinia/nuxt'],
  nitro: {
    routeRules: {
      '/api/**': {
        proxy: 'https://b.hatena.ne.jp/**',
        cors: true,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
  },
})
