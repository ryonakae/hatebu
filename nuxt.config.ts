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
  compatibilityDate: '2025-07-15',
  nitro: {
    minify: isProduction,
    sourceMap: !isProduction,
    routeRules: {
      '/': { redirect: { to: '/hotentry/all', statusCode: 301 } },
      '/api/**': {
        proxy: 'https://b.hatena.ne.jp/**',
        cors: true,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
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
