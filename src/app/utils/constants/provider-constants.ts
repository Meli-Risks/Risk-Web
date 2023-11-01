import {ProviderResponse} from "../../lib";

/**
 * A constant representing an empty provider with default values.
 */
export const EMPTY_PROVIDER = new ProviderResponse(0, '', []);

/**
 * A constant representing the title "Gestionar proveedores" (Manage providers).
 */
export const TITLE_PROVIDER_ADMIN = 'Gestionar proveedores';

/**
 * A constant representing the message "El nombre es requerido" (Name is required).
 */
export const NAME_REQUIRED = 'El nombre es requerido';

/**
 * A constant representing the validation message "El nombre debe tener al menos 3 caracteres" (Name must be at least 3 characters long).
 */
export const MIN_LENGTH_NAME_VALIDATION = 'El nombre debe tener al menos 3 caracteres';

/**
 * A constant representing the validation message "El nombre no puede tener más de 100 caracteres" (Name cannot exceed 100 characters).
 */
export const MAX_LENGTH_NAME_VALIDATION = 'El nombre no puede tener más de 100 caracteres';

/**
 * A constant representing the message "Debe seleccionar al menos un país" (You must select at least one country).
 */
export const COUNTRIES_REQUIRED = 'Debe seleccionar al menos un país';

/**
 * A constant representing the message "Cargando países..." (Loading countries...).
 */
export const LOADING_COUNTRIES = 'Cargando países...';

/**
 * A constant representing the success message "Proveedor creado con éxito" (Provider created successfully).
 */
export const PROVIDER_CREATED_SUCCESSFULLY = 'Proveedor creado con éxito';

/**
 * A constant representing the success message "Proveedor actualizado con éxito" (Provider updated successfully).
 */
export const PROVIDER_UPDATED_SUCCESSFULLY = 'Proveedor creado con éxito';

/**
 * A constant representing the success message "Proveedor eliminado con éxito" (Provider deleted successfully).
 */
export const PROVIDER_DELETED_SUCCESSFULLY = 'Proveedor creado con éxito';
