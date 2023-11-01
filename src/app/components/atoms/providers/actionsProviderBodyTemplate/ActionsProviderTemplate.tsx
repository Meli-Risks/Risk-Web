import {ProviderResponse} from "../../../../lib";
import {Button} from "primereact/button";
import React from "react";

type Props = {
    rowData: ProviderResponse;
    editProvider: (rowData: ProviderResponse) => void;
    confirmDeleteProvider: (rowData: ProviderResponse) => void;
}

export const ActionsProviderTemplate = ({editProvider, confirmDeleteProvider, rowData}: Props) => {
    return (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProvider(rowData)}/>
            <Button icon="pi pi-trash" rounded outlined severity="danger"
                    onClick={() => confirmDeleteProvider(rowData)}/>
        </>
    );
}