const siteInfo = {
  title: '俺のはてブ',
  url: 'https://hatebu.brdr.jp',
  description: '俺のためのはてブ'
}

module.exports = {
  loading: false,
  css: ['~/assets/styles/main.css'],
  env: {
    siteTitle: '俺のはてブ',
    siteUrl: 'https://hatebu.brdr.jp',
    siteDescription: ''
  },
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    title: siteInfo.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
    scrollBehavior() {
      return { x: 0, y: 0 }
    }
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  axios: {
    baseURL: 'http://b.hatena.ne.jp',
    browserBaseURL: '/api',
    proxy: true,
    credentials: true,
    withCredentials: true
  },
  proxy: {
    '/api': {
      target: 'http://b.hatena.ne.jp',
      pathRewrite: {
        '^/api': '/'
      },
      changeOrigin: true,
      logLevel: 'debug'
    }
  },
  build: {
    terser: {
      parallel: true,
      sourceMap: false,
      terserOptions: {
        warnings: false,
        compress: {
          drop_console: true
        }
      }
    }
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
