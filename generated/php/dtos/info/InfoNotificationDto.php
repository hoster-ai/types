<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Info;

use Hoster\Contracts\Enums\MessageTypeEnum;

class InfoNotificationDto 
{
    public MessageTypeEnum $type;
}
