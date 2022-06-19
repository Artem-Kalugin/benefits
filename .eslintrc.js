module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import-helpers', 'unused-imports'],
  rules: {
    'no-unused-vars': 'off',
    'no-duplicate-imports': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^(react|react-native|react-redux)$/',
          '/^@/',
          '/^react/',
          ['parent', 'sibling', 'index'],
          '/^#contexts/',
          '/^#components/',
          '/^#screens/',
          '/^#navigation/',
          '/^#api/',
          '/^#config/',
          '/^#utils/',
          '/^#styles/',
          '/^#assets/',
          '/^#store/',
          'absolute',
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.js'],
      // rules: {
      //   'react-hooks/exhaustive-deps': 'off',
      // },
    },
  ],
};
