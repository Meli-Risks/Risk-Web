import { AxiosResponse } from "axios";
import { AuthResponse } from "../dto/response/auth-response";
import { AuthRequest } from "../dto/request/auth-request";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { api } from "../../../config";

/**
 * A service for handling authentication-related operations.
 */
export class AuthService {
    /**
     * Logs in a user with the provided authentication request.
     *
     * @param request - Authentication request containing user credentials.
     * @returns A promise that resolves with an Axios response containing an `AuthResponse`.
     */
    static login(request: AuthRequest): Promise<AxiosResponse<AuthResponse>> {
        return api.post('/login', request);
    }

    /**
     * Retrieves the username from the access token if available, or returns a default username.
     *
     * @returns The username obtained from the access token or a default username ('Admin').
     */
    static getUsername(): string {
        const defaultUsername: string = 'Admin';
        if (sessionStorage.getItem('accessToken')) {
            const token: string = String(sessionStorage.getItem('accessToken'));
            try {
                const payload: JwtPayload = jwtDecode(token);
                return payload.sub ? payload.sub : defaultUsername;
            } catch (e) {
                return defaultUsername;
            }
        }
        return defaultUsername;
    }

    /**
     * Performs a token refresh and updates the access token.
     *
     * @param navigate - A function for redirecting to a new location after token refresh.
     * @returns A promise that resolves after the access token has been refreshed.
     */
    static async refresh(navigate: () => void): Promise<void> {
        return await api.post('/refresh').then((response: AxiosResponse<AuthResponse>): void => {
            sessionStorage.setItem('accessToken', response.data.accessToken);
        }).catch(() => {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            navigate();
        });
    }

    /**
     * Logs out the user, removing access and refresh tokens from sessionStorage.
     *
     * @param navigate - A function for redirecting to a new location after logout.
     */
    static logout(navigate: () => void): void {
        api.post('/logout').then(() => {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            navigate();
        }).catch(() => {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            navigate();
        });
    }
}
