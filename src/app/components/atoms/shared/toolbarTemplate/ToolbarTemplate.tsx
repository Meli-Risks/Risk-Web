import {Button} from "primereact/button";
import React from "react";

type Props = {
    openNew: () => void;
}

export const ToolbarTemplate = ({openNew}: Props) => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button severity="info" label="Crear" icon="pi pi-plus" size="small" onClick={openNew} rounded/>
        </div>
    );
}