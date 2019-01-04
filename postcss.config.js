module.exports = {
  plugins: {
    'postcss-import': {
      path: 'assets/styles'
    },
    'postcss-preset-env': {
      stage: 2,
      features: {
        'custom-media-queries': true,
        'nesting-rules': true
      }
    }
  }
}
