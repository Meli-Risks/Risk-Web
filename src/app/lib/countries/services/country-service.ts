import {AxiosResponse} from "axios";
import {CountryResponse} from "../dto/response/country-response";
import {GlobalResponse} from "../../response/global-response";
import {api} from "../../../config";

export class CountryService {
    static findAll(): Promise<AxiosResponse<GlobalResponse<CountryResponse>>> {
        return api.get('/countries/all');
    }
}