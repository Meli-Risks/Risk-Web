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

/**
 * TitleField is a React component that renders an input field for entering a title in a form.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Control<RiskRequest>} props.control - Control object from react-hook-form for managing form inputs.
 * @param {ErrorType} props.errors - Object containing validation errors for the form.
 * @returns - The rendered React component.
 */
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
