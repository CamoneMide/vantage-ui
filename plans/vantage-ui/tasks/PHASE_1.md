# PHASE 1 — Project Foundation

**Goal:** Set up the pnpm monorepo, install all tooling, and validate a clean dev environment.  
**Depends On:** None  
**Unblocks:** Phase 2, Phase 3

---

- [ ] **Initialize pnpm monorepo**: Create a `pnpm-workspace.yaml` at the repo root defining three workspaces.
  - **Details:** `pnpm-workspace.yaml` should list `apps/*` and `packages/*`. Create empty directories: `apps/extension/`, `apps/landing/`, `packages/ui/`. Initialize `package.json` at the root with `"private": true` and `"packageManager": "pnpm@9.x"`.
  - **Verification:** `pnpm install` runs at root without error; `pnpm ls -r` shows all three workspaces listed.

- [ ] **Configure root TypeScript**: Set up a `tsconfig.base.json` at the root with strict mode enabled.
  - **Details:** Enable `"strict": true`, `"noImplicitAny": true`, `"strictNullChecks": true`, `"noUncheckedIndexedAccess": true`. Each workspace `tsconfig.json` should extend from `../../tsconfig.base.json`.
  - **Verification:** Running `tsc --noEmit` from any workspace resolves without "Cannot find base config" errors.

- [ ] **Configure ESLint (Airbnb + TypeScript)**: Set up a root `.eslintrc.cjs` with Airbnb React config and TypeScript plugin.
  - **Details:** Install `eslint`, `eslint-config-airbnb`, `eslint-config-airbnb-typescript`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`. Add rules: `no-console: warn`, `import/prefer-default-export: off`. Add `.eslintignore` for `node_modules`, `.plasmo`, `dist`, `.next`.
  - **Verification:** `pnpm lint` from root returns 0 errors on empty workspace files.

- [ ] **Configure Prettier**: Add a `.prettierrc` at root.
  - **Details:** `{ "semi": true, "singleQuote": true, "printWidth": 100, "tabWidth": 2, "trailingComma": "es5" }`. Add `format` script to root `package.json`: `"format": "prettier --write \"**/*.{ts,tsx,css,md}\""`.
  - **Verification:** `pnpm format` runs and reformats files without errors.

- [ ] **Configure Vitest at root**: Install and configure Vitest for the monorepo.
  - **Details:** Install `vitest` and `@vitest/ui` at the root. Create `vitest.config.ts` at root with `include: ['apps/**/*.test.ts', 'packages/**/*.test.ts']`. Add `"test": "vitest run"` and `"test:ui": "vitest --ui"` scripts to root `package.json`.
  - **Verification:** `pnpm test` runs and reports "no test files found" (not an error — confirms Vitest is configured correctly).

- [ ] **Create `.env.example`**: Document all required environment variables.
  - **Details:** Create `.env.example` at the root with placeholder entries for: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `STRIPE_PUBLISHABLE_KEY`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`. Add `.env.local` to `.gitignore`. Never commit real values.
  - **Verification:** `.env.example` exists at root; `.gitignore` contains `.env.local` and `.env`.

- [ ] **Verify clean dev environment**: Confirm the monorepo structure is sound.
  - **Details:** Run `pnpm install` from root. Confirm all `node_modules` are hoisted correctly. Confirm TypeScript, ESLint, and Prettier all resolve their configs.
  - **Verification:** `pnpm install && pnpm lint && pnpm format && pnpm test` all exit with code 0.
