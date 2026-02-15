# Rules

These rules define how agents operate in this codebase. They prioritize clarity, safety, and traceability.

## Operating Rules

1. TODO.md is the source of truth for scope and status.
2. Avoid overlapping work. PM assigns tasks with clear boundaries.
3. Keep changes minimal and relevant to a single task.
4. Document decisions in ARCHITECTURE.md when design changes occur.
5. Use professional, neutral language in all documentation.
6. Avoid emojis and decorative formatting in docs under ai/.
7. Follow layered architecture: models -> repositories -> services -> controllers -> routes.
8. Follow existing project conventions; do not introduce new architectural patterns unless explicitly required and approved.

## Communication Format

- Each agent reports: scope, files touched, risks, and verification steps.
- Handoffs include links to relevant sections in TODO.md and ARCHITECTURE.md.

## Quality Bar

- Code must build with `npm run build` and typecheck with `npm run typecheck`.
- Tests are required for logic-heavy changes; add or update tests under the relevant area.
- No sensitive data in logs or error messages.
- Error handling must be centralized via errorHandler middleware.

## Security Rules

- No sensitive data (passwords, tokens, API keys) in code or logs.
- Environment variables only for secrets; never commit .env files.
- Validate all user inputs at controller and model levels.
- Sanitize all outputs; never expose stack traces in production.
- No use of eval(), Function(), or similar unsafe patterns.
- All database queries must use Mongoose (no raw queries).
- HTTPS only in production.
- Review all dependencies for vulnerabilities with npm audit.
- Use .cursorignore to block agent access to sensitive files.
- Terminal commands require explicit approval; avoid auto-approval.
- All MCP and third-party integrations require approval.

## Backend-Specific Rules

- SOLID: Single responsibility, open/closed, dependency inversion (repository pattern).
- DRY: Shared logic in utils, config, middlewares.
- No comments: Code must be self-documenting via clear naming and structure.
- TypeScript strict mode: No any types unless absolutely necessary.
- Error handling: All errors thrown as AppError instances.
- Async handling: All async controllers wrapped with asyncHandler.
- Response format: Use response utilities (sendSuccess, sendError, etc.).
- Constants: Hardcoded texts in config/constants.ts.
- Validation: Input validation at controller level, schema validation at model level.
- Dependencies: Express for HTTP, Mongoose for MongoDB, CORS for cross-origin.

## Code Standards

- File naming: camelCase for variables/functions, PascalCase for classes/interfaces.
- Module system: ES modules with .js extensions in imports.
- Exports: Named exports for utilities, default exports for routes.
- Interfaces: Define interfaces for all entities extending Document.
- Error messages: Use constants from config/constants.ts.
- HTTP status codes: Use constants from config/constants.ts.

## Review Checklist

- Requirements match TODO.md acceptance criteria.
- Layered architecture respected (no circular or upward dependencies).
- No security regressions (validation, data exposure, error handling).
- Security agent approval for changes involving authentication, database, or sensitive data.
- Docs updated if behavior changes.
- Tests added or updated as needed and recorded in TODO.md.
- No comments in code.
- TypeScript compiles without errors.
