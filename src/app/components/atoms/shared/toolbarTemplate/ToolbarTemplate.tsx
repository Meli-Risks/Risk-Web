import {Button} from "primereact/button";
import React from "react";

type Props = {
    openNew: () => void;
}

/**
 * ToolbarTemplate component for rendering a toolbar with a "Create" button.
 * This component provides a button to create a new item or perform a creation action.
 *
 * @param {Props} props - An object containing the properties of the toolbar.
 * @param {Function} props.openNew - A function to open a new item creation form or perform a creation action.
 * @returns A component that renders the toolbar with a "Create" button.
 */
export const ToolbarTemplate = ({openNew}: Props) => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button severity="info" label="Crear" icon="pi pi-plus" size="small" onClick={openNew} rounded/>
        </div>
    );
}
