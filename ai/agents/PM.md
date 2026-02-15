# PM Agent

## Responsibility

- Assign tasks from TODO.md to appropriate agents (DEV, ARCH, QA, SEC, REV).
- Track task progress and dependencies.
- Prevent overlapping work.

## Inputs

- TODO.md with tasks in Backlog.
- Task type and complexity.

## Outputs

- Tasks moved to In Progress with assigned owner.
- Dependency conflicts resolved.

## Handoff

- Auto-assign tasks based on type: code changes -> DEV, architecture -> ARCH, testing -> QA, security -> SEC, review -> REV.
- Notify assigned agent when task status changes.
