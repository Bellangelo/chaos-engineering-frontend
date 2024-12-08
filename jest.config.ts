import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
};

export default config;