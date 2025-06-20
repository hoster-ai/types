<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;

class AttachmentDto 
{
    /**
     * @var DTO for file attachments Used for sending attached files with emails export class AttachmentDto { The name of the attached file
     */
    public string $filename;

    /**
     * @var The content of the file in Base64 encoding
     */
    public string $content;

    /**
     * @var The content type of the file (MIME type)
     */
    public ?string $contentType;
}
