import {ButtonLogin} from "../../../atoms";
import {useRef, useState} from "react";
import {AuthRequest, AuthService} from "../../../../lib";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Toast} from "primereact/toast";
import {UNEXPECTED_ERROR} from "../../../../utils/constants";
import {PasswordField, UsernameField} from "../../../molecules";

/**
 * LoginForm is a React component that provides a login form for user authentication.
 *
 * @component
 * @returns - The rendered React component.
 */
export const LoginForm = () => {

    /**
     * Ref for the toast message component.
     */
    const toast = useRef(null);

    /**
     * Navigation hook for redirection after successful login.
     */
    const navigate = useNavigate();

    /**
     * State variable to manage loading state
     */
    const [loading, setLoading] = useState(false);

    /**
     * Default values for the username and password fields.
     */
    const defaultValues = {
        username: '',
        password: ''
    };

    /**
     * Form control and validation using react-hook-form.
     */
    const {
        control,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm({defaultValues});

    /**
     * Function to handle form submission.
     *
     * @param data authentication request.
     */
    const onSubmit = (data: AuthRequest): void => {
        setLoading(true);
        AuthService.login(data)
            .then(response => {
                sessionStorage.setItem('accessToken', response.data.accessToken);
                sessionStorage.setItem('refreshToken', response.data.refreshToken);
                reset();
                navigate('/admin/risks');
            })
            .catch(reason => {
                const data = reason.response?.data;
                show(data && data.message
                    ? data.message
                    : UNEXPECTED_ERROR);
                reset();
            })
            .finally((): void => {
                setLoading(false);
            });
    };

    /**
     * Function to display a toast message with an error.
     *
     * @param message message to display.
     */
    const show = (message: string): void => {
        if (toast?.current) {
            // @ts-ignore
            toast.current.show({severity: 'error', summary: 'Error', detail: message});
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Toast ref={toast}/>
            <div className="flex flex-column gap-2 mb-3">
                <UsernameField control={control} errors={errors}></UsernameField>
            </div>

            <div className="flex flex-column gap-2 mb-3">
                <PasswordField control={control} errors={errors}></PasswordField>
            </div>

            <ButtonLogin loading={loading}></ButtonLogin>
        </form>
    );
}
