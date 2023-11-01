/**
 * Represents a global empty response with a status code and a message.
 */
export class GlobalEmptyResponse {
    /**
     * The status code of the response.
     */
    code: number;

    /**
     * A message or description associated with the response.
     */
    message: string;

    /**
     * Constructs a new global empty response with the provided status code and message.
     *
     * @param code - The status code of the response.
     * @param message - A message or description associated with the response.
     */
    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}
