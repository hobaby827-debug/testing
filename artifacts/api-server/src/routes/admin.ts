import { Router } from "express";
import { db } from "@workspace/db";
import { adminSessionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { AdminLoginBody } from "@workspace/api-zod";
import crypto from "crypto";

const router = Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "arhl-admin-2024";

router.post("/admin/login", async (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  if (parsed.data.username !== ADMIN_USERNAME || parsed.data.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid username or password" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await db.insert(adminSessionsTable).values({ sessionToken: token, expiresAt });

  res.cookie("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, message: "Logged in" });
});

router.get("/admin/me", async (req, res) => {
  const token = req.cookies?.admin_token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const [session] = await db.select().from(adminSessionsTable)
    .where(eq(adminSessionsTable.sessionToken, token));

  if (!session || session.expiresAt < new Date()) {
    return res.status(401).json({ error: "Session expired" });
  }

  res.json({ isAdmin: true });
});

router.post("/admin/logout", async (req, res) => {
  const token = req.cookies?.admin_token;
  if (token) {
    await db.delete(adminSessionsTable).where(eq(adminSessionsTable.sessionToken, token));
  }
  res.clearCookie("admin_token");
  res.json({ success: true });
});

export default router;
