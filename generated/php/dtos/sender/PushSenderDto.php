<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Sender;



class PushSenderDto 
{
    public string $messageId;

    public string $userId;

    public string $title;

    public string $message;

    public ?string $subtitle;
}
