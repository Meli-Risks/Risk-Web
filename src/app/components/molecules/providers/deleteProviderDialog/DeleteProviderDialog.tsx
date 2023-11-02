import {ProviderResponse, ProviderService} from "../../../../lib";
import {useState} from "react";
import {RISK_DELETED_SUCCESSFULLY, UNEXPECTED_ERROR} from "../../../../utils/constants";
import {Dialog} from "primereact/dialog";
import {DeleteDialogFooter} from "../../../atoms";

type Props = {
    visibility: boolean;
    hideDialog: () => void;
    showSuccessMessage: (message: string) => void;
    showErrorMessage: (message: string) => void;
    currentProvider: ProviderResponse;
}

/**
 * DeleteProviderDialog component for rendering a dialog for confirming the deletion of a provider.
 * This component provides a dialog for confirming the deletion of a provider and displays success or error messages.
 *
 * @param {Props} props - An object containing the properties for the delete provider dialog.
 * @param {boolean} props.visibility - A boolean representing the visibility of the dialog.
 * @param {() => void} props.hideDialog - A function to hide the dialog.
 * @param {(message: string) => void} props.showSuccessMessage - A function to show a success message.
 * @param {(message: string) => void} props.showErrorMessage - A function to show an error message.
 * @param {ProviderResponse} props.currentProvider - The current provider to be deleted.
 * @returns - A component that renders a dialog for confirming provider deletion with success and error message handling.
 */
export const DeleteProviderDialog = ({
                                         hideDialog,
                                         visibility,
                                         currentProvider,
                                         showErrorMessage,
                                         showSuccessMessage
                                     }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Deletes the current provider, shows success or error messages, and handles the loading state.
     */
    const deleteProvider = (): void => {
        setLoading(true);
        ProviderService.delete(currentProvider.id)
            .then(response => {
                showSuccessMessage(response.data && response.data.message
                    ? response.data.message
                    : RISK_DELETED_SUCCESSFULLY);
                hideDialog();
            })
            .catch(reason => {
                const data = reason.response?.data;
                showErrorMessage(data && data.message
                    ? data.message
                    : UNEXPECTED_ERROR);
            })
            .finally((): void => {
                setLoading(false);
                hideDialog();
            });
    }

    return (
        <Dialog visible={visibility}
                closable={false}
                style={{width: '32rem'}}
                breakpoints={{'960px': '75vw', '641px': '90vw'}}
                header="Confirmación"
                modal
                footer={() => <DeleteDialogFooter hideDialog={hideDialog}
                                                  loading={loading}
                                                  deleteAction={deleteProvider}/>}
                onHide={hideDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                {currentProvider.name && (
                    <span>¿Estás seguro que deseas eliminar <b>{currentProvider.name}</b>?</span>
                )}
            </div>
        </Dialog>
    );
}
