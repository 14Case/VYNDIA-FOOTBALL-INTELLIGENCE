"""
Application configuration via Pydantic Settings.

Loads from environment variables and .env files.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Global application settings, loaded from env vars / .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # ── App ──────────────────────────────────────────────────
    app_name: str = "VYNDIA Football Intelligence"
    app_version: str = "0.1.0"
    debug: bool = False

    # ── Database ─────────────────────────────────────────────
    database_url: str = "sqlite+aiosqlite:///./vyndia_dev.db"

    # ── CORS ─────────────────────────────────────────────────
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    # ── API ──────────────────────────────────────────────────
    api_v1_prefix: str = "/api/v1"


# Singleton — import this from anywhere
settings = Settings()
