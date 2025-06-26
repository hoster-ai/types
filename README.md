# @hosterai/types

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

-   `action.dto.ts`: Defines the structure for an action, including icon, label, URL, and how it opens.
-   `attachment.dto.ts`: Represents a file attachment.
-   `base-response.dto.ts`: A base structure for API responses.
-   `company-data.dto.ts`: Holds all the relevant data for a company.
-   `error-response.dto.ts`: Defines the structure for error responses from the API.
-   `field.dto.ts`: Represents a generic field, likely for forms or dynamic data display.
-   `info.dto.ts`: Contains informational data.
-   `jwt.dto.ts`: DTOs related to JSON Web Tokens (authentication).
-   `menu.dto.ts`: Defines the structure for menu items.
-   `multilang-text.dto.ts`: A DTO for handling text in multiple languages.
-   `response-data.dto.ts`: A generic wrapper for response data.
-   `setup-status-response.dto.ts`: DTO for returning the setup status.
-   `success-response.dto.ts`: Defines the structure for successful API responses.
-   `tab.dto.ts`: Represents a tab in a user interface.
-   `task-response.dto.ts`: DTO for responses related to background tasks.
-   `unit.dto.ts`: Represents a unit.

**Notification DTOs:**

-   `notification/notification-info.dto.ts`: Contains detailed information about a notification.
-   `notification/notification-request.dto.ts`: The primary DTO for requesting a new notification.
-   `notification/receiver/receiver-email.dto.ts`: Defines the receiver for an email notification.
-   `notification/receiver/receiver-push.dto.ts`: Defines the receiver for a push notification.
-   `notification/receiver/receiver-sms.dto.ts`: Defines the receiver for an SMS notification.
-   `notification/sender/sender-email.dto.ts`: Defines the sender for an email notification.
-   `notification/sender/sender-push.dto.ts`: Defines the sender for a push notification.
-   `notification/sender/sender-sms.dto.ts`: Defines the sender for an SMS notification.

### Enums

Enums provide a set of named constants for common types, such as roles, languages, or notification types, preventing common errors with magic strings.

**Key Enums:**

-   `NotificationMessageType`: Defines the type of notification (e.g., `EMAIL`, `SMS`, `PUSH`).
-   `Roles`: Defines user roles within the system.
-   `Language`: A list of supported languages.
-   `Country`: A list of all countries.

### Validators

This package includes validation functions that leverage `class-validator` and `class-transformer` to ensure that incoming data conforms to the DTO definitions.

-   `validateNotificationRequestDto`: A function to validate the `NotificationRequestDto`.

## Usage Example

Here is an example of how to use the `NotificationRequestDto` and its validator.

First, import the necessary DTO, Enum, and validator function:

```typescript
import { 
  NotificationRequestDto, 
  NotificationMessageType, 
  validateNotificationRequestDto 
} from '@hosterai/types';

// 1. Create a notification request object
const notification: NotificationRequestDto = {
  notificationId: 'user-welcome-email-01',
  messageType: NotificationMessageType.EMAIL,
  sender: {
    email: 'no-reply@hoster.ai',
    name: 'HosterAI Team'
  },
  receiver: {
    email: 'new-user@example.com'
  },
  // Optional template data
  templateData: {
    username: 'JohnDoe',
    welcome_url: 'https://app.hoster.ai/welcome'
  }
};

// 2. Validate the object
const errors = validateNotificationRequestDto(notification);

// 3. Check for errors
if (errors.length > 0) {
  console.error('Validation failed:', errors);
} else {
  console.log('Validation successful! Ready to send.');
  // Proceed to send the notification...
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