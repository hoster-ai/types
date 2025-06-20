<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;

use Hoster\Contracts\Enums\SetupStatusEnum;

class SetupStatusResponseDto 
{
    public SetupStatusEnum $status;
}
