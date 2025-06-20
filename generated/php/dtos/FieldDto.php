<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;

use Hoster\Contracts\Enums\FieldTypeEnum;

class FieldDto 
{
    /**
     * @var ID of action field
     */
    public string $id;

    /**
     * @var Label of action field
     * @var MultilangTextDto[]
     */
    public array $label;

    /**
     * @var Value of action field
     */
    public string|float|array $value;

    /**
     * @var Type of label
     */
    public FieldTypeEnum $type;

    /**
     * @var Indicates if the field is required
     */
    public bool $required;

    /**
     * @var Indicates if the field is disabled
     */
    public bool $disabled;

    /**
     * @var Indicates if the field is hidden
     */
    public bool $hidden;

    /**
     * @var Regex validation pattern for the field
     */
    public ?string $regexValidation;

    /**
     * @var Error message for the field for supported languages
     * @var MultilangTextDto[]
     */
    public ?array $regexValidationErrorMessage;

    /**
     * @var Indicates if the field has remote validation
     */
    public ?bool $remoteValidation;

    /**
     * @var Error message for the field
     * @var MultilangTextDto[]
     */
    public ?array $remoteValidationErrorMessage;
}
