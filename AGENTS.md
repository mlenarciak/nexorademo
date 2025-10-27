# Repository Guidelines

## Project Structure & Module Organization
This pnpm + Turbo monorepo groups runnable surfaces under `apps/` (`web` for the Next.js experience, `api`, `docs`, `email`, `storybook`, `studio`, and the internal `app`). Shared capabilities live in `packages/`, each owning a bounded context such as `packages/payments`, `packages/design-system`, or `packages/database`. Assets that ship with the product belong in `assets/`, and automation scripts sit in `scripts/`. When adding features, keep UI, domain logic, and tests within the same app or package folder so the context-driven layout stays intact.

## Build, Test, and Development Commands
Install once with `pnpm install`. Use `pnpm dev` to launch the Turbo dev graph, which starts the web app and its watched dependencies. `pnpm build` runs production builds workspace-wide; `pnpm analyze` reviews bundle sizes, and `pnpm boundaries` validates cross-package imports. `pnpm test` fans out Vitest suites (add `--filter <pattern>` for targeted runs). Database changes should go through `pnpm migrate`, which formats Prisma schema, regenerates clients, and pushes migrations.

## Coding Style & Naming Conventions
TypeScript + ESM everywhere. Biome, configured via `biome.jsonc` and Ultracite presets, enforces linting and formatting—run `pnpm check` before pushing and `pnpm fix` for autofixes. Match existing naming: PascalCase components (`packages/design-system/components/Card.tsx`), camelCase utilities, kebab-case directories. Prefer named exports, typed props, and Tailwind or theme tokens over ad-hoc styling. Keep modules tree-shakable and avoid circular imports; fall back to `pnpm boundaries` when unsure.

## Testing Guidelines
Vitest is the standard runner. Co-locate specs beside code as `<name>.test.ts[x]` (example: `packages/collaboration/session.test.ts`). Mock remote services with fixtures under `__mocks__/`. Cover critical flows—authentication, booking lifecycle, payments—before merging. Run `pnpm test -- --coverage` on meaningful changes and note intentional gaps in the PR.

## Commit & Pull Request Guidelines
Use Conventional Commit prefixes (`feat:`, `fix:`, `style:`) with imperative subjects under 72 characters. Squash exploratory commits before pushing. PRs should include a concise summary, linked issue, screenshots or recordings for UI shifts, the tests you ran, and callouts for migrations or config updates. Tag reviewers who own the touched module and wait for green CI before merge.

## Configuration & Secrets
Environment typing lives in files like `apps/web/env.ts`; extend them and update `.env.example` whenever a new setting appears. Keep secrets out of git—use Vercel project variables or local `.env.local`. For third-party sandboxes (Stripe, etc.), rely on credentials stored in `notes/` and rotate them after demos.
