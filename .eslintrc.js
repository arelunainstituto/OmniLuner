module.exports = {
  root: true,
  extends: ['@areluna/eslint-config'],
  settings: {
    next: {
      rootDir: ['PROJETOS-TECNOLOGICOS/*/'],
    },
  },
  rules: {
    // Regras específicas do monorepo
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'dist/',
    'build/',
    '.turbo/',
    'ARQUIVO/',
  ],
};