<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;



class AttachmentDto 
{
    public string $filename;

    public string $content;

    public ?string $contentType;
}
