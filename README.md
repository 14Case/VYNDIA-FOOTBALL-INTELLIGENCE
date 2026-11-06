# ⚽ VYNDIA Football Intelligence

**Professional-grade football analytics, prediction, and data intelligence platform.**

VYNDIA combines real-time match data, advanced statistical modeling, and AI-driven predictions to deliver actionable football insights — from upcoming match analysis to intelligent betting intelligence.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser / Client                      │
└────────────────┬─────────────────────────┬───────────────────┘
                 │                         │
          SSR / RSC                  REST API calls
                 │                         │
                 ▼                         ▼
   ┌──────────────────────┐   ┌────────────────────────────┐
   │   Next.js 16 App     │   │   FastAPI Backend           │
   │   (apps/web/)        │──▶│   (apps/api/)               │
   │                      │   │                              │
   │   • App Router       │   │   • REST API v1              │
   │   • Server Components│   │   • Data Collection          │
   │   • Tailwind CSS 4   │   │   • Prediction Engine (ML)   │
   │   • Prisma ORM       │   │   • AI Agent Orchestration   │
   └──────────┬───────────┘   └──────────────┬───────────────┘
              │                              │
              └──────────┬───────────────────┘
                         ▼
            ┌──────────────────────────┐
            │  Supabase / PostgreSQL   │
            │  (shared database)       │
            └──────────────────────────┘
```

---

## Quick Start

### Prerequisites
- **Node.js** 20+
- **Python** 3.12+
- **Supabase** account (or local PostgreSQL)

### 1. Clone & Setup Environment
```bash
git clone <repo-url> VYNDIA-FOOTBALL-INTELLIGENCE
cd VYNDIA-FOOTBALL-INTELLIGENCE
cp .env.example .env   # Fill in your credentials
```

### 2. Start the Frontend
```bash
cd apps/web
npm install
npm run dev
# → http://localhost:3000
```

### 3. Start the Backend
```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# → http://localhost:8000
```

### 4. Verify
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | Next.js (App Router) | 16.4.5 |
| UI | React + Tailwind CSS | 19.3.0 / 4.x |
| Language (FE) | TypeScript | 5.x |
| Backend | FastAPI | 0.162.0 |
| Language (BE) | Python | 3.12+ |
| ORM (FE) | Prisma | latest |
| ORM (BE) | SQLAlchemy | 2.1.8 |
| Migrations | Alembic | 1.20.1 |
| Database | PostgreSQL (Supabase) | 15+ |
| Validation | Pydantic | 2.14.3 |

---

## Directory Structure

```
VYNDIA-FOOTBALL-INTELLIGENCE/
│
├── apps/
│   ├── api/                    # 🐍 FastAPI backend
│   │   ├── app/
│   │   │   ├── main.py         # App entrypoint
│   │   │   ├── api/v1/         # Versioned API routes
│   │   │   ├── core/           # Config & dependencies
│   │   │   ├── models/         # SQLAlchemy models
│   │   │   ├── schemas/        # Pydantic schemas
│   │   │   ├── services/       # Business logic
│   │   │   ├── data_collection/# Data ingestion
│   │   │   ├── prediction/     # ML prediction engine
│   │   │   └── agents/         # AI agent orchestration
│   │   └── requirements.txt
│   │
│   └── web/                    # ⚛️ Next.js frontend
│       ├── src/
│       │   ├── app/            # App Router (pages, layouts)
│       │   └── lib/            # Utilities (API client, Prisma, Supabase)
│       └── prisma/             # Database schema & migrations
│
├── data/                       # 📊 Data storage (raw, processed, archives)
├── docs/                       # 📚 Documentation
├── stitch-export/              # 🎨 Design mockups
│
├── AGENTS.md                   # Agent development guidelines
├── README.md                   # This file
├── .gitignore                  # Git ignore rules
└── .env.example                # Environment variable template
```

---

## Development Commands

### Frontend (`apps/web/`)
| Command | Description |
|---|---|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Backend (`apps/api/`)
| Command | Description |
|---|---|
| `uvicorn app.main:app --reload --port 8000` | Start dev server |
| `pytest` | Run test suite |
| `ruff check .` | Lint Python code |
| `ruff format .` | Format Python code |
| `alembic upgrade head` | Run database migrations |
| `alembic revision --autogenerate -m "..."` | Create migration |

---

## API Documentation

When the backend is running, interactive API docs are available at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## Contributing

1. Read [AGENTS.md](./AGENTS.md) for development guidelines
2. Create a feature branch from `develop`
3. Follow coding standards (TypeScript for FE, Python for BE)
4. Run linters and tests before submitting
5. Use conventional commit messages (`feat:`, `fix:`, `docs:`)

---

## License

Private — All rights reserved.
