# @hosterai/types

This package contains TypeScript Data Transfer Objects (DTOs), enums, and validators for the Hoster.ai platform.

## Project Structure

- `/dtos/` - TypeScript DTO definitions
- `/enums/` - TypeScript Enum definitions
- `/validators/` - Programmatic validators for DTOs

## Core DTOs

This section describes some of the core Data Transfer Objects available in this project.

### `ActionDto`

The `ActionDto` defines the structure for an action that can be performed, typically represented as a button or link in a UI.

-   `icon`: (string) The CSS class or identifier for the icon to be displayed.
-   `label`: (string, optional) The text label for the action.
-   `openMethod`: (string) Specifies how the action should be executed. Possible values are:
    -   `"ajax_call"`: Perform an AJAX request.
    -   `"small_iframe"`: Open in a small iframe.
    -   `"medium_iframe"`: Open in a medium-sized iframe.
    -   `"large_iframe"`: Open in a large iframe.
-   `url`: (string) The URL or endpoint for the action.


## Dependencies

- `typescript`: TypeScript language support
- `class-validator`: For DTO validation using decorators
- `class-transformer`: For transforming plain objects to class instances

## Validators

This project includes programmatic validators for DTOs that can be used when class decorators don't work properly with imported DTOs from remote packages.

### Notification Request Validator

The `validateNotificationRequestDto` function provides an alternative to class-validator decorators for validating `NotificationRequestDto` objects:

```typescript
import { validateNotificationRequestDto, validateNotificationRequestDtoOrThrow } from '../validators/notification-request-validator';

// Option 1: Get validation errors as array
const errors = validateNotificationRequestDto(dtoObject);
if (errors.length > 0) {
  console.log('Validation failed:', errors);
}

// Option 2: Use the throw version for simpler handling
try {
  validateNotificationRequestDtoOrThrow(dtoObject);
  // Continue with valid object
} catch (error) {
  console.error(error.message);
}
```

The validator checks:
- `notificationId` is present and is a string
- `sender` is present and is an object
- `receiver` is present and is an object

### Running Tests

To run the validator tests:

```bash
npm test
```
