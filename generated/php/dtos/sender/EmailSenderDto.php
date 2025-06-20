<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Sender;

class EmailSenderDto 
{
    /**
     * @var DTO for email sender Used to define the details for sending an email export class EmailSenderDto { The full name of the sender
     */
    public string $fullName;

    /**
     * @var The email subject Length restriction from 1 to 500 characters
     */
    public string $subject;

    /**
     * @var The message content Length restriction from 1 to 50000 characters
     */
    public string $message;

    /**
     * @var AttachmentDto[]
     */
    public ?array $attachments;
}
