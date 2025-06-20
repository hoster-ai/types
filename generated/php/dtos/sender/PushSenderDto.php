<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Sender;

class PushSenderDto 
{
    /**
     * @var DTO for push notification sender Used to define the details for sending a push notification export class PushSenderDto { Unique identifier of the message Length restriction from 1 to 255 characters
     */
    public string $messageId;

    /**
     * @var The user ID that will receive the push notification Length restriction from 1 to 255 characters
     */
    public string $userId;

    /**
     * @var The title of the push notification Length restriction from 1 to 255 characters
     */
    public string $title;

    /**
     * @var The content of the push notification Length restriction from 1 to 1000 characters
     */
    public string $message;

    /**
     * @var The subtitle of the push notification (optional) Length restriction from 1 to 255 characters
     */
    public ?string $subtitle;
}
