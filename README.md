# @hosterai/types

This package contains the core types for the Hoster AI platform.

## Files

- `llm.txt`: Contains a list of large language models.

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

## Core Concepts

### DTOs (Data Transfer Objects)

DTOs define the shape of data that is exchanged between different parts of the system, such as API requests and responses. They are plain classes decorated with `class-validator` decorators to enable robust validation.

**Available DTOs:**

- `action.dto.ts`: Defines the structure for a UI action.
- `attachment.dto.ts`: Represents a file attachment.
- `base-response.dto.ts`: A base structure for API responses.
- `client-data.dto.ts`: Defines the data structure for a client.
- `company-data.dto.ts`: Holds all the relevant data for a company.
- `error-response.dto.ts`: Defines the structure for error responses.
- `field.dto.ts`: Represents a generic field for forms or dynamic data.
- `field-option.dto.ts`: Represents options for form fields (used for checkboxes, radioboxes, and selects).
- `info.dto.ts`: Contains all necessary information for a service integration.
- `jwt.dto.ts`: DTOs related to JSON Web Tokens.
- `menu.dto.ts`: Defines the structure for menu items.
- `multilang-text.dto.ts`: A DTO for handling text in multiple languages.
- `response-data.dto.ts`: A generic wrapper for response data.
- `setup-status-response.dto.ts`: DTO for returning the setup status.
- `success-response.dto.ts`: Defines the structure for successful API responses.
- `tab.dto.ts`: Represents a tab in a user interface.
- `submenu.dto.ts`: Represents a submenu item.
- `task-response.dto.ts`: DTO for responses related to background tasks.
- `unit.dto.ts`: Represents a unit for pay-per-use billing.

**Notification DTOs:**

- `notification/notification-info.dto.ts`: Contains detailed information about a notification.
- `notification/notification-send-request.dto.ts`: The primary DTO for requesting a new notification.
- `notification/receiver/receiver-email.dto.ts`: Defines the receiver for an email notification.
- `notification/receiver/receiver-push.dto.ts`: Defines the receiver for a push notification.
- `notification/receiver/receiver-sms.dto.ts`: Defines the receiver for an SMS notification.
- `notification/sender/sender-email.dto.ts`: Defines the sender for an email notification.
- `notification/sender/sender-push.dto.ts`: Defines the sender for a push notification.
- `notification/sender/sender-sms.dto.ts`: Defines the sender for an SMS notification.

**Product DTOs:**

- `product/product-info.dto.ts`: Contains detailed information about a product.
- `product/product-item-data.dto.ts`: Represents the data of a specific product item.
- `product/requests/*`: DTOs for product-related requests (create, delete, upgrade, etc.).
- `product/responses/*`: DTOs for product-related responses.

### Enums

Enums provide a set of named constants for common types, preventing errors with magic strings.

**Key Enums:**

- `ProductActionsEnum`: Defines possible actions.
- `CountryEnum`: A list of all countries.
- `DurationEnum`: Defines billing durations (e.g., `MONTHLY`, `YEARLY`).
- `EventsEnum`: Defines triggerable events.
- `FieldTypeEnum`: Defines types of fields.
- `LanguageEnum`: A list of supported languages.
- `NotificationMessageTypeEnum`: Defines the type of notification (e.g., `EMAIL`, `SMS`).
- `OpenMethodEnum`: Defines how an action's URL should be opened.
- `ResponseStatusEnum`: Defines the status of a response (e.g., `COMPLETED`, `FAILED`).
- `RolesEnum`: Defines user roles.
- `SetupStatusEnum`: Defines the status of a setup process.

### Interfaces

- `product/product.interface.ts`: Defines the contract for a product module.

### Validators

This package includes validation functions that leverage `class-validator` to ensure that incoming data conforms to the DTO definitions.

**Available Validators:**

- `validateActionDto`: Validates UI actions.
- `validateCompanyDataDto`: Validates company data.
- `validateFieldDto`: Validates dynamic fields.
- `validateJwtDto`: Validates JWT data.
- `validateMultilangTextDto`: Validates multilingual text objects.
- `validateNotificationRequestDto`: Validates the main notification request.
- `validateEmailReceiverDto`, `validateSmsReceiverDto`, `validatePushReceiverDto`: Validators for notification receivers.
- `validateEmailSenderDto`, `validateSmsSenderDto`, `validatePushSenderDto`: Validators for notification senders.

## Usage Example

Here is an example of how to use a DTO and its validator.

First, import the necessary DTO, Enum, and validator function:

```typescript
import {
  ProductCreateRequestDto,
  ClientDataDto,
  ProductItemDataDto,
  DurationEnum,
  validateProductCreateRequestDto, // Assuming a validator exists
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

// 2. Validate the object
// const errors = validateProductCreateRequestDto(request);

// 3. Check for errors
// if (errors.length > 0) {
//   console.error('Validation failed:', errors);
// } else {
//   console.log('Validation successful!');
// }
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
