import {Control, Controller} from "react-hook-form";
import {Probability, RiskRequest} from "../../../../lib";
import {ErrorType, FormErrorMessage} from "../../../atoms";
import {PROBABILITY_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {Dropdown} from "primereact/dropdown";
import {validateEnum} from "../../../../utils/risks";

type Props = {
    control: Control<RiskRequest>;
    errors: ErrorType;
}

/**
 * ProbabilityField is a React component that renders an input field for selecting the probability in a form.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Control<RiskRequest>} props.control - Control object from react-hook-form for managing form inputs.
 * @param {ErrorType} props.errors - Object containing validation errors for the form.
 * @returns - The rendered React component.
 */
export const ProbabilityField = ({control, errors}: Props) => {

    /**
     * Generate options for the Dropdown component based on the Probability enum
     */
    const options: string[] = Object.keys(Probability).filter(key => isNaN(Number(key)));

    return (
        <Controller
            name="probability"
            control={control}
            rules={{
                required: PROBABILITY_REQUIRED, validate: (value: number) => validateEnum(value, Probability)
            }}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.probability})}>Probabilidad</label>
                    <Dropdown id={field.name}
                              value={Probability[field.value]}
                              options={options}
                              className={classNames({'p-invalid': fieldState.error})}
                              onChange={(e) => field.onChange(Probability[e.target.value])}
                              placeholder="Selecciona"/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}
