/**
 * Represents a response containing information about a provider risk, including its ID and name.
 */
export class ProviderRiskResponse {
    /**
     * The unique identifier for the provider risk.
     */
    id: number;

    /**
     * The name or title of the provider risk.
     */
    name: string;

    /**
     * Constructs a new provider risk response with the provided ID and name.
     *
     * @param id - The unique identifier for the provider risk.
     * @param name - The name or title of the provider risk.
     */
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
