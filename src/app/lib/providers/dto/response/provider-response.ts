import { CountryResponse } from "../../../countries/dto/response/country-response";

/**
 * Represents a response containing information about a provider, including its ID, name, and associated countries.
 */
export class ProviderResponse {
    /**
     * The unique identifier for the provider.
     */
    id: number;

    /**
     * The name of the provider.
     */
    name: string;

    /**
     * An array of country information associated with the provider, represented as `CountryResponse` objects.
     */
    countries: CountryResponse[];

    /**
     * Constructs a new provider response with the provided ID, name, and associated countries.
     *
     * @param id - The unique identifier for the provider.
     * @param name - The name of the provider.
     * @param countries - An array of country information associated with the provider.
     */
    constructor(id: number, name: string, countries: CountryResponse[]) {
        this.id = id;
        this.name = name;
        this.countries = countries;
    }
}
