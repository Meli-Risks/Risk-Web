import {Navigate, Outlet} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import React from "react";

type Props = {
    children?: any
}

/**
 * A component that guards routes by checking for the presence and validity of an access token in sessionStorage.
 * If the token is missing or invalid, it redirects the user to the login page.
 * If the token is valid or children are provided, it renders the children or an outlet for nested routes.
 *
 * @param children - Optional child components to render.
 * @returns A JSX element to render the children or an outlet for nested routes.
 */
export const AuthGuard = ({children}: Props): Element | any => {
    if (sessionStorage.getItem('accessToken')) {
        const token = String(sessionStorage.getItem('accessToken'));
        try {
            jwtDecode(token);
        } catch (e) {
            return <Navigate to={'/login'}></Navigate>;
        }
    } else {
        return <Navigate to={'/login'}></Navigate>;
    }
    return children ? children : <Outlet/>;
};
