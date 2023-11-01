/**
 * Represents an authentication request with a username and password.
 */
export class AuthRequest {
    /**
     * The username provided in the authentication request.
     */
    username: string;

    /**
     * The password provided in the authentication request.
     */
    password: string;

    /**
     * Constructs a new authentication request with the provided username and password.
     *
     * @param username - The username for authentication.
     * @param password - The password for authentication.
     */
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
