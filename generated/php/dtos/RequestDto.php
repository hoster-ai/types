<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;



class RequestDto 
{
    public string $notificationId;

    public EmailSenderDto|SmsSenderDto|PushSenderDto $sender;

    public EmailReceiverDto|SmsReceiverDto|PushReceiverDto $receiver;
}
