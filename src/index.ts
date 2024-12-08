export { registerChaosWorker, configureChaos, updateChaosConfig } from './api';

// Export types for users to integrate type-safe configurations
export type { ChaosConfig, LatencyInjectionConfig, ErrorInjectionConfig, TamperInjectionConfig, OfflineInjectionConfig } from './types/config';
