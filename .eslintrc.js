const { join } = require('path')

// Base rules
const baseConfig = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // This rule is not compatible with Next.js's <Link /> components
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['error', 'warn'],
      },
    ],
    'spaced-comment': ['error', 'always'],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'react/no-array-index-key': 'error',
    'react/jsx-uses-react': 'off',
    'react/jsx-sort-props': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-fragments': ['error', 'syntax'],
    'react-hooks/exhaustive-deps': 'error',
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: [
          { char: '>', alternatives: ['&gt;'] },
          { char: '}', alternatives: ['&#125;'] },
        ],
      },
    ],
    'newline-before-return': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'import/named': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'import/no-absolute-path': ['error'],
    'no-restricted-imports': ['error'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    '@next/next/no-css-tags': 'off',
  },
  ignorePatterns: ['public/**', 'src/bc-craft-assets/**'],
}

// Typescript rules
const tsConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: join(__dirname, 'tsconfig.json'),
  },
  plugins: ['@typescript-eslint', 'typescript-sort-keys'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:typescript-sort-keys/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'never',
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturningArgument: false },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'default', format: ['camelCase', 'PascalCase'] },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'variable',
        types: ['boolean', 'string', 'number', 'array'],
        format: ['camelCase', 'UPPER_CASE'],
      },
      { selector: 'property', format: ['camelCase', 'PascalCase'] },
      { selector: 'parameterProperty', format: ['camelCase', 'PascalCase'] },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
      { selector: 'parameter', format: ['camelCase', 'PascalCase'] },
      {
        selector: 'parameter',
        modifiers: ['unused'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
    ],
  },
}

const jest = {
  files: ['**/*spec.*', 'setupTests.js'],
  env: {
    jest: true,
  },
}
// Configuration files rules, (eg: .prettierrc.js, .eslintrc.js, etc)
const configFiles = {
  files: '*.js',
  env: {
    es6: true,
    node: true,
  },
}
module.exports = {
  ...baseConfig,
  overrides: [tsConfig, configFiles, jest],
}
