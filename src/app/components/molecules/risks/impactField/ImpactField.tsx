import {Control, Controller} from "react-hook-form";
import {IMPACT_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {ErrorType, FormErrorMessage} from "../../../atoms";
import {Impact, RiskRequest} from "../../../../lib";
import {Dropdown} from "primereact/dropdown";
import {validateEnum} from "../../../../utils/risks";

type Props = {
    control: Control<RiskRequest>;
    errors: ErrorType;
}

/**
 * ImpactField is a React component that renders an input field for selecting the impact in a form.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Control<RiskRequest>} props.control - Control object from react-hook-form for managing form inputs.
 * @param {ErrorType} props.errors - Object containing validation errors for the form.
 * @returns - The rendered React component.
 */
export const ImpactField = ({control, errors}: Props) => {

    /**
     * Generate options for the Dropdown component based on the Impact enum
     */
    const options: string[] = Object.keys(Impact).filter(key => isNaN(Number(key)));

    return (
        <Controller
            name="impact"
            control={control}
            rules={{
                required: IMPACT_REQUIRED, validate: (value: number) => validateEnum(value, Impact)
            }}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.impact})}>Impacto</label>
                    <Dropdown id={field.name}
                              value={Impact[field.value]}
                              options={options}
                              className={classNames({'p-invalid': fieldState.error})}
                              onChange={(e) => field.onChange(Impact[e.target.value])}
                              placeholder="Selecciona"/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}
