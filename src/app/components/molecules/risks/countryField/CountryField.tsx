import {Control, Controller} from "react-hook-form";
import {CountryResponse, RiskRequest} from "../../../../lib";
import {ErrorType, FormErrorMessage} from "../../../atoms";
import {COUNTRY_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {Dropdown} from "primereact/dropdown";
import {SelectItem} from "primereact/selectitem";

type Props = {
    control: Control<RiskRequest>;
    errors: ErrorType;
    countries: CountryResponse[];
}

export const CountryField = ({control, errors, countries}: Props) => {
    const options: SelectItem[] = countries.map((country: CountryResponse): SelectItem => {
        return {label: country.name, value: country.code};
    })

    return (
        <Controller
            name="countryCode"
            control={control}
            rules={{
                required: COUNTRY_REQUIRED,
            }}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.impact})}>País</label>
                    <Dropdown id={field.name}
                              value={field.value}
                              options={options}
                              className={classNames({'p-invalid': fieldState.error})}
                              onChange={(e) => field.onChange(e.target.value)}
                              placeholder="Selecciona"/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}