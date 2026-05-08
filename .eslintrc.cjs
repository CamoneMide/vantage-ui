module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.base.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb-typescript'
  ],
  rules: {
    'no-console': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.jsx'] }]
  }
};
