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

export const ProviderAdmin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [providers, setProviders] = useState<ProviderResponse[]>([]);
    const [lazyState, setLazyState] = useState<LazyTableState>(INITIAL_PROVIDER_TABLE_STATE);

    const toast = useRef(null);
    const [currentProvider, setCurrentProvider] = useState<ProviderResponse>(EMPTY_PROVIDER);
    const [providerDialog, setProviderDialog] = useState<boolean>(false);
    const [deleteProviderDialog, setDeleteProviderDialog] = useState<boolean>(false);

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

    useEffect((): void => {
        loadData();
    }, [lazyState]);

    const onPage = (event: DataTablePageEvent): void => {
        setLazyState((prevState: LazyTableState) => ({
            ...prevState,
            first: event.first,
            rows: event.rows,
            page: event.page
        }));
    };

    const onSort = (event: DataTableSortEvent): void => {
        setLazyState((prevState: LazyTableState) => ({
            ...prevState,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
        }));
    };

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

    const openNew = (): void => {
        setCurrentProvider(EMPTY_PROVIDER);
        setProviderDialog(true);
    };

    const hideDialog = (): void => {
        setProviderDialog(false);
        setLazyState({...lazyState});
    };

    const showSuccessMessage = (message: string): void => {
        if (toast?.current) {
            // @ts-ignore
            toast.current.show({severity: 'success', summary: 'Éxito', detail: message});
        }
    };

    const showErrorMessage = (message: string): void => {
        if (toast?.current) {
            // @ts-ignore
            toast.current.show({severity: 'error', summary: 'Error', detail: message});
        }
    };

    const confirmDeleteProvider = (provider: ProviderResponse): void => {
        setCurrentProvider({...provider});
        setDeleteProviderDialog(true);
    }

    const editProvider = (provider: ProviderResponse): void => {
        setCurrentProvider({...provider});
        setProviderDialog(true);
    }

    const hideDeleteDialog = (): void => {
        setDeleteProviderDialog(false);
        setLazyState({...lazyState});
        setCurrentProvider(EMPTY_PROVIDER);
    };

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