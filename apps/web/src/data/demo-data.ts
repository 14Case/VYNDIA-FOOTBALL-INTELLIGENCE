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
export const DEMO_COMPETITIONS: Competition[] = [
  {
    id: "comp-pl",
    name: "Premier League",
    code: "PL",
    country: "England",
    tier: 1,
    teamsCount: 20,
    matchesTotal: 380,
    matchesPlayed: 284,
    avgGoalsPerMatch: 2.84,
    avgXGPerMatch: 2.92,
  },
  {
    id: "comp-ucl",
    name: "UEFA Champions League",
    code: "UCL",
    country: "Europe",
    tier: 1,
    teamsCount: 36,
    matchesTotal: 189,
    matchesPlayed: 120,
    avgGoalsPerMatch: 3.12,
    avgXGPerMatch: 3.05,
  },
  {
    id: "comp-laliga",
    name: "La Liga",
    code: "PD",
    country: "Spain",
    tier: 1,
    teamsCount: 20,
    matchesTotal: 380,
    matchesPlayed: 278,
    avgGoalsPerMatch: 2.61,
    avgXGPerMatch: 2.58,
  },
  {
    id: "comp-bundesliga",
    name: "Bundesliga",
    code: "BL1",
    country: "Germany",
    tier: 1,
    teamsCount: 18,
    matchesTotal: 306,
    matchesPlayed: 224,
    avgGoalsPerMatch: 3.25,
    avgXGPerMatch: 3.18,
  },
  {
    id: "comp-seriea",
    name: "Serie A",
    code: "SA",
    country: "Italy",
    tier: 1,
    teamsCount: 20,
    matchesTotal: 380,
    matchesPlayed: 270,
    avgGoalsPerMatch: 2.55,
    avgXGPerMatch: 2.52,
  },
];

// ---------------------------------------------------------------------------
// Demo Teams
// ---------------------------------------------------------------------------
export const DEMO_TEAMS: Team[] = [
  {
    id: "team-ars",
    name: "Arsenal FC",
    shortName: "Arsenal",
    code: "ARS",
    country: "England",
    founded: 1886,
    logo: "⚽",
    form: ["W", "W", "D", "W", "W"],
    stats: {
      matchesPlayed: 28,
      wins: 20,
      draws: 4,
      losses: 4,
      goalsFor: 62,
      goalsAgainst: 22,
      xG: 59.4,
      xGA: 21.1,
      possessionAvg: 59.8,
    },
  },
  {
    id: "team-mci",
    name: "Manchester City",
    shortName: "Man City",
    code: "MCI",
    country: "England",
    founded: 1880,
    logo: "⚽",
    form: ["W", "W", "W", "L", "W"],
    stats: {
      matchesPlayed: 28,
      wins: 19,
      draws: 5,
      losses: 4,
      goalsFor: 65,
      goalsAgainst: 28,
      xG: 64.2,
      xGA: 26.5,
      possessionAvg: 64.2,
    },
  },
  {
    id: "team-liv",
    name: "Liverpool FC",
    shortName: "Liverpool",
    code: "LIV",
    country: "England",
    founded: 1892,
    logo: "⚽",
    form: ["W", "D", "W", "W", "L"],
    stats: {
      matchesPlayed: 28,
      wins: 19,
      draws: 6,
      losses: 3,
      goalsFor: 64,
      goalsAgainst: 26,
      xG: 62.8,
      xGA: 27.3,
      possessionAvg: 61.4,
    },
  },
  {
    id: "team-rma",
    name: "Real Madrid CF",
    shortName: "Real Madrid",
    code: "RMA",
    country: "Spain",
    founded: 1902,
    logo: "⚽",
    form: ["W", "W", "W", "D", "W"],
    stats: {
      matchesPlayed: 27,
      wins: 20,
      draws: 5,
      losses: 2,
      goalsFor: 58,
      goalsAgainst: 19,
      xG: 56.7,
      xGA: 20.4,
      possessionAvg: 60.1,
    },
  },
  {
    id: "team-fcb",
    name: "FC Barcelona",
    shortName: "Barcelona",
    code: "FCB",
    country: "Spain",
    founded: 1899,
    logo: "⚽",
    form: ["W", "W", "L", "W", "W"],
    stats: {
      matchesPlayed: 27,
      wins: 19,
      draws: 4,
      losses: 4,
      goalsFor: 68,
      goalsAgainst: 30,
      xG: 65.1,
      xGA: 28.9,
      possessionAvg: 65.5,
    },
  },
  {
    id: "team-bay",
    name: "FC Bayern München",
    shortName: "Bayern",
    code: "BAY",
    country: "Germany",
    founded: 1900,
    logo: "⚽",
    form: ["W", "L", "W", "W", "W"],
    stats: {
      matchesPlayed: 25,
      wins: 18,
      draws: 3,
      losses: 4,
      goalsFor: 72,
      goalsAgainst: 26,
      xG: 69.8,
      xGA: 24.1,
      possessionAvg: 63.8,
    },
  },
  {
    id: "team-int",
    name: "FC Internazionale Milano",
    shortName: "Inter Milan",
    code: "INT",
    country: "Italy",
    founded: 1908,
    logo: "⚽",
    form: ["W", "W", "W", "W", "D"],
    stats: {
      matchesPlayed: 27,
      wins: 21,
      draws: 4,
      losses: 2,
      goalsFor: 63,
      goalsAgainst: 15,
      xG: 58.2,
      xGA: 17.5,
      possessionAvg: 57.2,
    },
  },
];

// ---------------------------------------------------------------------------
// Demo Matches (Live & Upcoming)
// ---------------------------------------------------------------------------
export const DEMO_MATCHES: Match[] = [
  {
    id: "match-live-1",
    competition: "Premier League",
    competitionCode: "PL",
    matchday: 29,
    status: "LIVE",
    minute: 68,
    scheduledAt: "2026-11-06T19:30:00Z",
    venue: "Emirates Stadium, London",
    homeTeam: {
      id: "team-ars",
      name: "Arsenal FC",
      shortName: "Arsenal",
      code: "ARS",
      score: 2,
    },
    awayTeam: {
      id: "team-mci",
      name: "Manchester City",
      shortName: "Man City",
      code: "MCI",
      score: 1,
    },
    probabilities: {
      homeWin: 64.8,
      draw: 22.4,
      awayWin: 12.8,
      confidence: 89.4,
    },
    odds: {
      home: 1.48,
      draw: 4.10,
      away: 7.20,
    },
    telemetry: {
      homeXG: 2.14,
      awayXG: 1.05,
      possessionHome: 52,
      possessionAway: 48,
      dangerousAttacksHome: 46,
      dangerousAttacksAway: 38,
      shotsOnTargetHome: 6,
      shotsOnTargetAway: 3,
      cornersHome: 5,
      cornersAway: 4,
    },
    predictionSummary: {
      model: "v4.2-NEURAL-HYBRID",
      verdict: "Arsenal Over-performing xG (+0.86 delta), high momentum retention",
      edge: "+4.2% EV on Under 3.5 total goals",
      keyMetric: "PPDA: Arsenal 8.4 vs City 12.1",
    },
  },
  {
    id: "match-live-2",
    competition: "La Liga",
    competitionCode: "PD",
    matchday: 28,
    status: "LIVE",
    minute: 41,
    scheduledAt: "2026-11-06T20:00:00Z",
    venue: "Santiago Bernabéu, Madrid",
    homeTeam: {
      id: "team-rma",
      name: "Real Madrid CF",
      shortName: "Real Madrid",
      code: "RMA",
      score: 0,
    },
    awayTeam: {
      id: "team-fcb",
      name: "FC Barcelona",
      shortName: "Barcelona",
      code: "FCB",
      score: 0,
    },
    probabilities: {
      homeWin: 42.1,
      draw: 31.5,
      awayWin: 26.4,
      confidence: 84.2,
    },
    odds: {
      home: 2.15,
      draw: 3.40,
      away: 3.10,
    },
    telemetry: {
      homeXG: 0.82,
      awayXG: 0.64,
      possessionHome: 47,
      possessionAway: 53,
      dangerousAttacksHome: 29,
      dangerousAttacksAway: 31,
      shotsOnTargetHome: 3,
      shotsOnTargetAway: 2,
      cornersHome: 3,
      cornersAway: 2,
    },
    predictionSummary: {
      model: "v4.2-NEURAL-HYBRID",
      verdict: "High defensive equilibrium; projected second-half opening",
      edge: "+2.8% EV on Draw HT / Real Madrid FT",
      keyMetric: "Field Tilt: Madrid 51.4%",
    },
  },
  {
    id: "match-up-1",
    competition: "UEFA Champions League",
    competitionCode: "UCL",
    matchday: 5,
    status: "UPCOMING",
    scheduledAt: "2026-11-07T20:00:00Z",
    venue: "Allianz Arena, Munich",
    homeTeam: {
      id: "team-bay",
      name: "FC Bayern München",
      shortName: "Bayern",
      code: "BAY",
    },
    awayTeam: {
      id: "team-liv",
      name: "Liverpool FC",
      shortName: "Liverpool",
      code: "LIV",
    },
    probabilities: {
      homeWin: 46.5,
      draw: 24.8,
      awayWin: 28.7,
      confidence: 86.8,
    },
    odds: {
      home: 2.05,
      draw: 3.60,
      away: 3.25,
    },
    telemetry: {
      homeXG: 2.21,
      awayXG: 1.84,
      possessionHome: 54,
      possessionAway: 46,
      dangerousAttacksHome: 52,
      dangerousAttacksAway: 44,
      shotsOnTargetHome: 7,
      shotsOnTargetAway: 5,
      cornersHome: 6,
      cornersAway: 5,
    },
    predictionSummary: {
      model: "v4.2-NEURAL-HYBRID",
      verdict: "High-tempo transition match favored; Bayern home edge +0.35 xG",
      edge: "+5.1% EV on Both Teams To Score (Yes)",
      keyMetric: "Expected Pace: 18.2 transitional sequences",
    },
  },
  {
    id: "match-up-2",
    competition: "Serie A",
    competitionCode: "SA",
    matchday: 28,
    status: "UPCOMING",
    scheduledAt: "2026-11-08T17:00:00Z",
    venue: "San Siro, Milan",
    homeTeam: {
      id: "team-int",
      name: "FC Internazionale Milano",
      shortName: "Inter Milan",
      code: "INT",
    },
    awayTeam: {
      id: "team-ars",
      name: "Arsenal FC",
      shortName: "Arsenal",
      code: "ARS",
    },
    probabilities: {
      homeWin: 39.4,
      draw: 32.2,
      awayWin: 28.4,
      confidence: 82.5,
    },
    odds: {
      home: 2.35,
      draw: 3.20,
      away: 2.95,
    },
    telemetry: {
      homeXG: 1.45,
      awayXG: 1.32,
      possessionHome: 49,
      possessionAway: 51,
      dangerousAttacksHome: 36,
      dangerousAttacksAway: 38,
      shotsOnTargetHome: 4,
      shotsOnTargetAway: 4,
      cornersHome: 4,
      cornersAway: 5,
    },
    predictionSummary: {
      model: "v4.2-NEURAL-HYBRID",
      verdict: "Tactical deadlock expected between tier-1 defensive blocks",
      edge: "+3.6% EV on Under 2.5 Total Goals",
      keyMetric: "xGA combined: 0.88/90 avg",
    },
  },
];

// ---------------------------------------------------------------------------
// Demo Players
// ---------------------------------------------------------------------------
export const DEMO_PLAYERS: Player[] = [
  {
    id: "player-1",
    name: "Bukayo Saka",
    teamId: "team-ars",
    teamName: "Arsenal FC",
    position: "Forward",
    number: 7,
    nationality: "England",
    age: 24,
    rating: 8.42,
    stats: {
      appearances: 26,
      goals: 14,
      assists: 11,
      xG: 12.8,
      xA: 9.6,
      passAccuracy: 84.5,
    },
  },
  {
    id: "player-2",
    name: "Erling Haaland",
    teamId: "team-mci",
    teamName: "Manchester City",
    position: "Forward",
    number: 9,
    nationality: "Norway",
    age: 25,
    rating: 8.78,
    stats: {
      appearances: 25,
      goals: 24,
      assists: 4,
      xG: 22.4,
      xA: 3.2,
      passAccuracy: 76.2,
    },
  },
  {
    id: "player-3",
    name: "Jude Bellingham",
    teamId: "team-rma",
    teamName: "Real Madrid CF",
    position: "Midfielder",
    number: 5,
    nationality: "England",
    age: 22,
    rating: 8.65,
    stats: {
      appearances: 24,
      goals: 16,
      assists: 8,
      xG: 14.1,
      xA: 7.9,
      passAccuracy: 88.9,
    },
  },
  {
    id: "player-4",
    name: "Lamine Yamal",
    teamId: "team-fcb",
    teamName: "FC Barcelona",
    position: "Forward",
    number: 19,
    nationality: "Spain",
    age: 18,
    rating: 8.52,
    stats: {
      appearances: 25,
      goals: 11,
      assists: 14,
      xG: 9.8,
      xA: 12.4,
      passAccuracy: 82.1,
    },
  },
  {
    id: "player-5",
    name: "Harry Kane",
    teamId: "team-bay",
    teamName: "FC Bayern München",
    position: "Forward",
    number: 9,
    nationality: "England",
    age: 32,
    rating: 8.71,
    stats: {
      appearances: 24,
      goals: 26,
      assists: 9,
      xG: 23.9,
      xA: 7.8,
      passAccuracy: 83.4,
    },
  },
  {
    id: "player-6",
    name: "Lautaro Martínez",
    teamId: "team-int",
    teamName: "FC Internazionale Milano",
    position: "Forward",
    number: 10,
    nationality: "Argentina",
    age: 28,
    rating: 8.39,
    stats: {
      appearances: 25,
      goals: 18,
      assists: 6,
      xG: 17.2,
      xA: 5.4,
      passAccuracy: 80.2,
    },
  },
];

// ---------------------------------------------------------------------------
// Demo AI Agents
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
