module.exports = {
  extends: [
    'stylelint-config-html/vue',
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recess-order'
  ],
  plugins: [
    'stylelint-value-no-unknown-custom-properties',
    'stylelint-use-nesting'
  ],
  rules: {
    'csstools/value-no-unknown-custom-properties': [
      true,
      { importFrom: ['assets/styles/custom-properties.css'] }
    ],
    'csstools/use-nesting': 'always',
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number'
  }
}
