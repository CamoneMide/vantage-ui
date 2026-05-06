---
name: review-implementation
description: Systematic implementation review covering best practices, acceptance criteria coverage, and performance efficiency. Use this skill whenever the user says things like "review the implementation", "let's go through the implementation again", "check if we followed best practices", "did we implement everything in the acceptance criteria", "is the implementation performant", "review against requirements", or any combination of these concerns. Also trigger when the user asks for a quality check on completed work before shipping or merging.
---

# Implementation Review

Conduct a thorough, structured review of the implementation across three dimensions: **best practices**, **acceptance criteria coverage**, and **performance efficiency**.

## Step 1: Gather Context

Before reviewing, collect what you need:

**Acceptance criteria** — look in this order:
1. The current conversation (user may have shared a spec, ticket, or list)
2. Recent commit messages: `git log --oneline -10`
3. Any PRD, spec, or issue files in the repo
4. If none found, ask the user before proceeding — you can't check coverage without knowing what to check against

**Scope of changes** — understand what was actually built:
```bash
git diff --name-only HEAD~1   # files changed in last commit
git status                     # uncommitted changes
```

**Tech stack** — identify the language, framework, and key libraries so best-practice checks are relevant.

## Step 2: Read the Implementation

Read all files relevant to the feature. Don't skim — understand how the pieces connect before forming opinions.

## Step 3: Review Across Three Dimensions

### Best Practices

Review against the conventions of the specific language and framework in use. Generally look for:

- **Separation of concerns** — is logic correctly layered (UI, business logic, data)?
- **Error handling** — are failure cases handled, or does the code assume everything works?
- **Type safety** — are types/nullability handled correctly, or are there unsafe casts/assumptions?
- **Test coverage** — is new logic covered by tests?
- **Naming and clarity** — would another developer understand this code without asking questions?
- **DRY** — is there unnecessary duplication that should be abstracted?
- **Security** — input validation, auth checks, no exposed secrets or unsafe operations?

Be specific. Don't just say "improve error handling" — point to the exact location and explain what's missing.

### Acceptance Criteria Coverage

For each acceptance criterion, determine:
- Is it fully implemented?
- Are edge cases handled?
- Does it work end-to-end, or just partially?

Mark each criterion clearly:
- ✅ **Implemented** — fully done
- ⚠️ **Partial** — started but incomplete, or missing edge cases
- ❌ **Missing** — not implemented
- ❓ **Needs verification** — can't confirm from code alone, requires testing

### Performance Efficiency

Look for inefficiencies that would matter at scale or under real usage:

- **Unnecessary recomputation** — work being done repeatedly that could be cached or memoized
- **Excessive API/DB calls** — N+1 patterns, calls inside loops, missing batching
- **Bundle/memory concerns** — importing heavy libraries for simple tasks, uncleaned listeners or timers
- **Blocking operations** — synchronous work that should be async
- **Inefficient data structures** — using the wrong structure for the access pattern (e.g., array linear scan where a Set lookup would work)

Only flag performance issues that are real concerns — don't nitpick micro-optimizations that don't matter.

## Step 4: Write the Report

Use this structure:

---

## Implementation Review

### Summary
[2–3 sentences: overall quality, biggest strengths, most important concerns]

### Acceptance Criteria

| Criterion | Status | Notes |
|-----------|--------|-------|
| [criterion 1] | ✅ | |
| [criterion 2] | ⚠️ | [what's missing] |
| [criterion 3] | ❌ | [not found] |

### Best Practices

**What's working well:**
- [specific strength]

**Issues to address:**
- `path/to/file.ts:42` — [issue description and why it matters]

### Performance

[Either "No significant concerns found." or a list of specific issues with file references and suggested fixes]

### Recommended Actions

[Prioritized list — what to fix before shipping vs. what can be a follow-up]

---

## Tone

Be direct and specific. The goal is actionable feedback, not a grade. When something is done well, say so — it helps the team understand what to repeat. When something needs fixing, explain why it matters, not just that it's wrong.
