module.exports = {
  root: true,
  env: {
    browser: true, // Browser environment
    es2020: true,  // ECMAScript 2020 features
    node: true     // Node.js environment
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript features
    sourceType: 'module'   // Allows using import/export statements
  },
  settings: {
    react: {
      version: '18.2' // Specify the React version
    }
  },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
