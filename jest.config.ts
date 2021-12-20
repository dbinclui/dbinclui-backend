import type { Config } from '@jest/types';

export const config = async (): Promise<Config.InitialOptions> => ({
  verbose: true,
  preset: 'ts-jest/presets/default',
  name: 'dbinclui',
  rootDir: '.',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}', '!/node_modules/**', '!/coverage/**'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  modulePaths: [
    '<rootDir>/src/**/*.{spec,test}.{ts,js}',
    '<rootDir>/tests/**/*.{spec,test}.{ts,js}',
  ],
  passWithNoTests: true,
});

export default config;
