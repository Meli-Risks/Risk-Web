export const validateEnum = (value: number, enumType: object) => {
    const numericValue: number = Number(value);
    const enumValues: number[] = Object.values(enumType).filter(value => !isNaN(Number(value))).map(Number);
    const minEnumValue: number = Math.min(...enumValues);
    const maxEnumValue: number = Math.max(...enumValues);
    return (numericValue >= minEnumValue && numericValue <= maxEnumValue) || 'El valor ingresado no es válido';
}

export const validateProviderId = (value: number | undefined) => {
    return (Number(value) && value !== 0) || 'Debes seleccionar un proveedor';
}

export const getSeverity = (impact: number): "success" | "info" | "warning" | "danger" | null | undefined => {
    switch (impact) {
        case 1:
            return 'success';

        case 2:
            return 'success';

        case 3:
            return 'info';

        case 4:
            return 'warning';

        default:
            return 'danger';
    }
};
