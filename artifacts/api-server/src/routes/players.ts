import { Router } from "express";
import { db } from "@workspace/db";
import { playersTable, teamsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { CreatePlayerBody, UpdatePlayerBody } from "@workspace/api-zod";

const router = Router();

function sortColumn(sortBy?: string) {
  switch (sortBy) {
    case "goals": return desc(playersTable.goals);
    case "assists": return desc(playersTable.assists);
    case "saves": return desc(playersTable.saves);
    case "gaa": return playersTable.goalsAgainstAverage;
    default: return desc(playersTable.goals);
  }
}

router.get("/players", async (req, res) => {
  const { teamId, sortBy } = req.query as { teamId?: string; sortBy?: string };
  let query = db.select({
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

  const players = await (teamId
    ? query.where(eq(playersTable.teamId, parseInt(teamId))).orderBy(sortColumn(sortBy))
    : query.orderBy(sortColumn(sortBy)));

  res.json(players.map(p => ({
    ...p,
    points: p.goals + p.assists,
    teamName: p.teamName ?? "",
    teamAbbreviation: p.teamAbbreviation ?? "",
  })));
});

router.post("/players", async (req, res) => {
  const parsed = CreatePlayerBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const [player] = await db.insert(playersTable).values(parsed.data).returning();
  res.status(201).json({ ...player, points: player.goals + player.assists, teamName: "", teamAbbreviation: "" });
});

router.put("/players/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const parsed = UpdatePlayerBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const [updated] = await db.update(playersTable).set(parsed.data).where(eq(playersTable.id, id)).returning();
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json({ ...updated, points: updated.goals + updated.assists, teamName: "", teamAbbreviation: "" });
});

export default router;
