import React from "react";

type Props = {
    option: 'Despreciable' | 'Menor' | 'Moderado' | 'Significativo' | 'Severo';
}

export const ImpactItemTemplate = ({option}: Props) => {
    return (<span>{option}</span>);
}