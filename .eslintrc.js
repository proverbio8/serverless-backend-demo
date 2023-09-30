module.exports = {
  env: {
    es2021: true,// Because of async/await
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],  //Forces Unix line break style
    semi: ['error', 'always'], //Requires semicolons at the end of statements
  },
};
