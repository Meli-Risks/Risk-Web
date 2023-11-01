/**
 * Represents a response containing information about a country, including its code, name, and flag.
 */
export class CountryResponse {
    /**
     * The code representing the country (e.g., ISO country code).
     */
    code: string;

    /**
     * The name of the country.
     */
    name: string;

    /**
     * The URL or path to the flag image of the country.
     */
    flag: string;

    /**
     * Constructs a new country response with the provided code, name, and flag.
     *
     * @param code - The code representing the country (e.g., ISO country code).
     * @param name - The name of the country.
     * @param flag - The URL or path to the flag image of the country.
     */
    constructor(code: string, name: string, flag: string) {
        this.code = code;
        this.name = name;
        this.flag = flag;
    }
}
