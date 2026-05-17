# Progress History — Mandatory Update Rule

**Every task performed on this codebase MUST update `progress-history.md`** in the repo root upon completion.

## Why

`progress-history.md` is the single source of truth for tracking all 15 implementation phases against the plan in `plans/vantage-ui/tasks/`. Skipping updates causes drift between what exists and what is tracked.

## What to do

Before marking any task as complete (checking a box in a phase file), you MUST:

1. **Read `progress-history.md`** to understand current state.
2. **Read the relevant phase task file(s)** in `plans/vantage-ui/tasks/` to confirm what was asked.
3. **Update `progress-history.md`**:
   - Mark the task row as ✅ and add a brief notes column entry.
   - Update the overall phase status at the top of the file.
   - Update the "Last updated" date.
4. **Run validation** — `pnpm lint` and `pnpm test` must pass before marking the task complete.
5. If a task was altered, blocked, or deprioritized, note the reason in the Notes column.

## Enforcement

This rule is **non-optional**. All agents and human contributors must follow it. If you see a stale `progress-history.md`, flag it immediately.
