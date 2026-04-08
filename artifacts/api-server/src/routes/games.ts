import { Router } from "express";
import { db } from "@workspace/db";
import { gamesTable, teamsTable } from "@workspace/db";
import { eq, desc, sql, and } from "drizzle-orm";
import { CreateGameBody, UpdateGameBody } from "@workspace/api-zod";

const router = Router();

async function enrichGames(games: typeof gamesTable.$inferSelect[]) {
  const teams = await db.select().from(teamsTable);
  const teamMap = new Map(teams.map(t => [t.id, t]));

  return games.map(g => {
    const home = teamMap.get(g.homeTeamId);
    const away = teamMap.get(g.awayTeamId);
    return {
      ...g,
      homeTeamName: home?.name ?? "",
      awayTeamName: away?.name ?? "",
      homeTeamAbbreviation: home?.abbreviation ?? "",
      awayTeamAbbreviation: away?.abbreviation ?? "",
      homeTeamColor: home?.primaryColor ?? "#1a1a2e",
      awayTeamColor: away?.primaryColor ?? "#1a1a2e",
      scheduledAt: g.scheduledAt.toISOString(),
      isFeatured: g.isFeatured,
    };
  });
}

router.get("/games", async (req, res) => {
  const { status, teamId } = req.query as { status?: string; teamId?: string };

  let conditions = [];
  if (status) conditions.push(eq(gamesTable.status, status));
  if (teamId) {
    const tid = parseInt(teamId);
    conditions.push(sql`${gamesTable.homeTeamId} = ${tid} OR ${gamesTable.awayTeamId} = ${tid}`);
  }

  const games = conditions.length > 0
    ? await db.select().from(gamesTable).where(and(...conditions)).orderBy(desc(gamesTable.scheduledAt))
    : await db.select().from(gamesTable).orderBy(desc(gamesTable.scheduledAt));

  res.json(await enrichGames(games));
});

router.post("/games", async (req, res) => {
  const parsed = CreateGameBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const [game] = await db.insert(gamesTable).values({
    ...parsed.data,
    scheduledAt: new Date(parsed.data.scheduledAt),
    isFeatured: parsed.data.isFeatured ?? false,
  }).returning();
  const enriched = await enrichGames([game]);
  res.status(201).json(enriched[0]);
});

router.get("/games/featured", async (req, res) => {
  const [featured] = await db.select().from(gamesTable)
    .where(eq(gamesTable.isFeatured, true))
    .orderBy(desc(gamesTable.scheduledAt))
    .limit(1);
  if (!featured) {
    const [recent] = await db.select().from(gamesTable)
      .orderBy(desc(gamesTable.scheduledAt)).limit(1);
    if (!recent) return res.status(404).json({ error: "No games found" });
    const enriched = await enrichGames([recent]);
    return res.json(enriched[0]);
  }
  const enriched = await enrichGames([featured]);
  res.json(enriched[0]);
});

router.get("/games/ticker", async (req, res) => {
  const live = await db.select().from(gamesTable).where(eq(gamesTable.status, "live"));
  const recent = await db.select().from(gamesTable).where(eq(gamesTable.status, "completed"))
    .orderBy(desc(gamesTable.scheduledAt)).limit(5);

  const all = [...live, ...recent];
  const teams = await db.select().from(teamsTable);
  const teamMap = new Map(teams.map(t => [t.id, t]));

  const ticker = all.map(g => ({
    id: g.id,
    homeTeamAbbreviation: teamMap.get(g.homeTeamId)?.abbreviation ?? "HOME",
    awayTeamAbbreviation: teamMap.get(g.awayTeamId)?.abbreviation ?? "AWAY",
    homeScore: g.homeScore,
    awayScore: g.awayScore,
    status: g.status,
  }));

  res.json(ticker);
});

router.put("/games/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const parsed = UpdateGameBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  const updateData: Partial<typeof gamesTable.$inferInsert> = { ...parsed.data };

  const [updated] = await db.update(gamesTable).set(updateData).where(eq(gamesTable.id, id)).returning();
  if (!updated) return res.status(404).json({ error: "Not found" });

  if (parsed.data.status === "completed" && updated.homeTeamId && updated.awayTeamId) {
    const homeWon = updated.homeScore > updated.awayScore;
    const awayWon = updated.awayScore > updated.homeScore;

    if (homeWon) {
      await db.execute(sql`UPDATE teams SET wins = wins + 1, goals_for = goals_for + ${updated.homeScore}, goals_against = goals_against + ${updated.awayScore} WHERE id = ${updated.homeTeamId}`);
      await db.execute(sql`UPDATE teams SET losses = losses + 1, goals_for = goals_for + ${updated.awayScore}, goals_against = goals_against + ${updated.homeScore} WHERE id = ${updated.awayTeamId}`);
    } else if (awayWon) {
      await db.execute(sql`UPDATE teams SET wins = wins + 1, goals_for = goals_for + ${updated.awayScore}, goals_against = goals_against + ${updated.homeScore} WHERE id = ${updated.awayTeamId}`);
      await db.execute(sql`UPDATE teams SET losses = losses + 1, goals_for = goals_for + ${updated.homeScore}, goals_against = goals_against + ${updated.awayScore} WHERE id = ${updated.homeTeamId}`);
    }
  }

  const enriched = await enrichGames([updated]);
  res.json(enriched[0]);
});

export default router;
