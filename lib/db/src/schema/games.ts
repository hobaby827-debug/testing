import { pgTable, serial, integer, timestamp, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const gamesTable = pgTable("games", {
  id: serial("id").primaryKey(),
  homeTeamId: integer("home_team_id").notNull(),
  awayTeamId: integer("away_team_id").notNull(),
  homeScore: integer("home_score").notNull().default(0),
  awayScore: integer("away_score").notNull().default(0),
  status: varchar("status", { length: 20 }).notNull().default("upcoming"),
  scheduledAt: timestamp("scheduled_at").notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
});

export const insertGameSchema = createInsertSchema(gamesTable).omit({ id: true });
export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof gamesTable.$inferSelect;
