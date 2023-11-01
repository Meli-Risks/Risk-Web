import {Button} from "primereact/button";

type Props = {
    hideDialog: () => void;
    deleteAction: () => void;
    loading: boolean;
}
export const DeleteDialogFooter = ({hideDialog, deleteAction, loading}: Props) => {
  return (
      <>
          <Button label="No" icon="pi pi-times" disabled={loading} outlined onClick={hideDialog} />
          <Button label={loading? 'Borrando...': 'Sí'}
                  icon="pi pi-check"
                  loading={loading}
                  disabled={loading}
                  severity="danger"
                  onClick={deleteAction} />
      </>
  );
}