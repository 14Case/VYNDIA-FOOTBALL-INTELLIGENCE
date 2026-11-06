# AGENTS.md — VYNDIA FOOTBALL INTELLIGENCE

## Project Description

**VYNDIA Football Intelligence** is a professional-grade football analytics, prediction, and data intelligence platform. It combines real-time match data, advanced statistical modeling, and AI-driven predictions to deliver actionable insights for football analysis.

---

## Architecture Overview

The platform uses a **hybrid Next.js + FastAPI** architecture:

- **Frontend (Next.js 16)** — Server-rendered React UI with Tailwind CSS, hosted via Vercel or self-hosted.
- **Backend (FastAPI)** — Python REST API for data processing, predictions, ML pipelines, and business logic.
- **Database (Supabase / PostgreSQL)** — Persistent storage via Supabase with Prisma ORM on the frontend and SQLAlchemy on the backend.
- **Data Layer** — Raw football data ingestion, transformation, and archival.

```
┌─────────────────────────────────────────────────────┐
│                     User / Browser                  │
└─────────────┬───────────────────────────┬───────────┘
              │ SSR / RSC                 │ Client API
              ▼                           ▼
┌─────────────────────┐    ┌──────────────────────────┐
│   Next.js 16 App    │───▶│   FastAPI Backend         │
│   (apps/web/)       │    │   (apps/api/)             │
│   - Pages / Routes  │    │   - REST API (v1)         │
│   - Server Actions  │    │   - Data Collection       │
│   - Prisma Client   │    │   - Prediction Engine     │
│   - Tailwind CSS    │    │   - AI Agents             │
└────────┬────────────┘    └──────────┬───────────────┘
         │                            │
         ▼                            ▼
┌─────────────────────────────────────────────────────┐
│             Supabase / PostgreSQL                    │
│             (shared database)                        │
└─────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.4.5 | React framework with SSR/RSC |
| React | 19.3.0 | UI library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS |
| Prisma | latest | Database ORM (frontend) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.12+ | Backend runtime |
| FastAPI | 0.162.0 | Async REST API framework |
| SQLAlchemy | 2.1.8 | Database ORM (backend) |
| Alembic | 1.20.1 | Database migrations |
| Pydantic | 2.14.3 | Data validation & settings |
| uvicorn | 0.54.0 | ASGI server |

### Infrastructure
| Technology | Purpose |
|---|---|
| Supabase | Hosted PostgreSQL + Auth + Storage |
| Vercel | Frontend deployment (optional) |
| Docker | Containerized deployments (future) |

---

## Module Structure

```
VYNDIA-FOOTBALL-INTELLIGENCE/
├── AGENTS.md                    # This file — project guidelines
├── README.md                    # Project readme
├── .gitignore                   # Git ignore rules
├── .env.example                 # Environment variable template
│
├── apps/
│   ├── api/                     # FastAPI backend
│   │   ├── app/
│   │   │   ├── main.py          # App entrypoint & lifecycle
│   │   │   ├── api/
│   │   │   │   └── v1/          # Versioned API routes
│   │   │   │       └── endpoints.py
│   │   │   ├── core/            # Config, security, dependencies
│   │   │   │   └── config.py
│   │   │   ├── models/          # SQLAlchemy models
│   │   │   │   └── base.py
│   │   │   ├── schemas/         # Pydantic request/response schemas
│   │   │   ├── services/        # Business logic layer
│   │   │   ├── data_collection/ # Football data ingestion
│   │   │   ├── prediction/      # ML prediction engine
│   │   │   └── agents/          # AI agent orchestration
│   │   └── requirements.txt
│   │
│   └── web/                     # Next.js frontend
│       ├── src/
│       │   ├── app/             # App Router pages & layouts
│       │   └── lib/             # Shared utilities
│       │       ├── api.ts       # FastAPI client
│       │       ├── prisma.ts    # Prisma client
│       │       └── supabase/    # Supabase client
│       └── prisma/              # Prisma schema & migrations
│
├── data/                        # Data storage
│   ├── raw/                     # Raw ingested data
│   ├── processed/               # Transformed data
│   └── archives/                # Historical archives
│
├── docs/                        # Documentation
│   ├── architecture/            # System architecture docs
│   ├── database/                # Database schema docs
│   └── technical/               # Technical reference docs
│
└── stitch-export/               # Design mockup exports
```

---

## File Ownership Rules

Each agent is responsible for specific files. **Never modify files owned by another agent.**

### Agent 1 — Architect / Lead Developer
- `/AGENTS.md` (this file)
- `/README.md`
- `/.gitignore`
- `/apps/api/` (all files except `.venv/`)
- `/docs/` (all documentation)
- `/apps/web/src/lib/api.ts` (API client)

### Agent 2 — Frontend Developer
- `/apps/web/src/app/` (all pages, layouts, components)
- `/apps/web/src/components/` (shared UI components)
- `/apps/web/src/styles/` (global styles beyond Tailwind)
- `/apps/web/public/` (static assets)

### Agent 3 — Database / Infrastructure
- `/apps/web/prisma/` (schema, migrations)
- `/apps/web/src/lib/prisma.ts` (Prisma client singleton)
- `/apps/web/src/lib/supabase/` (Supabase client config)
- `/apps/api/alembic/` (backend migrations)

---

## Coding Standards

### TypeScript (Frontend)
- **Strict mode** enabled — no `any` types unless absolutely necessary
- Use **functional components** with React hooks
- Prefer **server components** by default; use `"use client"` only when needed
- Use **path aliases** (`@/lib/...`, `@/components/...`)
- Follow ESLint config from `eslint-config-next`
- Name files: `kebab-case.tsx` for components, `camelCase.ts` for utilities

### Python (Backend)
- **Type hints** on all function signatures
- Use **async/await** for all endpoint handlers
- Follow **PEP 8** with Ruff for linting/formatting
- Use **Pydantic models** for all request/response schemas
- SQLAlchemy 2.x **mapped_column** style for models
- Name files: `snake_case.py`

### General
- All API endpoints under `/api/v1/` prefix
- Environment variables via `.env` files — never hardcode secrets
- Commit messages: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)
- Branch strategy: `main` → `develop` → feature branches

---

## Environment Setup

### Prerequisites
- Node.js 20+ and npm
- Python 3.12+
- Supabase account (or local PostgreSQL)

### Frontend
```bash
cd apps/web
npm install
npm run dev          # → http://localhost:3000
```

### Backend
```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000   # → http://localhost:8000
```

### Environment Variables
Copy `.env.example` to `.env` and fill in:
```
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## API Versioning

All backend endpoints are versioned under `/api/v1/`. When breaking changes are needed, create a new version (`/api/v2/`) while maintaining backward compatibility for at least one release cycle.

## Agent Guidelines for Future Development

1. **Read this file first** before making any changes.
2. **Respect file ownership** — only modify files assigned to your agent role.
3. **Run tests** before committing — `pytest` for backend, `npm run lint` for frontend.
4. **Document changes** — update relevant docs in `/docs/` when adding features.
5. **Use typed interfaces** — define Pydantic schemas (backend) and TypeScript types (frontend) for all data structures.
6. **Keep the API contract stable** — coordinate with other agents when changing endpoints.
