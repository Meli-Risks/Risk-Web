import {Dialog} from "primereact/dialog";
import {DeleteDialogFooter} from "../../../atoms";
import {RiskResponse, RiskService} from "../../../../lib";
import {useState} from "react";
import {RISK_DELETED_SUCCESSFULLY, UNEXPECTED_ERROR} from "../../../../utils/constants";

type Props = {
    visibility: boolean;
    hideDialog: () => void;
    showSuccessMessage: (message: string) => void;
    showErrorMessage: (message: string) => void;
    currentRisk: RiskResponse;
}

/**
 * Component for displaying a confirmation dialog for deleting a risk.
 *
 * @param {Props} props - The properties and callback functions for the component.
 * @param {boolean} props.visibility - Determines whether the dialog is visible.
 * @param {function} props.hideDialog - Callback function to hide the dialog.
 * @param {function} props.showSuccessMessage - Callback function to show a success message.
 * @param {function} props.showErrorMessage - Callback function to show an error message.
 * @param {RiskResponse} props.currentRisk - The risk to be deleted.
 * @returns - The component representing the delete risk confirmation dialog.
 */
export const DeleteRiskDialog = ({
                                     hideDialog,
                                     visibility,
                                     currentRisk,
                                     showErrorMessage,
                                     showSuccessMessage
                                 }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Deletes a risk using RiskService and handles success and error cases, while managing the loading state.
     */
    const deleteRisk = (): void => {
        setLoading(true);
        RiskService.delete(currentRisk.id)
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
                                                  deleteAction={deleteRisk}/>}
                onHide={hideDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                {currentRisk.title && (
                    <span>¿Estás seguro que deseas eliminar <b>{currentRisk.title}</b>?</span>
                )}
            </div>
        </Dialog>
    );
}
