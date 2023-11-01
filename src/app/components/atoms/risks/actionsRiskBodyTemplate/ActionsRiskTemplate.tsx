import {Button} from "primereact/button";
import React from "react";
import {RiskResponse} from "../../../../lib";

type Props = {
    rowData: RiskResponse;
    editRisk: (rowData: RiskResponse) => void;
    confirmDeleteRisk: (rowData: RiskResponse) => void;
}

/**
 * ActionsRiskTemplate component for displaying actions (edit and delete) for a risk in a table.
 *
 * @param props - The component's properties.
 * @param props.rowData - The data of the risk for which actions are displayed.
 * @param props.editRisk - A callback function to edit the risk.
 * @param props.confirmDeleteRisk - A callback function to confirm and delete the risk.
 * @returns A component displaying edit and delete actions for a risk in a table.
 */
export const ActionsRiskTemplate = ({editRisk, confirmDeleteRisk, rowData}: Props) => {
    return (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editRisk(rowData)}/>
            <Button icon="pi pi-trash" rounded outlined severity="danger"
                    onClick={() => confirmDeleteRisk(rowData)}/>
        </>
    );
}
