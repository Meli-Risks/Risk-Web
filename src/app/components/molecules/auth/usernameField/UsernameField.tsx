import {Control, Controller} from "react-hook-form";
import {USER_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {ErrorType, FormErrorMessage} from "../../../atoms";

type Props = {
    control: Control<{ username: string; password: string; }>;
    errors: ErrorType;
}

/**
 * UsernameField component for rendering a username input field with validation.
 * This component provides an input field for the username and displays validation errors if any.
 *
 * @param {Props} props - An object containing the properties for the username field.
 * @param {Control} props.control - The control object from react-hook-form for managing form state.
 * @param {ErrorType} props.errors - An object containing form errors.
 * @returns - A component that renders a username input field with validation.
 */
export const UsernameField = ({control, errors}: Props) => {
    return (
        <Controller
            name="username"
            control={control}
            rules={{required: USER_REQUIRED}}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.username})}>Usuario</label>
                    <InputText id={field.name}
                               aria-describedby="username"
                               value={field.value}
                               className={classNames({'p-invalid': fieldState.error})}
                               onChange={(e) => field.onChange(e.target.value)}/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}
