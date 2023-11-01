import {Button} from "primereact/button";
import React from "react";

type Props = {
    clearFilter: () => void;
}

export const HeaderProviderTable = ({clearFilter}: Props) => {
    return (
        <div className="flex justify-content-start my-2">
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter}/>
        </div>
    );
}