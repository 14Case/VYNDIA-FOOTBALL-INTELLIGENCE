# Database Architecture & Schema — VYNDIA Football Intelligence

## 1. Overview

VYNDIA Football Intelligence utilizes a shared PostgreSQL database hosted via Supabase, with dual ORM interfaces:
- **Prisma ORM** (Frontend / Next.js) — for high-level reads, server-rendered views, and application state.
- **SQLAlchemy** (Backend / Python FastAPI) — for high-throughput batch writes, machine learning inference storage, and data pipeline logs.

---

## 2. Relational Entity Schema

### 2.1 User Profiles & Roles
- **`users`**: User account linked to Supabase Auth UUID.
  - `id` (String, cuid primary key)
  - `email` (String, unique)
  - `name` (String, optional)
  - `role` (Enum: `ADMIN`, `ANALYST`, `VIEWER`)
  - `avatar_url` (String, optional)
  - `created_at`, `updated_at` (Timestamps)

### 2.2 Geography & Competitions
- **`countries`**: Sovereign nations and international territories.
  - `id` (String, cuid)
  - `name` (String, unique)
  - `code` (String, 3-char ISO code)
  - `flag_url` (String, optional)
- **`competitions`**: Leagues, cups, and continental tournaments.
  - `id` (String, cuid)
  - `name` (String)
  - `short_name` (String, optional)
  - `logo_url` (String, optional)
  - `country_id` (Foreign Key -> `countries.id`)
  - `type` (Enum: `LEAGUE`, `CUP`, `FRIENDLY`, `INTERNATIONAL`)
- **`seasons`**: Annual or multi-year tournament editions.
  - `id` (String, cuid)
  - `competition_id` (Foreign Key -> `competitions.id`)
  - `name` (String, e.g. "2026/2027")
  - `start_date`, `end_date` (DateTime)
  - `is_current` (Boolean)

### 2.3 Clubs & Players
- **`teams`**: Football clubs and national teams.
  - `id` (String, cuid)
  - `name` (String)
  - `short_name` (String, optional)
  - `logo_url` (String, optional)
  - `country_id` (Foreign Key -> `countries.id`)
  - `founded_year` (Integer, optional)
- **`players`**: Football athletes.
  - `id` (String, cuid)
  - `first_name`, `last_name` (String)
  - `display_name` (String)
  - `position` (Enum: `GOALKEEPER`, `DEFENDER`, `MIDFIELDER`, `FORWARD`)
  - `nationality` (String, optional)
  - `date_of_birth` (DateTime, optional)
  - `image_url` (String, optional)
- **`team_rosters`**: Season-specific player assignments.
  - `id` (String, cuid)
  - `team_id` (Foreign Key -> `teams.id`)
  - `player_id` (Foreign Key -> `players.id`)
  - `season_id` (Foreign Key -> `seasons.id`)
  - `jersey_number` (Integer, optional)
  - `join_date`, `leave_date` (DateTime, optional)

### 2.4 Fixtures, Results & Telemetry
- **`fixtures`**: Scheduled, in-play, or completed football matches.
  - `id` (String, cuid)
  - `competition_id` (Foreign Key -> `competitions.id`)
  - `season_id` (Foreign Key -> `seasons.id`)
  - `home_team_id` (Foreign Key -> `teams.id`)
  - `away_team_id` (Foreign Key -> `teams.id`)
  - `matchday` (Integer, optional)
  - `scheduled_at` (DateTime with timezone)
  - `venue` (String, optional)
  - `status` (Enum: `SCHEDULED`, `LIVE`, `FINISHED`, `POSTPONED`, `CANCELLED`)
- **`match_results`**: Final or in-play scorelines and attendance.
  - `id` (String, cuid)
  - `fixture_id` (Foreign Key -> `fixtures.id`, unique)
  - `home_score`, `away_score` (Integer)
  - `half_time_home`, `half_time_away` (Integer, optional)
  - `attendance` (Integer, optional)

### 2.5 Data Ingestion & Audit
- **`data_providers`**: External feeds and sports data APIs.
  - `id` (String, cuid)
  - `name` (String, unique)
  - `api_endpoint` (String, optional)
  - `is_active` (Boolean)
  - `last_sync_at` (DateTime, optional)
- **`collection_logs`**: Sync run telemetry and audit trails.
  - `id` (String, cuid)
  - `data_provider_id` (Foreign Key -> `data_providers.id`)
  - `entity_type` (String, e.g. "fixtures", "player_stats")
  - `records_collected` (Integer)
  - `status` (Enum: `PENDING`, `IN_PROGRESS`, `SUCCESS`, `FAILED`)
  - `started_at`, `completed_at` (DateTime)
  - `error_message` (String, optional)

### 2.6 Machine Learning & Predictions
- **`model_versions`**: Registered analytical and predictive algorithms.
  - `id` (String, cuid)
  - `name` (String, e.g. "Bivariate Poisson", "Spatial Neural Vector")
  - `version` (String, e.g. "v4.2.1")
  - `algorithm` (String, e.g. "LightGBM + Poisson")
  - `accuracy` (Float, validation metric)
  - `trained_at` (DateTime)
  - `is_active` (Boolean)
  - `parameters` (JSONB hyperparameter map)
- **`predictions`**: Generated probability forecasts per fixture.
  - `id` (String, cuid)
  - `fixture_id` (Foreign Key -> `fixtures.id`)
  - `model_version_id` (Foreign Key -> `model_versions.id`)
  - `home_win_prob` (Float: 0.0 - 100.0)
  - `draw_prob` (Float: 0.0 - 100.0)
  - `away_win_prob` (Float: 0.0 - 100.0)
  - `confidence` (Float, optional: 0.0 - 100.0)
  - `predicted_at` (DateTime)
- **`prediction_markets`**: Consensus sharp bookmaker lines for EV calculation.
  - `id` (String, cuid)
  - `fixture_id` (Foreign Key -> `fixtures.id`)
  - `source` (String, e.g. "Pinnacle Consensus")
  - `home_odds`, `draw_odds`, `away_odds` (Float decimal odds)
  - `retrieved_at` (DateTime)

---

## 3. Storage Architecture (Supabase Storage)

Supabase Storage buckets are prepared with the following public read, authenticated write policies:
- `team-logos`: PNG / SVG logos for clubs and national teams.
- `competition-logos`: High-resolution vector marks for covered tournaments.
- `player-images`: Headshots and action photography for athletes.
- `country-flags`: Country and territory emblems.

---

## 4. Connection Modes & Supabase Configuration

| Environment | Variable | Protocol | Mode |
|---|---|---|---|
| Runtime (Pooled) | `DATABASE_URL` | Transaction Pooling | Port 6543 (pgbouncer / Supavisor) |
| Migrations (Direct) | `DIRECT_URL` | Session / Direct | Port 5432 (direct PostgreSQL) |
