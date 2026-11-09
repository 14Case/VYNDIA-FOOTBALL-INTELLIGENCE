"""
VYNDIA Football Intelligence — Prediction Engine & Match Simulator
Bivariate Poisson & Monte Carlo Simulation for Expected Goals (xG).
"""

import math
from typing import Dict, List, Any


def poisson_prob(k: int, lambd: float) -> float:
    """Calculate Poisson probability P(k; lambda)."""
    if lambd <= 0:
        return 1.0 if k == 0 else 0.0
    return (math.pow(lambd, k) * math.exp(-lambd)) / math.factorial(k)


def simulate_match_poisson(
    home_xg: float,
    away_xg: float,
    max_goals: int = 7
) -> Dict[str, Any]:
    """
    Simulates a match using independent Poisson distributions for home and away xG.
    Calculates exact win/draw/loss probabilities, most likely scorelines, and goal markets.
    """
    matrix: List[List[float]] = []
    home_win_prob = 0.0
    draw_prob = 0.0
    away_win_prob = 0.0
    over_2_5_prob = 0.0
    btts_prob = 0.0

    scorelines = []

    for h in range(max_goals + 1):
        row = []
        p_h = poisson_prob(h, home_xg)
        for a in range(max_goals + 1):
            p_a = poisson_prob(a, away_xg)
            p_joint = p_h * p_a
            row.append(p_joint)

            if h > a:
                home_win_prob += p_joint
            elif h == a:
                draw_prob += p_joint
            else:
                away_win_prob += p_joint

            if (h + a) > 2.5:
                over_2_5_prob += p_joint

            if h > 0 and a > 0:
                btts_prob += p_joint

            scorelines.append({
                "home_goals": h,
                "away_goals": a,
                "score": f"{h} - {a}",
                "probability": round(p_joint, 4)
            })
        matrix.append(row)

    # Sort scorelines by probability descending
    scorelines.sort(key=lambda s: s["probability"], reverse=True)
    top_scorelines = scorelines[:5]

    # Convert probabilities to decimal odds (fair odds without bookmaker margin)
    fair_odds = {
        "home": round(1.0 / home_win_prob, 2) if home_win_prob > 0.02 else 50.0,
        "draw": round(1.0 / draw_prob, 2) if draw_prob > 0.02 else 50.0,
        "away": round(1.0 / away_win_prob, 2) if away_win_prob > 0.02 else 50.0,
    }

    confidence = round(max(home_win_prob, draw_prob, away_win_prob) * 1.35, 2)
    confidence = min(0.95, max(0.55, confidence))

    return {
        "home_xg": home_xg,
        "away_xg": away_xg,
        "probabilities": {
            "home_win": round(home_win_prob, 4),
            "draw": round(draw_prob, 4),
            "away_win": round(away_win_prob, 4),
        },
        "fair_odds": fair_odds,
        "confidence": confidence,
        "markets": {
            "over_2_5": round(over_2_5_prob, 4),
            "under_2_5": round(1.0 - over_2_5_prob, 4),
            "both_teams_to_score": round(btts_prob, 4),
        },
        "top_scorelines": top_scorelines,
    }
