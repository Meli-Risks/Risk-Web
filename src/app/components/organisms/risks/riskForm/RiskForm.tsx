import {Control} from "react-hook-form";
import {ProviderResponse, CountryResponse, ProviderService, RiskRequest} from "../../../../lib";
import {
    CountryField,
    DescriptionField,
    ImpactField,
    ProbabilityField,
    ProviderField,
    TitleField
} from "../../../molecules";
import {ErrorType} from "../../../atoms";
import {useEffect, useState} from "react";
import {LOADING_PROVIDERS} from "../../../../utils/constants";

type Props = {
    control: Control<RiskRequest>;
    errors: ErrorType;
}

/**
 * RiskForm is a React component that represents a form for creating or editing risk information.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Control<RiskRequest>} props.control - Control object from react-hook-form for managing form inputs.
 * @param {ErrorType} props.errors - Object containing validation errors for the form.
 * @returns - The rendered React component.
 */
export const RiskForm = ({control, errors}: Props) => {

    /**
     * State to manage loading state
     */
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * State to store the list of providers
     */
    const [providers, setProviders] = useState<ProviderResponse[]>([]);

    /**
     * State to store the list of countries
     */
    const [countries, setCountries] = useState<CountryResponse[]>([]);

    /**
     * Function to load the list of providers
     */
    const loadProviders = (): void => {
        setLoading(true);
        ProviderService.findAll()
            .then(response => {
                setProviders(response.data.data.content);
                setCountriesByProvider(control._formValues['providerId'], response.data.data.content);
            })
            .catch(() => {})
            .finally((): void => {
                setLoading(false);
            });
    };

    /**
     * Load providers on component mount
     */
    useEffect((): void => {
        loadProviders();
    }, []);

    /**
     * Function to set countries based on the selected provider.
     *
     * @param {number} providerId - The ID of the selected provider.
     * @param {ProviderResponse[]} providersResponse - The list of provider responses to search for the selected provider.
     */
    const setCountriesByProvider = (providerId: number, providersResponse: ProviderResponse[]): void => {
        let providerFound: ProviderResponse | undefined = providersResponse.find((provider: ProviderResponse): boolean => provider.id === providerId);
        if (providerFound === undefined) return;
        setCountries(providerFound.countries);
    }

    /**
     * Function to handle the selection of a provider and update the list of countries accordingly.
     *
     * @param {number} providerId - The ID of the selected provider.
     */
    const onSelectedProvider = (providerId: number): void => {
        let providerFound: ProviderResponse | undefined = providers.find((provider: ProviderResponse): boolean => provider.id === providerId);
        if (providerFound === undefined) return;
        setCountries(providerFound.countries);
    }

    return (
        <>
            <div className="field">
                <TitleField control={control} errors={errors}></TitleField>
            </div>
            <div className="field">
                <DescriptionField control={control} errors={errors}></DescriptionField>
            </div>
            <div className="formgrid grid">
                <div className="field col">
                    <ProbabilityField control={control} errors={errors}></ProbabilityField>
                </div>
                <div className="field col">
                    <ImpactField control={control} errors={errors}></ImpactField>
                </div>
            </div>
            <div className="field">
                {loading
                    ? <span>{LOADING_PROVIDERS}</span>
                    : <ProviderField control={control}
                                     errors={errors}
                                     providers={providers}
                                     onSelectProvider={onSelectedProvider}/>}
            </div>
            <div className="field">
                {control._formValues['providerId'] === 0 || loading
                    ? <div></div>
                    : <CountryField control={control} errors={errors} countries={countries}/>}
            </div>
        </>
    );
}