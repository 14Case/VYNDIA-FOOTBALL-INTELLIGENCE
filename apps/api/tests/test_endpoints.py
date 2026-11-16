"""
Tests for VYNDIA FastAPI v1 Endpoints.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"
    assert data["project"] == "VYNDIA Football Intelligence"


def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "uptime_seconds" in data
    assert "system" in data


def test_simulate_endpoint():
    payload = {
        "home_team": "Arsenal",
        "away_team": "Chelsea",
        "home_xg": 2.05,
        "away_xg": 1.15,
    }
    response = client.post("/api/v1/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["home_team"] == "Arsenal"
    assert data["away_team"] == "Chelsea"
    assert "probabilities" in data
    assert "fair_odds" in data
    assert "markets" in data
    assert "top_scorelines" in data


def test_fixture_prediction_endpoint():
    response = client.get("/api/v1/predictions/match-live-1")
    assert response.status_code == 200
    data = response.json()
    assert data["fixture_id"] == "match-live-1"
    assert "probabilities" in data
    assert "fair_odds" in data


def test_agents_list_endpoint():
    response = client.get("/api/v1/agents")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "active"
    assert data["total_agents"] == 4
    assert len(data["agents"]) == 4


def test_agents_ping_all_endpoint():
    response = client.post("/api/v1/agents/ping-all")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert len(data["heartbeats"]) == 4


def test_agent_ping_individual():
    response = client.post("/api/v1/agents/agent-neural/ping")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "agent-neural"
    assert "NTV" in data["codename"]

    # Non-existent agent
    response_404 = client.post("/api/v1/agents/invalid-agent-id/ping")
    assert response_404.status_code == 404


def test_agents_analyze_endpoint():
    payload = {
        "home_team": "Real Madrid",
        "away_team": "Bayern Munich",
        "home_xg": 2.2,
        "away_xg": 1.9,
    }
    response = client.post("/api/v1/agents/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["matchup"] == "Real Madrid vs Bayern Munich"
    assert data["orchestration_status"] == "SYNTHESIS_COMPLETE"
    assert "tactical_intelligence" in data
    assert "poisson_simulation" in data
    assert "market_arbitrage" in data
    assert "squad_sentiment" in data
