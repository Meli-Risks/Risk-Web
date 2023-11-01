import {Button} from "primereact/button";

type Props = {
    hideDialog: () => void;
    save: () => void;
    loading: boolean;
}

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