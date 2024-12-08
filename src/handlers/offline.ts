import { OfflineInjectionConfig } from '../types/config/offline-config';

export const handleOffline = async (
    config?: OfflineInjectionConfig
): Promise<Response | undefined> => {
    if (!config?.enabled || Math.random() > config.rate) {
        return undefined;
    }

    // Simulate offline by returning a failed response
    return new Response('Offline mode simulated', { status: 503 });
};