import { handleLatency, handleErrors, handleTamper, handleOffline } from '../handlers';
import { ChaosConfig } from '../types/config/config';
import { WorkerMessage } from '../types/messages';

let config: ChaosConfig = { enabled: false };

self.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
    const message = event.data;

    switch (message.type) {
        case 'CONFIGURE':
            config = message.payload;
            break;
        case 'UPDATE_CONFIG':
            config = { ...config, ...message.payload }; // Merge updated values
            break;
        default:
            console.warn('Unknown message type:', message.type);
    }
});

self.addEventListener('fetch', (event: FetchEvent) => {
    if (!config.enabled) {
        return; // Chaos is disabled, process normally
    }

    event.respondWith(
        (async () => {
            // Apply offline logic first since it may block the request
            const offlineResponse = await handleOffline(event.request, config.offline);
            if (offlineResponse) return offlineResponse;

            // Fetch the actual response
            let response = await fetch(event.request);

            // Apply other handlers in sequence
            response = await handleLatency(response, config.latency);
            response = await handleErrors(response, event.request, config.errors);
            response = handleTamper(response, config.tamper);

            return response;
        })()
    );
});