<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Receiver;



class PushReceiverDto 
{
    public string $userId;

    /**
     * @var string[]
     */
    public array $deviceTokens;
}
