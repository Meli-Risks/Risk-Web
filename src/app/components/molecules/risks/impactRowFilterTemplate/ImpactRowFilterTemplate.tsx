import {ColumnFilterElementTemplateOptions} from "primereact/column";
import {Impact} from "../../../../lib";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import React from "react";
import {ImpactItemTemplate} from "../../../atoms";

type Props = {
    options: ColumnFilterElementTemplateOptions;
}

/**
 * ImpactRowFilterTemplate is a React component that provides a filter template for filtering data in a column.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {ColumnFilterElementTemplateOptions} props.options - Options for the column filter element template.
 * @returns - The rendered React component.
 */
export const ImpactRowFilterTemplate = ({options}: Props) => {

    /**
     *  Generate an array of impact names based on the Impact enum
     */
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
