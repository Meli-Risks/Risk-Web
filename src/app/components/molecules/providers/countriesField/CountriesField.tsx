import {Control, Controller} from "react-hook-form";
import {CountryResponse, ProviderRequest} from "../../../../lib";
import {CountryTemplate, ErrorType, FormErrorMessage} from "../../../atoms";
import {COUNTRIES_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {MultiSelect} from "primereact/multiselect";
import {useState} from "react";

type Props = {
    control: Control<ProviderRequest>;
    errors: ErrorType;
    countries: CountryResponse[]
}

/**
 * CountriesField component for rendering a multi-select input field for selecting associated countries.
 * This component provides a multi-select input field for selecting countries and displays validation errors if any.
 *
 * @param {Props} props - An object containing the properties for the countries field.
 * @param {Control<ProviderRequest>} props.control - The control object from react-hook-form for managing form state.
 * @param {ErrorType} props.errors - An object containing form errors.
 * @param {CountryResponse[]} props.countries - An array of available countries for selection.
 * @returns - A component that renders a multi-select input field for selecting associated countries with validation.
 */
export const CountriesField = ({control, errors, countries}: Props) => {
    const [selectedCountries, setSelectedCountries] = useState<CountryResponse[]>(control._formValues['countryCodes']);
    return (
        <Controller
            name="countryCodes"
            control={control}
            rules={{
                required: COUNTRIES_REQUIRED
            }}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.countryCodes})}>Países asociados</label>

                    <MultiSelect id={field.name}
                                 optionLabel={'name'}
                                 optionValue="code"
                                 itemTemplate={(option) => <CountryTemplate option={option}/>}
                                 value={selectedCountries}
                                 options={countries}
                                 className={classNames({'p-invalid': fieldState.error})}
                                 onChange={(e) => {
                                     field.onChange(e.value);
                                     setSelectedCountries(e.value);
                                 }}
                                 placeholder="Selecciona"/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}
