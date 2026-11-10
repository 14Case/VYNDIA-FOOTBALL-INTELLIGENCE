/**
 * VYNDIA Football Intelligence — FastAPI Client
 *
 * Typed fetch wrapper for communicating with the FastAPI backend.
 */

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Standard error shape returned by the API client. */
export interface ApiError {
  status: number;
  message: string;
  detail?: unknown;
}

/** Health check response from the backend. */
export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime_seconds: number;
  system: {
    python_version: string;
    platform: string;
    machine: string;
  };
}

/** Version info response from the backend. */
export interface VersionResponse {
  app: string;
  version: string;
  api_version: string;
  debug: boolean;
}

/** System status response from the backend. */
export interface StatusResponse {
  api: string;
  database: string;
  prediction_engine: string;
  data_collection: string;
  started_at: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Throw a structured `ApiError` from a failed `Response`.
 */
async function handleError(res: Response): Promise<never> {
  let detail: unknown;
  try {
    detail = await res.json();
  } catch {
    detail = await res.text();
  }

  const err: ApiError = {
    status: res.status,
    message: `API request failed with status ${res.status}`,
    detail,
  };

  throw err;
}

// ---------------------------------------------------------------------------
// Core Fetch Wrapper
// ---------------------------------------------------------------------------

/**
 * Generic typed fetch wrapper.
 *
 * @param path  — API path relative to base URL (e.g. "/health")
 * @param init  — standard RequestInit overrides
 * @returns       parsed JSON of type `T`
 */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!res.ok) {
    await handleError(res);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Convenience Methods
// ---------------------------------------------------------------------------

/** GET /health — backend health check. */
export function getHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/health");
}

/** GET /version — app version metadata. */
export function getVersion(): Promise<VersionResponse> {
  return apiFetch<VersionResponse>("/version");
}

/** GET /status — aggregate system status. */
export function getStatus(): Promise<StatusResponse> {
  return apiFetch<StatusResponse>("/status");
}

export interface SimulationParams {
  home_xg: number;
  away_xg: number;
  home_team?: string;
  away_team?: string;
}

export interface SimulationResult {
  home_team: string;
  away_team: string;
  home_xg: number;
  away_xg: number;
  probabilities: {
    home_win: number;
    draw: number;
    away_win: number;
  };
  fair_odds: {
    home: number;
    draw: number;
    away: number;
  };
  confidence: number;
  markets: {
    over_2_5: number;
    under_2_5: number;
    both_teams_to_score: number;
  };
  top_scorelines: Array<{
    home_goals: number;
    away_goals: number;
    score: string;
    probability: number;
  }>;
}

/** POST /simulate — run Poisson expected goals match simulation. */
export function simulateMatch(params: SimulationParams): Promise<SimulationResult> {
  return apiFetch<SimulationResult>("/simulate", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

/** GET /predictions/:fixtureId — get model prediction for a specific fixture. */
export function getFixturePrediction(fixtureId: string): Promise<SimulationResult & { fixture_id: string; match: string }> {
  return apiFetch<SimulationResult & { fixture_id: string; match: string }>(`/predictions/${fixtureId}`);
}
