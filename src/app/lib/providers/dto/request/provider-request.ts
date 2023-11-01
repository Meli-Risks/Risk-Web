/**
 * Represents a request to create a provider with a name and associated country codes.
 */
export interface ProviderRequest {
    /**
     * The name of the provider to be created.
     */
    name: string;

    /**
     * An array of country codes associated with the provider.
     */
    countryCodes: string[];
}
