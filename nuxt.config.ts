// https://nuxt.com/docs/api/configuration/nuxt-config

const isProduction = process.env.NODE_ENV === 'production'

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
        'Cache-Control': 'public, max-age=600, s-maxage=600',
      },
    },
    '/hotentry/**': {
      isr: 600,
    },
    '/entrylist/**': {
      isr: 600,
    },
    '/': { // /hotentry/all と同じ
      isr: 600,
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
