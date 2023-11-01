import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import React from "react";

type Props = {
    clearFilter: () => void;
    globalFilterValue: string;
    onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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