module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Style Guide Enforcement Rules
    
    // Prevent gradient background usage
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/bg-gradient/]',
        message: 'Gradient backgrounds are forbidden. Use solid theme backgrounds (bg-background, bg-card) instead. See docs/STYLE_GUIDE.md'
      },
      {
        selector: 'Literal[value=/backdrop-blur/]',
        message: 'Backdrop blur is forbidden. Use solid card backgrounds (bg-card) instead. See docs/STYLE_GUIDE.md'
      },
      {
        selector: 'TemplateLiteral[quasis.0.value.raw*="bg-gradient"]',
        message: 'Gradient backgrounds are forbidden. Use solid theme backgrounds instead. See docs/STYLE_GUIDE.md'
      },
      {
        selector: 'TemplateLiteral[quasis.0.value.raw*="backdrop-blur"]',
        message: 'Backdrop blur is forbidden. Use solid card backgrounds instead. See docs/STYLE_GUIDE.md'
      }
    ],
    
    // Enforce consistent string quotes
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // React specific rules
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': 'off',
    
    // Accessibility rules
    'jsx-a11y/anchor-is-valid': 'off', // Next.js Link component handles this
  },
  
  // Custom rules for style guide enforcement
  overrides: [
    {
      files: ['app/**/*.tsx', 'pages/**/*.tsx', 'components/**/*.tsx'],
      rules: {
        // Additional page-specific rules can be added here
      }
    }
  ],
  
  settings: {
    react: {
      version: 'detect'
    }
  },
  
  env: {
    browser: true,
    es2021: true,
    node: true
  }
}
