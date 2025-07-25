module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Suppress specific warnings
    'no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/img-redundant-alt': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn'
  }
} 