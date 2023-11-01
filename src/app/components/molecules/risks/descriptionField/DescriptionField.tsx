import {Control, Controller} from "react-hook-form";
import {
    DESCRIPTION_REQUIRED,
    MAX_LENGTH_DESCRIPTION_VALIDATION,
    MIN_LENGTH_DESCRIPTION_VALIDATION
} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {ErrorType, FormErrorMessage} from "../../../atoms";
import {RiskRequest} from "../../../../lib";
import {InputTextarea} from "primereact/inputtextarea";

type Props = {
    control: Control<RiskRequest>;
    errors: ErrorType;
}

export const DescriptionField = ({control, errors}: Props) => {
    return (
        <Controller
            name="description"
            control={control}
            rules={{
                required: DESCRIPTION_REQUIRED,
                minLength: {value: 10, message: MIN_LENGTH_DESCRIPTION_VALIDATION},
                maxLength: {value: 100, message: MAX_LENGTH_DESCRIPTION_VALIDATION},
            }}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.description})}>Descripción</label>
                    <InputTextarea id={field.name}
                                   aria-describedby="description"
                                   value={field.value}
                                   rows={3}
                                   cols={20}
                                   className={classNames({'p-invalid': fieldState.error})}
                                   onChange={(e) => field.onChange(e.target.value)}/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}