# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Project: ARHL Website

**American Roblox Hockey League** — a full professional sports league website.

### Pages
- `/` — Homepage (hero, news, featured game, standings preview, stat leaders)
- `/teams` — Teams grid + `/teams/:id` team detail pages
- `/standings` — Full league standings table
- `/stats` — Player stat leaderboards (sortable)
- `/schedule` — Game schedule (upcoming, live, completed)
- `/rulebook` — League rules (static formatted page)
- `/join` — Join the league page with application form
- `/admin/login` — Hidden admin login (password-protected)
- `/admin` — Admin dashboard (manage scores, teams, players, announcements)

### Admin Access
- Default password: `arhl-admin-2024`
- Can be changed via `ADMIN_PASSWORD` environment variable

### Database Schema
- `teams` — team records with W/L/GF/GA
- `players` — player stats (goals, assists, position, goalie stats)
- `games` — scheduled/completed games with scores
- `announcements` — news/announcements
- `admin_sessions` — admin auth tokens

### API Routes
All mounted under `/api`:
- `/teams`, `/players`, `/standings`, `/standings/summary`, `/games`, `/games/featured`, `/games/ticker`
- `/announcements`, `/stats/leaders`
- `/admin/login`, `/admin/me`, `/admin/logout`

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
