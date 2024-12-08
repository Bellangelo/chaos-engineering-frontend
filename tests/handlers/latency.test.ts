import { handleLatency } from '../../src/handlers';

describe('handleLatency', () => {
    it('should add a delay before returning the response', async () => {
        const mockResponse = new Response('OK');
        const mockConfig = { enabled: true, min: 100, max: 200 };

        const start = Date.now();
        const result = await handleLatency(mockResponse, mockConfig);
        const end = Date.now();

        expect(result).toEqual(mockResponse); // Response should be unchanged
        expect(end - start).toBeGreaterThanOrEqual(100); // Delay >= min
        expect(end - start).toBeLessThanOrEqual(200); // Delay <= max
    });

    it('should return the response immediately if latency is disabled', async () => {
        const mockResponse = new Response('OK');
        const mockConfig = { enabled: false, min: 100, max: 200 };

        const start = Date.now();
        const result = await handleLatency(mockResponse, mockConfig);
        const end = Date.now();

        expect(result).toEqual(mockResponse);
        expect(end - start).toBeLessThan(100); // No artificial delay
    });
});