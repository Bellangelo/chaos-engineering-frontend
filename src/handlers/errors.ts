import { ErrorInjectionConfig } from '../types/config/errors-config';

export const handleErrors = async (
    response: Response,
    request: Request,
    config?: ErrorInjectionConfig
): Promise<Response> => {
    if (!config?.enabled || Math.random() > config.rate) {
        return response; // No error injected
    }

    const statusCode = config.statusCodes[Math.floor(Math.random() * config.statusCodes.length)];

    // If using a pattern strategy, implement interval logic
    if (config.strategy === 'pattern' && config.pattern) {
        const now = Date.now();
        const shouldFail =
            now % config.pattern.interval < config.pattern.duration; // Fail during the pattern duration
        if (!shouldFail) return response;
    }

    // Create a simulated error response
    return new Response(`Simulated Error ${statusCode}`, { status: statusCode });
};