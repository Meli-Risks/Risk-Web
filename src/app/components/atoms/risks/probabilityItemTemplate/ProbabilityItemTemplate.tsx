import React from "react";

type Props = {
    option: 'Improbable' | 'Ocasional' | 'Moderado' | 'Frecuente' | 'Constante';
}

export const ProbabilityItemTemplate = ({option}: Props) => {
  return (<span>{option}</span>);
}
