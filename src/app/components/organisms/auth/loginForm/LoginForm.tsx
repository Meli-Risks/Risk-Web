import {ButtonLogin} from "../../../atoms";
import {useRef, useState} from "react";
import {AuthRequest, AuthService} from "../../../../lib";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Toast} from "primereact/toast";
import {UNEXPECTED_ERROR} from "../../../../utils/constants";
import {PasswordField, UsernameField} from "../../../molecules";

export const LoginForm = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const defaultValues = {
        username: '',
        password: ''
    };

    const {
        control,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm({defaultValues});

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