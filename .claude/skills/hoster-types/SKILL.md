---
name: hoster-types
description: Conventions for authoring DTOs, validators, custom decorators, enums, and LLM docs in the @hosterai/types package (this repo). Use whenever creating or editing files under dtos/, validators/, decorators/, enums/, transformers/, helpers/, llm/, llm.txt, openapi/, or index.ts — i.e. any time the work touches class-validator DTOs, their validators or specs, custom validation decorators, enum definitions, OpenAPI schema generation, or the LLM-friendly reference docs that ship with this package. Also use when writing commit messages or deciding what to run before pushing.
---

# @hosterai/types — Authoring Conventions

This package ships shared TypeScript types (DTOs, enums, validators) consumed by all HosterAI services. Public API surface is `index.ts` → `dist/`. Everything is reflected into OpenAPI schemas via `class-validator-jsonschema` and `scripts/generate-schemas.ts`.

Keep style consistent with what exists. When in doubt, mirror a recently-touched sibling file.

## Directory map (where things go)

- `dtos/` — DTO classes. Subfolders mirror domain: `invoice/`, `product/`, `notification/`, `tax-manager/`, plus `requests/` and `responses/` siblings inside each domain.
- `enums/` — String enums. Subfolders for domain (`invoice/`, `notification/`).
- `validators/` — Thin functions wrapping `validateSync` for each DTO + co-located `.spec.ts`.
- `decorators/` — Custom `class-validator` decorators + co-located `.spec.ts`.
- `transformers/` — `class-transformer` helpers.
- `helpers/` — Pure utility functions.
- `openapi/schemas/components.schemas.ts` — **Generated**. Do not hand-edit. Run `npm run build:schemas`.
- `llm.txt` + `llm/{dtos,enums,validators,decorators,transformers}/*.md` — LLM-friendly mirror of the public API.

## File naming

- DTO: `kebab-case.dto.ts` exporting a `PascalCase` class. Suffix the class with `Dto` **only when existing siblings do** (mixed in the repo — e.g. `InvoiceContactData` has no `Dto` suffix, but `CompanyDataDto` does). Mirror the closest neighbour.
- Validator file: `kebab-case-validator.ts` **or** `kebab-case.validator.ts` — both spellings exist; match the sibling file in the same folder.
- Validator spec: same basename as the validator with `.spec.ts`.
- Enum: `kebab-case.enum.ts`, class `PascalCaseEnum`, values `UPPER_SNAKE = 'UPPER_SNAKE'` (string-valued).
- Decorator: lives under `decorators/` with `.validator.ts` suffix; spec is `kebab-case-validator.spec.ts`.

## When adding a new DTO

1. Create file under the correct `dtos/<domain>/` folder.
2. Author per [references/dto-pattern.md](references/dto-pattern.md).
3. Add `export * from './dtos/...';` in `index.ts` in the matching section (Base DTOs / Invoice DTOs / Product DTOs / Notification DTOs). Keep section ordering intact.
4. Write a validator under `validators/` + `.spec.ts` (see [references/validator-pattern.md](references/validator-pattern.md)).
5. Export the validator from `index.ts`.
6. Update LLM docs (see [references/llm-docs.md](references/llm-docs.md)).
7. Run `npm test` and `npm run build:schemas` before commit.

## When adding a new enum

- String-valued, `UPPER_SNAKE = 'UPPER_SNAKE'`.
- Add `export * from './enums/<name>.enum';` in the Enums section of `index.ts`.
- Alphabetize entries when sensible (country / currency enums are alphabetized).
- See [references/enum-pattern.md](references/enum-pattern.md).

## When adding a custom decorator

- File under `decorators/` with `.validator.ts` suffix.
- Implement via `registerDecorator` from `class-validator`.
- Always ship `.spec.ts` covering valid + invalid cases and custom message.
- See [references/decorator-pattern.md](references/decorator-pattern.md).

## OpenAPI schemas

- DTOs are documented with `@JSONSchema({...})` from `class-validator-jsonschema` **alongside** `class-validator` decorators. JSONSchema entries duplicate the validation rules (`type`, `minLength`, `enum`, `$ref`) so consumers get a useful schema.
- For nested DTOs use `$ref: '#/components/schemas/<DtoName>'`.
- Never edit `openapi/schemas/components.schemas.ts` by hand — it is regenerated.
- After DTO changes run `npm run build:schemas` and commit the regenerated file.

## LLM docs (`llm.txt` + `llm/`)

- Every public DTO / enum / validator / decorator / transformer has a matching `llm/<kind>/<lowercasename>.md` file with description, source path, and full code dump.
- `llm.txt` is the index pointing to those files; alphabetized within each section.
- When adding or renaming public API, update both. See [references/llm-docs.md](references/llm-docs.md).

## Commit messages

Conventional Commits, lower-case subjects. Common prefixes seen in `git log`:

- `feat: ...` — new DTO / enum / event types
- `refactor: ...` — restructure existing types (most common)
- `fix: ...`
- `chore: bump version to x.y.z`
- `docs: ...`
- `style: ...` — formatting only

Subject describes _what changed_ concretely (which DTO, which field). Body optional — used for multi-change refactors.

## Pre-push / pre-commit checklist

```bash
npm test               # jest, must pass
npm run build:schemas  # regenerate openapi/schemas/components.schemas.ts
npm run build          # tsc — catches type errors not caught by jest
npm run lint           # eslint --fix
npm run format         # prettier --write
```

If `build:schemas` changes `components.schemas.ts`, commit that file together with the DTO change.

## Quick rules

- `import 'reflect-metadata';` already in `index.ts` — do not re-import in DTO/validator files. Specs DO re-import it as their first line.
- DTOs use `!` for required fields, `?` for optional. Pair with `@IsNotEmpty()` / `@IsDefined()` vs `@IsOptional()`.
- Nested DTOs need both `@ValidateNested()` and `@Type(() => ChildDto)`.
- Arrays of DTOs need `@ValidateNested({ each: true })` + `@Type(() => ChildDto)`.
- Validators are thin wrappers — always `plainToInstance` then `validateSync`, return `ValidationError[]`.
- Tests: structure `describe('XxxDto Validator', () => { describe('Valid cases'); describe('Missing required fields'); describe('Invalid field values'); })`.

## Reference files

- [references/dto-pattern.md](references/dto-pattern.md) — DTO template with decorator combinations
- [references/validator-pattern.md](references/validator-pattern.md) — Validator + spec template
- [references/enum-pattern.md](references/enum-pattern.md) — Enum conventions
- [references/decorator-pattern.md](references/decorator-pattern.md) — Custom decorator + spec template
- [references/llm-docs.md](references/llm-docs.md) — How to update `llm.txt` and `llm/` docs
