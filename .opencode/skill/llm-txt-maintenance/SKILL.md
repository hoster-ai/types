---
name: llm-txt-maintenance
description: Use when adding, updating, or removing entries from the project llm.txt index file, or when creating corresponding llm/*.md documentation files
---

# LLM.txt Maintenance

## Overview

Maintains the `llm.txt` index file that serves as a reference guide to all project types (DTOs, Enums, Decorators, Validators, Transformers). Each entry links to detailed `.md` files in the `llm/` subdirectory.

**Core principle:** Every type in the codebase should be documented in `llm.txt` with a corresponding `llm/*.md` file.

## File Structure

```
project-root/
  llm.txt                    # Main index (THIS FILE YOU MAINTAIN)
  llm/                       # Detailed documentation directory
    dtos/
      actiondto.md
      actiondto.md
      ...
    enums/
    decorators/
    validators/
    transformers/
```

## Sections (in order)

1. **DTOS** - Data Transfer Objects
2. **ENUMS** - Enumerations
3. **DECORATORS** - Custom class-validator decorators
4. **VALIDATORS** - Validator functions
5. **TRANSFORMERS** - Transformer functions

## Entry Format

Each entry follows this EXACT format:

```markdown
### DtoName

**Description:** Brief description of what this type does

**Source:** `path/to/file.ts`

**Details:** See [llm/path/filename.md](llm/path/filename.md)

---
```

## Path Conversion Rules

Converting Source path to Details link:

| Source                                         | Details Link                          |
| ---------------------------------------------- | ------------------------------------- |
| `dtos/action.dto.ts`                           | `llm/dtos/actiondto.md`               |
| `dtos/invoice/requests/invoice-request.dto.ts` | `llm/dtos/invoicerequestdto.md`       |
| `enums/country.enum.ts`                        | `llm/enums/countryenum.md`            |
| `decorators/all-or-none.validator.ts`          | `llm/decorators/allornoneproperty.md` |
| `validators/action-validator.ts`               | `llm/validators/validateactiondto.md` |
| `transformers/menu.transformer.ts`             | `llm/transformers/transformmenu.md`   |

**Key rules:**

- Remove all hyphens from filenames in links
- For validators: remove `-validator` suffix but keep `validate` prefix
- For DTOs with nested paths: concatenate path parts, remove hyphens

## Entry Ordering

**ALWAYS maintain alphabetical order within each section.** When adding a new entry:

1. Find the correct section (DTOS/ENUMS/DECORATORS/VALIDATORS/TRANSFORMERS)
2. Insert in alphabetical order by name
3. Follow exact formatting

## Tasks

### Adding a New Entry

1. Find correct section in `llm.txt`
2. Insert entry in alphabetical order with exact format
3. Create corresponding `llm/*.md` file with detailed documentation
4. Follow the path conversion rules

### Updating an Entry

1. Update description if behavior changed
2. Update source path if file was moved
3. Update Details link accordingly
4. Update corresponding `llm/*.md` file
5. Maintain alphabetical ordering

### Removing an Entry

1. Delete the entry block (from `### Name` to next `---`)
2. Delete the corresponding `llm/*.md` file

## Quick Reference

**File locations:**

- `llm.txt` at project root: `/Users/thomaspapamichail/projects/hoster/core/types/llm.txt`
- `llm/` directory: `/Users/thomaspapamichail/projects/hoster/core/types/llm/`

**Section headers:**

- `## DTOS`
- `## ENUMS`
- `## DECORATORS`
- `## VALIDATORS`
- `## TRANSFORMERS`

**Alphabetical ordering applies per section, case-insensitive**

## Common Mistakes

| Mistake                     | Correct                                               |
| --------------------------- | ----------------------------------------------------- |
| Inserting out of order      | Always insert alphabetically                          |
| Wrong link path             | Use path conversion rules                             |
| Missing backticks on source | Source path in backticks: `dtos/action.dto.ts`        |
| Missing `---` separator     | Each entry ends with `---`                            |
| Wrong section               | Check the type: validators go in VALIDATORS, not DTOS |

## Example

Adding `NewFeatureDto`:

```markdown
### NewFeatureDto

**Description:** DTO for new feature configuration.

**Source:** `dtos/new-feature.dto.ts`

**Details:** See [llm/dtos/newfeaturedto.md](llm/dtos/newfeaturedto.md)

---
```

Also create `llm/dtos/newfeaturedto.md` with detailed documentation.
