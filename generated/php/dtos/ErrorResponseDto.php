<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;

class ErrorResponseDto 
{
    /**
     * @var DTO for error response Used to return error information to the client export class ErrorResponseDto { Unique error identifier Used for error reporting and tracking
     */
    public string $code;

    /**
     * @var Array or text with error messages May contain one or more messages describing the error
     */
    public array|string|null $errors;
}
