import { NuxtConfig } from '@nuxt/types'

const siteInfo = {
  title: '俺のはてブ',
  url: 'https://hatebu.brdr.jp',
  description: '俺のためのはてブ'
}

const config: NuxtConfig = {
  loading: false,
  ssr: false,
  css: ['~/assets/styles/main.css', 'swiper/dist/css/swiper.css'],
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    title: siteInfo.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: siteInfo.description
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: siteInfo.title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: siteInfo.description
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: siteInfo.url
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: siteInfo.url + '/ogp.png'
      },
      {
        property: 'og:site_name',
        content: siteInfo.title
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:locale',
        content: 'ja_JP'
      },
      {
        name: 'twitter:card',
        content: 'summary'
      }
    ],
    link: [
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'favicon', href: '/favicon.ico' }
    ]
  },
  router: {
    mode: 'hash'
  },
  plugins: [
    '~/plugins/axios',
    '~/plugins/vueAwesomeSwiper',
    '~/plugins/keyCodes'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    [
      '@nuxtjs/google-tag-manager',
      {
        id: process.env.GTM_ID,
        pageTracking: true
      }
    ]
  ],
  axios: {
    proxy: true,
    prefix: process.env.API_URL
  },
  proxy: {
    '/api': {
      target: 'https://b.hatena.ne.jp',
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },
  build: {
    postcss: {
      plugins: {
        cssnano: {
          preset: 'default',
          autoprefixer: false,
          zindex: false,
          discardUnused: {
            fontFace: false
          }
        }
      },
      preset: {
        stage: 2,
        features: {
          'custom-media-queries': true,
          'nesting-rules': true
        },
        importFrom: [
          './assets/styles/custom-properties.css',
          './assets/styles/custom-media.css'
        ]
      }
    },
    terser: {
      parallel: true,
      sourceMap: false,
      terserOptions: {
        warnings: false,
        compress: {
          drop_console: true
        },
        output: {
          comments: /@license/i
        }
      }
    }
  },
  buildModules: ['@nuxt/typescript-build']
}

export default config
