import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("NEON_DATABASE_URL or DATABASE_URL must be set");
}

const pool = new Pool({ connectionString });

const teams = [
  { name: "Springfield Thunderbirds", abbreviation: "SPR", city: "Springfield", division: "Eastern", gm_name: "Mattrick", primary_color: "#003263", secondary_color: "#fcb514" },
  { name: "Toronto Marlies",          abbreviation: "TOR", city: "Toronto",      division: "Eastern", gm_name: "BRODY",    primary_color: "#003e7e", secondary_color: "#ffffff" },
  { name: "Rochester Americans",      abbreviation: "ROC", city: "Rochester",    division: "Eastern", gm_name: "",         primary_color: "#002b5c", secondary_color: "#fcb514" },
  { name: "CV Firebirds",             abbreviation: "CV",  city: "Coachella Valley", division: "Western", gm_name: "A3PECT", primary_color: "#001f5b", secondary_color: "#96d9ff" },
  { name: "Iowa Chops",               abbreviation: "IA",  city: "Iowa",         division: "Western", gm_name: "TINOX",   primary_color: "#154734", secondary_color: "#ffffff" },
  { name: "Rockford IceHogs",         abbreviation: "RFD", city: "Rockford",     division: "Western", gm_name: "0uey",    primary_color: "#cc0000", secondary_color: "#000000" },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log("Clearing existing teams...");
    await client.query("DELETE FROM teams");

    console.log("Inserting 8 teams...");
    for (const t of teams) {
      await client.query(
        `INSERT INTO teams
          (name, abbreviation, city, division, gm_name, primary_color, secondary_color,
           wins, losses, ot_losses, sol_losses, regulation_wins, row_wins,
           goals_for, goals_against, games_remaining, home_games_remaining, away_games_remaining, streak)
         VALUES ($1,$2,$3,$4,$5,$6,$7, 0,0,0,0,0,0, 0,0,10,5,5,'-')`,
        [t.name, t.abbreviation, t.city, t.division, t.gm_name, t.primary_color, t.secondary_color]
      );
      console.log(`  ✓ [${t.abbreviation}] ${t.name} (${t.division}) — GM: ${t.gm_name || "TBD"}`);
    }

    const { rows } = await client.query("SELECT COUNT(*) FROM teams");
    console.log(`\nDone. ${rows[0].count} teams in database.`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
