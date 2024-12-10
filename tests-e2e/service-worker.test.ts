import { test, expect } from '@playwright/test';

test.describe('Service Worker API Integration', () => {
    test('should register the service worker and configure chaos', async ({ page }) => {
        await page.goto('/');

        await page.evaluate(async () => {
            const config = {
                enabled: true,
                latency: { enabled: false },
                errors: { enabled: false },
                tamper: { enabled: false },
                offline: { enabled: false, rate: 0 },
            };
            await ChaosEngineeringFrontend.configureChaos(config);
        });
        console.log('Chaos configuration sent.');
    });

    test('should modify fetch responses based on chaos config', async ({ page }) => {
        await page.goto('/');

        await page.evaluate(async () => {

            const config = { enabled: true, latency: { enabled: true, min: 1000, max: 2000 } };
            await ChaosEngineeringFrontend.updateChaosConfig(config);
        });

        // TODO: Fix hack. Wait for service worker to update its configuration.
        await page.waitForTimeout(1000);

        const start = performance.now();
        await page.goto('/');
        const responseTime = performance.now() - start;

        expect(responseTime).toBeGreaterThan(1000);
        expect(responseTime).toBeLessThan(4000);
    });

    test('should simulate offline mode', async ({ page }) => {
        await page.goto('/');

        await page.evaluate(async () => {
            const config = { enabled: true, offline: { enabled: true, rate: 1 } };
            await ChaosEngineeringFrontend.updateChaosConfig(config);
        });

        // TODO: Fix hack. Wait for service worker to update its configuration.
        await page.waitForTimeout(1000);
        const request = await page.goto('/');
        const response = await request.body();

        expect(response.toString()).toContain('Offline mode simulated');
    });
});