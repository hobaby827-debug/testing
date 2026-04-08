import { Router } from "express";
import { db } from "@workspace/db";
import { teamsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

function buildStandings(teams: typeof teamsTable.$inferSelect[]) {
  const sorted = [...teams].sort((a, b) => {
    const pointsA = a.wins * 2 + a.otLosses;
    const pointsB = b.wins * 2 + b.otLosses;
    if (pointsB !== pointsA) return pointsB - pointsA;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });

  return sorted.map((team, i) => ({
    rank: i + 1,
    teamId: team.id,
    teamName: team.name,
    teamAbbreviation: team.abbreviation,
    division: team.division,
    primaryColor: team.primaryColor,
    wins: team.wins,
    losses: team.losses,
    otLosses: team.otLosses,
    points: team.wins * 2 + team.otLosses,
    goalsFor: team.goalsFor,
    goalsAgainst: team.goalsAgainst,
    goalDifferential: team.goalsFor - team.goalsAgainst,
  }));
}

router.get("/standings", async (req, res) => {
  const teams = await db.select().from(teamsTable);
  res.json(buildStandings(teams));
});

router.get("/standings/summary", async (req, res) => {
  const teams = await db.select().from(teamsTable);
  const standings = buildStandings(teams);
  res.json(standings.slice(0, 3));
});

export default router;
