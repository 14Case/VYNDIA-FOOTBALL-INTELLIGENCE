"""
VYNDIA Football Intelligence — API-Football (v3.football.api-sports.io) Client
Handles live match data, upcoming fixtures, statistics, standings, and quotas.
"""

import os
from typing import Dict, List, Any, Optional
import httpx


API_FOOTBALL_BASE_URL = "https://v3.football.api-sports.io"

# Major League IDs in API-Football
TOP_LEAGUES = {
    "UCL": 2,          # UEFA Champions League
    "PL": 39,          # Premier League (England)
    "LIGUE1": 61,      # Ligue 1 (France)
    "BUNDESLIGA": 78,  # Bundesliga (Germany)
    "SERIE_A": 135,    # Serie A (Italy)
    "LALIGA": 140,     # La Liga (Spain)
}


class FootballAPIClient:
    """Async client interacting with API-Football REST service."""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("FOOTBALL_API_KEY", "")
        self.base_url = API_FOOTBALL_BASE_URL

    @property
    def headers(self) -> Dict[str, str]:
        return {
            "x-apisports-key": self.api_key,
            "Accept": "application/json",
        }

    def is_configured(self) -> bool:
        """Check if an API key is provided."""
        return bool(self.api_key and len(self.api_key) > 10)

    async def get_status(self) -> Dict[str, Any]:
        """
        Check API key validity and remaining quota.
        Endpoint: /status
        """
        if not self.is_configured():
            return {
                "configured": False,
                "error": "FOOTBALL_API_KEY is not configured",
                "requests": {"current": 0, "limit_day": 100},
            }

        async with httpx.AsyncClient(timeout=10.0) as client:
            try:
                res = await client.get(f"{self.base_url}/status", headers=self.headers)
                if res.status_code == 200:
                    data = res.json()
                    response_obj = data.get("response", {})
                    return {
                        "configured": True,
                        "account": response_obj.get("account", {}),
                        "subscription": response_obj.get("subscription", {}),
                        "requests": response_obj.get("requests", {}),
                    }
                return {
                    "configured": False,
                    "status_code": res.status_code,
                    "error": res.text,
                }
            except Exception as e:
                return {
                    "configured": False,
                    "error": str(e),
                }

    async def get_live_fixtures(self) -> List[Dict[str, Any]]:
        """
        Fetch all matches currently LIVE in-play across top leagues.
        Endpoint: /fixtures?live=all
        """
        if not self.is_configured():
            return []

        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.get(
                f"{self.base_url}/fixtures",
                headers=self.headers,
                params={"live": "all"},
            )
            if res.status_code == 200:
                data = res.json()
                return data.get("response", [])
            return []

    async def get_fixtures_by_date(self, date_str: str) -> List[Dict[str, Any]]:
        """
        Fetch fixtures for a specific date (YYYY-MM-DD).
        Endpoint: /fixtures?date=YYYY-MM-DD
        """
        if not self.is_configured():
            return []

        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.get(
                f"{self.base_url}/fixtures",
                headers=self.headers,
                params={"date": date_str},
            )
            if res.status_code == 200:
                data = res.json()
                return data.get("response", [])
            return []

    async def get_league_fixtures(
        self,
        league_id: int,
        season: int = 2024,
        next_n: Optional[int] = 10,
    ) -> List[Dict[str, Any]]:
        """
        Fetch upcoming or recent fixtures for a specific league.
        """
        if not self.is_configured():
            return []

        params = {"league": league_id, "season": season}
        if next_n:
            params["next"] = next_n

        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.get(
                f"{self.base_url}/fixtures",
                headers=self.headers,
                params=params,
            )
            if res.status_code == 200:
                data = res.json()
                return data.get("response", [])
            return []

    async def get_fixture_statistics(self, fixture_id: int) -> List[Dict[str, Any]]:
        """
        Fetch in-match telemetry & statistics for a fixture (shots, possession, fouls, passes).
        """
        if not self.is_configured():
            return []

        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.get(
                f"{self.base_url}/fixtures/statistics",
                headers=self.headers,
                params={"fixture": fixture_id},
            )
            if res.status_code == 200:
                data = res.json()
                return data.get("response", [])
            return []
