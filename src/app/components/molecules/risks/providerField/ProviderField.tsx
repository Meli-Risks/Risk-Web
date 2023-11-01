import {Control, Controller} from "react-hook-form";
import {ProviderResponse, RiskRequest} from "../../../../lib";
import {ErrorType, FormErrorMessage} from "../../../atoms";
import {SelectItem} from "primereact/selectitem";
import {PROBABILITY_REQUIRED} from "../../../../utils/constants";
import {classNames} from "primereact/utils";
import {Dropdown} from "primereact/dropdown";
import {validateProviderId} from "../../../../utils/risks";

type Props = {
    control: Control<RiskRequest>;
    errors: ErrorType;
    providers: ProviderResponse[];
    onSelectProvider: (providerId: number) => void;
}

export const ProviderField = ({providers, onSelectProvider, control, errors}: Props) => {
    const options: SelectItem[] = providers.map((provider: ProviderResponse): SelectItem => {
        return {label: provider.name, value: provider.id};
    })

    const onChangeValue = (providerId: number): number => {
        onSelectProvider(providerId);
        return providerId;
    }

    return (
        <Controller
            name="providerId"
            control={control}
            rules={{
                required: PROBABILITY_REQUIRED,
                validate: (value: number) => validateProviderId(value),
            }}
            render={({field, fieldState}) => (
                <>
                    <label htmlFor={field.name}
                           className={classNames({'p-error': errors.providerId})}>Proveedor</label>
                    <Dropdown id={field.name}
                              value={field.value}
                              options={options}
                              className={classNames({'p-invalid': fieldState.error})}
                              onChange={(e) => field.onChange(onChangeValue(e.target.value))}
                              placeholder="Selecciona"/>
                    <FormErrorMessage errorsForm={errors} name={field.name}></FormErrorMessage>
                </>
            )}
        />
    );
}