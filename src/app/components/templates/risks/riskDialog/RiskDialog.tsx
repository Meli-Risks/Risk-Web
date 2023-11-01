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

export const RiskDialog = ({visible, hideDialog, showSuccessMessage, showErrorMessage, currentRisk}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

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

    const {
        control,
        formState: {errors},
        getValues,
        handleSubmit,
        reset
    } = useForm<RiskRequest>();

    useEffect(() => reset(getRiskRequest(currentRisk)), [currentRisk]);

    const saveRisk = (): void => {
        setLoading(true);
        if (currentRisk.id) {
            updateRisk();
        } else {
            createRisk();
        }
    }

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