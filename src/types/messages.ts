import { ChaosConfig } from './config/config';

// Message sent to configure the chaos library
export interface ConfigureMessage {
    type: 'CONFIGURE';
    payload: ChaosConfig;
}

// Union type for all message types
export type WorkerMessage = ConfigureMessage;