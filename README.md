# Multi-Language DTO & Enum Generator

This project provides tools to automatically generate Data Transfer Objects (DTOs) and Enums in multiple programming languages from TypeScript definitions. This ensures consistency across different services that might be implemented in different programming languages.

## Supported Languages

| Language   | Status      | Generator Script       |
|------------|-------------|------------------------|
| Go         | ✅ Complete | `generate-golang.ts`   |
| Python     | ✅ Complete | `generate-python.ts`   |
| C#         | ✅ Complete | `generate-csharp.ts`   |
| Java       | ✅ Complete | `generate-java.ts`     |
| PHP        | ✅ Complete | `generate-php.ts`      |
| Ruby       | ✅ Complete | `generate-ruby.ts`     |
| Rust       | ✅ Complete | `generate-rust.ts`     |
| Swift      | ✅ Complete | `generate-swift.ts`    |
| Kotlin     | ✅ Complete | `generate-kotlin.ts`   |

## Usage

**Important:** Before generating code for any language, you must first generate the JSON schemas by running:
```bash
npm run generate:schemas
```

### Generate Code for All Supported Languages

```bash
npm run generate -- all
```

### Generate Code for a Specific Language

```bash
npm run generate -- <language>
```

For example:
```bash
npm run generate -- golang
npm run generate -- python
npm run generate -- csharp
npm run generate -- java
```

## Project Structure

- `/dtos/` - TypeScript DTO definitions
- `/enums/` - TypeScript Enum definitions
- `/generated/` - Output directory for generated code
  - `/golang/` - Generated Go code
  - `/python/` - Generated Python code
  - `/csharp/` - Generated C# code
  - `/java/` - Generated Java code
  - ... (other languages as implemented)


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

## Implementation Details

### Go Implementation

- Uses JSON Schema as an intermediate format
- Converts TypeScript definitions to Go structs with proper JSON tags
- Handles optional fields and type conversions

### Python Implementation

- Generates Python dataclasses with type hints
- Handles optional fields with Union types
- Properly converts TypeScript types to Python equivalents

### C# Implementation

- Generates C# classes with properties
- Includes proper JSON attributes for serialization/deserialization
- Handles nullable types appropriately

### Java Implementation

- Generates Java classes with Lombok annotations to reduce boilerplate
- Includes Jackson annotations for JSON serialization/deserialization
- Handles type conversions and optionals

## Adding a New Language Generator

To implement a generator for a new language:

1. Create a new script (e.g., `generate-newlang.ts`) in the project root
2. Implement the translation from TypeScript to the target language
3. Ensure the generator follows the pattern of existing implementations
4. Update the language entry in the `LANGUAGES` object in `generate.ts`

## Dependencies

- `typescript-json-schema`: For generating JSON Schema from TypeScript definitions
- `quicktype`: For generating code from JSON Schema
- `fs-extra`: For file system operations
- `glob`: For file pattern matching
