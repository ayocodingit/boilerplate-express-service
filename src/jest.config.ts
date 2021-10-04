import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    bail: 1,
    verbose: true,
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
      './modules/**/*.ts',
      '!./modules/**/handler/*.ts',
      '!./modules/email/**/*.ts',
      '!./modules/oauth/**/*.ts',
      '!**/node_modules/**'
    ],
    coverageReporters: ['lcov'],
    detectOpenHandles: true
  }
}