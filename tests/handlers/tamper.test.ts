import { handleTamper } from '../../src/handlers';

describe('handleTamper', () => {
    it('should modify the response when enabled', async () => {
        const mockResponse = new Response('Original Response');
        const mockConfig = {
            enabled: true,
            modifyResponse: (response: Response) => new Response('Tampered Response'),
        };

        const result = handleTamper(mockResponse, mockConfig);

        expect(await result.text()).toBe('Tampered Response');
    });

    it('should not modify the response when disabled', async () => {
        const mockResponse = new Response('Original Response');
        const mockConfig = {
            enabled: false,
            modifyResponse: (response: Response) => new Response('Tampered Response'),
        };

        const result = handleTamper(mockResponse, mockConfig);

        expect(await result.text()).toBe('Original Response');
    });
});