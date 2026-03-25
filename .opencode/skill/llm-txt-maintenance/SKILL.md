---
name: llm-txt-maintenance
description: Use when adding, updating, or removing entries from the project llm.txt index file, or when creating corresponding llm/*.md documentation files
---

# LLM.txt Maintenance

**REQUIRED WORKFLOW: You MUST dispatch to a swarm-worker subagent for all llm.txt maintenance tasks. Never do the edits yourself - always delegate to a subagent.**

## When to Dispatch

**ALWAYS dispatch to a subagent when asked to:**

- Add new DTO/Enum/Decorator/Validator/Transformer to llm.txt
- Update existing entries in llm.txt
- Remove entries from llm.txt
- Create or update corresponding llm/\*.md files
- Sync llm.txt after code changes

## How to Dispatch

Use the Task tool with `subagent_type=swarm-worker` and pass:

1. The task description
2. This SKILL.md content for context
3. The specific file(s) to modify

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

## Tasks (Delegate to Subagent)

### Adding a New Entry → DISPATCH TO SUBAGENT

1. Dispatch to subagent with: "Add [DtoName] to llm.txt"
2. Subagent finds correct section in `llm.txt`
3. Subagent inserts entry in alphabetical order with exact format
4. Subagent creates corresponding `llm/*.md` file with detailed documentation
5. Subagent follows the path conversion rules

### Updating an Entry → DISPATCH TO SUBAGENT

1. Dispatch to subagent with: "Update [DtoName] in llm.txt"
2. Subagent updates description if behavior changed
3. Subagent updates source path if file was moved
4. Subagent updates Details link accordingly
5. Subagent updates corresponding `llm/*.md` file
6. Subagent maintains alphabetical ordering

### Removing an Entry → DISPATCH TO SUBAGENT

1. Dispatch to subagent with: "Remove [DtoName] from llm.txt"
2. Subagent deletes the entry block (from `### Name` to next `---`)
3. Subagent deletes the corresponding `llm/*.md` file

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

## Subagent Prompt Template

When dispatching to a subagent, use this template:

```
You are an expert at maintaining the llm.txt file in this project.

## Your Task
[TASK DESCRIPTION: e.g., "Add NewFeatureDto to llm.txt" or "Update ProductInfoDto entry after field X changed"]

## Context
The llm.txt is located at: /Users/thomaspapamichail/projects/hoster/core/types/llm.txt
The llm/ directory is at: /Users/thomaspapamichail/projects/hoster/core/types/llm/

## Key Rules
1. Entry format:
### DtoName
**Description:** Brief description
**Source:** `path/to/file.ts`
**Details:** See [llm/path/filename.md](llm/path/filename.md)
---
2. ALWAYS maintain alphabetical order within each section
3. Path conversion: dtos/action.dto.ts → llm/dtos/actiondto.md
4. Sections in order: DTOS → ENUMS → DECORATORS → VALIDATORS → TRANSFORMERS

## Deliverables
1. Updated llm.txt with changes
2. Created/updated llm/*.md file with detailed documentation
3. Summary of what you changed

Return a summary of what you changed when done.
```
