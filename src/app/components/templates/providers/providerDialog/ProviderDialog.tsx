import {ProviderRequest, ProviderResponse, ProviderService} from "../../../../lib";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {
    PROVIDER_CREATED_SUCCESSFULLY,
    PROVIDER_UPDATED_SUCCESSFULLY,
    UNEXPECTED_ERROR
} from "../../../../utils/constants";
import {Dialog} from "primereact/dialog";
import {DialogFooter} from "../../../atoms";
import {ProviderForm} from "../../../organisms";

type Props = {
    visible: boolean;
    hideDialog: () => void;
    showSuccessMessage: (message: string) => void;
    showErrorMessage: (message: string) => void;
    currentProvider: ProviderResponse;
}

/**
 * `ProviderDialog` is a component used for creating or updating a provider. It displays a dialog box with a form for
 * entering provider details, including name and associated countries.
 *
 * @param {Props} props - The component's props.
 * @param {boolean} props.visible - Determines whether the dialog is visible.
 * @param {function} props.hideDialog - Function to hide the dialog.
 * @param {function} props.showSuccessMessage - Function to show a success message.
 * @param {function} props.showErrorMessage - Function to show an error message.
 * @param {ProviderResponse} props.currentProvider - The current provider being edited (if in edit mode).
 * @returns - The rendered React component.
 */
export const ProviderDialog = ({visible, hideDialog, showSuccessMessage, showErrorMessage, currentProvider}: Props) => {

    /**
     * State variable to manage loading state
     */
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Transforms a `ProviderResponse` into a `ProviderRequest` by extracting the name and associated country codes.
     * @param {ProviderResponse} response - The provider response to transform.
     * @returns {ProviderRequest} - The provider request.
     */
    const getProviderRequest = (response: ProviderResponse): ProviderRequest => {
        return {
            name: response.name,
            countryCodes: response.countries.map(country => country.code)
        }
    }

    /**
     * Form control and validation using react-hook-form.
     */
    const {
        control,
        formState: {errors},
        getValues,
        handleSubmit,
        reset
    } = useForm<ProviderRequest>();

    /**
     * Reset the form with the current provider's data when it changes
     */
    useEffect(() => reset(getProviderRequest(currentProvider)), [currentProvider]);

    /**
     * Saves the provider by either creating a new one or updating the existing one based on the current provider's ID.
     */
    const saveProvider = (): void => {
        setLoading(true);
        if (currentProvider.id) {
            updateRisk();
        } else {
            createProvider();
        }
    }

    /**
     * Creates a new provider with the data from the form.
     */
    const createProvider = (): void => {
        ProviderService.create(getValues())
            .then(response => {
                showSuccessMessage(response.data && response.data.message
                    ? response.data.message
                    : PROVIDER_CREATED_SUCCESSFULLY);
                reset();
                hideDialog();
            })
            .catch(reason => {
                const data = reason.response?.data;
                showErrorMessage(data && data.message
                    ? data.message
                    : UNEXPECTED_ERROR);
                reset();
            })
            .finally((): void => {
                setLoading(false);
            });
    }

    /**
     * Updates the existing provider with the data from the form.
     */
    const updateRisk = (): void => {
        ProviderService.update(getValues(), currentProvider.id)
            .then(response => {
                showSuccessMessage(response.data && response.data.message
                    ? response.data.message
                    : PROVIDER_UPDATED_SUCCESSFULLY);
                reset();
                hideDialog();
            })
            .catch(reason => {
                const data = reason.response?.data;
                showErrorMessage(data && data.message
                    ? data.message
                    : UNEXPECTED_ERROR);
                reset();
            })
            .finally((): void => {
                setLoading(false);
            });
    }

    return (
        <Dialog visible={visible}
                closable={false}
                style={{width: '32rem'}}
                breakpoints={{'960px': '75vw', '641px': '90vw'}}
                header="Detalles del proveedor" modal className="p-fluid"
                footer={() => <DialogFooter hideDialog={hideDialog}
                                            save={handleSubmit(saveProvider)}
                                            loading={loading}/>}
                onHide={hideDialog}>
                <ProviderForm control={control} errors={errors} />
        </Dialog>
    );
}
