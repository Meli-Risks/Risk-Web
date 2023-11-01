import {AxiosResponse} from "axios";
import {CountryResponse} from "../dto/response/country-response";
import {GlobalResponse} from "../../response/global-response";
import {api} from "../../../config";

/**
 * A service for handling country-related operations.
 */
export class CountryService {
    /**
     * Retrieves a list of all countries.
     *
     * @returns A promise that resolves with an Axios response containing a `GlobalResponse` of `CountryResponse`.
     */
    static findAll(): Promise<AxiosResponse<GlobalResponse<CountryResponse>>> {
        return api.get('/countries/all');
    }
}
