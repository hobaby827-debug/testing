import { Router } from "express";
import { db } from "@workspace/db";
import { playersTable, teamsTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";

const router = Router();

router.get("/stats/leaders", async (req, res) => {
  const allPlayers = await db.select({
    id: playersTable.id,
    username: playersTable.username,
    position: playersTable.position,
    teamId: playersTable.teamId,
    goals: playersTable.goals,
    assists: playersTable.assists,
    gamesPlayed: playersTable.gamesPlayed,
    saves: playersTable.saves,
    goalsAgainstAverage: playersTable.goalsAgainstAverage,
    savePercentage: playersTable.savePercentage,
    teamName: teamsTable.name,
    teamAbbreviation: teamsTable.abbreviation,
  }).from(playersTable).leftJoin(teamsTable, eq(playersTable.teamId, teamsTable.id));

  const withPoints = allPlayers.map(p => ({
    ...p,
    points: p.goals + p.assists,
    teamName: p.teamName ?? "",
    teamAbbreviation: p.teamAbbreviation ?? "",
  }));

  const skaters = withPoints.filter(p => p.position !== "G");
  const goalies = withPoints.filter(p => p.position === "G");

  const topGoalScorer = [...skaters].sort((a, b) => b.goals - a.goals)[0] ?? withPoints[0] ?? null;
  const topPointsLeader = [...skaters].sort((a, b) => b.points - a.points)[0] ?? withPoints[0] ?? null;
  const topGoalie = [...goalies].sort((a, b) => b.saves - a.saves)[0] ?? withPoints[0] ?? null;

  const teams = await db.select().from(teamsTable);
  const topTeamData = [...teams].sort((a, b) => {
    const pa = a.wins * 2;
    const pb = b.wins * 2;
    return pb - pa;
  })[0];

  const topTeam = topTeamData ? {
    rank: 1,
    teamId: topTeamData.id,
    teamName: topTeamData.name,
    teamAbbreviation: topTeamData.abbreviation,
    primaryColor: topTeamData.primaryColor,
    wins: topTeamData.wins,
    losses: topTeamData.losses,
    points: topTeamData.wins * 2,
    goalsFor: topTeamData.goalsFor,
    goalsAgainst: topTeamData.goalsAgainst,
    goalDifferential: topTeamData.goalsFor - topTeamData.goalsAgainst,
  } : null;

  res.json({
    topGoalScorer,
    topPointsLeader,
    topGoalie,
    topTeam,
  });
});

export default router;
