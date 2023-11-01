import {RiskResponse} from "../../../../lib";
import React from "react";

type Props = {
    rowData: RiskResponse;
}

export const CountryBodyTemplate = ({rowData}: Props) => {
    return (
        <>
            {rowData.country.code} - {rowData.country.name}
        </>
    );
}