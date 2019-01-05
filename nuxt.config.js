const IS_DEV = process.env.NODE_ENV === 'development'

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
  router: {
    base: IS_DEV ? '/' : '/hatebu/'
  },
  build: {
    publicPath: 'http://dev.ryonakae.com/hatebu/',
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
  }
}
