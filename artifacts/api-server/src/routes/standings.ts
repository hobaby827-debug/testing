import { Router } from "express";
import { db } from "@workspace/db";
import { teamsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

function buildStandings(teams: typeof teamsTable.$inferSelect[]) {
  const sorted = [...teams].sort((a, b) => {
    const pointsA = a.wins * 2;
    const pointsB = b.wins * 2;
    if (pointsB !== pointsA) return pointsB - pointsA;
    return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
  });

  return sorted.map((team, i) => ({
    rank: i + 1,
    teamId: team.id,
    teamName: team.name,
    teamAbbreviation: team.abbreviation,
    primaryColor: team.primaryColor,
    wins: team.wins,
    losses: team.losses,
    points: team.wins * 2,
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
