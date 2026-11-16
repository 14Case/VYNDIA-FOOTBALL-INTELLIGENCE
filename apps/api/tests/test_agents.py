"""
Tests for VYNDIA Multi-Agent Intelligence System.
"""

import pytest
from app.agents.orchestrator import orchestrator, AgentOrchestrator
from app.agents.tactical_agent import NeuralTacticalAgent
from app.agents.poisson_agent import BivariatePoissonAgent
from app.agents.arbitrage_agent import MarketArbitrageAgent
from app.agents.sentiment_agent import SquadSentimentAgent


def test_orchestrator_initialization():
    orch = AgentOrchestrator()
    assert orch is orchestrator  # Singleton verification
    agents = orch.list_agents()
    assert len(agents) == 4

    agent_ids = {a["id"] for a in agents}
    assert agent_ids == {
        "agent-neural",
        "agent-poisson",
        "agent-market",
        "agent-nlp",
    }


@pytest.mark.anyio
async def test_ping_all_agents():
    heartbeats = await orchestrator.ping_all()
    assert len(heartbeats) == 4
    for hb in heartbeats:
        assert hb["status"] in ("ONLINE", "HEALTHY", "READY")
        assert hb["latency_ms"] >= 0
        assert "last_active" in hb


@pytest.mark.anyio
async def test_ping_single_agent():
    hb = await orchestrator.ping_agent("agent-poisson")
    assert hb is not None
    assert hb["id"] == "agent-poisson"
    assert "BPE" in hb["codename"]

    # Non-existent agent
    hb_none = await orchestrator.ping_agent("unknown-agent")
    assert hb_none is None


@pytest.mark.anyio
async def test_individual_agents():
    # 1. Tactical agent
    tactical = NeuralTacticalAgent()
    tact_res = await tactical.analyze("Real Madrid", "Barcelona", 2.2, 1.8)
    assert "NTV" in tact_res["agent"]
    assert "spatial_metrics" in tact_res
    assert 0 <= tact_res["spatial_metrics"]["home_pitch_control_pct"] <= 100

    # 2. Poisson agent
    poisson = BivariatePoissonAgent()
    pois_res = await poisson.simulate("Arsenal", "Chelsea", 1.9, 1.2)
    assert "BPE" in pois_res["agent"]
    assert "probabilities" in pois_res

    # 3. Arbitrage agent
    arbitrage = MarketArbitrageAgent()
    arb_res = await arbitrage.scan_edge(
        "Arsenal",
        "Chelsea",
        pois_res["probabilities"],
        market_odds={"home": 2.10, "draw": 3.40, "away": 3.80}
    )
    assert "MEA" in arb_res["agent"]
    assert "edge_discovery" in arb_res

    # 4. Sentiment agent
    sentiment = SquadSentimentAgent()
    sent_res = await sentiment.assess("Liverpool", "Man City")
    assert "SSS" in sent_res["agent"]
    assert "squad_readiness" in sent_res


@pytest.mark.anyio
async def test_coordinate_match_analysis():
    dossier = await orchestrator.coordinate_match_analysis(
        home_team="PSG",
        away_team="Marseille",
        home_xg=2.4,
        away_xg=0.9,
    )

    assert dossier["matchup"] == "PSG vs Marseille"
    assert dossier["orchestration_status"] == "SYNTHESIS_COMPLETE"
    assert "consensus_confidence" in dossier
    assert "tactical_intelligence" in dossier
    assert "poisson_simulation" in dossier
    assert "market_arbitrage" in dossier
    assert "squad_sentiment" in dossier
    assert "strategic_summary" in dossier

    # Verify strategic summary
    strat = dossier["strategic_summary"]
    assert "projected_winner" in strat
    assert "home_win_pct" in strat
    assert "key_edge" in strat
