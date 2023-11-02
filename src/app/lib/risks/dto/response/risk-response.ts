import {ProviderRiskResponse} from "./provider-risk-response";
import {CountryResponse} from "../../../countries/dto/response/country-response";

/**
 * Represents a response containing information about a risk, including its ID, title, description, probability, impact, associated provider, and country.
 */
export class RiskResponse {
    /**
     * The unique identifier for the risk.
     */
    id: number;

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
     * Information about the provider related to the risk, represented as a `ProviderRiskResponse` object.
     */
    provider: ProviderRiskResponse;

    /**
     * Information about the country associated with the risk, represented as a `CountryResponse` object.
     */
    country: CountryResponse;

    /**
     * Constructs a new risk response with the provided ID, title, description, probability, impact, provider, and country.
     *
     * @param id - The unique identifier for the risk.
     * @param title - The title or name of the risk.
     * @param description - A description of the risk.
     * @param probability - The probability score associated with the risk.
     * @param impact - The impact score associated with the risk.
     * @param provider - Information about the provider related to the risk.
     * @param country - Information about the country associated with the risk.
     */
    constructor(id: number, title: string, description: string, probability: number, impact: number, provider: ProviderRiskResponse, country: CountryResponse) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.probability = probability;
        this.impact = impact;
        this.provider = provider;
        this.country = country;
    }
}
