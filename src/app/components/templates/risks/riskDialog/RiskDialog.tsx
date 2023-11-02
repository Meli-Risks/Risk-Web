import {Dialog} from "primereact/dialog";
import {DialogFooter} from "../../../atoms";
import {RiskForm} from "../../../organisms";
import {RiskRequest, RiskResponse, RiskService} from "../../../../lib";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {RISK_CREATED_SUCCESSFULLY, RISK_UPDATED_SUCCESSFULLY, UNEXPECTED_ERROR} from "../../../../utils/constants";

type Props = {
    visible: boolean;
    hideDialog: () => void;
    showSuccessMessage: (message: string) => void;
    showErrorMessage: (message: string) => void;
    currentRisk: RiskResponse;
}

/**
 * `RiskDialog` is a component used for creating or updating a risk. It displays a dialog box with a form for
 * entering risk details, including title, description, impact, probability, provider, and country.
 *
 * @param {Props} props - The component's props.
 * @param {boolean} props.visible - Determines whether the dialog is visible.
 * @param {function} props.hideDialog - Function to hide the dialog.
 * @param {function} props.showSuccessMessage - Function to show a success message.
 * @param {function} props.showErrorMessage - Function to show an error message.
 * @param {RiskResponse} props.currentRisk - The current risk being edited (if in edit mode).
 */
export const RiskDialog = ({visible, hideDialog, showSuccessMessage, showErrorMessage, currentRisk}: Props) => {

    /**
     * State variable to manage loading state
     */
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Transforms a `RiskResponse` into a `RiskRequest` by extracting the relevant data fields.
     * @param {RiskResponse} response - The risk response to transform.
     * @returns {RiskRequest} - The risk request.
     */
    const getRiskRequest = (response: RiskResponse): RiskRequest => {
        return {
            title: response.title,
            description: response.description,
            impact: response.impact,
            probability: response.probability,
            providerId: response.provider.id,
            countryCode: response.country.code
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
    } = useForm<RiskRequest>();

    /**
     * Reset the form with the current risk's data when it changes
     */
    useEffect(() => reset(getRiskRequest(currentRisk)), [currentRisk]);

    /**
     * Saves the risk by either creating a new one or updating the existing one based on the current risk's ID.
     */
    const saveRisk = (): void => {
        setLoading(true);
        if (currentRisk.id) {
            updateRisk();
        } else {
            createRisk();
        }
    }

    /**
     * Creates a new risk with the data from the form.
     */
    const createRisk = (): void => {
        RiskService.create(getValues())
            .then(response => {
                showSuccessMessage(response.data && response.data.message
                    ? response.data.message
                    : RISK_CREATED_SUCCESSFULLY);
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
     * Updates the existing risk with the data from the form.
     */
    const updateRisk = (): void => {
        RiskService.update(getValues(), currentRisk.id)
            .then(response => {
                showSuccessMessage(response.data && response.data.message
                    ? response.data.message
                    : RISK_UPDATED_SUCCESSFULLY);
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
                header="Detalles del riesgo" modal className="p-fluid"
                footer={() => <DialogFooter hideDialog={hideDialog}
                                            save={handleSubmit(saveRisk)}
                                            loading={loading}/>}
                onHide={hideDialog}>
            <RiskForm control={control} errors={errors}/>
        </Dialog>
    );
}
