import { LatencyInjectionConfig, TamperInjectionConfig, ErrorInjectionConfig, OfflineInjectionConfig } from './index';

// Base configuration for the chaos library
export interface ChaosConfig {
    enabled: boolean; // Master switch to enable/disable chaos
    latency?: LatencyInjectionConfig;
    errors?: ErrorInjectionConfig;
    tamper?: TamperInjectionConfig;
    offline?: OfflineInjectionConfig;
}