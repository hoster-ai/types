<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Receiver;

class EmailReceiverDto 
{
    /**
     * @var DTO for email recipients Used to define the recipients of an email export class EmailReceiverDto { The main email address
     */
    public string $to;

    /**
     * @var List of email addresses for carbon copy (optional) Must be valid and unique email addresses
     * @var string[]
     */
    public ?array $cc;

    /**
     * @var List of email addresses for blind carbon copy (optional) Must be valid and unique email addresses
     * @var string[]
     */
    public ?array $bcc;
}
