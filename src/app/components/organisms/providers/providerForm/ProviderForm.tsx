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

export const ProviderForm = ({control, errors}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState<CountryResponse[]>([]);

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