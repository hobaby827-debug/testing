import { pgTable, text, serial, integer, varchar, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const teamsTable = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  abbreviation: varchar("abbreviation", { length: 5 }).notNull(),
  city: text("city").notNull(),
  division: text("division").notNull().default(""),
  gmName: text("gm_name").notNull().default(""),
  primaryColor: varchar("primary_color", { length: 20 }).notNull().default("#1a1a2e"),
  secondaryColor: varchar("secondary_color", { length: 20 }).notNull().default("#ffffff"),
  logoUrl: text("logo_url"),
  wins: integer("wins").notNull().default(0),
  losses: integer("losses").notNull().default(0),
  otLosses: integer("ot_losses").notNull().default(0),
  solLosses: integer("sol_losses").notNull().default(0),
  regulationWins: integer("regulation_wins").notNull().default(0),
  rowWins: integer("row_wins").notNull().default(0),
  goalsFor: integer("goals_for").notNull().default(0),
  goalsAgainst: integer("goals_against").notNull().default(0),
  gamesRemaining: integer("games_remaining").notNull().default(10),
  homeGamesRemaining: integer("home_games_remaining").notNull().default(5),
  awayGamesRemaining: integer("away_games_remaining").notNull().default(5),
  streak: text("streak").notNull().default("-"),
  clinchStatus: text("clinch_status"),
});

export const insertTeamSchema = createInsertSchema(teamsTable).omit({ id: true });
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teamsTable.$inferSelect;
