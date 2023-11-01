import React, {useEffect, useRef, useState} from "react";
import {RiskResponse, RiskService} from "../../../lib";
import {INITIAL_RISK_TABLE_STATE, LazyTableState} from "../../../utils/pagination";
import {DataTable, DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent} from "primereact/datatable";
import {SortOrder} from "primereact/api";
import {Column} from "primereact/column";
import {EMPTY_RISK, TITLE_RISK_ADMIN, UNEXPECTED_ERROR} from "../../../utils/constants";
import {Toolbar} from "primereact/toolbar";
import {RiskDialog} from "../../templates";
import {Toast} from "primereact/toast";
import {
    DeleteRiskDialog,
    HeaderRiskTable,
    ImpactRowFilterTemplate,
    ProbabilityRowFilterTemplate
} from "../../molecules";
import {
    ActionsRiskTemplate,
    CountryBodyTemplate,
    ImpactBodyTemplate,
    ProviderBodyTemplate,
    ToolbarTemplate
} from "../../atoms";
import {ProbabilityBodyTemplate} from "../../atoms/risks/probabilityBodyTemplate/ProbabilityBodyTemplate";

/**
 * `RiskAdmin` is a component for managing risks. It displays a list of risks in a table,
 * allows filtering, sorting, creating, editing, and deleting risks.
 */
export const RiskAdmin = () => {

    /**
     * State variable to manage loading status.
     */
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * State variable to hold the total number of records.
     */
    const [totalRecords, setTotalRecords] = useState<number>(0);

    /**
     * State variable to store the global filter value.
     */
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    /**
     * State variable to store an array of risk data.
     */
    const [risks, setRisks] = useState<RiskResponse[]>([]);

    /**
     * State variable to manage the table's lazy state.
     */
    const [lazyState, setLazyState] = useState<LazyTableState>(INITIAL_RISK_TABLE_STATE);

    /**
     * Ref to the Toast component for displaying messages.
     */
    const toast = useRef(null);

    /**
     * State variable to store the current risk being edited or created.
     */
    const [currentRisk, setCurrentRisk] = useState<RiskResponse>(EMPTY_RISK);

    /**
     * State variable to control the visibility of the risk dialog.
     */
    const [riskDialog, setRiskDialog] = useState<boolean>(false);

    /**
     * State variable to control the visibility of the delete risk dialog.
     */
    const [deleteRiskDialog, setDeleteRiskDialog] = useState<boolean>(false);

    /**
     * Function to load risk's data from the server
     */
    const loadData = (): void => {
        setLoading(true);
        RiskService.findPaginatedRisks(lazyState)
            .then(response => {
                setRisks(response.data.data.content);
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
     * Opens a new risk dialog for creating a new risk.
     */
    const openNew = (): void => {
        setCurrentRisk(EMPTY_RISK);
        setRiskDialog(true);
    };

    /**
     * Hides the risk dialog and resets the table's lazy state.
     */
    const hideDialog = (): void => {
        setRiskDialog(false);
        setLazyState({...lazyState});
    };

    /**
     * Shows a success message using the Toast component.
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
     * Shows an error message using the Toast component.
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
     * Sets the current risk for deletion and displays the delete risk dialog.
     *
     * @param risk - The risk to be deleted.
     */
    const confirmDeleteRisk = (risk: RiskResponse): void => {
        setCurrentRisk({...risk});
        setDeleteRiskDialog(true);
    }

    /**
     * Sets the current risk for editing and displays the risk dialog.
     *
     * @param risk - The risk to be edited.
     */
    const editRisk = (risk: RiskResponse): void => {
        setCurrentRisk({...risk});
        setRiskDialog(true);
    }

    /**
     * Hides the delete risk dialog and resets the table's lazy state and the current risk.
     */
    const hideDeleteDialog = (): void => {
        setDeleteRiskDialog(false);
        setLazyState({...lazyState});
        setCurrentRisk(EMPTY_RISK);
    };

    /**
     * Handles the change in the global filter input field and updates the lazy state accordingly.
     *
     * @param e - The event object for the input change.
     */
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setLazyState(prevState => ({
            ...prevState,
            globalFilter: value,
        }));
        setGlobalFilterValue(value);
    };

    /**
     * Clears all applied filters by resetting the table's lazy state to the initial state.
     */
    const clearFilter = (): void => {
        setLazyState(INITIAL_RISK_TABLE_STATE);
    }

    return (
        <div className="mt-5 mx-1 md:mx-6">
            <Toast ref={toast}/>
            <h1>{TITLE_RISK_ADMIN}</h1>
            <div className="card my-5">
                <Toolbar left={() => <ToolbarTemplate openNew={openNew}/>}/>
                <DataTable value={risks} lazy filterDisplay="row" dataKey="id" paginator responsiveLayout={'stack'}
                           first={lazyState.first} rows={lazyState.rows} totalRecords={totalRecords}
                           onPage={onPage} onSort={onSort} onFilter={onFilter} sortField={lazyState.sortField}
                           stateStorage="session" stateKey="risk-table"
                           sortOrder={(lazyState.sortOrder) ? lazyState.sortOrder as SortOrder : 0}
                           filters={lazyState.filters} loading={loading}
                           header={<HeaderRiskTable globalFilterValue={globalFilterValue}
                                                    onGlobalFilterChange={onGlobalFilterChange}
                                                    clearFilter={clearFilter}/>}>
                    <Column field="title" header="Título" sortable filter showFilterMatchModes={false}
                            filterPlaceholder="Buscar"/>
                    <Column field="description" header="Descripción" sortable filter showFilterMatchModes={false}
                            filterPlaceholder="Buscar"/>
                    <Column field="probability" header="Probabilidad"
                            body={(rowData) => <ProbabilityBodyTemplate risk={rowData}/>}
                            sortable filterElement={(options) => <ProbabilityRowFilterTemplate options={options}/>}
                            filter showFilterMenu={false} filterPlaceholder="Buscar"/>
                    <Column field="impact" header="Impacto" body={(rowData) => <ImpactBodyTemplate risk={rowData}/>}
                            sortable
                            filterElement={(options) => <ImpactRowFilterTemplate options={options}/>}
                            filter showFilterMenu={false} filterPlaceholder="Buscar"/>
                    <Column field="provider.name" sortable header="Proveedor" filterField="provider.name"
                            body={(rowData) => <ProviderBodyTemplate risk={rowData}/>} filter
                            showFilterMatchModes={false}
                            filterPlaceholder="Buscar"/>
                    <Column field="country.code" sortable filter showFilterMatchModes={false} header="Código del país"
                            body={(rowData) => <CountryBodyTemplate rowData={rowData}/>} filterPlaceholder="Buscar"/>
                    <Column exportable={false} style={{minWidth: '8rem'}}
                            body={(rowData) => <ActionsRiskTemplate editRisk={editRisk}
                                                                    confirmDeleteRisk={confirmDeleteRisk}
                                                                    rowData={rowData}/>}/>
                </DataTable>
            </div>
            <RiskDialog visible={riskDialog}
                        showErrorMessage={showErrorMessage}
                        showSuccessMessage={showSuccessMessage}
                        hideDialog={hideDialog}
                        currentRisk={currentRisk}/>
            <DeleteRiskDialog visibility={deleteRiskDialog}
                              hideDialog={hideDeleteDialog}
                              showSuccessMessage={showSuccessMessage}
                              showErrorMessage={showErrorMessage}
                              currentRisk={currentRisk}/>
        </div>
    );
}
