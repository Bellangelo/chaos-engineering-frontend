import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests-e2e',
    use: {
        baseURL: 'http://localhost:3001',
        trace: 'on-first-retry',
        serviceWorkers: "allow"
    },
    webServer: {
        env: {
            PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS: '1',
        },
        command: 'npm run start:test-server',
        port: 3001,
        timeout: 30 * 1000,
        reuseExistingServer: !process.env.CI,
    }
});