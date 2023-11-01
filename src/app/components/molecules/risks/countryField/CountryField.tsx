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

/**
 * CountryField component for selecting the country associated with a risk.
 *
 * This component provides a dropdown field for selecting the country associated with a risk.
 * It enforces required validation and displays error messages if validation fails.
 *
 * @param {Props} props - The properties and callback functions for the component.
 * @param {Control<RiskRequest>} props.control - The control object from react-hook-form for managing the input field.
 * @param {ErrorType} props.errors - The errors object containing validation errors.
 * @param {CountryResponse[]} props.countries - The list of available countries to populate the dropdown.
 * @returns - The rendered React component.
 */
export const CountryField = ({control, errors, countries}: Props) => {

    /**
     * Generates an array of options for the Dropdown component based on a list of countries.
     *
     * @param {CountryResponse[]} countries - The list of countries to be transformed into options.
     * @returns {SelectItem[]} An array of options, each containing a label and value.
     */
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
