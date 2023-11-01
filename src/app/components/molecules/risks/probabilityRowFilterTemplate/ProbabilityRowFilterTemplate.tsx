import {ColumnFilterElementTemplateOptions} from "primereact/column";
import React from "react";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {Probability} from "../../../../lib";
import {ProbabilityItemTemplate} from "../../../atoms";

type Props = {
    options: ColumnFilterElementTemplateOptions;
}

/**
 * ProbabilityRowFilterTemplate is a React component that provides a filter template for filtering data in a column.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {ColumnFilterElementTemplateOptions} props.options - Options for the column filter element template.
 * @returns - The rendered React component.
 */
export const ProbabilityRowFilterTemplate = ({options}: Props) => {

    /**
     * Generate an array of probability names based on the Probability enum
     */
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
