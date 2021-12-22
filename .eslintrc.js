module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier'
  ],
  rules: {
    camelcase: 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase']
      },
      {
        selector: 'variable',
        format: ['camelCase']
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'memberLike',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case']
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      }
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
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
    'vue/component-tags-order': 'error'
  }
}
