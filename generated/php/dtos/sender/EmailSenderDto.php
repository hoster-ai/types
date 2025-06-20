<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Sender;



class EmailSenderDto 
{
    public string $fullName;

    public string $subject;

    public string $message;

    public true }) $each;

    /**
     * @var AttachmentDto[]
     */
    public ?array $attachments;
}
