import { handleLatency, handleErrors, handleTamper, handleOffline } from '../handlers';
import { ChaosConfig } from '../types/config';
import { WorkerMessage } from '../types/messages';

declare const self: ServiceWorkerGlobalScope;

let config: ChaosConfig = { enabled: false };

self.addEventListener('message', (event: ExtendableMessageEvent) => {
    const message = event.data as WorkerMessage;

    switch (message.type) {
        case 'CONFIGURE':
            config = message.payload;
            break;

        case 'UPDATE_CONFIG':
            config = { ...config, ...message.payload };
            break;

        default:
            console.warn('Unknown message type');
    }
});

self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        (async () => {
            let response = await fetch(event.request);

            const offlineResponse = await handleOffline(config.offline);
            if (offlineResponse) return offlineResponse;

            // Apply other handlers in sequence
            response = await handleLatency(response, config.latency);
            response = await handleErrors(response, event.request, config.errors);
            response = handleTamper(response, config.tamper);

            return response;
        })()
    );
});