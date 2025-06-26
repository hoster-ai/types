const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
];
