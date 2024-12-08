// Configuration for tampering with responses
export interface TamperInjectionConfig {
    enabled: boolean;
    modifyResponse: (response: Response) => Response; // Custom tampering logic
}