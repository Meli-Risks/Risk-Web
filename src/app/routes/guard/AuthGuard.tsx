import {Navigate, Outlet} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

type Props = {
    children?: any
}

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
