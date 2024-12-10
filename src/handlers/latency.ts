import { LatencyInjectionConfig } from '../types/config';

export const handleLatency = async (
    response: Response,
    config?: LatencyInjectionConfig
): Promise<Response> => {
    if (!config?.enabled) return response;

    const delay = Math.random() * (config.max - config.min) + config.min;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return response;
};