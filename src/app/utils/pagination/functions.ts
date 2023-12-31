import {LazyTableState, ProviderParameters, RiskParameters} from "./pagination";

/**
 * Casts LazyTableState to RiskParameters for querying risk data.
 *
 * @param lazyTableState - The LazyTableState containing filter and pagination information.
 * @returns RiskParameters with the extracted values from LazyTableState.
 */
export const castRiskParameters = (lazyTableState: LazyTableState): RiskParameters => {
    const { page, rows, sortField, sortOrder, filters, globalFilter } = lazyTableState;
    return {
        pageNumber: page === undefined ? undefined : page + 1,
        pageSize: rows === undefined ? undefined : rows,
        orderBy: sortField === '' ? undefined : sortField,
        orderType: getOrderType(sortOrder),
        // @ts-ignore
        title: filters.title.value === '' ? undefined : filters.title.value,
        // @ts-ignore
        description: filters.description.value === '' ? undefined : filters.description.value,
        // @ts-ignore
        'country.code': filters['country.code'].value === '' ? undefined : filters['country.code'].value,
        // @ts-ignore
        impact: filters.impact.value === '' ? undefined : filters.impact.value,
        // @ts-ignore
        probability: filters.probability.value === '' ? undefined : filters.probability.value,
        // @ts-ignore
        'provider.name': filters['provider.name'].value === '' ? undefined : filters['provider.name'].value,
        globalFilter: globalFilter === '' ? undefined : globalFilter
    };
}

/**
 * Extracts the order type ('asc' or 'desc') based on sortOrder.
 *
 * @param sortOrder - The sorting order value.
 * @returns The order type ('asc', 'desc', or undefined).
 */
const getOrderType = (sortOrder: number | null | undefined): string | undefined => {
    return sortOrder === 1 ? 'asc' : sortOrder === undefined || sortOrder === 0 ? undefined : 'desc';
}

/**
 * Casts LazyTableState to ProviderParameters for querying provider data.
 *
 * @param lazyTableState - The LazyTableState containing filter and pagination information.
 * @returns ProviderParameters with the extracted values from LazyTableState.
 */
export const castProviderParameters = (lazyTableState: LazyTableState): ProviderParameters => {
    const { page, rows, sortField, sortOrder, filters } = lazyTableState;
    return {
        pageNumber: page === undefined ? undefined : page + 1,
        pageSize: rows === undefined ? undefined : rows,
        orderBy: sortField === '' ? undefined : sortField,
        orderType: getOrderType(sortOrder),
        // @ts-ignore
        id: filters.id.value === '' ? undefined : filters.id.value,
        // @ts-ignore
        name: filters.name.value === '' ? undefined : filters.name.value,
    }
}
