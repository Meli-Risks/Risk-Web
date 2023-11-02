/**
 * Represents a global response with a status code, a message, and data of a generic type `T`.
 *
 * @template T - The type of data included in the response.
 */
export class GlobalResponse<T> {
    /**
     * The status code of the response.
     */
    code: number;

    /**
     * A message or description associated with the response.
     */
    message: string;

    /**
     * An array of data of type `T` contained within the response.
     */
    data: T[];

    /**
     * Constructs a new global response with the provided status code, message, and data.
     *
     * @param code - The status code of the response.
     * @param message - A message or description associated with the response.
     * @param data - An array of data contained within the response.
     */
    constructor(code: number, message: string, data: T[]) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
