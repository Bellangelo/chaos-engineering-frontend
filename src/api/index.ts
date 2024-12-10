import { ChaosConfig } from '../types/config';
import { defaultConfig } from './defaults';

let currentConfig: ChaosConfig = { ...defaultConfig };

/**
 * Registers the service worker and initializes chaos.
 * @param workerUrl - URL of the service worker file.
 */
export const registerChaosWorker = async (workerUrl: string): Promise<void> => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(workerUrl, { scope: '/' });
            console.log('Chaos worker registered:', registration);

            // Send initial configuration
            configureChaos(currentConfig);
        } catch (error) {
            console.error('Failed to register chaos worker:', error);
        }
    } else {
        console.warn('Service workers are not supported in this browser.');
    }
};

/**
 * Sends configuration to the service worker.
 * @param config - Chaos configuration.
 */
export const configureChaos = (config: ChaosConfig): void => {
    currentConfig = { ...currentConfig, ...config };
    navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage({
            type: 'CONFIGURE',
            payload: currentConfig,
        });
    });
};

/**
 * Dynamically updates the current chaos configuration.
 * @param updatedConfig - Partial chaos configuration to merge.
 */
export const updateChaosConfig = (updatedConfig: Partial<ChaosConfig>): void => {
    currentConfig = { ...currentConfig, ...updatedConfig };
    navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage({
            type: 'UPDATE_CONFIG',
            payload: updatedConfig,
        });
    });
};