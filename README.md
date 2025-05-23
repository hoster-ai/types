# Multi-Language DTO & Enum Generator

This project provides tools to automatically generate Data Transfer Objects (DTOs) and Enums in multiple programming languages from TypeScript definitions. This ensures consistency across different services that might be implemented in different programming languages.

## Supported Languages

| Language   | Status      | Generator Script       |
|------------|-------------|------------------------|
| Go         | ✅ Complete | `generate-golang.ts`   |
| Python     | ✅ Complete | `generate-python.ts`   |
| C#         | ✅ Complete | `generate-csharp.ts`   |
| Java       | ✅ Complete | `generate-java.ts`     |
| PHP        | 🚧 Planned  | `generate-php.ts`      |
| Ruby       | 🚧 Planned  | `generate-ruby.ts`     |
| Rust       | 🚧 Planned  | `generate-rust.ts`     |
| Swift      | 🚧 Planned  | `generate-swift.ts`    |
| Kotlin     | 🚧 Planned  | `generate-kotlin.ts`   |

## Usage

### Generate Code for All Supported Languages

```bash
npx ts-node generate-languages.ts all
```

### Generate Code for a Specific Language

```bash
npx ts-node generate-languages.ts <language>
```

For example:
```bash
npx ts-node generate-languages.ts golang
npx ts-node generate-languages.ts python
npx ts-node generate-languages.ts csharp
npx ts-node generate-languages.ts java
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
4. Update the language entry in the `LANGUAGES` object in `generate-languages.ts`

## Dependencies

- `typescript-json-schema`: For generating JSON Schema from TypeScript definitions
- `quicktype`: For generating code from JSON Schema
- `fs-extra`: For file system operations
- `glob`: For file pattern matching
