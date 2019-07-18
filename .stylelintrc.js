module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-value-no-unknown-custom-properties', 'stylelint-use-nesting'],
  rules: {
    'declaration-colon-newline-after': 'always-multi-line',
    'value-list-comma-newline-after': 'always-multi-line',
    'csstools/value-no-unknown-custom-properties': [
      true,
      { importFrom: ['assets/styles/custom-properties.css'] }
    ],
    'csstools/use-nesting': 'always'
  }
}
