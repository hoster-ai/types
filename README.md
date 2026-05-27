# @hosterai/types

This package contains the core types for the Hoster AI platform.

## Files

- `llm.txt`: Comprehensive documentation of all DTOs, enums, validators, decorators, and transformers in the package. This file serves as an LLM-friendly reference for AI assistants.

[![NPM Version](https://img.shields.io/npm/v/@hosterai/types.svg)](https://www.npmjs.com/package/@hosterai/types)
[![NPM Downloads](https://img.shields.io/npm/dm/@hosterai/types.svg)](https://www.npmjs.com/package/@hosterai/types)
[![Build Status](https://github.com/HosterAI/types/actions/workflows/ci.yml/badge.svg)](https://github.com/HosterAI/types/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This package contains the core data transfer objects (DTOs), enumerations (ENUMs), and validators used across the HosterAI platform. It ensures type safety and consistent data structures between different services and applications.

## Installation

To install the package, use your preferred package manager:

```bash
npm install @hosterai/types
```

or

```bash
yarn add @hosterai/types
```

## Peer Dependencies

This package relies on the following peer dependencies. Install them in your project:

```bash
npm install class-validator class-transformer class-validator-jsonschema reflect-metadata
# If your project already uses Express, ensure a compatible version is installed
npm install express
```

Note:

- Import `reflect-metadata` once at the entry point of your application (e.g., `main.ts` or `index.ts`).

```ts
import 'reflect-metadata';
```

## Core Concepts

### DTOs (Data Transfer Objects)

DTOs define the shape of data that is exchanged between different parts of the system, such as API requests and responses. They are plain classes decorated with `class-validator` decorators to enable robust validation.

**Available DTOs:**

- `action.dto.ts`: Defines the structure for a UI action.
- `attachment.dto.ts`: Represents a file attachment.
- `base-response.dto.ts`: A base structure for API responses.
- `client-data.dto.ts`: Defines the data structure for a client.
- `company-data.dto.ts`: Holds all the relevant data for a company.
- `country.dto.ts`: Represents country metadata (name, ISO code, Europe flag).
- `error-response.dto.ts`: Defines the structure for error responses.
- `field.dto.ts`: Represents a generic field for forms or dynamic data.
- `attribute-field.dto.ts`: Extends `FieldDto` with product-specific attributes (visibleInOrder, visibleInClientPanel, repeatableMin, repeatableMax).
- `addon-field.dto.ts`: Extends `FieldDto` for seller-defined checkout fields.
- `field-option.dto.ts`: Represents options for form fields (used for checkboxes, radioboxes, and selects).
- `item-data.dto.ts`: Represents the data of a specific product item (IDs, attributes, dates, pricing).
- `invoice-contact-data.dto.ts`: Billing contact information for invoice integrations.
- `info.dto.ts`: Contains all necessary information for a service integration.
- `jwt.dto.ts`: DTOs related to JSON Web Tokens.
- `menu.dto.ts`: Defines the structure for menu items.
- `settings.dto.ts`: Settings base DTO and variants (`SettingsWithUrlDto`, `SettingsWithTabsDto`).
- `admin-panel.dto.ts`: Admin panel UI configuration (tabs, moreActions, menu, settings).
- `client-panel.dto.ts`: Client panel UI configuration (tabs, moreActions, menu).
- `multilang-text.dto.ts`: A DTO for handling text in multiple languages.
- `response-data.dto.ts`: A generic wrapper for response data.
- `setup-status-response.dto.ts`: DTO for returning the setup status.
- `success-response.dto.ts`: Defines the structure for successful API responses.
- `tab.dto.ts`: Represents a tab in a user interface.
- `submenu.dto.ts`: Represents a submenu item.
- `unit.dto.ts`: Represents a unit for pay-per-use billing.

**Notification DTOs:**

- `notification/notification-info.dto.ts`: Contains detailed information about a notification.
- `notification/requests/notification-send-request.dto.ts`: The primary DTO for requesting a new notification.
- `notification/responses/notification-send-response.dto.ts`: Response after successfully sending a notification.
- `notification/receiver/receiver-email.dto.ts`: Defines the receiver for an email notification.
- `notification/receiver/receiver-push.dto.ts`: Defines the receiver for a push notification.
- `notification/receiver/receiver-sms.dto.ts`: Defines the receiver for an SMS notification.
- `notification/sender/sender-email.dto.ts`: Defines the sender for an email notification.
- `notification/sender/sender-push.dto.ts`: Defines the sender for a push notification.
- `notification/sender/sender-sms.dto.ts`: Defines the sender for an SMS notification.

**General Request/Response DTOs:**

- `requests/validate-attributes-request.dto.ts`: Defines the structure for validating product attributes.
- `responses/validate-attributes-response.dto.ts`: Response from validating product attributes.

**Tax Manager DTOs:**

- `tax-manager/tax-details-request.dto.ts`: Request payload for calculating tax details.

**Product DTOs:**

- `product/product-info.dto.ts`: Contains detailed information about a product. Uses `AttributeFieldDto` for product/item attributes.
- `product/product-item-data.dto.ts`: Extends `ItemDataDto` with product-specific action type.
- `product/requests/*`: DTOs for product-related requests (create, delete, upgrade, downgrade, renew, suspend, unsuspend, upgradable, downgradable).
- `product/responses/*`: DTOs for product-related responses.

**Invoice DTOs:**

- `invoice/invoice-info.dto.ts`: Contains detailed information about an invoice integration.
- `invoice/invoice-item-data.dto.ts`: Extends `ItemDataDto` with invoice-specific action type.
- `invoice/transaction-data.dto.ts`: Transaction details (ID, amount, payment method, date).
- `invoice/tin-validation-details.dto.ts`: Tax Identification Number validation details.
- `invoice/requests/base-invoice-request.dto.ts`: Base request payload with common invoice fields.
- `invoice/requests/proforma-invoice-request.dto.ts`: Request payload for creating a proforma invoice.
- `invoice/requests/invoice-request.dto.ts`: Request payload for creating a standard invoice.
- `invoice/requests/credit-note-request.dto.ts`: Request payload for creating a credit note.
- `invoice/responses/proforma-invoice-response.dto.ts`: Response after creating a proforma invoice.
- `invoice/responses/invoice-response.dto.ts`: Response after creating a standard invoice.
- `invoice/responses/credit-note-response.dto.ts`: Response after creating a credit note.
- `invoice/responses/tax-details-response.dto.ts`: Response with tax calculation details.

### Enums

Enums provide a set of named constants for common types, preventing errors with magic strings.

**Key Enums:**

- `ProductItemActionsEnum`: Defines possible product item actions (create, renew, upgrade, downgrade, etc.).
- `InvoiceItemActionsEnum`: Defines possible invoice item actions (create, renew, upgrade, downgrade, transfer, trade).
- `InvoiceTypesEnum`: Defines invoice document types (invoice, credit-note, proforma).
- `CountryEnum`: A list of all countries.
- `DurationEnum`: Defines billing durations (e.g., `MONTHLY`, `YEARLY`).
- `EventsEnum`: Defines triggerable events.
- `FieldTypeEnum`: Defines types of fields.
- `LanguageEnum`: A list of supported languages (enum members use descriptive names like `ENGLISH`, `FRENCH` while their string values remain ISO-639-1 codes such as `EN`, `FR`).
- `NotificationMessageTypeEnum`: Defines the type of notification (e.g., `EMAIL`, `SMS`).
- `OpenMethodEnum`: Defines how an action's URL should be opened.
- `ResponseStatusEnum`: Defines the status of a response (e.g., `COMPLETED`, `FAILED`).
- `RolesEnum`: Defines user roles.
- `SetupStatusEnum`: Defines the status of a setup process.

#### Country Helpers

- The canonical ISO-3166 list plus metadata resides in `enums/country.enum.ts` via:
  - `CountryEnum` with alpha-2 codes.
  - `EU_EEA_COUNTRIES` / `EUROZONE_COUNTRIES` sets for regional logic.
  - `BASE_COUNTRY_DATA` and derived `COUNTRY_DATA`, including the `isEurope` flag.
- Utility helpers in `helpers/country.helper.ts` expose:
  - `getCountryData`, `getAllCountriesData`, `getEuropeanCountriesData`, `getEurozoneCountriesData`.
  - `getAllCountriesData` now returns a `Record<CountryEnum, CountryDto>` (instead of an array) sorted by the localized `name`, which keeps the map structure intact while preserving alphabetical order for deterministic downstream processing.
- After editing the enum or country data, rerun `npm run build:schemas` (see **Generating JSON Schemas**) so the OpenAPI bundle reflects the latest list.

### Interfaces

- `product/product.interface.ts`: Defines the contract for a product module.

### Validators

This package includes validation functions that leverage `class-validator` to ensure that incoming data conforms to the DTO definitions.

**Available Validators:**

**Core Validators:**

- `validateActionDto`: Validates UI actions.
- `validateClientDataDto`: Validates client data.
- `validateCompanyDataDto`: Validates company data.
- `validateFieldDto`: Validates dynamic fields.
- `validateFieldOptionDto`: Validates field options.
- `validateJwtDto`: Validates JWT data.
- `validateMultilangTextDto`: Validates multilingual text objects.
- `validateUnitDto`: Validates billing unit data.
- `validateAttachmentDto`: Validates file attachments.
- `validateAttributeFieldDto`: Validates attribute fields.
- `validateAddonFieldDto`: Validates addon fields.
- `validateCountryDto`: Validates country data.
- `validateTabDto`: Validates tab data.
- `validateItemDataDto`: Validates item data.
- `validateProductItemDataDto`: Validates product item data.
- `validateInfoDto`: Validates integration info.

**Panel Validators:**

- `validateAdminPanelDto`: Validates admin panel configuration.
- `validateAdminPanelTabsDto`: Validates admin panel tabs.
- `validateAdminPanelMoreActionsDto`: Validates admin panel additional actions.
- `validateClientPanelDto`: Validates client panel configuration.

**Menu & Settings Validators:**

- `validateMenuWithUrlDto`: Validates menu items with direct URLs.
- `validateMenuWithSubmenuDto`: Validates menu items with submenus.
- `validateSettingsWithUrlDto`: Validates settings with URL configuration.
- `validateSettingsWithTabsDto`: Validates settings with tabs configuration.

**Notification Validators:**

- `validateNotificationRequestDto`: Validates the main notification request.
- `validateNotificationInfoDto`: Validates notification information.
- `validateEmailReceiverDto`, `validateSmsReceiverDto`, `validatePushReceiverDto`: Validators for notification receivers.
- `validateEmailSenderDto`, `validateSmsSenderDto`, `validatePushSenderDto`: Validators for notification senders.

**Invoice Validators:**

- `validateInvoiceInfoDto`: Validates invoice integration info.
- `validateInvoiceContactDataDto`: Validates invoice contact data.
- `validateInvoiceItemDataDto`: Validates invoice item data.
- `validateTinValidationDetailsDto`: Validates TIN validation details.
- `validateTransactionDataDto`: Validates transaction data.

**Product Validators:**

- `validateProductInfoDto`: Validates product information.
- `validateProductCreateRequestDto`: Validates product creation requests.
- `validateProductDeleteRequestDto`: Validates product deletion requests.
- `validateProductRenewRequestDto`: Validates product renewal requests.
- `validateProductUpgradeRequestDto`: Validates product upgrade requests.
- `validateProductDowngradeRequestDto`: Validates product downgrade requests.
- `validateProductSuspendRequestDto`: Validates product suspension requests.
- `validateProductUnsuspendRequestDto`: Validates product unsuspension requests.
- `validateProductUpgradableRequestDto`: Validates product upgradability checks.
- `validateProductDowngradableRequestDto`: Validates product downgradability checks.
- `validateValidateAttributesRequestDto`: Validates attribute validation requests.

### Custom Decorators

The package includes custom `class-validator` decorators for advanced validation scenarios:

- `@AllOrNoneProperty`: Ensures specified properties are either all present or all absent together.
- `@AtLeastOneNonEmptyProperty`: Ensures at least one of the specified properties is non-empty.
- `@IsOfAllowedTypes`: Validates if a value is one of the allowed types with additional constraints.
- `@IsOneOf`: Validates if a value is an instance of one of the specified classes.
- `@IsPlainObject`: Validates if a value is a plain object with key-value pairs.
- `@IsPropertyForbidden`: Ensures a specific property is not present in the object.
- `@IsRegex`: Validates if a string is a valid regular expression.
- `@MinLessOrEqualMaxProperty`: Ensures minimum values are less than or equal to maximum values.
- `@UniqueFieldInArray`: Ensures all objects in an array have unique values for a specified field.

### Transformers

Transformer functions for converting plain objects to typed DTOs:

- `transformMenu`: Converts plain objects to `MenuDtoWithUrl` or `MenuDtoWithSubmenu` based on the type property.
- `transformSettings`: Converts plain objects to `SettingsWithUrlDto` or `SettingsWithTabsDto` based on the presence of url or tabs properties.

## Generating JSON Schemas

This package can generate JSON Schemas for all DTOs using the `class-validator-jsonschema` integration. The generated schemas are used in OpenAPI and other tooling.

- Script: `npm run build:schemas`
- Output: `openapi/schemas/components.schemas.ts`

During packaging, schemas are built automatically via the `prepack` script. Run the command locally whenever you change DTOs or validators and want to refresh the schemas.

## Usage Example

Here is an example of how to use a DTO and its validator.

First, import the necessary DTO, Enum, and validator function:

```typescript
import {
  ProductCreateRequestDto,
  ClientDataDto,
  ProductItemDataDto,
  DurationEnum,
  validateProductCreateRequestDto,
} from '@hosterai/types';

// 1. Create a request object
const request: ProductCreateRequestDto = {
  clientData: {
    // ... client data
  },
  itemData: {
    itemId: 'item-123',
    productAttributes: {
      // ... product attributes
    },
    itemAttributes: {
      // ... item attributes
    },
    duration: DurationEnum.MONTHLY,
  },
};

// 2. Validate the object (async)
const errors = await validateProductCreateRequestDto(request);

// 3. Check for errors
if (errors.length > 0) {
  console.error('Validation failed:', errors);
} else {
  console.log('Validation successful!');
}
```

## Building from Source

To build the package from the source code, clone the repository and run the following commands:

```bash
npm install
npm run build
```

This will compile the TypeScript source files into JavaScript in the `dist` directory.

## Running Tests

To run the test suite, use the following command:

```bash
npm test
```

## Publishing to npm

This package is automatically published to npm upon the creation of a new release in GitHub.

The process is as follows:

1.  Ensure the `version` in `package.json` is updated.
2.  Commit and push all changes to the `main` branch.
3.  Create a new release on GitHub. The tag for the release must match the version in `package.json` (e.g., `v1.2.3`).

This will trigger the `publish` workflow, which builds, tests, and publishes the package to the npm registry.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
