import {Control, Controller} from "react-hook-form";
import {USER_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {ErrorType, FormErrorMessage} from "../../../atoms";

type Props = {
    control: Control<{ username: string; password: string; }>;
    errors: ErrorType;
}

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