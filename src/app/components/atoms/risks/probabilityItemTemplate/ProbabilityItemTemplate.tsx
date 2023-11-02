import React from "react";

type Props = {
    option: 'Improbable' | 'Ocasional' | 'Moderado' | 'Frecuente' | 'Constante';
}

/**
 * ProbabilityItemTemplate component for displaying a probability option.
 *
 * @param props - The component's properties.
 * @param props.option - The probability option to be displayed according to the Probability enum.
 * @returns A component for rendering a probability option.
 */
export const ProbabilityItemTemplate = ({option}: Props) => {
  return (<span>{option}</span>);
}
