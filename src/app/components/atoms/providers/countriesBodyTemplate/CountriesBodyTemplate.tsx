import {ProviderResponse} from "../../../../lib";
import React from "react";
import {Chip} from "primereact/chip";

type Props = {
    rowData: ProviderResponse;
}

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