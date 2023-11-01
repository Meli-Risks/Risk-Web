import {AxiosResponse} from "axios";
import {AuthResponse} from "../dto/response/auth-response";
import {AuthRequest} from "../dto/request/auth-request";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {api} from "../../../config";

export class AuthService {

    static login(request: AuthRequest): Promise<AxiosResponse<AuthResponse>> {
        return api.post('/login', request);
    }

    static getUsername(): string {
        const defaultUsername: string = 'Admin';
        if (sessionStorage.getItem('accessToken')) {
            const token: string = String(sessionStorage.getItem('accessToken'));
            try {
                const payload: JwtPayload = jwtDecode(token);
                return (payload.sub) ? (payload.sub) : defaultUsername;
            } catch (e) {
                return defaultUsername;
            }
        }
        return defaultUsername;
    }

    static async refresh(navigate: () => void): Promise<void> {
        return await api.post('/refresh').then((response: AxiosResponse<AuthResponse>): void => {
            sessionStorage.setItem('accessToken', response.data.accessToken);
        }).catch(() => {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            navigate();
        });
    }

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