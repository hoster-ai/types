import { FieldTypeEnum } from "../enums/field-type.enum";
import { MultilangTextDto } from "./multilang-text.dto";

export class FieldDto {

    /**
     * ID of action field
     */
    id: string;

    /**
     * Label of action field
     */
    label: MultilangTextDto[];

    /**
     * Value of action field
     */
    value: string | number | Record<string, any>;

    /**
     * Type of label
     */
    type: FieldTypeEnum;

    /**
     * Indicates if the field is required
     */
    required: boolean;

    /**
     * Indicates if the field is disabled
     */
    disabled: boolean;

    /**
     * Indicates if the field is hidden
     */
    hidden: boolean;

    /**
     * Regex validation pattern for the field
     */
    regexValidation?: string;

    /**
     * Error message for the field for supported languages
     */ 
    regexValidationErrorMessage?: MultilangTextDto[];

    /**
     * Indicates if the field has remote validation
     */
    remoteValidation?: boolean;

    /**
     * Error message for the field
     */
    remoteValidationErrorMessage?: MultilangTextDto[];

    /**
     * The item attribute is upgradeable
     */
    upgradeable: boolean = false;

}