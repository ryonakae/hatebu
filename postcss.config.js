module.exports = ({ env }) => ({
  plugins: {
    'postcss-import': {
      path: 'assets/css'
    },
    'postcss-preset-env': {
      stage: 2,
      features: {
        'custom-media-queries': true,
        'nesting-rules': true
      },
      autoprefixer: { grid: true },
      importFrom: ['assets/styles/custom-properties.css', 'assets/styles/custom-media.css']
    },
    cssnano:
      env === 'production'
        ? {
            preset: 'default',
            autoprefixer: false,
            zindex: false,
            discardUnused: {
              fontFace: false
            }
          }
        : false
  }
})
