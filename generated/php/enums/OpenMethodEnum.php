<?php declare(strict_types=1);

namespace Hoster\Contracts\Enums;

enum OpenMethodEnum: string
{
    case AJAX_CALL = 'ajax_call';
    case SMALL_IFRAME = 'small_iframe';
    case MEDIUM_IFRAME = 'medium_iframe';
    case LARGE_IFRAME = 'large_iframe';
}
