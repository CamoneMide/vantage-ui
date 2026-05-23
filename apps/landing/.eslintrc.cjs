module.exports = {
  root: true,
  extends: ['../../.eslintrc.cjs'],
  parserOptions: {
    project: '../../tsconfig.base.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/extensions': 'off',
    'object-curly-newline': 'off',
    'consistent-return': 'off',
  },
  overrides: [
    {
      files: ['src/app/page.tsx'],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
  ],
};
