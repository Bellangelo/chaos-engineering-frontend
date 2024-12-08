// Configuration for offline simulation
export interface OfflineInjectionConfig {
    enabled: boolean;
    rate: number; // Rate of requests to block (0.0 to 1.0)
}