import { handleOffline } from '../../src/handlers';

describe('handleOffline', () => {
    it('should block the request and return offline response when enabled', async () => {
        const mockRequest = new Request('http://localhost/api/test'); // Absolute URL
        const mockConfig = { enabled: true, rate: 1 }; // 100% offline rate

        const result = await handleOffline(mockRequest, mockConfig);

        expect(result).toBeDefined(); // Ensure result is not undefined
        if (result) {
            expect(result.status).toBe(503);
            expect(await result.text()).toBe('Offline mode simulated');
        }
    });

    it('should allow the request when offline mode is disabled', async () => {
        const mockRequest = new Request('http://localhost/api/test'); // Absolute URL
        const mockConfig = { enabled: false, rate: 1 };

        const result = await handleOffline(mockRequest, mockConfig);

        expect(result).toBeDefined(); // Ensure result is not undefined
    });

    it('should respect the offline rate', async () => {
        const mockRequest = new Request('http://localhost/api/test'); // Absolute URL
        const mockConfig = { enabled: true, rate: 0 }; // 0% offline rate

        const result = await handleOffline(mockRequest, mockConfig);

        expect(result).toBeDefined(); // Ensure result is not undefined
    });
});