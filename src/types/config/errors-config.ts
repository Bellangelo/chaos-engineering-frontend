// Configuration for error injection
export interface ErrorInjectionConfig {
    enabled: boolean;
    rate: number; // Failure rate (0.0 to 1.0)
    statusCodes: number[]; // HTTP status codes to simulate (e.g., [500, 503])
    strategy?: 'random' | 'burst' | 'pattern'; // Injection strategy
    pattern?: {
        interval: number; // Interval between bursts (ms)
        duration: number; // Duration of each burst (ms)
    };
    dynamicRate?: () => number; // Dynamic rate for error injection
}