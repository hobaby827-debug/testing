import { pgTable, text, serial, integer, real, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const playersTable = pgTable("players", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  position: varchar("position", { length: 5 }).notNull().default("C"),
  teamId: integer("team_id").notNull(),
  goals: integer("goals").notNull().default(0),
  assists: integer("assists").notNull().default(0),
  gamesPlayed: integer("games_played").notNull().default(0),
  saves: integer("saves").notNull().default(0),
  goalsAgainstAverage: real("goals_against_average").notNull().default(0),
  savePercentage: real("save_percentage").notNull().default(0),
});

export const insertPlayerSchema = createInsertSchema(playersTable).omit({ id: true });
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof playersTable.$inferSelect;
