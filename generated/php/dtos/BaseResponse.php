<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;

class BaseResponse 
{
    /**
     * @var Base response class Used as a foundation for all API responses export class BaseResponse { Response code
     */
    public float $code;

    /**
     * @var Response message
     */
    public string $message;
}
