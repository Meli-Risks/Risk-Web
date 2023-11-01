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

export const RiskAdmin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [risks, setRisks] = useState<RiskResponse[]>([]);
    const [lazyState, setLazyState] = useState<LazyTableState>(INITIAL_RISK_TABLE_STATE);

    const toast = useRef(null);
    const [currentRisk, setCurrentRisk] = useState<RiskResponse>(EMPTY_RISK);
    const [riskDialog, setRiskDialog] = useState<boolean>(false);
    const [deleteRiskDialog, setDeleteRiskDialog] = useState<boolean>(false);

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
        setCurrentRisk(EMPTY_RISK);
        setRiskDialog(true);
    };

    const hideDialog = (): void => {
        setRiskDialog(false);
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

    const confirmDeleteRisk = (risk: RiskResponse): void => {
        setCurrentRisk({...risk});
        setDeleteRiskDialog(true);
    }

    const editRisk = (risk: RiskResponse): void => {
        setCurrentRisk({...risk});
        setRiskDialog(true);
    }

    const hideDeleteDialog = (): void => {
        setDeleteRiskDialog(false);
        setLazyState({...lazyState});
        setCurrentRisk(EMPTY_RISK);
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setLazyState(prevState => ({
            ...prevState,
            globalFilter: value,
        }));
        setGlobalFilterValue(value);
    };

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