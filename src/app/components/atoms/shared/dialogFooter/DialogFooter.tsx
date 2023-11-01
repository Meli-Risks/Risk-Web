import {Button} from "primereact/button";

type Props = {
    hideDialog: () => void;
    save: () => void;
    loading: boolean;
}

/**
 * DialogFooter component for rendering the footer of a dialog.
 *
 * @param props - The component's properties.
 * @param props.hideDialog - A function to hide the dialog.
 * @param props.save - A function to perform the save action.
 * @param props.loading - A boolean indicating if the save action is in progress.
 * @returns A component that renders the footer of a dialog with "Save" and "Cancel" buttons.
 */
export const DialogFooter = ({hideDialog, save, loading}: Props) => {
    return (
        <>
            <Button label="Cancel" disabled={loading} icon="pi pi-times" outlined onClick={hideDialog}/>
            <Button label={loading? 'Guardando...': 'Guardar'}
                    disabled={loading}
                    loading={loading}
                    icon="pi pi-check"
                    onClick={save}/>
        </>
    );
}
