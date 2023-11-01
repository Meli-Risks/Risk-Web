import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {AuthService} from "../../lib";

/**
 * Axios instance configured to make requests to the Smart Risk API.
 */
export const api: AxiosInstance = axios.create({
    baseURL: 'https://smart-risk.tech/api/v1',
});

/**
 * Set up an interceptor in Axios to handle token authentication and refresh.
 *
 * @param navigate - Function to redirect to a new location in case of token refresh.
 */
export const setAxiosInterceptor = (navigate: () => void): void => {
    api.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
        if (request.url === '/refresh') {
            request.headers['Authorization'] = `Bearer ${sessionStorage.getItem('refreshToken')}`;
        } else if (request.url !== '/login') {
            if (isAccessTokenExpired()) {
                await AuthService.refresh(navigate);
            }
            request.headers['Authorization'] = `Bearer ${sessionStorage.getItem('accessToken')}`;
        }
        return request;
    }, error => {
        return Promise.reject(error);
    });
}

/**
 * Checks if the access token has expired.
 *
 * @returns `true` if the access token has expired, otherwise, `false`.
 */
const isAccessTokenExpired = (): boolean => {
    const currentTimestamp: number = new Date().getTime();
    if (sessionStorage.getItem('accessToken')) {
        const token: string = String(sessionStorage.getItem('accessToken'));
        try {
            const payload: JwtPayload = jwtDecode(token);
            const exp = payload.exp ? payload.exp * 1000 : currentTimestamp;
            return exp < currentTimestamp;
        } catch (e) {
            return true;
        }
    }
    return true;
}
