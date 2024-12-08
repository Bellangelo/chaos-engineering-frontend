import { TamperInjectionConfig } from '../types/config/tamper-config';

export const handleTamper = (
    response: Response,
    config?: TamperInjectionConfig
): Response => {
    if (!config?.enabled || !config.modifyResponse) {
        return response; // No tampering
    }

    return config.modifyResponse(response);
};