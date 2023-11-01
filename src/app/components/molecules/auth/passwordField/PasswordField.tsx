import {Control, Controller} from "react-hook-form";
import {PASSWORD_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {ErrorType, FormErrorMessage} from "../../../atoms";

type Props = {
    control: Control<{ username: string; password: string; }>;
    errors: ErrorType;
}

/**
 * PasswordField component for rendering a password input field with validation.
 * This component provides an input field for the password and displays validation errors if any.
 *
 * @param {Props} props - An object containing the properties for the password field.
 * @param {Control} props.control - The control object from react-hook-form for managing form state.
 * @param {ErrorType} props.errors - An object containing form errors.
 * @returns - A component that renders a password input field with validation.
 */
export const PasswordField = ({control, errors}: Props) => {
    return (
        <Controller
            name="password"
            control={control}
            rules={{required: PASSWORD_REQUIRED}}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.username})}>Contraseña</label>
                    <InputText id={field.name}
                               type="password"
                               aria-describedby="password"
                               value={field.value}
                               className={classNames({'p-invalid': fieldState.error})}
                               onChange={(e) => field.onChange(e.target.value)}/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}
