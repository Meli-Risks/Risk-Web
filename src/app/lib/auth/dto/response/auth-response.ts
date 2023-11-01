/**
 * Represents an authentication response containing an access token and a refresh token.
 */
export class AuthResponse {
    /**
     * The access token obtained after successful authentication.
     */
    accessToken: string;

    /**
     * The refresh token obtained after successful authentication.
     */
    refreshToken: string;

    /**
     * Constructs a new authentication response with the provided access and refresh tokens.
     *
     * @param accessToken - The access token obtained after authentication.
     * @param refreshToken - The refresh token obtained after authentication.
     */
    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
