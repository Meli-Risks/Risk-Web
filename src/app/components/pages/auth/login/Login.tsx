import './Login.css';
import {HeaderForm} from "../../../atoms";
import {LoginForm} from "../../../organisms";

export const Login = () => {
    return (
        <div
            className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <div className="login-container-style">
                    <div className="w-full surface-card py-8 px-5 sm:px-8 border-radius-53">
                        <HeaderForm title={'¡Bienvenido de nuevo!'}
                                    message={'Inicia sesión para continuar'}></HeaderForm>
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </div>
        </div>
    );
}