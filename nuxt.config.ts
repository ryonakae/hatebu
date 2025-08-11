// https://nuxt.com/docs/api/configuration/nuxt-config

const isProduction = process.env.NODE_ENV === 'production'

const cacheSeconds = 600
const cacheSetting = `public, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds}`

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/eslint', 'nuxt-swiper'],
  ssr: true,
  devtools: { enabled: true },
  css: [
    'ress',
    '~/assets/styles/custom-properties.css',
    '~/assets/styles/main.css',
  ],
  routeRules: {
    '/api/**': {
      proxy: 'https://b.hatena.ne.jp/**',
      cors: true,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Cache-Control': cacheSetting,
      },
    },
    '/': { // /hotentry と同じ
      isr: cacheSeconds,
      headers: {
        'Cache-Control': cacheSetting,
      },
    },
    '/hotentry': {
      isr: cacheSeconds,
      headers: {
        'Cache-Control': cacheSetting,
      },
    },
    '/hotentry/**': {
      isr: cacheSeconds,
      headers: {
        'Cache-Control': cacheSetting,
      },
    },
    '/entrylist': {
      isr: cacheSeconds,
      headers: {
        'Cache-Control': cacheSetting,
      },
    },
    '/entrylist/**': {
      isr: cacheSeconds,
      headers: {
        'Cache-Control': cacheSetting,
      },
    },
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    minify: isProduction,
    sourceMap: !isProduction,
  },
  vite: {
    build: {
      minify: isProduction ? 'terser' : false,
      terserOptions: {
        sourceMap: !isProduction,
        compress: {
          drop_console: true,
        },
        format: {
          comments: /@license/i,
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: [
          './app/assets/styles/custom-media.css',
        ],
      },
      'postcss-preset-env': {
        stage: 2,
        features: {
          'custom-media-queries': true,
          'nesting-rules': true,
        },
      },
      'cssnano': isProduction
        ? { preset: 'default' }
        : undefined,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
