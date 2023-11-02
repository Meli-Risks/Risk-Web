/**
 * Represents a request to create or update a risk, including its title, description, probability, impact, provider ID, and country code.
 */
export interface RiskRequest {
    /**
     * The title or name of the risk.
     */
    title: string;

    /**
     * A description of the risk.
     */
    description: string;

    /**
     * The probability score associated with the risk.
     */
    probability: number;

    /**
     * The impact score associated with the risk.
     */
    impact: number;

    /**
     * The unique identifier of the provider related to the risk.
     */
    providerId: number;

    /**
     * The country code associated with the risk.
     */
    countryCode: string;
}
