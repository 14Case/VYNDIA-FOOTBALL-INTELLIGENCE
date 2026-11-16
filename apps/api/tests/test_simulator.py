"""
Tests for VYNDIA Prediction Engine & Match Simulator.
"""

import pytest
from app.prediction.simulator import poisson_prob, simulate_match_poisson


def test_poisson_prob():
    # P(0; 1.0) = e^(-1) ≈ 0.367879
    p0 = poisson_prob(0, 1.0)
    assert round(p0, 4) == 0.3679

    # P(1; 1.0) = 1 * e^(-1) ≈ 0.367879
    p1 = poisson_prob(1, 1.0)
    assert round(p1, 4) == 0.3679

    # Lambda <= 0 edge cases
    assert poisson_prob(0, 0.0) == 1.0
    assert poisson_prob(1, 0.0) == 0.0
    assert poisson_prob(0, -1.0) == 1.0


def test_simulate_match_poisson_normal():
    res = simulate_match_poisson(home_xg=1.85, away_xg=1.15)

    assert "probabilities" in res
    probs = res["probabilities"]
    assert "home_win" in probs
    assert "draw" in probs
    assert "away_win" in probs

    # Sum of probabilities should be close to 1.0 (truncation error < 0.01 for max_goals=7)
    total_prob = probs["home_win"] + probs["draw"] + probs["away_win"]
    assert 0.95 <= total_prob <= 1.01

    # Higher xG team should have higher win probability
    assert probs["home_win"] > probs["away_win"]

    # Check fair odds
    odds = res["fair_odds"]
    assert odds["home"] > 1.0
    assert odds["draw"] > 1.0
    assert odds["away"] > 1.0

    # Markets
    markets = res["markets"]
    assert "over_2_5" in markets
    assert "under_2_5" in markets
    assert "both_teams_to_score" in markets
    assert round(markets["over_2_5"] + markets["under_2_5"], 2) == 1.0

    # Top scorelines
    scorelines = res["top_scorelines"]
    assert len(scorelines) == 5
    assert scorelines[0]["probability"] >= scorelines[1]["probability"]


def test_simulate_match_poisson_extreme_xg():
    # Very dominant home team
    res = simulate_match_poisson(home_xg=4.5, away_xg=0.4)
    probs = res["probabilities"]
    assert probs["home_win"] > 0.80
    assert probs["away_win"] < 0.10
    assert res["fair_odds"]["home"] < 1.30
