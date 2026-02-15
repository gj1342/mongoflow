# Architecture

This document captures system context, design constraints, and key decisions for the Express.js + Mongoose backend.

## Context

- Stack: Express.js, TypeScript, Mongoose, MongoDB.
- Architecture: Layered architecture with models, repositories, services, controllers, routes.
- Patterns: Repository pattern, dependency injection via constructors, centralized error handling.

## Goals

- Maintain clear separation of concerns via layered architecture.
- Keep business logic testable and isolated from HTTP concerns.
- Favor small, focused modules following SOLID principles.
- Enable easy extension and maintenance.

## Non-Goals

- Large-scale framework migration.
- Complex microservices architecture.
- GraphQL or alternative API patterns (REST only).

## High-Level Overview

- Entry: src/index.ts bootstraps the Express app and database connection.
- Routes: src/routes/ defines API endpoints and route composition.
- Controllers: src/controllers/ handle HTTP requests and responses.
- Services: src/services/ contain business logic and orchestration.
- Repositories: src/repositories/ provide data access layer.
- Models: src/models/ define Mongoose schemas and validation.
- Middlewares: src/middlewares/ handle cross-cutting concerns (errors, async).
- Utils: src/utils/ provide shared utilities (errors, responses).
- Config: src/config/ centralize configuration (constants, environment, database).

## Data Flow

1. Client sends HTTP request to route.
2. Route delegates to controller method.
3. Controller validates input and calls service.
4. Service executes business logic and calls repository.
5. Repository performs database operations via model.
6. Response flows back through service -> controller -> client.

## Layered Architecture

### Models
- Mongoose schemas and validation rules.
- Define data structure and constraints.
- No business logic.

### Repositories
- Direct database operations (CRUD).
- Abstract Mongoose details from services.
- Return models or null.
- Single responsibility: data access.

### Services
- Business logic and validation.
- Orchestrate repository calls.
- Throw AppError for business rule violations.
- Independent of HTTP concerns.

### Controllers
- Handle HTTP request/response.
- Parse request data.
- Call service methods.
- Format responses using response utilities.
- Use asyncHandler to eliminate try-catch.

### Routes
- Define API endpoints.
- Map HTTP methods to controller methods.
- Compose route modules.

## SOLID Principles Application

- **Single Responsibility**: Each layer handles one concern (controller=HTTP, service=logic, repository=data).
- **Open/Closed**: Extend via composition (new services use existing repositories).
- **Liskov Substitution**: Repository interfaces allow swapping implementations.
- **Interface Segregation**: Each entity has its own focused repository/service.
- **Dependency Inversion**: Controllers depend on services, services depend on repositories (both via constructor injection).

## DRY Principles

- Shared error handling via errorHandler middleware.
- Reusable response utilities (sendSuccess, sendError, etc.).
- Constants centralized in config/constants.ts.
- Async error wrapper eliminates try-catch repetition.
- Generic patterns reusable across entities.

## Key Decisions

| Date | Decision | Rationale | Impact |
| ---- | -------- | --------- | ------ |
| - | Layered architecture | Clear separation of concerns, testability | Structured codebase |
| - | Repository pattern | Abstract database operations, enable testing | Data layer independence |
| - | Centralized error handling | Consistent error responses, no try-catch everywhere | Clean controller code |
| - | TypeScript strict mode | Type safety, catch errors early | Better code quality |
| - | No comments in code | Self-documenting code, focus on clarity | Readable codebase |

## Constraints

- TypeScript strictness and lint rules must be respected.
- SOLID and DRY principles apply to all code.
- No comments allowed; code must be self-documenting.
- Security-first approach: validate inputs, sanitize outputs, protect secrets.
- All async operations must be wrapped with asyncHandler.
- All errors must be thrown as AppError instances.

## Security Considerations

- All secrets in environment variables; .env files never committed.
- Input validation at controller and model levels.
- Error messages never expose sensitive data or stack traces in production.
- CORS configured with proper origin restrictions.
- Mongoose schema validation prevents invalid data.
- .cursorignore configured to protect sensitive files from agent access.
- Security agent (SEC) review required for authentication, database, and sensitive data changes.

## Risks

- Schema changes may require migration strategy (not yet implemented).
- Service layer growth may require further decomposition.
- Stale ARCHITECTURE.md or RULES.md may mislead AI or developers.
- Dependency vulnerabilities requiring regular npm audit checks.

## Next Review

- Update when introducing new architectural patterns, cross-cutting concerns, or major refactors.
