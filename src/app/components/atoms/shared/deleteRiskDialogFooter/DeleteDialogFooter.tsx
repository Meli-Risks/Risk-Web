import {Button} from "primereact/button";

type Props = {
    hideDialog: () => void;
    deleteAction: () => void;
    loading: boolean;
}

/**
 * DeleteDialogFooter component for rendering the footer of a delete confirmation dialog.
 *
 * @param props - The component's properties.
 * @param props.hideDialog - A function to hide the dialog.
 * @param props.deleteAction - A function to perform the delete action.
 * @param props.loading - A boolean indicating if the delete action is in progress.
 * @returns A component that renders the footer of a delete confirmation dialog with "Yes" and "No" buttons.
 */
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
