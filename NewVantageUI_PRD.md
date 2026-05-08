# Product Requirements Document: VantageUI (v1.0)

**Status:** Approved for Development
**Decision:** GO
**Target Audience:** Frontend Engineers, UI/UX Designers, Product Managers

---

## Problem Statement

Frontend developers regularly encounter a high-friction loop: they find a beautifully designed UI element or component on a live website, open browser DevTools to inspect it, and are immediately met with "CSS soup" — a cascade of hashed class names, globally-scoped overrides, and fragmented DOM nodes that bear no resemblance to how a developer would write the component from scratch. The existing tooling (DivMagic, CSS Scan, MagicCopy) only copies this raw, polluted HTML/CSS verbatim, leaving the developer to manually translate every style, infer all interactive states, and reconstruct the component architecture from scratch.

Even modern AI-powered alternatives (v0.dev, Claude, GPT-4o) fail here because they operate from **screenshots**. A screenshot cannot capture:

- The exact cubic-bezier easing curve of a CSS transition
- Hidden ARIA states that define interactive behavior (e.g., `aria-expanded`, `data-state="open"`)
- Specific CSS custom properties (`--radius`, `--primary`) tied to a design token system
- SVG path data, font face declarations, or embedded keyframe animations

The result is that a developer who wants to implement a polished, production-quality Shadcn/Tailwind component inspired by a live site spends anywhere from 30 minutes to several hours doing work that should take seconds.

---

## Solution

VantageUI is a browser extension that acts as a **precision extraction bridge** between any live website and a developer's local React/Tailwind/Shadcn codebase. Rather than copying raw DOM output, VantageUI:

1. **Inspects the live DOM** with surgical precision, capturing computed styles, animation states, ARIA attributes, design tokens, and SVG assets — the hidden data that screenshots and raw copy-paste miss entirely.
2. **Normalizes** this raw data into a clean, minimal JSON Blueprint, stripping all noise (hashed class names, irrelevant overrides) down to semantic, framework-agnostic structure.
3. **Synthesizes** the blueprint into a production-ready React component via an LLM (Claude 3.5 Sonnet / GPT-4o), enforcing idiomatic Tailwind CSS and Shadcn/Radix primitive patterns.
4. **Validates** the output in an integrated Sandpack sandbox within the browser's side panel, letting the developer tweak and test before exporting to their IDE.
5. **Documents** the target site's full design system on demand, generating a `DESIGN.md` and `tailwind.config.js` from its typography, color, and spacing tokens.
6. **Generates** a high-fidelity structured Markdown prompt from the extracted blueprint, enabling developers to copy it directly into Claude, GPT-4o, or v0.dev for further manual iteration or alternative framework generation.

Access is monetized through a pay-as-you-go credit system, with each LLM extraction call consuming one credit. New users receive five free credits on sign-up; additional credits are purchased via Stripe.

---

## User Stories

### Onboarding & Authentication

1. As a new user, I want to install the VantageUI extension from the Chrome Web Store, so that I can immediately access extraction features without any additional setup.
2. As a new user, I want to sign up for an account using my email and password, so that my credits, history, and settings are persisted across sessions and devices.
3. As a new user, I want to receive 5 free extraction credits automatically upon completing registration, so that I can evaluate the product before committing to a purchase.
4. As a new user, I want a guided onboarding tooltip sequence the first time I activate the extension, so that I understand how to use the inspector, sandbox, and export features without reading documentation.
5. As a returning user, I want to log in to my VantageUI account directly from the extension popup, so that my session is restored and I can resume work immediately.
6. As a returning user, I want my login session to persist across browser restarts, so that I am not prompted to re-authenticate on every browsing session.

### Component Inspection & Selection

7. As a frontend engineer, I want to activate the VantageUI inspector with a keyboard shortcut (`Cmd+Shift+X` / `Ctrl+Shift+X`), so that I can trigger extraction without removing my hands from the keyboard.
8. As a frontend engineer, I want the inspector to highlight logical component boundaries with a "Ghost" overlay as I hover over the page, so that I can select a semantically meaningful component (e.g., a full Card or Navigation bar) rather than a raw, fragmented DOM node.
9. As a frontend engineer, I want to click to confirm a highlighted component boundary, so that VantageUI locks the selection and prepares the extraction pipeline.
10. As a frontend engineer, I want to use arrow keys to navigate up and down the DOM tree from a selected node, so that I can fine-tune my selection granularity (e.g., moving from a Button to its parent Card).
11. As a frontend engineer, I want the extension to detect and capture hidden interactive states (open dropdowns, active modals, expanded accordions) by snapshotting the live DOM at the moment of selection, so that animated or conditionally-rendered UI is accurately captured.
12. As a frontend engineer, I want a visual indicator showing which ARIA attributes (e.g., `aria-expanded`, `role`, `data-state`) were captured on the selected node, so that I understand what interactive logic the LLM will infer.

### Extraction & Synthesis

13. As a frontend engineer, I want to trigger a component extraction with a single click after confirming my selection, so that the full pipeline (DOM capture → normalization → LLM synthesis) executes without further manual steps.
14. As a frontend engineer, I want the extension to capture all CSS computed styles for the selected node and its children, including custom properties and `@keyframe` animations, so that no visual fidelity is lost in the extracted output.
15. As a frontend engineer, I want the extension to detect and extract CSS transition durations, easing functions (including custom cubic-bezier curves), and animation delays from the live DOM, so that the generated component accurately reproduces the original motion behavior.
16. As a frontend engineer, I want all detected animations to be exported as idiomatic `framer-motion` props (variants, transition configurations), so that the output integrates natively with my existing animation setup.
17. As a frontend engineer, I want the extension to identify and extract all SVGs within the selected component (as inline React SVG components) and all image/video asset URLs, so that I have a complete, self-contained component package.
18. As a frontend engineer, I want the raw DOM data to be normalized into a minimal JSON Blueprint before being sent to the LLM, so that the extraction is fast, cost-efficient, and free from irrelevant noise that could cause hallucinations.
19. As a frontend engineer, I want the LLM synthesis step to map hardcoded color, spacing, and size values to the closest Tailwind CSS utility class or custom theme token, so that the generated code integrates cleanly with a standard Tailwind setup.
20. As a frontend engineer, I want the LLM to refactor recognized patterns (e.g., `aria-expanded` on a trigger element) into the appropriate Shadcn/Radix primitive (e.g., `<Accordion>`, `<Dialog>`, `<DropdownMenu>`), so that the output is architecturally idiomatic and not just a visual clone.
21. As a frontend engineer, I want to see my remaining credit balance displayed in the extension panel before triggering an extraction, so that I am never surprised by a failed extraction due to insufficient credits.
22. As a frontend engineer, I want to receive a clear, actionable error message if an extraction fails (e.g., due to a Shadow DOM boundary, CORS restriction, or LLM timeout), so that I understand what went wrong and how to proceed.

### The Prompt Generator

23. As a frontend engineer, I want to generate a structured Markdown prompt from the extracted JSON Blueprint, so that I can paste it directly into Claude, GPT-4o, or v0.dev for manual iteration without needing VantageUI's backend.
24. As a frontend engineer, I want the generated prompt to include the component's visual states, ARIA attributes, extracted animation values, and asset URLs, so that it provides the external LLM with the maximum possible context for accurate code generation.
25. As a frontend engineer, I want to copy the generated prompt to my clipboard with a single click, so that I can paste it into any external AI tool immediately.
26. As a frontend engineer, I want to choose which framework (React/Shadcn, React/Tailwind only, or raw HTML/CSS) the prompt targets, so that I can direct external LLMs to generate code for contexts where Shadcn is not applicable.

### The Sandpack Sandbox

27. As a frontend engineer, I want the generated React component to be rendered automatically in an integrated Sandpack playground within the Chrome Side Panel, so that I can visually validate the output before touching my local codebase.
28. As a frontend engineer, I want to live-edit the generated code directly inside the Sandpack sandbox, so that I can make quick tweaks (e.g., text content, color overrides) and see the result in real time before exporting.
29. As a frontend engineer, I want the sandbox to include the standard Tailwind CSS and Shadcn/Radix dependencies pre-configured, so that the generated component renders correctly without any additional setup.
30. As a frontend engineer, I want to copy the final (potentially edited) code from the sandbox to my clipboard with a single click, so that I can paste it directly into my IDE.
31. As a frontend engineer, I want to download the component as a `.tsx` file from the sandbox, so that I can add it to my project without using the clipboard.

### Design System Documentation

32. As a UI/UX designer, I want to trigger a site-wide "Theme Scan" that analyzes the entire page's computed styles to identify the design system in use, so that I can understand the visual architecture of any website at a glance.
33. As a UI/UX designer, I want the Theme Scan to produce a `DESIGN.md` document cataloging the site's color palette (with semantic roles: Primary, Secondary, Accent, Background), typography scale (font families, weights, sizes, line heights), and spacing system (common margin/padding values), so that I have a comprehensive reference for design system replication.
34. As a frontend engineer, I want the Theme Scan to generate a `tailwind.config.js` file pre-populated with the extracted design tokens (colors, fonts, spacing, border radii), so that I can bootstrap a Tailwind project that matches the target site's visual language with zero manual configuration.
35. As a frontend engineer, I want to view the generated `DESIGN.md` inline within the extension panel, so that I can reference it without leaving the browser.
36. As a frontend engineer, I want to download both the `DESIGN.md` and `tailwind.config.js` as files, so that I can commit them directly to my repository.

### Credit & Billing Management

37. As a user, I want to purchase additional credit packs (e.g., 50, 100, 200 credits) through a Stripe Checkout session triggered from within the extension, so that I can top up my balance without navigating to a separate website.
38. As a user, I want to view my full credit transaction history (credits granted, spent, and purchased) in my account dashboard, so that I can audit my usage and spending.
39. As a user, I want to receive an in-extension notification when my credit balance falls below 5 credits, so that I can top up before a critical workflow is interrupted.
40. As a user, I want my payment and subscription management to be handled securely by Stripe, so that my financial data is never stored directly by VantageUI.

### Extraction History & Management

41. As a frontend engineer, I want all my completed extractions to be saved to my account history automatically, so that I can retrieve and re-use previously extracted components without re-running the pipeline.
42. As a frontend engineer, I want to view my extraction history in the extension panel, including a thumbnail, the source URL, and the extraction timestamp, so that I can quickly identify the component I need.
43. As a frontend engineer, I want to re-open any saved extraction in the Sandpack sandbox from my history, so that I can continue editing or re-export it at any time.
44. As a frontend engineer, I want to delete extractions from my history, so that I can manage my storage and keep my workspace clean.

---

## Implementation Decisions

### Module Architecture

#### 1. Browser Extension (Content Scripts & Side Panel)

- Built with the **Plasmo Framework** (React-based, TypeScript-first, excellent DX for MV3 extensions).
- The **Inspector Module** runs as a content script injected into the active tab. It manages the hover state, Ghost overlay rendering, and selection confirmation.
- The **DOM Capture Module** (content script) is responsible for walking the selected node's subtree using the `TreeWalker` API and `getComputedStyle`, calling `element.getAnimations()` for motion data, and serializing all discovered assets (SVGs, image URLs).
- The **Normalization Engine** (content script or background worker) transforms the raw captured data into the **Standardized JSON Blueprint**. This is the most critical module — it must aggressively strip irrelevant data (hashed class names, vendor-prefixed duplicates, inherited browser defaults) to produce a minimal, semantically meaningful representation. This module must be treated as a deep module: a simple input/output API over a complex internal algorithm.
- The **Side Panel UI** (React, Tailwind CSS) renders all user-facing panels: the extraction output, Sandpack sandbox, Prompt Generator, Design System viewer, credit balance, and extraction history. It communicates with content scripts via the Chrome Extension Messaging API.

#### 2. Sandpack Integration

- The Sandpack playground (`@codesandbox/sandpack-react`) is embedded within the Side Panel UI.
- It is pre-configured with the `react-ts` template, including `tailwindcss`, `@shadcn/ui`, and `framer-motion` dependencies.
- Live-editing is enabled via Sandpack's built-in `SandpackCodeEditor`.

#### 3. Backend API (Next.js on Vercel)

- A Next.js application deployed to Vercel hosts all sensitive server-side logic.
- **LLM Proxy Route:** Accepts the Standardized JSON Blueprint and a target output mode (React/Shadcn, Prompt), calls the LLM API (Claude 3.5 Sonnet as primary, GPT-4o as fallback), and returns the synthesized code. This route validates the user's session and deducts one credit atomically before calling the LLM.
- **Auth Routes:** Handled via Supabase Auth (email/password). The backend validates Supabase JWTs on all protected routes.
- **Credit Management Routes:** Exposes endpoints to read a user's credit balance and transaction history.
- **Stripe Webhook Handler:** Listens to Stripe events (`checkout.session.completed`) and credits the user's account in Supabase upon successful payment.
- All LLM API keys and Stripe secret keys are stored exclusively as Vercel environment variables and are never exposed to the client.

#### 4. Database & Auth (Supabase)

- **Supabase Auth** manages user identity (email/password).
- **Schema:**
  - `users` table: Extended profile linked to Supabase Auth UID.
  - `credits` table: Stores `user_id`, `balance`, and a `transactions` JSONB column for a full ledger.
  - `extractions` table: Stores `user_id`, `source_url`, `json_blueprint`, `generated_code`, `created_at`, and a `thumbnail_url` (a screenshot captured by the extension at selection time).
- Row-Level Security (RLS) is enforced on all tables so users can only access their own data.

#### 5. Payment (Stripe)

- Stripe Checkout is used for all payment flows (one-time credit pack purchases).
- Credit packs (50, 100, 200 credits) are defined as Stripe Price objects.
- A Stripe Customer object is created and linked to each Supabase user on first checkout.
- Idempotency keys are used on all Stripe API calls to prevent duplicate credit grants.

#### 6. LLM Synthesis Strategy

- **System Prompt:** The LLM receives a strict system prompt instructing it to act as a React/Tailwind/Shadcn code generator. It is explicitly instructed to: use Shadcn primitives for all recognized ARIA patterns, map all color/size values to the nearest Tailwind class, output `framer-motion` variants for any animation data present, and never invent functionality not evidenced in the blueprint.
- **Context Management:** The Normalization Engine enforces a maximum token budget on the JSON Blueprint (estimated at ~4,000 tokens) to prevent context overflow. Components exceeding this budget are split hierarchically.
- **Provider Abstraction:** The LLM provider (Claude vs. GPT-4o) is abstracted behind a single interface and toggled via environment variable, requiring no code changes to switch models.

---

## Testing Decisions

### What Makes a Good Test

A good test validates **external behavior** through the module's public interface — what the module produces given a specific input — not the internal mechanics of how it produces it. Tests should be deterministic, fast, and isolated. They should not mock internal implementation details; they should mock external dependencies (network calls, browser APIs) at the boundary.

### Modules to Test

#### 1. Normalization Engine (Highest Priority)

This is the most complex and highest-risk module. A regression here corrupts every downstream step. Tests should cover:

- Given a raw DOM node with nested children, computed styles, and custom properties → assert the output JSON Blueprint has the correct structure, semantic keys, and stripped noise.
- Given a node with `getAnimations()` data (transitions, keyframes) → assert the blueprint's `animations` field contains the correct duration, easing, and property values.
- Given a node with inline SVG children → assert SVGs are correctly serialized into the blueprint's `assets.svgs` array.
- Given a node with Shadow DOM children → assert the module handles the boundary gracefully (either skipping or traversing with the correct permissions).
- Given a blueprint that exceeds the token budget → assert it is correctly truncated at the nearest logical boundary without breaking the JSON structure.

#### 2. LLM Prompt Construction Module

The unit under test here is the **prompt construction logic**, not the LLM itself. Tests should cover:

- Given a JSON Blueprint with a button element → assert the generated system prompt contains the correct Shadcn mapping instruction (e.g., maps to `<Button variant="...">`).
- Given a blueprint with `aria-expanded` on a trigger element → assert the prompt includes the Radix Accordion pattern instruction.
- Given a blueprint with animation data → assert the prompt includes the `framer-motion` variants instruction.
- Given a blueprint targeting "Prompt Generator" mode vs. "React Code" mode → assert the system prompt differs correctly between the two output strategies.

#### 3. Credit Deduction API Route

Tests should cover:

- Given a valid user session with 3 credits → assert a successful extraction call returns the generated code and the user's balance is decremented to 2.
- Given a valid user session with 0 credits → assert the route returns a 402 (Payment Required) error without calling the LLM API.
- Given two simultaneous extraction requests for the same user with 1 credit → assert only one succeeds and the other returns a 402 (tests atomic decrement).

### Test Framework

- **Vitest** is the test runner of choice (ESM-native, Vite/Plasmo ecosystem compatible, fast execution).
- Browser API mocks (`getComputedStyle`, `getAnimations`, `TreeWalker`) are stubbed at the test boundary using Vitest's `vi.fn()` and `vi.mock()`.
- The LLM API client is mocked using `vi.mock()` to return deterministic fixtures; no real API calls are made in tests.

---

## Out of Scope

- **Vue, Svelte, Angular, or raw HTML output:** v1 targets React + Tailwind + Shadcn exclusively. The Prompt Generator bridges non-React users to external LLMs.
- **React source code extraction (hooks, state logic):** It is technically impossible to extract source-level React logic from a compiled bundle. v1 relies solely on LLM inference from DOM/ARIA signals.
- **Multi-component / full-page batch export:** Exporting entire sections or pages as a single Next.js route is a v2 feature. v1 targets single, logical component units.
- **Firefox / Safari extension support:** v1 targets Chromium-based browsers exclusively (Chrome, Edge, Brave). The Chrome Side Panel API is not available in Firefox or Safari.
- **Figma / design tool export:** Exporting as a Figma component or design token file is out of scope for v1.
- **GitHub / CMS integration (direct push):** Exporting directly to a repository or headless CMS is a v2 roadmap item.
- **Subscription / recurring billing plans:** v1 uses pay-as-you-go credit packs only. Monthly subscription tiers are a v2 consideration.
- **CLI integration (`npx vantage add <id>`):** The community component library and CLI tool are long-term roadmap items.
- **Visual Diff Engine:** A side-by-side fidelity comparison between the original site and the generated component is deferred to v2.

---

## Further Notes

### Validation Experiments (Pre-Development)

Two experiments should be run before committing full engineering resources:

1. **Demand Signal:** A landing page with a side-by-side video (DevTools "CSS soup" vs. VantageUI's Shadcn output for a complex Apple/Stripe component) should be published and promoted on Twitter/X, ProductHunt, and the Next.js/React subreddits. An email waitlist is the primary success metric. A target of **500 waitlist sign-ups within 2 weeks** validates sufficient demand to proceed.
2. **Technical Feasibility:** A bookmarklet MVP should be built that extracts a DOM node's JSON Blueprint and copies it to the clipboard. This blueprint is then pasted manually into a Claude Project with a custom system prompt. If Claude consistently produces correct, idiomatic Shadcn code from the blueprint for 8 out of 10 test cases across diverse component types, the core technical assumption is validated.

### Legal Guardrail

Every exported component and downloaded file must include a standardized attribution comment at the top:

```tsx
// Component extracted from: [source URL] on [date] using VantageUI.
// This code is for educational and inspirational purposes.
// Ensure compliance with the source site's Terms of Service before use in production.
```

### Key Success Metrics (v1)

| Metric                                     | Target                                                                      |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| Extraction-to-renderable-sandbox rate      | ≥ 80% of extractions render correctly in Sandpack without manual correction |
| Mean time from selection to sandbox render | < 8 seconds                                                                 |
| Credit-to-paid conversion rate             | ≥ 15% of users who exhaust free credits purchase a pack                     |
| Credit churn (zero-balance abandonment)    | < 40% of users who hit zero balance do not return                           |
