import { ChaosConfig } from './config';

// Message sent to configure the chaos library
export interface ConfigureMessage {
    type: 'CONFIGURE';
    payload: ChaosConfig;
}

export interface UpdateConfigMessage {
    type: 'UPDATE_CONFIG';
    payload: Partial<ChaosConfig>; // Allow partial updates
}

// Union type for all message types
export type WorkerMessage = ConfigureMessage | UpdateConfigMessage;