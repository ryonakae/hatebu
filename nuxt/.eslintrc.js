module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/vue'
  ],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'warn',
    'vue/html-self-closing': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: ['nuxt', 'nuxt-link', 'transition', 'youtube']
      }
    ]
  }
}
