---
trigger: manual
---

The `llm.txt` file is designed as an AI-facing reference for code understanding and generation. To keep it effective and noise-free:

- Keep content minimal and accurate: include DTO class shapes, enums, custom decorators, and validators that affect validation logic.
- Exclude framework-specific metadata: do not include `JSONSchema` imports or `@JSONSchema(...)` decorators in `llm.txt` code blocks.
- Mirror sources: each section should follow the structure `TITLE`, `DESCRIPTION`, `SOURCE`, `LANGUAGE`, `CODE` and the `CODE` block should reflect the actual source file, minus JSONSchema annotations.
- Allowed decorators: `class-validator`, `class-transformer`, and project custom decorators (e.g., `@AtLeastOneNonEmptyProperty`, `@IsOneOf`, `@IsOfAllowedTypes`, etc.).
- Consistency: ensure imports within `CODE` blocks include everything needed for the snippet to be accurate (e.g., `Type`, custom validators), but avoid runtime-only wiring.

These guidelines apply only to `llm.txt`. The TypeScript sources in `dtos/`, `validators/`, etc., may continue to use `class-validator-jsonschema` for schema generation as documented below.