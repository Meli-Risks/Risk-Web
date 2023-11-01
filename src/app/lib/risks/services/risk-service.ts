import {AxiosResponse} from "axios";
import {RiskResponse} from "../dto/response/risk-response";
import {LazyTableState} from "../../../utils/pagination";
import {castRiskParameters} from "../../../utils/pagination/functions";
import {GlobalPaginatedResponse} from "../../response/global-paginated-response";
import {RiskRequest} from "../dto/request/risk-request";
import {GlobalEmptyResponse} from "../../response/global-empty-response";
import {api} from "../../../config";

/**
 * A service for handling risk-related operations.
 */
export class RiskService {
    /**
     * Retrieves a paginated list of risks based on the provided parameters.
     *
     * @param params - Parameters for pagination and filtering.
     * @returns A promise that resolves with an Axios response containing a `GlobalPaginatedResponse` of `RiskResponse`.
     */
    static findPaginatedRisks(params: LazyTableState): Promise<AxiosResponse<GlobalPaginatedResponse<RiskResponse>>> {
        return api.get('/risks', { params: castRiskParameters(params) });
    }

    /**
     * Creates a new risk with the provided request data.
     *
     * @param request - The data to create a new risk.
     * @returns A promise that resolves with an Axios response containing a `GlobalEmptyResponse`.
     */
    static create(request: RiskRequest): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.post('/risks', request);
    }

    /**
     * Updates an existing risk with the provided request data and ID.
     *
     * @param request - The data to update the risk.
     * @param id - The unique identifier of the risk to update.
     * @returns A promise that resolves with an Axios response containing a `GlobalEmptyResponse`.
     */
    static update(request: RiskRequest, id: number): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.put(`/risks/${id}`, request);
    }

    /**
     * Deletes a risk with the specified ID.
     *
     * @param id - The unique identifier of the risk to delete.
     * @returns A promise that resolves with an Axios response containing a `GlobalEmptyResponse`.
     */
    static delete(id: number): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.delete(`/risks/${id}`);
    }
}
