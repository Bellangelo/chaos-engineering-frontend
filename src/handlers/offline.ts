import { OfflineInjectionConfig } from '../types/config/offline-config';

export const handleOffline = async (
    request: Request,
    config?: OfflineInjectionConfig
): Promise<Response | undefined> => {
    if (!config?.enabled || Math.random() > config.rate) {
        return fetch(request); // Request proceeds as usual
    }

    // Simulate offline by returning a failed response
    return new Response('Offline mode simulated', { status: 503 });
};