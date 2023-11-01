import {ProviderRiskResponse, RiskResponse, CountryResponse} from "../../lib";

/**
 * A constant representing an empty country with default values.
 */
const EMPTY_COUNTRY = new CountryResponse('', '', '');

/**
 * A constant representing an empty provider risk with default values.
 */
const EMPTY_PROVIDER = new ProviderRiskResponse(0, '');

/**
 * A constant representing an empty risk with default values.
 */
export const EMPTY_RISK = new RiskResponse(0, '', '', 0, 0, EMPTY_PROVIDER, EMPTY_COUNTRY);

/**
 * A constant representing the title "Gestionar riesgos" (Manage risks).
 */
export const TITLE_RISK_ADMIN = 'Gestionar riesgos';

/**
 * A constant representing the message "El título es requerido" (Title is required).
 */
export const TITLE_REQUIRED = 'El título es requerido';

/**
 * A constant representing the validation message "El título debe tener al menos 3 caracteres" (Title must be at least 3 characters long).
 */
export const MIN_LENGTH_TITLE_VALIDATION = 'El título debe tener al menos 3 caracteres';

/**
 * A constant representing the validation message "El título no puede tener más de 100 caracteres" (Title cannot exceed 100 characters).
 */
export const MAX_LENGTH_TITLE_VALIDATION = 'El título no puede tener más de 100 caracteres';

/**
 * A constant representing the message "La descripción es requerida" (Description is required).
 */
export const DESCRIPTION_REQUIRED = 'La descripción es requerida';

/**
 * A constant representing the validation message "La descripción debe tener al menos 10 caracteres" (Description must be at least 10 characters long).
 */
export const MIN_LENGTH_DESCRIPTION_VALIDATION = 'La descripción debe tener al menos 10 caracteres';

/**
 * A constant representing the validation message "La descripción no puede tener más de 500 caracteres" (Description cannot exceed 500 characters).
 */
export const MAX_LENGTH_DESCRIPTION_VALIDATION = 'La descripción no puede tener más de 500 caracteres';

/**
 * A constant representing the message "La probabilidad es requerida" (Probability is required).
 */
export const PROBABILITY_REQUIRED = 'La probabilidad es requerida';

/**
 * A constant representing the message "El impacto es requerido" (Impact is required).
 */
export const IMPACT_REQUIRED = 'El impacto es requerido';

/**
 * A constant representing the message "El proveedor es requerido" (Provider is required).
 */
export const PROVIDER_REQUIRED = 'El proveedor es requerido';

/**
 * A constant representing the message "El país es requerido" (Country is required).
 */
export const COUNTRY_REQUIRED = 'El país es requerido';

/**
 * A constant representing the message "Cargando proveedores..." (Loading providers...).
 */
export const LOADING_PROVIDERS = 'Cargando proveedores...';

/**
 * A constant representing the success message "Riesgo creado con éxito" (Risk created successfully).
 */
export const RISK_CREATED_SUCCESSFULLY = 'Riesgo creado con éxito';

/**
 * A constant representing the success message "Riesgo actualizado con éxito" (Risk updated successfully).
 */
export const RISK_UPDATED_SUCCESSFULLY = 'Riesgo creado con éxito';

/**
 * A constant representing the success message "Riesgo eliminado con éxito" (Risk deleted successfully).
 */
export const RISK_DELETED_SUCCESSFULLY = 'Riesgo creado con éxito';
