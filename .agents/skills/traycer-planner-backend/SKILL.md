---
name: traycer-planner-backend
description: An Advanced and Enhanced version of traycer.ai for planning backend implementations and architecture. Use this skill when the frontend implementations have been completed and the user is ready to add backend capabilities (Auth, DB, APIs), or when explicitly asked to plan the backend phase of an epic.
---

# Traycer Planner - Backend

A premium project architect and planner designed to bridge the gap between high-level intent and granular backend execution. This skill is meant to be used _after_ all frontend implementations have been fully completed and tested.

## Core Rules

- **Backend Only After Frontend**: Ensure the frontend is fully implemented and tested. Backend implementation will only start after this condition is met.
- **Analyze First**: You should always analyze the current code and plan accordingly after all necessary questions have been asked to understand the context.
- **Contextual Continuity**: You must check and analyze if there is an existing plan (e.g., `PHASE.md` files that have been generated already) to understand what is being built and the overall context. Continue numbering from there (e.g., if the last is `PHASE_6.md`, you should continue and start naming from `PHASE_7.md`).
- **Phase Splitting**: Tasks must be split into at least 5 phases (mainly 5 to 20 phases depending on complexity).
- **Step-by-Step Execution**: Ensure each phase is completed and tested step by step. Require the user to check and start the next phase after the previous phase has been completed.
- **Comprehensive Backend Planning**: All phases created must cover all implementation and everything that will be needed for the backend to work properly and integrate seamlessly with the frontend.

## Workflow

### 1. Intent & Context Extraction

- Analyze the current codebase and read all existing `PHASE.md`, `01_PRD.md`, and `02_TECH_SPEC.md` files.
- Understand the mock data and placeholder structures used in the frontend so they can be replaced by real backend integration.

### 2. Deep Dive Interview (RELENTLESS & MANDATORY)

You must interview the user relentlessly about every aspect of the backend requirements until we reach a shared understanding. Walk down each branch of the architecture tree, resolving dependencies between decisions one-by-one. If a question can be answered by exploring the codebase, explore the codebase instead.

**Questions to Consider:**

- Database Schema and Relationships?
- Authentication strategy (e.g., Supabase Auth, NextAuth, JWT)?
- Security and Privacy rules (e.g., RLS in Supabase)?
- Expected user load and scalability needs?
- 3rd Party API integrations?

_Wait until ALL information and context has been established before drafting the Phases._

### 3. Artifact Updates

Update the existing planning files in `./plans/[projectName]/`:

#### 📂 `02_TECH_SPEC.md` (Updates)

- **Backend Architecture Overview**: System flow including DB, APIs, Auth.
- **Tech Stack Updates**: Backend frameworks, database.
- **Data Schema**: ER diagrams or JSON schemas.
- **API Design**: Endpoint definitions, Request/Response pairs.
- **Security & Scalability**: Auth strategies, data encryption, caching, etc.

#### 📂 `03_PHASED_PLAN.md` (Updates)

Add the backend phases to the execution roadmap.

### 4. Task Decomposition

Create new task files in the `tasks/` subdirectory, continuing from the last phase number (e.g., `tasks/PHASE_7.md`).

**Every task MUST follow this format:**

```markdown
- [ ] **Task Title**: Brief description.
  - **Details**: Specific implementation notes.
  - **Verification**: How to prove it works? (e.g., "Run API test", "Check database seed", "Verify auth flow").
```
