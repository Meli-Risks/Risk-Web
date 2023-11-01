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

export const RiskForm = ({control, errors}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [providers, setProviders] = useState<ProviderResponse[]>([]);
    const [countries, setCountries] = useState<CountryResponse[]>([]);

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

    useEffect((): void => {
        loadProviders();
    }, []);

    const setCountriesByProvider = (providerId: number, providersResponse: ProviderResponse[]): void => {
        let providerFound: ProviderResponse | undefined = providersResponse.find((provider: ProviderResponse): boolean => provider.id === providerId);
        if (providerFound === undefined) return;
        setCountries(providerFound.countries);
    }

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