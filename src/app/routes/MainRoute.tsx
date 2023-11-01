import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {lazy} from "react";
import {Login, NotFound} from "../components/pages";
import {AdminLayout} from "../components/templates";
import {AuthGuard} from "./guard/AuthGuard";
import {setAxiosInterceptor} from "../config";

const LazyAdmin = lazy(() => import('../components/templates/admin/AdminLayout')
    .then(() => ({default: AdminLayout})));

const LazyNotFound = lazy(() => import('../components/pages/shared/NotFound')
    .then(() => ({default: NotFound})));

const LazyLogin = lazy(() => import('../components/pages/auth/login/Login')
    .then(() => ({default: Login})));

/**
 * Component for defining main application routes, including admin, login, and not-found routes.
 * It uses an `AuthGuard` to protect admin routes and sets an Axios interceptor for navigation to the login page on token expiration.
 *
 * @returns A JSX element representing the main application routes.
 */
export const MainRoute = () => {
    const navigate = useNavigate();
    setAxiosInterceptor(() => navigate('/login'));

    return (
        <Routes>
            <Route element={<AuthGuard/>}>
                <Route path={'/admin/*'} element={<LazyAdmin/>}/>
            </Route>
            <Route path={'/'} element={<Navigate to="/admin/risks"/>}/>
            <Route path={'/login'} element={<LazyLogin/>}/>
            <Route path={'/*'} element={<LazyNotFound/>}/>
        </Routes>
    );
}
