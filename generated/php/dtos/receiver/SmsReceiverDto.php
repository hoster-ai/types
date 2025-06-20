<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Receiver;

class SmsReceiverDto 
{
    /**
     * @var DTO for SMS recipients Used to define the recipients of an SMS message export class SmsReceiverDto { List of recipient phone numbers Must be valid phone numbers
     * @var string[]
     */
    public array $receiverPhones;
}
