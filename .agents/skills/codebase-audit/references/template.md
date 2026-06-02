# Codebase Audit: {{scope}}

**Generated:** {{date}}
**Scope:** {{user's description of what was audited}}

---

## Current Implementation / Current Flow

{{detailed description of how things currently work}}

{{include file:line references for key locations}}

---

## Issues Identified

### Critical

#### {{ISSUE-001}} — {{short title}}
- **Location:** `{{file}}:{{line}}`
- **Problem:** {{description of what's wrong}}
- **Impact:** {{why it matters — bugs, performance, security, maintainability}}

#### {{ISSUE-002}} — {{short title}}
- **Location:** `{{file}}:{{line}}`
- **Problem:** {{description}}
- **Impact:** {{why it matters}}

### High

#### {{ISSUE-003}} — {{short title}}
...

### Medium

#### {{ISSUE-004}} — {{short title}}
...

---

## Recommendations

Each recommendation links back to the issue(s) it solves.

### {{REC-001}} — {{short title}} (→ {{ISSUE-001}})
- **Problem:** {{what's wrong, brief}}
- **Approach:** {{specific implementation approach}}
- **Why this is better:** {{project-specific justification — why this fits this project's architecture, stack, goals, conventions, and constraints better than the current approach or alternatives}}
- **Tradeoffs:** {{what's gained vs what's lost — e.g., complexity, performance, DX, UX}}
- **Files affected:** {{list of files to create/modify/delete}}

### {{REC-002}} — {{short title}} (→ {{ISSUE-002}})
...

---

## Proposed Plan

| Phase | Tasks | Depends On | Est. Effort |
|-------|-------|------------|-------------|
| 1: {{phase name}} | {{REC-001, REC-002}} | — | {{small/medium/large}} |
| 2: {{phase name}} | {{REC-003}} | Phase 1 | {{small/medium/large}} |
| 3: {{phase name}} | {{REC-004, REC-005}} | Phase 1, Phase 2 | {{small/medium/large}} |

**Notes:**
- {{dependency rationale, ordering notes}}

---

## Task Status

Use this table to track progress across sessions. Mark tasks as you complete them.

| ID | Action | Phase | Status | Session |
|----|--------|-------|--------|---------|
| REC-001 | {{short description}} | 1 | ⬜ Pending | — |
| REC-002 | {{short description}} | 1 | ⬜ Pending | — |
| REC-003 | {{short description}} | 2 | ⬜ Pending | — |
| REC-004 | {{short description}} | 3 | ⬜ Pending | — |
| REC-005 | {{short description}} | 3 | ⬜ Pending | — |
