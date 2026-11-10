-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ANALYST', 'VIEWER');

-- CreateEnum
CREATE TYPE "FixtureStatus" AS ENUM ('SCHEDULED', 'LIVE', 'FINISHED', 'POSTPONED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CompetitionType" AS ENUM ('LEAGUE', 'CUP', 'FRIENDLY', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" CHAR(3) NOT NULL,
    "flag_url" TEXT,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_name" TEXT,
    "logo_url" TEXT,
    "country_id" TEXT NOT NULL,
    "type" "CompetitionType" NOT NULL DEFAULT 'LEAGUE',

    CONSTRAINT "competitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" TEXT NOT NULL,
    "competition_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "is_current" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_name" TEXT,
    "logo_url" TEXT,
    "country_id" TEXT NOT NULL,
    "founded_year" INTEGER,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "position" "Position",
    "nationality" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "image_url" TEXT,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_rosters" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "season_id" TEXT NOT NULL,
    "jersey_number" INTEGER,
    "join_date" TIMESTAMP(3),
    "leave_date" TIMESTAMP(3),

    CONSTRAINT "team_rosters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fixtures" (
    "id" TEXT NOT NULL,
    "competition_id" TEXT NOT NULL,
    "season_id" TEXT NOT NULL,
    "home_team_id" TEXT NOT NULL,
    "away_team_id" TEXT NOT NULL,
    "matchday" INTEGER,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "venue" TEXT,
    "status" "FixtureStatus" NOT NULL DEFAULT 'SCHEDULED',

    CONSTRAINT "fixtures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_results" (
    "id" TEXT NOT NULL,
    "fixture_id" TEXT NOT NULL,
    "home_score" INTEGER NOT NULL,
    "away_score" INTEGER NOT NULL,
    "half_time_home" INTEGER,
    "half_time_away" INTEGER,
    "attendance" INTEGER,

    CONSTRAINT "match_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_providers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "api_endpoint" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_sync_at" TIMESTAMP(3),

    CONSTRAINT "data_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_logs" (
    "id" TEXT NOT NULL,
    "data_provider_id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "records_collected" INTEGER NOT NULL DEFAULT 0,
    "status" "SyncStatus" NOT NULL DEFAULT 'PENDING',
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "error_message" TEXT,

    CONSTRAINT "collection_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "model_versions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "algorithm" TEXT,
    "accuracy" DOUBLE PRECISION,
    "trained_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "parameters" JSONB,

    CONSTRAINT "model_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predictions" (
    "id" TEXT NOT NULL,
    "fixture_id" TEXT NOT NULL,
    "model_version_id" TEXT NOT NULL,
    "home_win_prob" DOUBLE PRECISION NOT NULL,
    "draw_prob" DOUBLE PRECISION NOT NULL,
    "away_win_prob" DOUBLE PRECISION NOT NULL,
    "predicted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confidence" DOUBLE PRECISION,

    CONSTRAINT "predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prediction_markets" (
    "id" TEXT NOT NULL,
    "fixture_id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "home_odds" DOUBLE PRECISION NOT NULL,
    "draw_odds" DOUBLE PRECISION NOT NULL,
    "away_odds" DOUBLE PRECISION NOT NULL,
    "retrieved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prediction_markets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE INDEX "competitions_country_id_idx" ON "competitions"("country_id");

-- CreateIndex
CREATE INDEX "seasons_competition_id_idx" ON "seasons"("competition_id");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_competition_id_name_key" ON "seasons"("competition_id", "name");

-- CreateIndex
CREATE INDEX "teams_country_id_idx" ON "teams"("country_id");

-- CreateIndex
CREATE INDEX "players_last_name_idx" ON "players"("last_name");

-- CreateIndex
CREATE INDEX "team_rosters_team_id_idx" ON "team_rosters"("team_id");

-- CreateIndex
CREATE INDEX "team_rosters_player_id_idx" ON "team_rosters"("player_id");

-- CreateIndex
CREATE INDEX "team_rosters_season_id_idx" ON "team_rosters"("season_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_rosters_team_id_player_id_season_id_key" ON "team_rosters"("team_id", "player_id", "season_id");

-- CreateIndex
CREATE INDEX "fixtures_competition_id_idx" ON "fixtures"("competition_id");

-- CreateIndex
CREATE INDEX "fixtures_season_id_idx" ON "fixtures"("season_id");

-- CreateIndex
CREATE INDEX "fixtures_home_team_id_idx" ON "fixtures"("home_team_id");

-- CreateIndex
CREATE INDEX "fixtures_away_team_id_idx" ON "fixtures"("away_team_id");

-- CreateIndex
CREATE INDEX "fixtures_scheduled_at_idx" ON "fixtures"("scheduled_at");

-- CreateIndex
CREATE INDEX "fixtures_status_idx" ON "fixtures"("status");

-- CreateIndex
CREATE UNIQUE INDEX "match_results_fixture_id_key" ON "match_results"("fixture_id");

-- CreateIndex
CREATE UNIQUE INDEX "data_providers_name_key" ON "data_providers"("name");

-- CreateIndex
CREATE INDEX "collection_logs_data_provider_id_idx" ON "collection_logs"("data_provider_id");

-- CreateIndex
CREATE INDEX "collection_logs_status_idx" ON "collection_logs"("status");

-- CreateIndex
CREATE UNIQUE INDEX "model_versions_name_version_key" ON "model_versions"("name", "version");

-- CreateIndex
CREATE INDEX "predictions_fixture_id_idx" ON "predictions"("fixture_id");

-- CreateIndex
CREATE INDEX "predictions_model_version_id_idx" ON "predictions"("model_version_id");

-- CreateIndex
CREATE UNIQUE INDEX "predictions_fixture_id_model_version_id_key" ON "predictions"("fixture_id", "model_version_id");

-- CreateIndex
CREATE INDEX "prediction_markets_fixture_id_idx" ON "prediction_markets"("fixture_id");

-- CreateIndex
CREATE INDEX "prediction_markets_source_idx" ON "prediction_markets"("source");

-- AddForeignKey
ALTER TABLE "competitions" ADD CONSTRAINT "competitions_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "competitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_rosters" ADD CONSTRAINT "team_rosters_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_rosters" ADD CONSTRAINT "team_rosters_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_rosters" ADD CONSTRAINT "team_rosters_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "competitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_results" ADD CONSTRAINT "match_results_fixture_id_fkey" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_logs" ADD CONSTRAINT "collection_logs_data_provider_id_fkey" FOREIGN KEY ("data_provider_id") REFERENCES "data_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_fixture_id_fkey" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_model_version_id_fkey" FOREIGN KEY ("model_version_id") REFERENCES "model_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prediction_markets" ADD CONSTRAINT "prediction_markets_fixture_id_fkey" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
