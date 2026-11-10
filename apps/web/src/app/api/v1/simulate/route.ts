import { NextRequest, NextResponse } from "next/server";
import { simulateMatch } from "@/lib/simulator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const homeXg = Number(body.home_xg ?? body.homeXg ?? 1.8);
    const awayXg = Number(body.away_xg ?? body.awayXg ?? 1.2);
    const homeTeam = String(body.home_team ?? body.homeTeam ?? "Home Team");
    const awayTeam = String(body.away_team ?? body.awayTeam ?? "Away Team");

    const result = simulateMatch(homeXg, awayXg, homeTeam, awayTeam);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request payload for match simulation" },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const homeXg = Number(searchParams.get("home_xg") ?? searchParams.get("homeXg") ?? 1.8);
  const awayXg = Number(searchParams.get("away_xg") ?? searchParams.get("awayXg") ?? 1.2);
  const homeTeam = searchParams.get("home_team") ?? searchParams.get("homeTeam") ?? "Home Team";
  const awayTeam = searchParams.get("away_team") ?? searchParams.get("awayTeam") ?? "Away Team";

  const result = simulateMatch(homeXg, awayXg, homeTeam, awayTeam);
  return NextResponse.json({ success: true, ...result });
}
