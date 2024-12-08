// Configuration for latency injection
export interface LatencyInjectionConfig {
    enabled: boolean;
    min: number; // Minimum latency in milliseconds
    max: number; // Maximum latency in milliseconds
}