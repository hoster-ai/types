<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Sender;

class SmsSenderDto 
{
    /**
     * @var DTO for SMS sender Used to define the details for sending an SMS message export class SmsSenderDto { Sender's phone number Must be a valid phone number
     */
    public string $senderPhone;

    /**
     * @var The content of the SMS message
     */
    public string $message;
}
