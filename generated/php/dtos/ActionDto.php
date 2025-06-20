<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;

use Hoster\Contracts\Enums\OpenMethodEnum;

class ActionDto 
{
    /**
     * @var The icon of the action.
     */
    public string $icon;

    /**
     * @var The label of the action (optional).
     */
    public ?string $label;

    public OpenMethodEnum $openMethod;

    /**
     * @var The link of the action.
     */
    public string $url;
}
