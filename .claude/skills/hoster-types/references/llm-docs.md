# LLM Docs (`llm.txt` + `llm/`)

This package publishes an LLM-friendly mirror of its public API so AI assistants in downstream services can read it without parsing TypeScript.

## Layout

```
llm.txt                  # index — one section per kind (DTOS, ENUMS, VALIDATORS, DECORATORS, TRANSFORMERS)
llm/
  dtos/<lowercasename>.md
  enums/<lowercasename>.md
  validators/<lowercasename>.md
  decorators/<lowercasename>.md
  transformers/<lowercasename>.md
```

`<lowercasename>` = the exported class/function name in all-lowercase, no separators. E.g. `BaseInvoiceRequestDto` → `baseinvoicerequestdto.md`.

## Per-item file format

```markdown
# <ExportedName>

**Description:** <one-paragraph description, same as the TSDoc top comment>

**Source:** `<path from repo root>`

**Language:** typescript

## Code

\`\`\`typescript

<source contents, with @JSONSchema decorators AND their imports stripped>
\`\`\`
```

### Content rules for the code block

- **Strip `@JSONSchema(...)` decorators** from every property and the `JSONSchema` import line. The `llm/` mirror is meant to show validation/shape, not OpenAPI metadata.
- **Keep** all `class-validator` decorators, `class-transformer` decorators (`@Type`), and project custom decorators (`@AtLeastOneNonEmptyProperty`, `@IsOneOf`, `@IsOfAllowedTypes`, etc.).
- **Keep** TSDoc comments on the class and on each property.
- Imports inside the code block must include everything the snippet references (e.g. `Type`, custom decorators) but nothing more.
- The TypeScript sources in `dtos/`, `validators/`, etc. continue to use `class-validator-jsonschema` for schema generation — these rules apply ONLY to the `llm/` mirror.

## `llm.txt` entry format

```markdown
### <ExportedName>

**Description:** <same one-paragraph description>

**Source:** `<path>`

**Details:** See [llm/<kind>/<lowercasename>.md](llm/<kind>/<lowercasename>.md)

---
```

Entries inside each `## SECTION` are **alphabetized by ExportedName**.

## When to update

Update `llm.txt` + `llm/` whenever you:

- Add a new public DTO / enum / validator / decorator / transformer
- Rename one (rename both the `.md` file and the index entry)
- Change the description (top TSDoc comment) — propagate to both places
- Change the file contents — refresh the embedded code block

## Checklist

- [ ] `llm/<kind>/<lowercasename>.md` exists with description, source path, and full code dump
- [ ] `llm.txt` has an entry in the right section, alphabetized, with matching description and path
- [ ] Description matches the TSDoc on the class/function (single source of truth)
- [ ] After renames, no stale files left behind in `llm/`
