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