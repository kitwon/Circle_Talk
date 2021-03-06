module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    'jest/globals':  true
  },
  globals: {
    'graphql': true
  },
  plugins: ['jest'],
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  // required to lint *.vue files
  rules: {
    // allow debugger during development
    'import/no-unresolved': 0,
    'react/no-danger': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', 'ts', 'tsx'] }],
    'import/extensions': [1, { extensions: ['.ts', '.tsx', '.js', '.jsx' ] }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-extraneous-dependencies': 'off'
  },
  parser: '@typescript-eslint/parser'
}
