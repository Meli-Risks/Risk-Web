import {ProviderResponse} from "../../../../lib";
import React from "react";
import {Chip} from "primereact/chip";

type Props = {
    rowData: ProviderResponse;
}

/**
 * CountriesBodyTemplate component for displaying a list of countries associated with a provider in a table.
 *
 * @param props - The component's properties.
 * @param props.rowData - The data of the provider containing a list of countries.
 * @returns A component that displays a list of countries as chips associated with a provider in a table.
 */
export const CountriesBodyTemplate = ({rowData}: Props) => {
    return (
        <>
            {rowData.countries.map(country =>
                <Chip key={country.code}
                      className="m-1"
                      label={country.flag + ' ' +country.name}/>)}
        </>
    );
}
