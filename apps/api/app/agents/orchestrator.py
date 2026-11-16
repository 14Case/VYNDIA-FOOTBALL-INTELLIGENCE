"""
VYNDIA Football Intelligence — Multi-Agent Orchestrator
Coordinates autonomous analytical agents to produce synthesized match intelligence.
"""

import asyncio
from typing import Dict, List, Any, Optional

from app.agents.tactical_agent import NeuralTacticalAgent
from app.agents.poisson_agent import BivariatePoissonAgent
from app.agents.arbitrage_agent import MarketArbitrageAgent
from app.agents.sentiment_agent import SquadSentimentAgent


class AgentOrchestrator:
    """Singleton orchestrator managing specialized AI football intelligence agents."""

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AgentOrchestrator, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        self.tactical_agent = NeuralTacticalAgent()
        self.poisson_agent = BivariatePoissonAgent()
        self.arbitrage_agent = MarketArbitrageAgent()
        self.sentiment_agent = SquadSentimentAgent()

        self.agents_map = {
            self.tactical_agent.id: self.tactical_agent,
            self.poisson_agent.id: self.poisson_agent,
            self.arbitrage_agent.id: self.arbitrage_agent,
            self.sentiment_agent.id: self.sentiment_agent,
        }

    def list_agents(self) -> List[Dict[str, Any]]:
        """Return serialized state of all registered agents."""
        return [agent.to_dict() for agent in self.agents_map.values()]

    async def ping_agent(self, agent_id: str) -> Optional[Dict[str, Any]]:
        """Ping a specific agent by ID."""
        agent = self.agents_map.get(agent_id)
        if not agent:
            return None
        return await agent.ping()

    async def ping_all(self) -> List[Dict[str, Any]]:
        """Concurrent health check across all registered agents."""
        tasks = [agent.ping() for agent in self.agents_map.values()]
        results = await asyncio.gather(*tasks)
        return results

    async def coordinate_match_analysis(
        self,
        home_team: str,
        away_team: str,
        home_xg: float = 1.95,
        away_xg: float = 1.35,
        market_odds: Optional[Dict[str, float]] = None
    ) -> Dict[str, Any]:
        """
        Coordinates all 4 agents concurrently:
        1. NTV: Spatial pitch control and pressing analysis
        2. BPE: Joint bivariate Poisson simulation
        3. MEA: Market consensus odds arbitrage and EV calculation
        4. SSS: Squad readiness and news sentiment
        """
        # Step 1: Run Poisson simulation first to feed probabilities into arbitrage agent
        poisson_task = self.poisson_agent.simulate(home_team, away_team, home_xg, away_xg)
        tactical_task = self.tactical_agent.analyze(home_team, away_team, home_xg, away_xg)
        sentiment_task = self.sentiment_agent.assess(home_team, away_team)

        poisson_res, tactical_res, sentiment_res = await asyncio.gather(
            poisson_task, tactical_task, sentiment_task
        )

        # Step 2: Feed simulation probabilities to Arbitrage Agent
        arbitrage_res = await self.arbitrage_agent.scan_edge(
            home_team,
            away_team,
            poisson_res["probabilities"],
            market_odds=market_odds
        )

        # Step 3: Synthesize into cohesive Intelligence Dossier
        consensus_confidence = round(
            (self.tactical_agent.accuracy + self.poisson_agent.accuracy + self.arbitrage_agent.accuracy) / 3.0,
            1
        )

        return {
            "matchup": f"{home_team} vs {away_team}",
            "orchestration_status": "SYNTHESIS_COMPLETE",
            "consensus_confidence": consensus_confidence,
            "tactical_intelligence": tactical_res,
            "poisson_simulation": poisson_res,
            "market_arbitrage": arbitrage_res,
            "squad_sentiment": sentiment_res,
            "strategic_summary": {
                "projected_winner": (
                    home_team if poisson_res["probabilities"]["home_win"] > poisson_res["probabilities"]["away_win"] else away_team
                ),
                "home_win_pct": round(poisson_res["probabilities"]["home_win"] * 100, 1),
                "draw_pct": round(poisson_res["probabilities"]["draw"] * 100, 1),
                "away_win_pct": round(poisson_res["probabilities"]["away_win"] * 100, 1),
                "key_edge": arbitrage_res["edge_discovery"]["arbitrage_verdict"],
                "tactical_headline": tactical_res["tactical_verdict"],
            },
        }


# Global singleton instance
orchestrator = AgentOrchestrator()
