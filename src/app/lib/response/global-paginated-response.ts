import {PaginationResponse} from "./pagination-response";

export class GlobalPaginatedResponse<T> {
    code: number;
    message: string;
    data: PaginationResponse<T>;

    constructor(code: number, message: string, data: PaginationResponse<T>) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}