<?php declare(strict_types=1);

namespace Hoster\Contracts\Enums;

enum SetupStatusEnum: string
{
    case SUCCESS = 'success';
    case FAILURE = 'failure';
    case PENDING = 'pending';
}
