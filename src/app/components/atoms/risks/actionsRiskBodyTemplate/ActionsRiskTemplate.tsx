import {Button} from "primereact/button";
import React from "react";
import {RiskResponse} from "../../../../lib";

type Props = {
    rowData: RiskResponse;
    editRisk: (rowData: RiskResponse) => void;
    confirmDeleteRisk: (rowData: RiskResponse) => void;
}

export const ActionsRiskTemplate = ({editRisk, confirmDeleteRisk, rowData}: Props) => {
    return (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editRisk(rowData)}/>
            <Button icon="pi pi-trash" rounded outlined severity="danger"
                    onClick={() => confirmDeleteRisk(rowData)}/>
        </>
    );
}