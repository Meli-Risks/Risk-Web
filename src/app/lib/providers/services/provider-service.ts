import {AxiosResponse} from "axios";
import {GlobalPaginatedResponse} from "../../response/global-paginated-response";
import {ProviderResponse} from "../dto/response/provider-response";
import {LazyTableState} from "../../../utils/pagination";
import {castProviderParameters} from "../../../utils/pagination/functions";
import {GlobalEmptyResponse} from "../../response/global-empty-response";
import {ProviderRequest} from "../dto/request/provider-request";
import {api} from "../../../config";

/**
 * A service for handling provider-related operations.
 */
export class ProviderService {
    /**
     * Retrieves a paginated list of providers.
     *
     * @returns A promise that resolves with an Axios response containing a `GlobalPaginatedResponse` of `ProviderResponse`.
     */
    static findAll(): Promise<AxiosResponse<GlobalPaginatedResponse<ProviderResponse>>> {
        return api.get('/providers');
    }

    /**
     * Retrieves a paginated list of providers based on the provided parameters.
     *
     * @param params - Parameters for pagination and filtering.
     * @returns A promise that resolves with an Axios response containing a `GlobalPaginatedResponse` of `ProviderResponse`.
     */
    static findPaginatedProviders(params: LazyTableState): Promise<AxiosResponse<GlobalPaginatedResponse<ProviderResponse>>> {
        return api.get('/providers', { params: castProviderParameters(params) });
    }

    /**
     * Creates a new provider with the provided request data.
     *
     * @param request - The data to create a new provider.
     * @returns A promise that resolves with an Axios response containing a `GlobalEmptyResponse`.
     */
    static create(request: ProviderRequest): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.post('/providers', request);
    }

    /**
     * Updates an existing provider with the provided request data and ID.
     *
     * @param request - The data to update the provider.
     * @param id - The unique identifier of the provider to update.
     * @returns A promise that resolves with an Axios response containing a `GlobalEmptyResponse`.
     */
    static update(request: ProviderRequest, id: number): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.put(`/providers/${id}`, request);
    }

    /**
     * Deletes a provider with the specified ID.
     *
     * @param id - The unique identifier of the provider to delete.
     * @returns A promise that resolves with an Axios response containing a `GlobalEmptyResponse`.
     */
    static delete(id: number): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.delete(`/providers/${id}`);
    }
}
