import {PaginationResponse} from "./pagination-response";

/**
 * Represents a global paginated response with a status code, a message, and paginated data.
 *
 * @template T - The type of data included in the pagination response.
 */
export class GlobalPaginatedResponse<T> {
    /**
     * The status code of the response.
     */
    code: number;

    /**
     * A message or description associated with the response.
     */
    message: string;

    /**
     * The paginated data contained within the response, typically of type `PaginationResponse<T>`.
     */
    data: PaginationResponse<T>;

    /**
     * Constructs a new global paginated response with the provided status code, message, and paginated data.
     *
     * @param code - The status code of the response.
     * @param message - A message or description associated with the response.
     * @param data - The paginated data contained within the response.
     */
    constructor(code: number, message: string, data: PaginationResponse<T>) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
