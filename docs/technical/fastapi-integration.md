# FastAPI Integration & Client Contract — VYNDIA Football Intelligence

## 1. Overview

The platform uses a clean separation between:
- **Presentation & SSR Layer**: Next.js 16 (TypeScript / React 19) in `apps/web/`
- **Analytics & Computation Layer**: FastAPI (Python 3.12 / Pydantic 2.14) in `apps/api/`

---

## 2. API Endpoints Contract

All endpoints are versioned under `/api/v1/`:

| Method | Endpoint | Return Type | Description |
|---|---|---|---|
| `GET` | `/` | Object | System root identifier, docs URL, API version |
| `GET` | `/api/v1/health` | `HealthResponse` | Real-time health status, uptime, system platform, Python version |
| `GET` | `/api/v1/version` | `VersionResponse` | Application name, active semantic version, debug flag |
| `GET` | `/api/v1/status` | `StatusResponse` | Aggregate subsystem status (API, DB, prediction engine, collector) |

### Sample Response (`GET /api/v1/health`):
```json
{
  "status": "healthy",
  "timestamp": "2026-11-06T19:49:33.928117+00:00",
  "uptime_seconds": 0.48532,
  "system": {
    "python_version": "3.12.0",
    "platform": "macOS-15.0-x86_64",
    "machine": "x86_64"
  }
}
```

---

## 3. Next.js API Client (`apps/web/src/lib/api.ts`)

The typed TypeScript client wraps native `fetch` with error normalization:

```ts
import { getHealth, getVersion, getStatus } from "@/lib/api";

// Example in Server Component or Route Handler:
const health = await getHealth();
console.log(health.status); // "healthy"
```

### Environment Variable Configuration:
- `NEXT_PUBLIC_API_URL`: Defaults to `http://localhost:8000/api/v1` in development.

---

## 4. Local Execution & Development

### Start FastAPI Backend:
```bash
cd apps/api
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```
- Interactive Swagger UI: `http://localhost:8000/docs`
- OpenAPI Specification: `http://localhost:8000/openapi.json`

### Start Next.js Frontend:
```bash
cd apps/web
npm run dev -- -p 3000
```
- Web Terminal Interface: `http://localhost:3000`
