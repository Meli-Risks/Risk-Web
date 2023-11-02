/**
 * Validates if a numeric value belongs to a given numeric enum.
 *
 * @param value - The value to be validated.
 * @param enumType - The numeric enum object for validation.
 * @returns True if the value is within the enum range; otherwise, an error message.
 */
export const validateEnum = (value: number, enumType: object) => {
    const numericValue: number = Number(value);
    const enumValues: number[] = Object.values(enumType).filter(value => !isNaN(Number(value))).map(Number);
    const minEnumValue: number = Math.min(...enumValues);
    const maxEnumValue: number = Math.max(...enumValues);
    return (numericValue >= minEnumValue && numericValue <= maxEnumValue) || 'El valor ingresado no es válido';
}

/**
 * Validates if a provider ID is valid.
 *
 * @param value - The provider ID to be validated.
 * @returns True if the provider ID is valid; otherwise, an error message.
 */
export const validateProviderId = (value: number | undefined) => {
    return (Number(value) && value !== 0) || 'Debes seleccionar un proveedor';
}

/**
 * Determines the severity level based on the impact value.
 *
 * @param impact - The impact value.
 * @returns The severity level ("success," "info," "warning," "danger") or null/undefined if not matched.
 */
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
