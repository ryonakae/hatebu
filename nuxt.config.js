const siteInfo = {
  title: '俺のはてブ',
  url: 'https://hatebu.brdr.jp',
  description: '俺のためのはてブ'
}

const config = {
  loading: false,
  mode: 'universal',
  css: ['~/assets/styles/main.css', 'swiper/dist/css/swiper.css'],
  env: {
    GTM_ID: process.env.GTM_ID
  },
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    title: siteInfo.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0' },
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
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  },
  plugins: [
    { src: '~/plugins/axios', mode: 'all' },
    { src: '~/plugins/vueAwesomeSwiper', mode: 'client' },
    { src: '~/plugins/keyCodes', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/dotenv',
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
    baseURL: 'https://b.hatena.ne.jp',
    browserBaseURL: '/api',
    proxy: true,
    credentials: true,
    withCredentials: true
  },
  proxy: {
    '/api': {
      target: 'https://b.hatena.ne.jp',
      pathRewrite: {
        '^/api': '/'
      },
      changeOrigin: true,
      logLevel: 'debug'
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
        importFrom: ['./assets/styles/custom-properties.css', './assets/styles/custom-media.css']
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
  }
}

export default config
