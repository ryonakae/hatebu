// https://nuxt.com/docs/api/configuration/nuxt-config
import { siteInfo } from './shared/utils/siteInfo'
import { categoryKeys } from './shared/utils/categories'

const isProduction = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/eslint', 'nuxt-swiper', '@nuxtjs/sitemap'],
  ssr: true,
  devtools: { enabled: true },
  css: [
    'ress',
    '~/assets/styles/custom-properties.css',
    '~/assets/styles/main.css',
  ],
  site: {
    name: siteInfo.title,
    url: siteInfo.url,
  },
  routeRules: {
    '/api/**': {
      proxy: 'https://b.hatena.ne.jp/**',
      cors: true,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=600',
      },
    },
    '/**': {
      isr: 600,
      headers: {
        'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=600',
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
  sitemap: {
    urls: () => {
      const urls: string[] = [
        '/',
        '/hotentry',
        '/entrylist',
      ]

      // 各カテゴリーのhotentryとentrylistのURLを追加
      categoryKeys.forEach((category) => {
        urls.push(`/hotentry/${category}`)
        urls.push(`/entrylist/${category}`)
      })

      return urls
    },
    xsl: false,
  },
})
