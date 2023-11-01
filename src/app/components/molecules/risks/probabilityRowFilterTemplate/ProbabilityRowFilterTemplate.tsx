import {ColumnFilterElementTemplateOptions} from "primereact/column";
import React from "react";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {Probability} from "../../../../lib";
import {ProbabilityItemTemplate} from "../../../atoms";

type Props = {
    options: ColumnFilterElementTemplateOptions;
}

export const ProbabilityRowFilterTemplate = ({options}: Props) => {
    const probabilityNames: string[] = Object.keys(Probability).filter(key => isNaN(Number(key)));

    return (
        <Dropdown value={Probability[options.value]}
                  options={probabilityNames}
                  onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(Probability[e.value])}
                  itemTemplate={option => <ProbabilityItemTemplate option={option} />}
                  placeholder="Selecciona"
                  className="p-column-filter"
                  showClear/>
    );
}