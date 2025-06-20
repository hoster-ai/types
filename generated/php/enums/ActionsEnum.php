<?php declare(strict_types=1);

namespace Hoster\Contracts\Enums;

enum ActionsEnum: string
{
    case CREATE = 'CREATE';
    case RENEW = 'RENEW';
    case UPGRADE = 'UPGRADE';
    case DOWNGRADE = 'DOWNGRADE';
    case SUSPEND = 'SUSPEND';
    case UNSUSPEND = 'UNSUSPEND';
    case DELETE = 'DELETE';
}
