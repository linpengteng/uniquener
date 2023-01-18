/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: '/test/.*\\.(test|spec)\\.(ts)$',
  moduleFileExtensions: ['js', 'ts'],
  coverageThreshold: {
    global: {
      lines: 80,
      branches: 65,
      functions: 75,
      statements: 80
    }
  },
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageDirectory: '.coverage',
  coverageProvider: 'babel',
  collectCoverage: true
}
