import React from "react";

type Props = {
    option: 'Despreciable' | 'Menor' | 'Moderado' | 'Significativo' | 'Severo';
}

/**
 * ImpactItemTemplate component for displaying an impact option.
 *
 * @param props - The component's properties.
 * @param props.option - The impact option to be displayed according to the Impact enum.
 * @returns A component for rendering an impact option.
 */
export const ImpactItemTemplate = ({option}: Props) => {
    return (<span>{option}</span>);
}
