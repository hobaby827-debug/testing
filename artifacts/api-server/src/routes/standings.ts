import { Router } from "express";
import { db } from "@workspace/db";
import { teamsTable } from "@workspace/db";

const router = Router();

function computeStandingRow(team: typeof teamsTable.$inferSelect, rank: number) {
  const gamesPlayed = team.wins + team.losses + team.otLosses + team.solLosses;
  const points = team.wins * 2 + team.otLosses + team.solLosses;
  const maxPoints = points + team.gamesRemaining * 2;
  const pointsPercentage = gamesPlayed > 0 ? points / (gamesPlayed * 2) : 0;

  return {
    rank,
    teamId: team.id,
    teamName: team.name,
    teamAbbreviation: team.abbreviation,
    division: team.division,
    gmName: team.gmName,
    primaryColor: team.primaryColor,
    wins: team.wins,
    losses: team.losses,
    otLosses: team.otLosses,
    solLosses: team.solLosses,
    regulationWins: team.regulationWins,
    rowWins: team.rowWins,
    points,
    gamesPlayed,
    gamesRemaining: team.gamesRemaining,
    homeGamesRemaining: team.homeGamesRemaining,
    awayGamesRemaining: team.awayGamesRemaining,
    goalsFor: team.goalsFor,
    goalsAgainst: team.goalsAgainst,
    goalDifferential: team.goalsFor - team.goalsAgainst,
    pointsPercentage: Math.round(pointsPercentage * 1000) / 1000,
    maxPoints,
    streak: team.streak,
    clinchStatus: team.clinchStatus ?? null,
  };
}

function buildStandings(teams: typeof teamsTable.$inferSelect[]) {
  const sorted = [...teams].sort((a, b) => {
    const pointsA = a.wins * 2 + a.otLosses + a.solLosses;
    const pointsB = b.wins * 2 + b.otLosses + b.solLosses;
    if (pointsB !== pointsA) return pointsB - pointsA;
    const rwA = a.regulationWins;
    const rwB = b.regulationWins;
    if (rwB !== rwA) return rwB - rwA;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });

  return sorted.map((team, i) => computeStandingRow(team, i + 1));
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
