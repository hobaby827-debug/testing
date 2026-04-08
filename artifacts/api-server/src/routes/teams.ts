import { Router } from "express";
import { db } from "@workspace/db";
import { teamsTable, playersTable, gamesTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import { CreateTeamBody, UpdateTeamBody } from "@workspace/api-zod";

const router = Router();

function computeTeamStats(team: typeof teamsTable.$inferSelect) {
  return {
    ...team,
    points: team.wins * 2 + team.otLosses,
    goalDifferential: team.goalsFor - team.goalsAgainst,
    logoUrl: team.logoUrl ?? null,
  };
}

router.get("/teams", async (req, res) => {
  const teams = await db.select().from(teamsTable).orderBy(desc(teamsTable.wins));
  res.json(teams.map(computeTeamStats));
});

router.post("/teams", async (req, res) => {
  const parsed = CreateTeamBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const [team] = await db.insert(teamsTable).values(parsed.data).returning();
  res.status(201).json(computeTeamStats(team));
});

router.get("/teams/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const [team] = await db.select().from(teamsTable).where(eq(teamsTable.id, id));
  if (!team) return res.status(404).json({ error: "Not found" });

  const players = await db.select().from(playersTable).where(eq(playersTable.teamId, id));
  const schedule = await db.select().from(gamesTable).where(
    sql`${gamesTable.homeTeamId} = ${id} OR ${gamesTable.awayTeamId} = ${id}`
  ).orderBy(desc(gamesTable.scheduledAt)).limit(10);

  const teamDetail = computeTeamStats(team);

  const playersWithStats = players.map(p => ({
    ...p,
    points: p.goals + p.assists,
    teamName: team.name,
    teamAbbreviation: team.abbreviation,
    goalsAgainstAverage: p.goalsAgainstAverage ?? 0,
    savePercentage: p.savePercentage ?? 0,
    saves: p.saves ?? 0,
  }));

  const scheduleWithTeams = schedule.map(g => ({
    ...g,
    homeTeamName: "",
    awayTeamName: "",
    homeTeamAbbreviation: "",
    awayTeamAbbreviation: "",
    homeTeamColor: "",
    awayTeamColor: "",
    isFeatured: g.isFeatured,
    scheduledAt: g.scheduledAt.toISOString(),
  }));

  res.json({ ...teamDetail, players: playersWithStats, schedule: scheduleWithTeams });
});

router.put("/teams/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const parsed = UpdateTeamBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const [updated] = await db.update(teamsTable).set(parsed.data).where(eq(teamsTable.id, id)).returning();
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(computeTeamStats(updated));
});

export default router;
