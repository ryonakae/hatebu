module.exports = {
  mode: 'spa',
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
        content: 'website'
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
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  axios: {
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
      logLevel: 'debug',
      onError: (err, req, res) => {
        console.log('Something went wrong with the proxy middleware.', err)
        res.end()
      }
    }
  },
  // serverMiddleware: ['~/api'],
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
