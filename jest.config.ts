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
  modulePaths: ['node_modules', '<rootDir>/src/', '<rootDir>/tests/'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  passWithNoTests: true,
  moduleNameMapper: {
    '@controllers/(.*)': ['<rootDir>/src/app/controllers/$1'],
    '@entities/(.*)': ['<rootDir>/src/app/entities/$1'],
    '@middlewares/(.*)': ['<rootDir>/src/app/middlewares/$1'],
    '@models/(.*)': ['<rootDir>/src/app/models/$1'],
    '@repositories/(.*)': ['<rootDir>/src/app/repositories/$1'],
    '@routes/(.*)': ['<rootDir>/src/app/routes/$1'],
    '@utils/(.*)': ['<rootDir>/src/app/utils/$1'],
  },
});

export default config;
