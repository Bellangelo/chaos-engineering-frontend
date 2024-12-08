import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests-e2e',
    use: {
        baseURL: 'http://localhost:3000', // Change this to your dev server
        headless: true, // Run tests in headless mode
        trace: 'on-first-retry', // Generate a trace on failure
    },
});