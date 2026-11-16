"""
VYNDIA Football Intelligence — AGENT-02 // Bivariate Poisson Engine (BPE)
Probabilistic scoreline distribution & discrete goal modeling.
"""

from typing import Dict, Any
from app.agents.base import BaseAgent
from app.prediction.simulator import simulate_match_poisson


class BivariatePoissonAgent(BaseAgent):
    """Specialized in discrete Poisson modeling, joint probability mass functions, and exact scorelines."""

    def __init__(self):
        super().__init__(
            agent_id="agent-poisson",
            name="Bivariate Poisson Engine",
            codename="AGENT-02 // BPE",
            role="Probabilistic scoreline distribution & discrete goal modeling",
            model_version="v3.8.0-POISSON",
            accuracy=74.2,
            predictions_count=3850,
            latency_ms=14,
            description="Computes joint probability mass functions for full-time scorelines, correct score vectors, and over/under probability intervals.",
        )

    async def simulate(
        self,
        home_team: str,
        away_team: str,
        home_xg: float = 1.8,
        away_xg: float = 1.2
    ) -> Dict[str, Any]:
        """Run bivariate Poisson simulation and produce probability vectors."""
        self.predictions_count += 1
        sim = simulate_match_poisson(home_xg, away_xg)

        return {
            "agent": self.codename,
            "status": "SIMULATION_COMPLETE",
            "home_team": home_team,
            "away_team": away_team,
            "home_xg": home_xg,
            "away_xg": away_xg,
            "probabilities": sim["probabilities"],
            "fair_odds": sim["fair_odds"],
            "confidence": sim["confidence"],
            "markets": sim["markets"],
            "top_scorelines": sim["top_scorelines"],
        }
