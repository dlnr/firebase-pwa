module.exports = {
    extends: [
      'eslint:recommended'
    ],
    env: {
      serviceworker: true,
      browser: true,
      node: true,
      es6: true,
    },
    globals: {
      workbox: false,
    },
    parserOptions: {
      ecmaVersion: 2017,
      sourceType: 'module',
    },
    rules: {
      'require-jsdoc': 0,
    },
    overrides: [{
      files: ['**/*.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
    }]
  };