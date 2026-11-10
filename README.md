# VYNDIA FOOTBALL INTELLIGENCE

AI-powered football analytics and match prediction platform.

## Architecture

- **Frontend**: Next.js 16 / React 19 / TypeScript / Tailwind CSS
- **Backend**: Python 3.12+ / FastAPI / SQLAlchemy
- **Database**: Supabase PostgreSQL / Prisma ORM
- **Prediction Engine**: Bivariate Poisson Model & Monte Carlo Simulation
- **Design System**: Synthetic Pitch Terminal UI

## Applications

- `apps/web`: Next.js 16 web application
- `apps/api`: FastAPI prediction and analytics REST API

## Development

### Backend (FastAPI)
```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend (Next.js)
```bash
cd apps/web
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

## Vercel Deployment

Configure the following environment variables in Vercel:
- `DATABASE_URL`: Supabase Transaction Pooler URL (IPv4 port 6543)
- `DIRECT_URL`: Supabase Session Pooler URL (IPv4 port 5432)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon/public key
- `NEXT_PUBLIC_API_URL`: Application API URL
