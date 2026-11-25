/**
 * VYNDIA Football Intelligence — Demonstration Dataset
 *
 * NOTE: DEMONSTRATION DATA ONLY — NOT REAL-TIME FOOTBALL INFORMATION.
 * Used for interface development, testing, and system demonstration.
 */

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  country: string;
  founded: number;
  logo: string;
  form: ("W" | "D" | "L")[];
  stats: {
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    xG: number;
    xGA: number;
    possessionAvg: number;
  };
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  position: "Forward" | "Midfielder" | "Defender" | "Goalkeeper";
  number: number;
  nationality: string;
  age: number;
  rating: number;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    xG: number;
    xA: number;
    passAccuracy: number;
  };
}

export interface Match {
  id: string;
  competition: string;
  competitionCode: string;
  matchday: number;
  status: "LIVE" | "UPCOMING" | "FINISHED";
  minute?: number;
  scheduledAt: string;
  venue: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    code: string;
    score?: number;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    code: string;
    score?: number;
  };
  probabilities: {
    homeWin: number;
    draw: number;
    awayWin: number;
    confidence: number;
  };
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  telemetry: {
    homeXG: number;
    awayXG: number;
    possessionHome: number;
    possessionAway: number;
    dangerousAttacksHome: number;
    dangerousAttacksAway: number;
    shotsOnTargetHome: number;
    shotsOnTargetAway: number;
    cornersHome: number;
    cornersAway: number;
  };
  predictionSummary?: {
    model: string;
    verdict: string;
    edge: string;
    keyMetric: string;
  };
}

export interface Competition {
  id: string;
  name: string;
  code: string;
  country: string;
  tier: number;
  teamsCount: number;
  matchesTotal: number;
  matchesPlayed: number;
  avgGoalsPerMatch: number;
  avgXGPerMatch: number;
}

export interface AIAgent {
  id: string;
  name: string;
  codename: string;
  role: string;
  status: "ONLINE" | "TRAINING" | "EVALUATING" | "IDLE";
  modelVersion: string;
  accuracy: number;
  predictionsCount: number;
  latencyMs: number;
  description: string;
  lastActive: string;
}

// ---------------------------------------------------------------------------
// Demo Competitions
// ---------------------------------------------------------------------------
export const DEMO_COMPETITIONS: Competition[] = [];
export const DEMO_TEAMS: Team[] = [];
export const DEMO_MATCHES: Match[] = [];
export const DEMO_PLAYERS: Player[] = [];

// ---------------------------------------------------------------------------
// AI Agents Specifications
// ---------------------------------------------------------------------------
export const DEMO_AGENTS: AIAgent[] = [
  {
    id: "agent-neural",
    name: "Neural Tactical Vector",
    codename: "AGENT-01 // NTV",
    role: "Deep spatial & tactical pattern recognition from spatial coordinates",
    status: "ONLINE",
    modelVersion: "v4.2.1-NEURAL",
    accuracy: 78.4,
    predictionsCount: 1420,
    latencyMs: 38,
    description: "Evaluates pitch control surfaces, pressing triggers, and transition vectors to project shot quality and goal expectation deltas.",
    lastActive: "Just now",
  },
  {
    id: "agent-poisson",
    name: "Bivariate Poisson Engine",
    codename: "AGENT-02 // BPE",
    role: "Probabilistic scoreline distribution & discrete goal modeling",
    status: "ONLINE",
    modelVersion: "v3.8.0-POISSON",
    accuracy: 74.2,
    predictionsCount: 3850,
    latencyMs: 14,
    description: "Computes joint probability mass functions for full-time scorelines, correct score vectors, and over/under probability intervals.",
    lastActive: "1 min ago",
  },
  {
    id: "agent-market",
    name: "Market Edge Arbitrage",
    codename: "AGENT-03 // MEA",
    role: "Consensus odds discrepancy & expected value (EV) scanning",
    status: "ONLINE",
    modelVersion: "v2.4.0-ARBITRAGE",
    accuracy: 81.6,
    predictionsCount: 890,
    latencyMs: 62,
    description: "Detects divergences between structural model probabilities and sharp bookmaker lines to isolate statistically validated edge.",
    lastActive: "3 mins ago",
  },
  {
    id: "agent-nlp",
    name: "Squad Status & Sentiment",
    codename: "AGENT-04 // SSS",
    role: "Injury reports, press conference transcripts, tactical news NLP",
    status: "ONLINE",
    modelVersion: "v1.9.4-NLP",
    accuracy: 71.8,
    predictionsCount: 640,
    latencyMs: 115,
    description: "Parses official injury disclosures, manager quotes, and starting XI confirmations to adjust prior team ratings.",
    lastActive: "5 mins ago",
  },
];

// ---------------------------------------------------------------------------
// System Performance Metrics
// ---------------------------------------------------------------------------
export const DEMO_SYSTEM_METRICS = {
  activeModels: 4,
  liveMatchesTracked: 2,
  predictionsCalculatedToday: 184,
  historicalModelAccuracy: 78.6,
  averageEdgeYield: "+4.8%",
  pipelineStatus: "OPERATIONAL",
  databaseLatency: "18ms",
  modelVersion: "v4.2-NEURAL-HYBRID",
};
