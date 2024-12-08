import { LatencyInjectionConfig } from './latency-config';
import { ErrorInjectionConfig } from './errors-config';
import { TamperInjectionConfig } from './tamper-config';
import { OfflineInjectionConfig } from './offline-config';

// Base configuration for the chaos library
export interface ChaosConfig {
    enabled: boolean; // Master switch to enable/disable chaos
    latency?: LatencyInjectionConfig;
    errors?: ErrorInjectionConfig;
    tamper?: TamperInjectionConfig;
    offline?: OfflineInjectionConfig;
}