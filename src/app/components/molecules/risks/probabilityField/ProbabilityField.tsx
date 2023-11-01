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

export const ProbabilityField = ({control, errors}: Props) => {
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