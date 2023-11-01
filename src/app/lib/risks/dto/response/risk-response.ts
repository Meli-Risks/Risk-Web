import {ProviderRiskResponse} from "./provider-risk-response";
import {CountryResponse} from "../../../countries/dto/response/country-response";

export class RiskResponse {
    id: number;
    title: string;
    description: string;
    probability: number;
    impact: number;
    provider: ProviderRiskResponse;
    country: CountryResponse;

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