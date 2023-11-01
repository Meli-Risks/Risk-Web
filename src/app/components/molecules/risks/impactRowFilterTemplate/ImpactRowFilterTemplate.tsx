import {ColumnFilterElementTemplateOptions} from "primereact/column";
import {Impact} from "../../../../lib";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import React from "react";
import {ImpactItemTemplate} from "../../../atoms";

type Props = {
    options: ColumnFilterElementTemplateOptions;
}

export const ImpactRowFilterTemplate = ({options}: Props) => {
    const impactNames: string[] = Object.keys(Impact).filter(key => isNaN(Number(key)));

    return (
        <Dropdown value={Impact[options.value]}
                  options={impactNames}
                  onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(Impact[e.value])}
                  itemTemplate={(option) => <ImpactItemTemplate option={option} />}
                  placeholder="Selecciona"
                  className="p-column-filter"
                  showClear/>
    );
}