import { FieldDto } from "./field.dto";

/**
 * Fields defined by the seller for a product, requested during checkout setup.
 * These fields contain information relevant only to the seller, not to the integration.
 */
export class AddonFieldDto extends FieldDto {}