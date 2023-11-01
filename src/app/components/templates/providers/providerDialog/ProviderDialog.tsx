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

export const ProviderDialog = ({visible, hideDialog, showSuccessMessage, showErrorMessage, currentProvider}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const getProviderRequest = (response: ProviderResponse): ProviderRequest => {
        return {
            name: response.name,
            countryCodes: response.countries.map(country => country.code)
        }
    }

    const {
        control,
        formState: {errors},
        getValues,
        handleSubmit,
        reset
    } = useForm<ProviderRequest>();

    useEffect(() => reset(getProviderRequest(currentProvider)), [currentProvider]);

    const saveProvider = (): void => {
        setLoading(true);
        if (currentProvider.id) {
            updateRisk();
        } else {
            createProvider();
        }
    }

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
