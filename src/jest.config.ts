export default {
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  setupFilesAfterEnv: ['jest-extended'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  globalSetup: './config/global-setup.ts',
  collectCoverage: true,
  collectCoverageFrom: [
    './modules/**/*.{ts,js}',
    '!**/node_modules/**'
  ],
  coverageReporters: ['lcov']
}
