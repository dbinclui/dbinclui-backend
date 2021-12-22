import type { Config } from '@jest/types';

const config = async (): Promise<Config.InitialOptions> => ({
  verbose: true,
  preset: 'ts-jest/presets/default',
  name: 'dbinclui',
  rootDir: '.',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,js}',
    '!/node_modules/**',
    '!/coverage/**',
    '!/dist/**',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  modulePaths: [
    '<rootDir>/src/**/*.{spec,test}.{ts,js}',
    '<rootDir>/tests/**/*.{spec,test}.{ts,js}',
  ],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  passWithNoTests: true,
});

export default config;
