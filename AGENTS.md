# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by Turborepo and pnpm workspaces.
- `apps/` — deployable apps: `app` (3000), `web` (3001), `api` (3002), plus `docs`, `email`, `storybook`, `studio`.
- `packages/` — shared libraries (auth, database, design-system, analytics, etc.).
- Each app/package is self-contained with its own `package.json`, `tsconfig.json`, and (for Next.js apps) `next.config.ts`.

## Build, Test, and Development Commands
- Root (all workspaces via Turbo):
  - `pnpm dev` — runs all app/package dev scripts.
  - `pnpm build` — builds everything; depends on `test`.
  - `pnpm test` — runs workspace tests.
  - `pnpm check` / `pnpm fix` — lint/format check and autofix (Biome via Ultracite).
- Per app/package (example):
  - `pnpm -C apps/app dev` | `build` | `start`
  - `pnpm -C apps/api test`

## Coding Style & Naming Conventions
- Language: TypeScript, ESM modules.
- Formatting/Linting: Biome (`biome.jsonc`). Run `pnpm fix` before committing.
- Naming: PascalCase for React components/types, camelCase for variables/functions, kebab-case for file names.
- Keep modules small and colocate related code (components, hooks, utils) within the app/package.

## Testing Guidelines
- Framework: Vitest (see `apps/*/vitest.config.mts`).
- Place tests next to source using `*.test.ts`/`*.test.tsx`.
- Write focused unit tests; add integration tests for critical flows. Aim for meaningful coverage in changed areas.
- Run `pnpm test` at root before opening a PR.

## Commit & Pull Request Guidelines
- Commit style: Conventional Commits (e.g., `feat(app): add billing page`).
- PRs must include: clear description, scope (apps/packages), linked issues, and screenshots for UI changes.
- Ensure `pnpm check`, `pnpm test`, and `pnpm build` pass locally.

## Security & Configuration Tips
- Use `.env.local` for secrets; never commit `.env*` files.
- Next.js env is validated in `apps/*/env.ts` (Zod). Update schemas when adding vars.
- Keep cookies/headers minimal to avoid 431 errors; prefer server-side sessions over large JWT cookies.
