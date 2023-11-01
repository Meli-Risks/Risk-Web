import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import React from "react";

type Props = {
    clearFilter: () => void;
    globalFilterValue: string;
    onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * HeaderRiskTable is a React component that renders a header for a table with filter and search functionality.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.clearFilter - A function to clear the table filter.
 * @param {string} props.globalFilterValue - The current value of the global filter input.
 * @param {Function} props.onGlobalFilterChange - A function to handle changes in the global filter input.
 * @returns - The rendered React component.
 */
export const HeaderRiskTable = ({clearFilter, onGlobalFilterChange, globalFilterValue}: Props) => {
    return (
        <div className="flex justify-content-between my-2">
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter}/>
            <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar..."/>
                </span>
        </div>
    );
}