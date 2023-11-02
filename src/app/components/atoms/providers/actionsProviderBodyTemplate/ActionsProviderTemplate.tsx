import {ProviderResponse} from "../../../../lib";
import {Button} from "primereact/button";
import React from "react";

type Props = {
    rowData: ProviderResponse;
    editProvider: (rowData: ProviderResponse) => void;
    confirmDeleteProvider: (rowData: ProviderResponse) => void;
}

/**
 * ActionsProviderTemplate component for displaying actions (edit and delete) for a provider in a table.
 *
 * @param props - The component's properties.
 * @param props.rowData - The data of the provider for which actions are displayed.
 * @param props.editProvider - A callback function to edit the provider.
 * @param props.confirmDeleteProvider - A callback function to confirm and delete the provider.
 * @returns A component displaying edit and delete actions for a provider in a table.
 */
export const ActionsProviderTemplate = ({editProvider, confirmDeleteProvider, rowData}: Props) => {
    return (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProvider(rowData)}/>
            <Button icon="pi pi-trash" rounded outlined severity="danger"
                    onClick={() => confirmDeleteProvider(rowData)}/>
        </>
    );
}
