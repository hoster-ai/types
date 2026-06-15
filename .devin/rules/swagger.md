---
trigger: manual
---

OpenAPI schema generation rules live in the project skill:

**`.claude/skills/hoster-types/SKILL.md`** (section: *OpenAPI schemas* + *Pre-push / pre-commit checklist*)

Short version: after changing DTOs, enums, or country helpers that affect OpenAPI schemas, run `npm run build:schemas` to regenerate `openapi/schemas/components.schemas.ts` and commit the result.
