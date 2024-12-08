import { ChaosConfig } from '../types/config/config';

export const defaultConfig: ChaosConfig = {
    enabled: false,
    latency: {
        enabled: false,
        min: 100, // Minimum delay in milliseconds
        max: 500, // Maximum delay in milliseconds
    },
    errors: {
        enabled: false,
        rate: 0.1, // 10% of requests fail
        statusCodes: [500], // Default to internal server error
    },
    tamper: {
        enabled: false,
        modifyResponse: (response) => response, // No tampering by default
    },
    offline: {
        enabled: false,
        rate: 0.0, // 0% of requests blocked by default
    },
};