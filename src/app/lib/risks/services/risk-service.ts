import {AxiosResponse} from "axios";
import {RiskResponse} from "../dto/response/risk-response";
import {LazyTableState} from "../../../utils/pagination";
import {castRiskParameters} from "../../../utils/pagination/functions";
import {GlobalPaginatedResponse} from "../../response/global-paginated-response";
import {RiskRequest} from "../dto/request/risk-request";
import {GlobalEmptyResponse} from "../../response/global-empty-response";
import {api} from "../../../config";

export class RiskService {
    static findPaginatedRisks(params: LazyTableState): Promise<AxiosResponse<GlobalPaginatedResponse<RiskResponse>>> {
        return api.get('/risks', {params: castRiskParameters(params)});
    }

    static create(request: RiskRequest): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.post('/risks', request);
    }

    static update(request: RiskRequest, id: number): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.put(`/risks/${id}`, request);
    }

    static delete(id: number): Promise<AxiosResponse<GlobalEmptyResponse>> {
        return api.delete(`/risks/${id}`);
    }
}