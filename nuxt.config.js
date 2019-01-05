module.exports = {
  loading: false,
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article'
      },
      {
        property: 'og:locale',
        content: 'ja_JP'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&amp;subset=japanese'
      }
    ]
  },
  plugins: [],
  modules: ['@nuxtjs/axios'],
  // axios: {
  //   baseURL: 'http"//nuxt:3000/api',
  //   browserBaseURL: 'http://localhost:' + process.env.VIRTUAL_PORT + '/api'
  // },
  serverMiddleware: ['~/api'],
  build: {
    extend: ({ module, output }) => {
      // svgはurl-loaderではなくvue-svg-loaderを使う
      const imageRule = module.rules.find(rule => {
        if (rule.use !== void 0) {
          return rule.use[0].loader === 'url-loader'
        }
      })

      imageRule.test = /\.(png|jpe?g|gif|webp)$/

      module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      })
    },
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
