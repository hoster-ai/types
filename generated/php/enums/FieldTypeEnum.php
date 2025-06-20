<?php declare(strict_types=1);

namespace Hoster\Contracts\Enums;

enum FieldTypeEnum: string
{
    case TEXT_BOX = 'TEXT_BOX';
    case TEXT_AREA = 'TEXT_AREA';
    case SELECT = 'SELECT';
    case MULTI_SELECT = 'MULTI_SELECT';
    case DESCRIPTION = 'DESCRIPTION';
    case RADIO_BOX = 'RADIO_BOX';
    case CHECKBOX = 'CHECKBOX';
    case SLIDER = 'SLIDER';
}
