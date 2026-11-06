# Architecture Overview — VYNDIA Football Intelligence

## 1. System Architecture

VYNDIA Football Intelligence is a **hybrid monorepo** with two primary applications sharing a single PostgreSQL database via Supabase:

| Component | Technology | Responsibility |
|---|---|---|
| **Frontend** | Next.js 16 (App Router) | UI rendering, server components, client interactions |
| **Backend** | FastAPI (Python) | REST API, data processing, ML predictions, AI agents |
| **Database** | PostgreSQL (Supabase) | Persistent storage, auth, real-time subscriptions |
| **Data Layer** | Python scripts + storage | Raw data ingestion, transformation, archival |

---

## 2. Component Diagram

```
                    ┌───────────────────────────────┐
                    │         End Users              │
                    │     (Browser / Mobile)         │
                    └───────────┬───────────────────┘
                                │
                    ┌───────────▼───────────────────┐
                    │       CDN / Edge Network       │
                    │       (Vercel / Cloudflare)    │
                    └───────────┬───────────────────┘
                                │
               ┌────────────────┼────────────────────┐
               │                │                    │
               ▼                ▼                    ▼
  ┌─────────────────┐  ┌───────────────┐   ┌────────────────┐
  │  Next.js SSR    │  │  Next.js CSR  │   │  Static Assets │
  │  (Server        │  │  (Client      │   │  (public/)     │
  │   Components)   │  │   Components) │   │                │
  └────────┬────────┘  └──────┬────────┘   └────────────────┘
           │                  │
           │    Prisma ORM    │    fetch() via api.ts
           │         │        │         │
           ▼         ▼        ▼         ▼
  ┌──────────────┐  ┌────────────────────────────┐
  │  Supabase    │  │    FastAPI Backend          │
  │  PostgreSQL  │◀─│                              │
  │              │  │  ┌──────────────────────┐   │
  │  • Tables    │  │  │  API v1 Router       │   │
  │  • Auth      │  │  │  /api/v1/*           │   │
  │  • RLS       │  │  └──────────┬───────────┘   │
  │  • Realtime  │  │             │               │
  │              │  │  ┌──────────▼───────────┐   │
  └──────────────┘  │  │  Service Layer        │   │
                    │  │  (Business Logic)     │   │
                    │  └──────────┬───────────┘   │
                    │             │               │
                    │  ┌─────────┬┴──────────┐   │
                    │  ▼         ▼            ▼   │
                    │ Data    Prediction    AI    │
                    │ Collection Engine   Agents  │
                    └────────────────────────────┘
```

---

## 3. Data Flow

### 3.1 Page Load (Server-Side Rendering)

```
Browser ──GET──▶ Next.js Server
                   │
                   ├──▶ Prisma → Supabase (direct DB read)
                   │     (for page data: matches, standings)
                   │
                   └──▶ Render RSC → HTML + hydration payload
                                       │
Browser ◀── HTML ──────────────────────┘
```

### 3.2 Client API Call (Predictions, Analysis)

```
Browser ──fetch()──▶ Next.js Route / Direct
                        │
                        ▼
                     FastAPI /api/v1/*
                        │
                        ├──▶ SQLAlchemy → PostgreSQL
                        │     (read/write prediction data)
                        │
                        ├──▶ Prediction Engine
                        │     (run ML model inference)
                        │
                        └──▶ Response JSON
                               │
Browser ◀── JSON ─────────────┘
```

### 3.3 Data Collection Pipeline

```
Scheduler (cron) ──trigger──▶ Data Collection Service
                                   │
                                   ├──▶ External Football APIs
                                   │     (fetch live scores, stats)
                                   │
                                   ├──▶ Transform & Validate
                                   │     (Pydantic schemas)
                                   │
                                   └──▶ SQLAlchemy → PostgreSQL
                                         (store processed data)
```

---

## 4. Database Access Strategy

The database is shared between both applications with a clear separation of concerns:

| Application | ORM | Access Pattern |
|---|---|---|
| **Next.js** | Prisma | Direct reads for SSR pages; Supabase client for auth & realtime |
| **FastAPI** | SQLAlchemy | Full CRUD for predictions, data collection, agent state |

Both ORMs connect to the **same PostgreSQL database** on Supabase. Schema migrations are managed by:
- **Prisma Migrate** — for tables owned by the frontend (user preferences, UI state)
- **Alembic** — for tables owned by the backend (predictions, match data, agent logs)

---

## 5. API Design

### Versioning
All endpoints are versioned under `/api/v1/`. Breaking changes require a new version.

### Authentication (Future)
- Supabase JWT tokens passed as `Authorization: Bearer <token>`
- FastAPI middleware validates tokens against Supabase

### Rate Limiting (Future)
- Per-user rate limiting on prediction endpoints
- Higher limits for authenticated users

---

## 6. Future ML Pipeline Architecture

```
┌─────────────────────────────────────────────────────┐
│                  ML Pipeline (Future)                │
│                                                     │
│  ┌────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │  Feature    │  │  Model       │  │  Inference  │  │
│  │  Store      │──▶  Training    │──▶  Server     │  │
│  │  (postgres) │  │  (offline)   │  │  (FastAPI)  │  │
│  └─────┬──────┘  └──────────────┘  └──────┬─────┘  │
│        │                                   │        │
│        │         ┌──────────────┐          │        │
│        └────────▶│  Model       │◀─────────┘        │
│                  │  Registry    │                    │
│                  │  (artifacts) │                    │
│                  └──────────────┘                    │
└─────────────────────────────────────────────────────┘
```

### Planned Components
1. **Feature Store** — Pre-computed features stored in PostgreSQL, updated by data collection pipeline
2. **Model Training** — Offline training jobs using historical match data; models versioned in a registry
3. **Inference Server** — FastAPI endpoint wraps trained models; real-time predictions with caching
4. **Model Registry** — Version-controlled model artifacts (weights, configs, metrics)

### ML Stack (Planned)
- scikit-learn / XGBoost for tabular prediction models
- Feature engineering pipeline in Python
- Model serialization via joblib / ONNX
- A/B testing framework for model comparison

---

## 7. Security Considerations

- **Environment variables** — All secrets in `.env`, never committed
- **CORS** — Restricted to known frontend origins
- **Input validation** — Pydantic on all API inputs
- **Row-Level Security** — Supabase RLS policies on sensitive tables
- **HTTPS** — Enforced in production via reverse proxy

---

## 8. Deployment Architecture (Future)

```
┌─────────────────┐     ┌─────────────────┐
│  Vercel          │     │  Cloud Run /     │
│  (Next.js)       │     │  Railway         │
│                  │     │  (FastAPI)        │
└────────┬─────────┘     └────────┬─────────┘
         │                        │
         └───────────┬────────────┘
                     ▼
         ┌────────────────────┐
         │  Supabase Cloud     │
         │  (PostgreSQL)       │
         └────────────────────┘
```
