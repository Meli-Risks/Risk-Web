import {Button} from "primereact/button";
import React from "react";

type Props = {
    clearFilter: () => void;
}

/**
 * HeaderProviderTable is a React component that renders a header for a provider table with a filter clear button.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.clearFilter - A function to clear the table filter.
 * @returns - The rendered React component.
 */
export const HeaderProviderTable = ({clearFilter}: Props) => {
    return (
        <div className="flex justify-content-start my-2">
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter}/>
        </div>
    );
}
