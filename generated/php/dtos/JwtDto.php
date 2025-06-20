<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos;



class JwtDto 
{
    /**
     * @var DTO for JWT payload Used for user authentication and authorization export class JwtDto { User information contained in the JWT token Includes user and company identifiers, admin rights and optional sender details
     */
    public { $jwt;

    /**
     * @var Integration identifier
     */
    public string $integrationId;

    /**
     * @var Unique user identifier that triggers the API call (only the /send method will not contain userId).
     */
    public ?string $userId;

    /**
     * @var Unique company identifier
     */
    public string $companyId;

    /**
     * @var The roles accepted by the company for this integration
     * @var RolesEnum[]
     */
    public array $acceptedRoles;
}
