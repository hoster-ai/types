<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;



class MultilangTextDto 
{
    public LanguageEnum $language;

    public string $text;
}
