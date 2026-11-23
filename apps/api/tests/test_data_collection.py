"""
Tests for VYNDIA Football Data Collection & Sync Pipeline.
"""

import pytest
from unittest.mock import AsyncMock, patch
from fastapi.testclient import TestClient

from app.main import app
from app.data_collection.football_client import FootballAPIClient
from app.data_collection.sync_service import FootballDataSyncService

client = TestClient(app)


def test_football_client_unconfigured():
    api = FootballAPIClient(api_key="")
    assert not api.is_configured()


@pytest.mark.anyio
async def test_football_client_status_mocked():
    api = FootballAPIClient(api_key="test-mock-key")
    assert api.is_configured()

    # Mock response from API-Football
    mock_response = {
        "response": {
            "account": {"firstname": "Test", "email": "test@example.com"},
            "subscription": {"plan": "Free", "active": True},
            "requests": {"current": 12, "limit_day": 100},
        }
    }

    with patch("httpx.AsyncClient.get") as mock_get:
        mock_get.return_value = AsyncMock(status_code=200, json=lambda: mock_response)
        status = await api.get_status()
        assert status["configured"] is True
        assert status["requests"]["current"] == 12
        assert status["subscription"]["plan"] == "Free"


@pytest.mark.anyio
async def test_sync_service_fixture_payload_transformation():
    sample_item = {
        "fixture": {
            "id": 999901,
            "date": "2024-11-23T20:00:00+00:00",
            "status": {"short": "FT"},
            "venue": {"name": "Santiago Bernabeu"},
        },
        "league": {
            "id": 140,
            "name": "La Liga",
            "country": "Spain",
            "flag": "https://media.api-sports.io/flags/es.svg",
            "logo": "https://media.api-sports.io/football/leagues/140.png",
            "season": 2024,
        },
        "teams": {
            "home": {"id": 541, "name": "Real Madrid", "logo": "https://media.api-sports.io/football/teams/541.png"},
            "away": {"id": 529, "name": "Barcelona", "logo": "https://media.api-sports.io/football/teams/529.png"},
        },
        "goals": {"home": 2, "away": 1},
        "score": {"halftime": {"home": 1, "away": 0}},
    }

    sync = FootballDataSyncService(supabase_url="https://fake.supabase.co", supabase_key="fake-key")

    with patch.object(sync, "_upsert_record", new_callable=AsyncMock) as mock_upsert:
        mock_upsert.return_value = True
        res = await sync.sync_fixture_payload(sample_item)

        assert res["fixture_id"] == "999901"
        assert res["status"] == "FINISHED"
        assert res["match"] == "Real Madrid vs Barcelona"
        assert res["score"] == "2 - 1"
        assert "probabilities" in res


def test_sync_status_endpoint():
    response = client.get("/api/v1/sync/status")
    assert response.status_code == 200
    data = response.json()
    assert "provider" in data
    assert "api_status" in data
    assert "supabase_configured" in data


def test_sync_fixtures_endpoint_mocked():
    with patch("app.api.v1.endpoints.sync_service.sync_daily_fixtures", new_callable=AsyncMock) as mock_sync:
        mock_sync.return_value = {
            "status": "success",
            "date": "2024-11-23",
            "count": 2,
            "matches": [],
        }
        response = client.post("/api/v1/sync/fixtures", json={"date": "2024-11-23"})
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["count"] == 2
