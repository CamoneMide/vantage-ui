---
name: codebase-audit
description: Perform a systematic codebase audit — explore current implementation, identify issues, and generate a structured .md file with findings, recommendations, and a phased plan. The output file is designed for cross-session review and distributed task execution. Use this skill whenever the user says they want to audit, review, analyze, find issues/bugs/problems, evaluate architecture, document current flows, or identify technical debt. Also use when the user wants to "run a prompt that identifies issues and recommends fixes," "create a plan from the codebase," or "generate a report with recommendations." Do NOT use this for simple code reviews of individual files — this is for multi-file, architectural, or project-wide analysis.
---

# Codebase Audit

A systematic skill for exploring a codebase, documenting current implementation, identifying issues with file:line precision, generating project-contextualized recommendations, and producing a phased plan — all saved to a `.md` file that can be shared across sessions.

## The output file is the artifact

The goal is a single self-contained `.md` file saved to `audit/<kebab-scope>.md`. This file is designed so that a fresh LLM session with no prior context can read it and immediately understand:

- What the current code does and where
- What's wrong and why
- What to do instead and why it's better for *this specific project*
- In what order to do it
- What's already been done (via the task status table)

Keep this goal in mind throughout. Every decision — what to include, how much detail, which references — serves cross-session portability.

## Workflow

### Step 1: Clarify scope

Before exploring, confirm what the user wants audited. Ask if they mean the full project or a specific area. Examples of scopes:

- "the full project"
- "the cart/checkout flow"
- "authentication and middleware"
- "performance bottlenecks in product pages"
- "accessibility issues in dashboard"
- "the database schema and queries"
- "the admin panel"

If the user is vague, suggest likely candidates based on what you see in the project structure, then let them decide.

### Step 2: Explore the codebase

Systematically explore the relevant parts of the codebase. Use the search tools in parallel to maximize efficiency.

**For each area in scope, you need to understand:**

1. **File structure** — what files exist, naming conventions
2. **Data flow** — how data enters, transforms, and exits
3. **State management** — what's in client state (Zustand) vs server state (DB/React Query)
4. **API and server actions** — endpoints, auth, error handling
5. **Component tree** — parent/child relationships, prop drilling, composition
6. **Database schema and queries** — if relevant
7. **Auth and middleware** — protection layers, session handling

**Search patterns to use:**

- `glob()` — find files by pattern (e.g., `src/lib/actions/*.ts`, `src/components/cart/**/*.tsx`)
- `grep()` — find usages of specific patterns, imports, exports
- `read()` — read key files in full for deep understanding
- `task()` with subagent — delegate exploration of large or independent areas in parallel

**Document what you find with file:line references.** For example:

> The cart uses a Zustand store (`src/store/cart-store.ts:12-45`) persisted to localStorage. Products are fetched client-side via React Query in `src/app/cart/page.tsx:34`. The checkout server action is at `src/lib/actions/checkout.ts:8`.

### Step 3: Identify issues

As you explore, catalog every problem you find. Classify by severity:

| Severity | Definition |
|----------|------------|
| **Critical** | Bug, security hole, data loss, broken UX — actively harms users |
| **High** | Major anti-pattern, significant maintainability debt, performance problem |
| **Medium** | Code smell, minor anti-pattern, missing edge case, room for improvement |
| **Low** | Style, naming, minor consistency — nice to fix |

**What counts as an issue:**

- Logic bugs or incorrect behavior
- Security vulnerabilities (unprotected routes, RLS bypasses, injection)
- Performance problems (waterfall requests, missing caching, large bundles)
- Missing loading/error/empty states
- State management in wrong layer (client data that should be server-side or vice versa)
- Deviations from project conventions (check AGENTS.md and existing code patterns)
- Tight coupling, deep prop drilling, overly large components
- Missing TypeScript types or `any` usage
- Hardcoded values that should be configurable
- Dead code, commented-out code, unused imports

**Give each issue a unique ID** (`ISSUE-001`, `ISSUE-002`, etc.) so recommendations can reference them.

### Step 4: Generate the audit file

Read `references/template.md` for the exact format. Save the file to `audit/<scope>.md` (create the `audit/` directory if needed).

**File naming:** Use kebab-case based on the scope. Examples:
- Full project audit → `audit/full-project.md`
- Cart checkout flow → `audit/cart-checkout-flow.md`
- Auth and middleware → `audit/auth-middleware.md`

**For each recommendation, include a strong "Why this is better" section.** This is critical for cross-session use. A fresh model needs to know *why* this approach is the right one for *this project* — not generic advice. Ground it in:

- **Project stack** — does it leverage existing dependencies, patterns, and conventions?
- **Architecture** — does it align with the project's data flow and component model?
- **Goals** — does it serve the project's purpose (e.g., e-commerce, dashboard, content site)?
- **Constraints** — does it work with the existing auth model, DB schema, hosting, etc.?

**Example of a good "Why this is better":**

> **Why this is better:** This project already uses Drizzle + Supabase and has a server action pattern established in `src/lib/auth-actions.ts`. Moving cart state to the server means RLS applies automatically, cart data persists across devices, and the existing middleware (`src/middleware.ts:15`) protects it for free. No need for Zustand persist hydration logic or manual localStorage sync. This aligns with the project's existing data model where the `carts` table is already in the schema (`src/lib/db/schema.ts:89`).

**Example of a bad "Why this is better" (too generic):**

> Server state is better because it's more reliable.

### Step 5: Present for review

After writing the file, summarize what you found for the user:

- How many issues found (by severity)
- How many recommendations
- The phases in the plan
- Any notable findings

Ask the user to review the file and let you know what they'd like to change.

### Step 6: Revise based on feedback

When the user gives feedback, apply changes directly to the `audit/<scope>.md` file. Iterate until the user approves.

## Cross-session usage

Once the user approves the audit file, it can be used across sessions:

1. A new session reads `audit/<scope>.md`
2. The task status table shows what's done and what's pending
3. The session picks a pending task, references the recommendation details and file locations
4. After implementation, the session updates the task status table (marking `✅ Done` and adding the session identifier)
5. The file stays in sync across sessions via git (the file is in a gitignored directory, but the user can commit it when they want to share progress)

The recommendations are self-contained enough that no re-exploration is needed — file:line references and "why this is better" provide all the context.

## Quality checklist

Before presenting the audit to the user, verify:

- [ ] Every issue has a unique ID and severity
- [ ] Every issue has file:line references where applicable
- [ ] Every recommendation links to the issue(s) it solves
- [ ] Every recommendation has an approach, a project-specific "why this is better", and tradeoffs
- [ ] The plan has clear phases with dependencies and effort estimates
- [ ] The task status table uses the REC-IDs for tracking
- [ ] The file is self-contained — would a fresh session understand it?
