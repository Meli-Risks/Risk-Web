import {DataTableFilterMeta} from "primereact/datatable";

export interface LazyTableState {
    first: number;
    rows: number;
    page: number | undefined;
    sortField: string;
    sortOrder: number | null | undefined;
    filters: DataTableFilterMeta;
    globalFilter: string;
}

export const INITIAL_RISK_TABLE_STATE: LazyTableState = {
    first: 1,
    rows: 10,
    page: 0,
    sortField: '',
    sortOrder: 0,
    filters: {
        title: {value: '', matchMode: 'contains'},
        description: {value: '', matchMode: 'contains'},
        probability: {value: '', matchMode: 'contains'},
        impact: {value: '', matchMode: 'contains'},
        'provider.name': {value: '', matchMode: 'contains'},
        'country.code': {value: '', matchMode: 'contains'},
    },
    globalFilter: '',
}

export const INITIAL_PROVIDER_TABLE_STATE: LazyTableState = {
    first: 1,
    rows: 10,
    page: 0,
    sortField: '',
    sortOrder: 0,
    filters: {
        id: {value: '', matchMode: 'equals'},
        name: {value: '', matchMode: 'contains'},
    },
    globalFilter: '',
}

export type RiskParameters = {
    pageNumber?: number;
    pageSize?: number;
    orderBy?: string;
    orderType?: string;
    title?: string;
    description?: string;
    'country.code'?: string;
    impact?: string;
    probability?: string;
    'provider.name'?: string;
    globalFilter?: string;
}

export type ProviderParameters = {
    pageNumber?: number;
    pageSize?: number;
    orderBy?: string;
    orderType?: string;
    id?: number;
    name?: string;
    globalFilter?: string;
}
