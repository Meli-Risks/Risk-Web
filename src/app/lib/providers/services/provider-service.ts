import {AxiosResponse} from "axios";
import {GlobalPaginatedResponse} from "../../response/global-paginated-response";
import {ProviderResponse} from "../dto/response/provider-response";
import {LazyTableState} from "../../../utils/pagination";
import {castProviderParameters} from "../../../utils/pagination/functions";
import {GlobalEmptyResponse} from "../../response/global-empty-response";
import {ProviderRequest} from "../dto/request/provider-request";
import {api} from "../../../config";

export class ProviderService {
    static findAll(): Promise<AxiosResponse<GlobalPaginatedResponse<ProviderResponse>>> {
        return api.get('/providers');
    }

    static findPaginatedProviders(params: LazyTableState): Promise<AxiosResponse<GlobalPaginatedResponse<ProviderResponse>>> {
        return api.get('/providers', {params: castProviderParameters(params)});
    }

    static create(request: ProviderRequest): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.post('/providers', request);
    }

    static update(request: ProviderRequest, id: number): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.put(`/providers/${id}`, request);
    }

    static delete(id: number): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.delete(`/providers/${id}`);
    }
}
