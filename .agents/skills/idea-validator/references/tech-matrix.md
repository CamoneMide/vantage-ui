# Technical Architecture Matrix

This matrix is an opinionated recommendation engine for mapping constraint profiles to specific technology stacks. Use this during Stage 4.

## Meta-Rules

- **Always default to typed languages** (TypeScript over JavaScript).
- **Enforce proper state management**.
- **Assume CI/CD, security, and accessibility** are non-negotiable baselines.

## Profiles

### Profile 1: Cross-platform mobile + real-time + solo dev

- **Recommendation**: Flutter + Firebase (Firestore, Auth, Cloud Functions)
- **Rationale**: Flutter provides the fastest path to iOS/Android from a single codebase. Firebase handles real-time sync, auth, and backend functions seamlessly for a solo developer without needing devops.
- **Alternatives**: React Native + Supabase.
- **Override when**: The user has strong React experience (use React Native), or requires complex relational queries (use Supabase).

### Profile 2: Web app + SSR + content-heavy

- **Recommendation**: Next.js 15 (App Router) + Vercel
- **Rationale**: Best-in-class server-side rendering, SEO out of the box, and exceptional developer experience. App Router allows fine-grained caching and streaming.
- **Alternatives**: Remix, Nuxt.
- **Override when**: The team prefers Vue (use Nuxt) or standard React SPA patterns.

### Profile 3: Static site + performance-critical

- **Recommendation**: Astro
- **Rationale**: Zero-JS by default, islands architecture for interactivity. Unbeatable performance for content sites, blogs, and marketing pages.
- **Alternatives**: 11ty, Hugo.
- **Override when**: The site requires heavy client-side state across pages.

### Profile 4: Full-stack + relational data + open-source

- **Recommendation**: Next.js + Supabase
- **Rationale**: PostgreSQL power with REST/GraphQL APIs generated instantly. Supabase Auth integrates smoothly with Next.js middleware.
- **Alternatives**: Remix + PostgreSQL + Prisma/Drizzle.
- **Override when**: Enterprise compliance requires AWS RDS or custom auth flows.
