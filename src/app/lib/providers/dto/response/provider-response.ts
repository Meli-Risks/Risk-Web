import {CountryResponse} from "../../../countries/dto/response/country-response";

export class ProviderResponse {
    id: number;
    name: string;
    countries: CountryResponse[];

    constructor(id: number, name: string, countries: CountryResponse[]) {
        this.id = id;
        this.name = name;
        this.countries = countries;
    }
}