<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Receiver;

class PushReceiverDto 
{
    /**
     * @var DTO for push notification recipients Used to define the recipients of a push notification export class PushReceiverDto { The user ID that will receive the push notification
     */
    public string $userId;

    /**
     * @var List of user device tokens Must contain at least one token
     * @var string[]
     */
    public array $deviceTokens;
}
