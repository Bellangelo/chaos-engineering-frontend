import { handleErrors } from '../../src/handlers';

describe('handleErrors', () => {
    it('should inject an error response when enabled', async () => {
        const mockResponse = new Response('OK');
        const mockRequest = new Request('http://localhost/api/test'); // Absolute URL
        const mockConfig = {
            enabled: true,
            rate: 1, // 100% failure rate
            statusCodes: [500],
        };

        const result = await handleErrors(mockResponse, mockRequest, mockConfig);

        expect(result).toBeDefined();
        expect(result.status).toBe(500); // Expect injected error
        const text = await result.text();
        expect(text).toBe('Simulated Error 500');
    });

    it('should not inject an error response when disabled', async () => {
        const mockResponse = new Response('OK');
        const mockRequest = new Request('http://localhost/api/test'); // Absolute URL
        const mockConfig = {
            enabled: false,
            rate: 1,
            statusCodes: [500],
        };

        const result = await handleErrors(mockResponse, mockRequest, mockConfig);

        expect(result).toEqual(mockResponse); // No error injected
    });

    it('should respect the failure rate', async () => {
        const mockResponse = new Response('OK');
        const mockRequest = new Request('http://localhost/api/test'); // Absolute URL
        const mockConfig = {
            enabled: true,
            rate: 0, // 0% failure rate
            statusCodes: [500],
        };

        const result = await handleErrors(mockResponse, mockRequest, mockConfig);

        expect(result).toEqual(mockResponse); // No error injected due to 0% rate
    });
});