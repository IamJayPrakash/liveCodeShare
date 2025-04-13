const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>/'],
};

module.exports = createJestConfig(customJestConfig);
