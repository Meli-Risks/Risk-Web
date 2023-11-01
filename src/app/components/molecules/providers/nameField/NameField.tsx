import {Control, Controller} from "react-hook-form";
import {ProviderRequest} from "../../../../lib";
import {ErrorType, FormErrorMessage} from "../../../atoms";
import {MAX_LENGTH_NAME_VALIDATION, MIN_LENGTH_NAME_VALIDATION, NAME_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";

type Props = {
    control: Control<ProviderRequest>;
    errors: ErrorType;
}

export const NameField = ({control, errors}: Props) => {
    return (
        <Controller
            name="name"
            control={control}
            rules={{
                required: NAME_REQUIRED,
                minLength: {value: 3, message: MIN_LENGTH_NAME_VALIDATION},
                maxLength: {value: 100, message: MAX_LENGTH_NAME_VALIDATION},
            }}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.name})}>Nombre</label>
                    <InputText id={field.name}
                               type="text"
                               aria-describedby="name"
                               value={field.value}
                               className={classNames({'p-invalid': fieldState.error})}
                               onChange={(e) => field.onChange(e.target.value)}/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}