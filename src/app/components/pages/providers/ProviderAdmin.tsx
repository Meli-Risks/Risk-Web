import './ProviderAdmin.css';
import React, {useEffect, useRef, useState} from "react";
import {ProviderResponse, ProviderService} from "../../../lib";
import {INITIAL_PROVIDER_TABLE_STATE, LazyTableState} from "../../../utils/pagination";
import {EMPTY_PROVIDER, TITLE_PROVIDER_ADMIN, UNEXPECTED_ERROR} from '../../../utils/constants';
import {DataTable, DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent} from 'primereact/datatable';
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {ActionsProviderTemplate, CountriesBodyTemplate, ToolbarTemplate} from "../../atoms";
import {SortOrder} from "primereact/api";
import {HeaderProviderTable} from "../../molecules";
import {Column} from "primereact/column";
import {ProviderDialog} from "../../templates";
import {DeleteProviderDialog} from "../../molecules/providers/deleteProviderDialog/DeleteProviderDialog";

/**
 * `ProviderAdmin` is a component for managing providers. It displays a list of providers in a table,
 * allows filtering, sorting, creating, editing, and deleting providers.
 */
export const ProviderAdmin = () => {

    /**
     * `loading` is a state variable used to indicate whether data is being loaded or not.
     */
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * `totalRecords` represents the total number of records available in the data.
     */
    const [totalRecords, setTotalRecords] = useState<number>(0);

    /**
     * `providers` is a state variable that holds an array of ProviderResponse objects, representing the providers to be displayed.
     */
    const [providers, setProviders] = useState<ProviderResponse[]>([]);

    /**
     * `lazyState` is a state variable that holds the current state of the data table, including sorting, filtering, and pagination information.
     */
    const [lazyState, setLazyState] = useState<LazyTableState>(INITIAL_PROVIDER_TABLE_STATE);

    /**
     * `toast` is a reference to the Toast component for displaying success and error messages.
     */
    const toast = useRef(null);

    /**
     * `currentProvider` is a state variable representing the provider currently being viewed or edited.
     */
    const [currentProvider, setCurrentProvider] = useState<ProviderResponse>(EMPTY_PROVIDER);

    /**
     * `providerDialog` is a state variable that determines whether the provider dialog for creating/editing providers is visible or not.
     */
    const [providerDialog, setProviderDialog] = useState<boolean>(false);

    /**
     * `deleteProviderDialog` is a state variable that determines whether the delete provider dialog is visible or not.
     */
    const [deleteProviderDialog, setDeleteProviderDialog] = useState<boolean>(false);

    /**
     * Function to load provider's data from the server
     */
    const loadData = (): void => {
        setLoading(true);
        ProviderService.findPaginatedProviders(lazyState)
            .then(response => {
                setProviders(response.data.data.content);
                setTotalRecords(response.data.data.totalRecords);
            })
            .catch(reason => {
                const data = reason.response?.data;
                showErrorMessage(data && data.message
                    ? data.message
                    : UNEXPECTED_ERROR);
            })
            .finally((): void => {
                setLoading(false);
            });
    };

    /**
     * Load data initially and whenever the table state changes
     */
    useEffect((): void => {
        loadData();
    }, [lazyState]);

    /**
     * Handles page change in the data table.
     *
     * @param event - The DataTablePageEvent object containing page change information.
     */
    const onPage = (event: DataTablePageEvent): void => {
        setLazyState((prevState: LazyTableState) => ({
            ...prevState,
            first: event.first,
            rows: event.rows,
            page: event.page
        }));
    };

    /**
     * Handles sorting change in the data table.
     *
     * @param event - The DataTableSortEvent object containing sorting information.
     */
    const onSort = (event: DataTableSortEvent): void => {
        setLazyState((prevState: LazyTableState) => ({
            ...prevState,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
        }));
    };

    /**
     * Handles filter change in the data table.
     *
     * @param event - The DataTableFilterEvent object containing filter change information.
     */
    const onFilter = (event: DataTableFilterEvent): void => {
        setLazyState((prevState: LazyTableState) => ({
            ...prevState,
            rows: event.rows,
            page: event.page,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
            filters: event.filters,
        }));
    };

    /**
     * Opens a new provider dialog for creating a new provider or editing an existing one.
     */
    const openNew = (): void => {
        setCurrentProvider(EMPTY_PROVIDER);
        setProviderDialog(true);
    };

    /**
     * Hides the provider dialog and resets the state of the data table.
     */
    const hideDialog = (): void => {
        setProviderDialog(false);
        setLazyState({...lazyState});
    };

    /**
     * Displays a success message in a toast notification.
     *
     * @param message - The success message to display.
     */
    const showSuccessMessage = (message: string): void => {
        if (toast?.current) {
            // @ts-ignore
            toast.current.show({severity: 'success', summary: 'Éxito', detail: message});
        }
    };

    /**
     * Displays an error message in a toast notification.
     *
     * @param message - The error message to display.
     */
    const showErrorMessage = (message: string): void => {
        if (toast?.current) {
            // @ts-ignore
            toast.current.show({severity: 'error', summary: 'Error', detail: message});
        }
    };

    /**
     * Initiates the deletion process for a provider by confirming the action.
     *
     * @param provider - The provider to be deleted.
     */
    const confirmDeleteProvider = (provider: ProviderResponse): void => {
        setCurrentProvider({...provider});
        setDeleteProviderDialog(true);
    }

    /**
     * Initiates the editing process for a provider.
     *
     * @param provider - The provider to be edited.
     */
    const editProvider = (provider: ProviderResponse): void => {
        setCurrentProvider({...provider});
        setProviderDialog(true);
    }

    /**
     * Hides the delete provider dialog and resets the data table state.
     */
    const hideDeleteDialog = (): void => {
        setDeleteProviderDialog(false);
        setLazyState({...lazyState});
        setCurrentProvider(EMPTY_PROVIDER);
    };

    /**
     * Clears any applied filters on the data table and resets the table to its initial state.
     */
    const clearFilter = (): void => {
        setLazyState(INITIAL_PROVIDER_TABLE_STATE);
    }

    return (
        <div className="mt-5 mx-1 md:mx-6">
            <Toast ref={toast}/>
            <h1>{TITLE_PROVIDER_ADMIN}</h1>
            <div className="card my-5">
                <Toolbar left={() => <ToolbarTemplate openNew={openNew}/>}/>
                <DataTable value={providers} lazy filterDisplay="row" dataKey="id" paginator responsiveLayout={'stack'}
                           first={lazyState.first} rows={lazyState.rows} totalRecords={totalRecords}
                           onSort={onSort} onPage={onPage} onFilter={onFilter} sortField={lazyState.sortField}
                           stateStorage="session" stateKey="provider-table"
                           sortOrder={(lazyState.sortOrder) ? lazyState.sortOrder as SortOrder : 0}
                           filters={lazyState.filters} loading={loading}
                           header={<HeaderProviderTable clearFilter={clearFilter}/>}>
                    <Column field="id" header="Id" sortable filter showFilterMatchModes={false}
                            filterPlaceholder="Buscar"/>
                    <Column field="name" header="Nombre" sortable filter showFilterMatchModes={false}
                            filterPlaceholder="Buscar"/>
                    <Column field="coutryCodes" header="Países" showFilterMatchModes={false}
                            body={(rowData) => <CountriesBodyTemplate rowData={rowData}/>}
                            filterPlaceholder="Buscar"/>
                    <Column exportable={false} style={{minWidth: '8rem'}}
                            body={(rowData) => <ActionsProviderTemplate editProvider={editProvider}
                                                                        confirmDeleteProvider={confirmDeleteProvider}
                                                                        rowData={rowData}/>}/>
                </DataTable>
            </div>
            <ProviderDialog visible={providerDialog}
                            showErrorMessage={showErrorMessage}
                            showSuccessMessage={showSuccessMessage}
                            hideDialog={hideDialog}
                            currentProvider={currentProvider}/>
            <DeleteProviderDialog visibility={deleteProviderDialog}
                                  hideDialog={hideDeleteDialog}
                                  showSuccessMessage={showSuccessMessage}
                                  showErrorMessage={showErrorMessage}
                                  currentProvider={currentProvider}/>
        </div>
    );
}
