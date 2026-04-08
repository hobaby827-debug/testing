import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { teamsTable } from "../lib/db/src/schema/teams";

const { Pool } = pg;

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("NEON_DATABASE_URL or DATABASE_URL must be set");
}

const pool = new Pool({ connectionString });
const db = drizzle(pool);

const teams = [
  {
    name: "Springfield Thunderbirds",
    abbreviation: "SPR",
    city: "Springfield",
    division: "Eastern",
    gmName: "Mattrick",
    primaryColor: "#003263",
    secondaryColor: "#fcb514",
    wins: 0, losses: 0, otLosses: 0, solLosses: 0,
    regulationWins: 0, rowWins: 0,
    goalsFor: 0, goalsAgainst: 0,
    gamesRemaining: 10, homeGamesRemaining: 5, awayGamesRemaining: 5,
    streak: "-",
  },
  {
    name: "Toronto Marlies",
    abbreviation: "TOR",
    city: "Toronto",
    division: "Eastern",
    gmName: "BRODY",
    primaryColor: "#003e7e",
    secondaryColor: "#ffffff",
    wins: 0, losses: 0, otLosses: 0, solLosses: 0,
    regulationWins: 0, rowWins: 0,
    goalsFor: 0, goalsAgainst: 0,
    gamesRemaining: 10, homeGamesRemaining: 5, awayGamesRemaining: 5,
    streak: "-",
  },
  {
    name: "Rochester Americans",
    abbreviation: "ROC",
    city: "Rochester",
    division: "Eastern",
    gmName: "",
    primaryColor: "#002b5c",
    secondaryColor: "#fcb514",
    wins: 0, losses: 0, otLosses: 0, solLosses: 0,
    regulationWins: 0, rowWins: 0,
    goalsFor: 0, goalsAgainst: 0,
    gamesRemaining: 10, homeGamesRemaining: 5, awayGamesRemaining: 5,
    streak: "-",
  },
  {
    name: "Lehigh Valley Phantoms",
    abbreviation: "LV",
    city: "Lehigh Valley",
    division: "Eastern",
    gmName: "",
    primaryColor: "#f74902",
    secondaryColor: "#000000",
    wins: 0, losses: 0, otLosses: 0, solLosses: 0,
    regulationWins: 0, rowWins: 0,
    goalsFor: 0, goalsAgainst: 0,
    gamesRemaining: 10, homeGamesRemaining: 5, awayGamesRemaining: 5,
    streak: "-",
  },
  {
    name: "CV Firebirds",
    abbreviation: "CV",
    city: "Coachella Valley",
    division: "Western",
    gmName: "A3PECT",
    primaryColor: "#001f5b",
    secondaryColor: "#96d9ff",
    wins: 0, losses: 0, otLosses: 0, solLosses: 0,
    regulationWins: 0, rowWins: 0,
    goalsFor: 0, goalsAgainst: 0,
    gamesRemaining: 10, homeGamesRemaining: 5, awayGamesRemaining: 5,
    streak: "-",
  },
  {
    name: "Iowa Chops",
    abbreviation: "IA",
    city: "Iowa",
    division: "Western",
    gmName: "TINOX",
    primaryColor: "#154734",
    secondaryColor: "#ffffff",
    wins: 0, losses: 0, otLosses: 0, solLosses: 0,
    regulationWins: 0, rowWins: 0,
    goalsFor: 0, goalsAgainst: 0,
    gamesRemaining: 10, homeGamesRemaining: 5, awayGamesRemaining: 5,
    streak: "-",
  },
  {
    name: "Rockford IceHogs",
    abbreviation: "RFD",
    city: "Rockford",
    division: "Western",
    gmName: "0uey",
    primaryColor: "#cc0000",
    secondaryColor: "#000000",
    wins: 0, losses: 0, otLosses: 0, solLosses: 0,
    regulationWins: 0, rowWins: 0,
    goalsFor: 0, goalsAgainst: 0,
    gamesRemaining: 10, homeGamesRemaining: 5, awayGamesRemaining: 5,
    streak: "-",
  },
  {
    name: "Cleveland Monsters",
    abbreviation: "CLE",
    city: "Cleveland",
    division: "Western",
    gmName: "",
    primaryColor: "#041e42",
    secondaryColor: "#ce1126",
    wins: 0, losses: 0, otLosses: 0, solLosses: 0,
    regulationWins: 0, rowWins: 0,
    goalsFor: 0, goalsAgainst: 0,
    gamesRemaining: 10, homeGamesRemaining: 5, awayGamesRemaining: 5,
    streak: "-",
  },
];

async function seed() {
  console.log("Clearing existing teams...");
  await db.delete(teamsTable);

  console.log("Inserting teams...");
  const inserted = await db.insert(teamsTable).values(teams).returning();
  
  console.log(`\nSuccessfully inserted ${inserted.length} teams:`);
  for (const team of inserted) {
    console.log(`  [${team.abbreviation}] ${team.name} (${team.division}) — GM: ${team.gmName || "TBD"}`);
  }

  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
