module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    ecmaVersion: 2019
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/@typescript-eslint',
    'prettier/vue'
  ],
  rules: {
    camelcase: 'warn',
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/camelcase': 'warn',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'warn',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always'
        }
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: ['nuxt', 'nuxt-link', 'n-link', 'transition', 'no-ssr']
      }
    ],
    'unicorn/number-literal-case': 'off'
  }
}
