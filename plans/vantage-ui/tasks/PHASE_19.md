# PHASE 19 — Extraction & LLM API

**Goal:** Build the extraction API with LLM synthesis (Claude/GPT-4o), rate limiting, and replace the extension's entire mocked extraction flow with real API integration.  
**Depends On:** Phase 16, Phase 17, Phase 18  
**Unblocks:** Phase 21 (testing)

---

- [ ] **Create LLM provider abstraction layer**.
  - **Details:** Create `apps/landing/src/lib/llm/types.ts`:
    ```typescript
    export interface LLMProvider {
      name: string
      synthesize(params: {
        systemPrompt: string
        jsonBlueprint: Record<string, unknown>
        targetFramework: 'react-shadcn' | 'react-tailwind' | 'raw-html'
      }): Promise<{ code: string }>
    }
    ```
    Create `apps/landing/src/lib/llm/claude.provider.ts`:
    - Uses `@anthropic-ai/sdk` to call Claude 3.5 Sonnet
    - System prompt: "You are a React/Tailwind/Shadcn code generator. Given a JSON blueprint of a UI component, generate production-ready TSX code..."
    - Parses XML-like code blocks from response, extracts the TSX code
    - 30-second timeout, retry once on failure
    - Create `apps/landing/src/lib/llm/gpt4o.provider.ts` — same interface but using `openai` SDK
    - Create `apps/landing/src/lib/llm/index.ts` — factory function that reads `LLM_PROVIDER` env var and returns the correct provider
  - **Verification:** Provider factory returns correct implementation based on env var. Claude provider can be instantiated with API key. GPT-4o provider can be instantiated.

- [ ] **Create extraction Zod schemas**.
  - **Details:** Create `apps/landing/src/lib/schemas/extraction.schema.ts`:
    ```typescript
    export const CreateExtractionSchema = z.object({
      jsonBlueprint: z.record(z.unknown()),
      sourceUrl: z.string().url().optional().default(''),
      sourceDomain: z.string().optional().default(''),
      elementTag: z.string().optional().default(''),
      targetFramework: z.enum(['react-shadcn', 'react-tailwind', 'raw-html']).default('react-shadcn'),
    });

    export const ExtractionParamsSchema = z.object({
      id: z.string().uuid(),
    });
    ```
  - **Verification:** Schemas compile. Valid data passes validation. Invalid data (wrong URL format) fails.

- [ ] **Create rate limiting middleware**.
  - **Details:** Create `apps/landing/src/lib/rate-limit/middleware.ts`:
    - Uses `@upstash/ratelimit` with `@vercel/kv` as the store
    - `extractionLimit`: 10 requests per 60 seconds per user (keyed by user ID)
    - `authLimit`: 5 requests per 60 seconds per IP
    - `waitlistLimit`: 2 requests per 60 seconds per IP
    - Helper function: `checkRateLimit(limiter, identifier)` — returns `{ allowed, remaining, reset }` or throws 429
    - Falls back gracefully if Redis is unavailable (local dev), returning `{ allowed: true }`
  - **Verification:** Rate limiting works when KV is configured. Falls back gracefully in dev without KV.

- [ ] **Build `POST /api/extractions`** — main extraction endpoint.
  - **Details:** Protected route. Flow:
    1. Validate body with `CreateExtractionSchema`
    2. Check rate limit: `checkRateLimit(extractionLimit, userId)`
    3. Call `deduct_credit(userId)` via `supabase.rpc` — if it raises `INSUFFICIENT_CREDITS`, return 402 `{ error: 'Insufficient credits', code: 'insufficient_credits' }`
    4. Call LLM provider: `llmProvider.synthesize({ systemPrompt, jsonBlueprint, targetFramework })`
    5. If LLM call fails (timeout, API error), do NOT refund the credit (the LLM call already cost us money). Instead, return 500 with `code: 'llm_error'`
    6. Insert into `extractions` table: `INSERT INTO public.extractions (user_id, source_url, source_domain, element_tag, json_blueprint, generated_code) VALUES (...)`
    7. Return `{ id, generatedCode, jsonBlueprint }`
  - **Verification:** Full extraction flow works: authenticated user with credits gets generated code. User with 0 credits gets 402. Rate-limited user gets 429. Extraction is saved to DB.

- [ ] **Build `GET /api/extractions`** — list extraction history.
  - **Details:** Protected route. Query `extractions` table for current user, ordered by `captured_at DESC`. Support pagination: `?page=1&limit=20&search=` (filter by source_domain). Return `{ extractions: ExtractionItem[], total: number, page: number }`.
  - **Verification:** Returns user's extraction history. Pagination works. Other users' data not returned (RLS).

- [ ] **Build `GET /api/extractions/[id]`** — single extraction detail.
  - **Details:** Protected route. Query `extractions` table by id AND user_id. If not found, return 404. Return full extraction record including `generated_code` and `json_blueprint`.
  - **Verification:** Fetches own extraction by ID. Returns 404 for nonexistent ID or another user's extraction.

- [ ] **Build `DELETE /api/extractions/[id]`** — delete extraction.
  - **Details:** Protected route. Query id AND user_id. If not found, return 404. Delete the record. Return `{ success: true }`.
  - **Verification:** Own extraction deleted successfully. Another user's extraction cannot be deleted (404).

- [ ] **Create `api-client.ts` extraction methods**.
  - **Details:** Add to `apps/extension/src/lib/api-client.ts`:
    - `createExtraction(data)` → `POST /api/extractions`
    - `getExtractions(page?)` → `GET /api/extractions?page=X`
    - `getExtraction(id)` → `GET /api/extractions/{id}`
    - `deleteExtraction(id)` → `DELETE /api/extractions/{id}`
  - **Verification:** Methods call correct endpoints with proper auth headers.

- [ ] **Replace extraction store mock flow with real API**.
  - **Details:** Update `apps/extension/src/store/extraction-store.ts`:
    - `startExtraction`: now calls `apiClient.createExtraction({ jsonBlueprint, sourceUrl, ... })` instead of simulated setTimeout
    - Show real 3-step progress: `setStep('capturing')` → API request sent, `setStep('normalizing')` → waiting for response, `setStep('synthesizing')` → LLM processing
    - On success: `setSuccess(blueprint, code)` from API response
    - On error: `setError(type, message)` mapped from API error codes
    - Credit deduction is now handled server-side — remove local `deductCredit` call
    - After successful extraction, auto-save to history via API (not local store)
  - **Verification:** Extraction flow works end-to-end: select element → click extract → real API call → LLM generates code → result appears in Sandpack.

- [ ] **Replace history store with API-backed persistence**.
  - **Details:** Update `apps/extension/src/store/historySlice.ts`:
    - Remove `persist` middleware (data is now server-authoritative)
    - `addItem`: now calls `POST /api/extractions` (handled by extraction store) — remove local-only addItem
    - `removeItem`: now calls `DELETE /api/extractions/{id}` from `apiClient`, then removes from local list
    - `fetchHistory`: new action that calls `GET /api/extractions` and replaces local items
    - Load history from server on side panel mount
    - Fix audit issue C6: history is now server-persisted, survives panel close
    - Fix audit issue C2: extraction success now correctly saves to history via POST
  - **Verification:** History loads from server. Deleting an extraction removes it from server. Fresh panel load shows persisted history.

- [ ] **Remove extraction mock files**.
  - **Details:** Delete `apps/extension/src/mocks/extractions.mock.ts`, `apps/extension/src/mocks/history.mock.ts`. Remove all import references across the codebase. The `mock-extraction.ts` utility is no longer needed.
  - **Verification:** Build succeeds without mock files. No dangling imports.
