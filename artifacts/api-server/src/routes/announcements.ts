import { Router } from "express";
import { db } from "@workspace/db";
import { announcementsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { CreateAnnouncementBody } from "@workspace/api-zod";

const router = Router();

router.get("/announcements", async (req, res) => {
  const announcements = await db.select().from(announcementsTable).orderBy(desc(announcementsTable.createdAt));
  res.json(announcements.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })));
});

router.post("/announcements", async (req, res) => {
  const parsed = CreateAnnouncementBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const [ann] = await db.insert(announcementsTable).values(parsed.data).returning();
  res.status(201).json({ ...ann, createdAt: ann.createdAt.toISOString() });
});

router.delete("/announcements/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  await db.delete(announcementsTable).where(eq(announcementsTable.id, id));
  res.status(204).send();
});

export default router;
