import {Control} from "react-hook-form";
import {CountryResponse, CountryService, ProviderRequest} from "../../../../lib";
import {ErrorType} from "../../../atoms";
import {useEffect, useState} from "react";
import {CountriesField, NameField} from "../../../molecules";
import {LOADING_COUNTRIES} from "../../../../utils/constants";

type Props = {
    control: Control<ProviderRequest>;
    errors: ErrorType;
}

/**
 * ProviderForm is a React component that represents a form for creating or editing provider information.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Control<ProviderRequest>} props.control - Control object from react-hook-form for managing form inputs.
 * @param {ErrorType} props.errors - Object containing validation errors for the form.
 * @returns - The rendered React component.
 */
export const ProviderForm = ({control, errors}: Props) => {

    /**
     * State variable to manage loading state
     */
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * State variable to manage countries retried from the API
     */
    const [countries, setCountries] = useState<CountryResponse[]>([]);

    /**
     * Function to load the list of countries
     */
    const loadCountries = (): void => {
        setLoading(true);
        CountryService.findAll()
            .then(response => {
                setCountries(response.data.data);
            })
            .catch(() => {
            })
            .finally((): void => {
                setLoading(false);
            });
    };

    /**
     * Load countries on component mount
     */
    useEffect((): void => {
        loadCountries();
    }, []);

    return (
        <>
            <div className="field">
                <NameField control={control} errors={errors}/>
            </div>
            <div className="field">
                {loading
                    ? <div>{LOADING_COUNTRIES}</div>
                    : <CountriesField control={control} errors={errors} countries={countries}/>}
            </div>
        </>
    );
}
