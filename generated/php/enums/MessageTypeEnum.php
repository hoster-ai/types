<?php declare(strict_types=1);

namespace Hoster\Contracts\Enums;

enum MessageTypeEnum: string
{
    case EMAIL = 'email';
    case SMS = 'sms';
    case PUSH = 'push';
}
