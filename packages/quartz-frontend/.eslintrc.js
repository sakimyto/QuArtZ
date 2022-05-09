module.exports = {
  plugins: ['unused-imports', 'import'],
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
