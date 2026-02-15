# AI Process

This folder defines a lightweight, professional workflow for coordinated AI agents working on this Express.js + Mongoose backend. The documents here are designed to be human-readable, auditable, and easy to adapt.

Adapted from [git-dariel/mongo](https://github.com/git-dariel/mongo) - a robust MongoDB template with Express.js and TypeScript.

## Purpose

- Provide a single source of truth for planning, architecture, and operating rules.
- Keep agent responsibilities clear to avoid task overlap.
- Make the output reviewable and safe for production changes.

## Files

- TODO.md: Task backlog, in-progress items, and done work.
- ARCHITECTURE.md: System context, design constraints, and key decisions.
- RULES.md: Operating rules and quality bar.
- agents/: Role definitions and handoff expectations.

## Workflow Summary

1. Planner updates TODO.md with scoped tasks and acceptance criteria.
2. Architect updates ARCHITECTURE.md when design impacts occur.
3. PM assigns tasks and maintains dependencies in TODO.md.
4. Developers implement tasks and update status and evidence links.
5. Security reviews authentication, database operations, and sensitive data handling.
6. QA writes or updates tests and records results.
7. Reviewer performs final pass against RULES.md and TODO.md.

## How to Use

Acronyms: **PP** Project Planner | **PM** PM | **ARCH** Architect | **DEV** Developer | **QA** QA | **SEC** Security | **REV** Reviewer

Typical flow: PP -> PM -> DEV -> REV. Add ARCH for design changes; SEC for security-related work; QA when testing is needed.

### Agent Purposes

| Agent | Purpose | Why it matters |
| ----- | ------- | ---------------- |
| PP | Turn requests into scoped tasks with acceptance criteria | Without clear tasks, work becomes vague and hard to track. |
| PM | Assign tasks, auto-assign best agent, prevent overlap | No need to choose assignee; PM infers DEV/ARCH/QA/REV from task type. |
| ARCH | Document design decisions and maintain constraints | Keeps layered architecture, API patterns, and rules consistent across changes. |
| DEV | Implement assigned tasks per ARCHITECTURE and RULES | Delivers code that fits the project structure and quality bar. |
| QA | Add or update tests and record evidence | Catches regressions; ensures logic matches acceptance criteria. |
| SEC | Review security aspects of changes | Validates authentication, data handling, environment variables, and input validation. |
| REV | Validate changes against RULES and TODO before merge | Final gate: scope alignment, no regressions, docs updated. |

### Example Prompts (short)

| Agent | Prompt |
| ----- | ------ |
| PP | `PP: add [feature]` |
| PM | `PM: move 008 to In Progress` (auto-assigns DEV/ARCH/QA/SEC by task type) |
| ARCH | `ARCH: task 008 adds new repository layer – update ARCHITECTURE` |
| DEV | `DEV: implement 008` |
| QA | `QA: add tests for 008` |
| SEC | `SEC: review 008 for security` |
| REV | `REV: review 008` |

### Full prompts (when more context is needed)

- **PP**: PP: I want to add user authentication. Create tasks in TODO.md with acceptance criteria.
- **PM**: PM: Move task 008 to In Progress. (PM auto-assigns best agent; no need to specify.)
- **ARCH**: ARCH: Task 008 introduces JWT authentication. Update ARCHITECTURE.md with the decision and middleware flow.
- **DEV**: DEV: Implement task 008. Follow ARCHITECTURE and RULES. Use layered architecture pattern.
- **QA**: QA: Task 008 is done. Add tests for authentication endpoints. Record coverage in TODO.md acceptance criteria.
- **SEC**: SEC: Review task 008. Validate token handling, password hashing, and environment variable usage.
- **REV**: REV: Review changes for task 008. Validate against RULES and TODO acceptance criteria. Confirm ready for merge.

## Conventions

- Keep edits small and traceable.
- Update TODO.md as the source of truth for progress.
- Prefer explicit checklists and acceptance criteria.
- Avoid emojis and decorative formatting.
