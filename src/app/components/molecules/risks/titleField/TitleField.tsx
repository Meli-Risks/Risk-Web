import {Control, Controller} from "react-hook-form";
import {MAX_LENGTH_TITLE_VALIDATION, MIN_LENGTH_TITLE_VALIDATION, TITLE_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {ErrorType, FormErrorMessage} from "../../../atoms";
import {RiskRequest} from "../../../../lib";

type Props = {
    control: Control<RiskRequest>;
    errors: ErrorType;
}

export const TitleField = ({control, errors}: Props) => {
    return (
        <Controller
            name="title"
            control={control}
            rules={{
                required: TITLE_REQUIRED,
                minLength: {value: 3, message: MIN_LENGTH_TITLE_VALIDATION},
                maxLength: {value: 100, message: MAX_LENGTH_TITLE_VALIDATION},
            }}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.title})}>Título</label>
                    <InputText id={field.name}
                               type="text"
                               aria-describedby="title"
                               value={field.value}
                               className={classNames({'p-invalid': fieldState.error})}
                               onChange={(e) => field.onChange(e.target.value)}/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}