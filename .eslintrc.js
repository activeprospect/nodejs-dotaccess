module.exports = {
  env: {
    es2023: true,
    node: true,
    mocha: true
  },
  extends: ['semistandard', 'eslint:recommended'],
  rules: {
    complexity: ['error', 13] // eventually get down to 10 or less
  }
};
