"""
API v1 router — health, version, and status endpoints.
"""

import platform
import sys
from datetime import datetime, timezone

from fastapi import APIRouter

from app.core.config import settings

router = APIRouter()

# Track when the router module was first loaded (proxy for app start time)
_startup_time = datetime.now(timezone.utc)


@router.get("/health")
async def health_check() -> dict:
    """Detailed health check with system info."""
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_seconds": (datetime.now(timezone.utc) - _startup_time).total_seconds(),
        "system": {
            "python_version": sys.version,
            "platform": platform.platform(),
            "machine": platform.machine(),
        },
    }


@router.get("/version")
async def version_info() -> dict:
    """Return application version metadata."""
    return {
        "app": settings.app_name,
        "version": settings.app_version,
        "api_version": "v1",
        "debug": settings.debug,
    }


@router.get("/status")
async def system_status() -> dict:
    """Aggregate system status for monitoring dashboards."""
    return {
        "api": "operational",
        "database": "not_connected",  # TODO: implement real DB ping
        "prediction_engine": "offline",  # TODO: implement model status
        "data_collection": "idle",  # TODO: implement collector status
        "started_at": _startup_time.isoformat(),
    }
