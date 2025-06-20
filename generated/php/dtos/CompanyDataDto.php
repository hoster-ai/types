<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;

use Hoster\Contracts\Enums\LanguageEnum;
use Hoster\Contracts\Enums\CountryEnum;

class CompanyDataDto 
{
    public string $id;

    public string $name;

    /**
     * @var string[]
     */
    public array $emails;

    public string $invoiceEmail;

    public string $privacyPolicyUrl;

    public LanguageEnum $defaultLanguage;

    /**
     * @var LanguageEnum[]
     */
    public array $languages;

    public string $telephone;

    public ?string $mobile;

    public string $address1;

    public ?string $address2;

    public ?string $address3;

    public string $postcode;

    public string $city;

    public CountryEnum $country;

    public ?string $state;

    public ?string $vat;

    public ?string $taxOffice;
}
