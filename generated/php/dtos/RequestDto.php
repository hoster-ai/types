<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;

use Hoster\Contracts\Dtos\Sender\EmailSenderDto;
use Hoster\Contracts\Dtos\Sender\SmsSenderDto;
use Hoster\Contracts\Dtos\Sender\PushSenderDto;
use Hoster\Contracts\Dtos\Receiver\EmailReceiverDto;
use Hoster\Contracts\Dtos\Receiver\SmsReceiverDto;
use Hoster\Contracts\Dtos\Receiver\PushReceiverDto;

class RequestDto 
{
    /**
     * @var Unique identifier of the hoster message
     */
    public string $notificationId;

    /**
     * @var Sender details according to the integration's notification type
     */
    public EmailSenderDto|SmsSenderDto|PushSenderDto $sender;

    /**
     * @var Recipient details according to the integration's notification type
     */
    public EmailReceiverDto|SmsReceiverDto|PushReceiverDto $receiver;
}
