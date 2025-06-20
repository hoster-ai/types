<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;

use Hoster\Contracts\Enums\LanguageEnum;

class MultilangTextDto 
{
    public LanguageEnum $language;

    public string $text;
}
