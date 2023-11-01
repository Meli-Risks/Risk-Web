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

/**
 * ProviderField is a React component that renders an input field for selecting a provider in a form.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Control<RiskRequest>} props.control - Control object from react-hook-form for managing form inputs.
 * @param {ErrorType} props.errors - Object containing validation errors for the form.
 * @param {ProviderResponse[]} props.providers - An array of available provider options.
 * @param {Function} props.onSelectProvider - A function to handle provider selection.
 * @returns - The rendered React component.
 */
export const ProviderField = ({providers, onSelectProvider, control, errors}: Props) => {

    /**
     * Convert the provider data into SelectItem options.
     */
    const options: SelectItem[] = providers.map((provider: ProviderResponse): SelectItem => {
        return {label: provider.name, value: provider.id};
    })

    /**
     * Function to handle the change in provider selection.
     * @param providerId  id of the selected provider.
     */
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
