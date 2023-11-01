import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {AuthService} from "../../lib";

export const api: AxiosInstance = axios.create({
    baseURL: 'http://54.149.254.232:8090/api/v1',
});

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
