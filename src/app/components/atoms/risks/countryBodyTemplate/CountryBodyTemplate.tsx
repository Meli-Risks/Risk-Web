import {RiskResponse} from "../../../../lib";
import React from "react";

type Props = {
    rowData: RiskResponse;
}

/**
 * CountryBodyTemplate component for displaying the country information associated with a risk in a table.
 *
 * @param props - The component's properties.
 * @param props.rowData - The data of the risk containing country information.
 * @returns A component that displays the country code and name associated with a risk in a table.
 */
export const CountryBodyTemplate = ({rowData}: Props) => {
    return (
        <>
            {rowData.country.code} - {rowData.country.name}
        </>
    );
}
