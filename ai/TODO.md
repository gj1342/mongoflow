# TODO

This file is the task ledger for AI agent work. All work should be represented here before implementation starts.

## Legend

- Status: Backlog, In Progress, Blocked, Done
- Priority: P0 (urgent), P1 (high), P2 (normal), P3 (low)

## Backlog

| ID  | Title | Status | Priority | Owner | Dependencies | Acceptance Criteria |
| --- | ----- | ------ | -------- | ----- | ------------ | ------------------- |
| -   | -     | -      | -        | -     | -            | -                  |

## In Progress

| ID  | Title | Status | Priority | Owner | Dependencies | Acceptance Criteria |
| --- | ----- | ------ | -------- | ----- | ------------ | ------------------- |
| -   | -     | -      | -        | -     | -            | -                  |

## Blocked

| ID  | Title | Status | Priority | Owner | Dependencies | Acceptance Criteria |
| --- | ----- | ------ | -------- | ----- | ------------ | ------------------- |
| -   | -     | -      | -        | -     | -            | -                  |

## Done

| ID  | Title | Status | Priority | Owner | Dependencies | Acceptance Criteria |
| --- | ----- | ------ | -------- | ----- | ------------ | ------------------- |
| 001 | Setup layered architecture structure | Done | P1 | Developer | - | src/ with config, models, repositories, services, controllers, routes, middlewares, utils |
| 002 | Implement configuration layer | Done | P1 | Developer | 001 | constants.ts, environment.ts, database.ts |
| 003 | Create error handling system | Done | P1 | Developer | 002 | AppError class, errorHandler middleware, asyncHandler wrapper |
| 004 | Implement Product CRUD | Done | P1 | Developer | 001,002,003 | Product model, repository, service, controller, routes |
| 005 | Setup Express app entry point | Done | P1 | Developer | 001,002,003,004 | src/index.ts with middleware stack |
| 006 | Define AI agent workflow | Done | P1 | Planner | - | ai/README.md, ai/TODO.md, ai/RULES.md, ai/ARCHITECTURE.md, ai/agents/ |

## Notes

- Keep IDs stable. Do not reuse IDs.
- Move tasks between sections instead of changing the status only.
- Add evidence links (PRs, test outputs, docs) in the Acceptance Criteria column when done.
