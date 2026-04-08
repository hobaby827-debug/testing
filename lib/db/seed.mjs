import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("NEON_DATABASE_URL or DATABASE_URL must be set");
}

const pool = new Pool({ connectionString });

const teams = [
  { name: "Springfield Thunderbirds", abbreviation: "SPR", city: "Springfield",     division: "Eastern", gm_name: "Mattrick", primary_color: "#003263", secondary_color: "#fcb514" },
  { name: "Toronto Marlies",          abbreviation: "TOR", city: "Toronto",          division: "Eastern", gm_name: "BRODY",    primary_color: "#003e7e", secondary_color: "#ffffff" },
  { name: "Rochester Americans",      abbreviation: "ROC", city: "Rochester",        division: "Eastern", gm_name: "",         primary_color: "#002b5c", secondary_color: "#fcb514" },
  { name: "CV Firebirds",             abbreviation: "CV",  city: "Coachella Valley", division: "Western", gm_name: "A3PECT",   primary_color: "#001f5b", secondary_color: "#96d9ff" },
  { name: "Iowa Chops",               abbreviation: "IA",  city: "Iowa",             division: "Western", gm_name: "TINOX",    primary_color: "#154734", secondary_color: "#ffffff" },
  { name: "Rockford IceHogs",         abbreviation: "RFD", city: "Rockford",         division: "Western", gm_name: "0uey",     primary_color: "#cc0000", secondary_color: "#000000" },
];

// 6-team double round-robin regular season schedule (balanced: 5H/5A per team)
// Format: [awayAbbr, homeAbbr, dateString, timeEST]
const regularSeasonGames = [
  // Round 1 — Feb 16
  ["RFD", "SPR", "2026-02-16", "19:00"],
  ["IA",  "TOR", "2026-02-16", "19:30"],
  ["CV",  "ROC", "2026-02-16", "20:00"],
  // Round 2 — Feb 23
  ["IA",  "SPR", "2026-02-23", "19:00"],
  ["CV",  "RFD", "2026-02-23", "19:30"],
  ["ROC", "TOR", "2026-02-23", "20:00"],
  // Round 3 — Mar 2
  ["CV",  "SPR", "2026-03-02", "19:00"],
  ["ROC", "IA",  "2026-03-02", "19:30"],
  ["TOR", "RFD", "2026-03-02", "20:00"],
  // Round 4 — Mar 9
  ["ROC", "SPR", "2026-03-09", "19:00"],
  ["TOR", "CV",  "2026-03-09", "19:30"],
  ["RFD", "IA",  "2026-03-09", "20:00"],
  // Round 5 — Mar 16
  ["TOR", "SPR", "2026-03-16", "19:00"],
  ["RFD", "ROC", "2026-03-16", "19:30"],
  ["IA",  "CV",  "2026-03-16", "20:00"],
  // Round 6 — Mar 23
  ["SPR", "RFD", "2026-03-23", "19:00"],
  ["TOR", "IA",  "2026-03-23", "19:30"],
  ["ROC", "CV",  "2026-03-23", "20:00"],
  // Round 7 — Mar 30
  ["SPR", "IA",  "2026-03-30", "19:00"],
  ["RFD", "CV",  "2026-03-30", "19:30"],
  ["TOR", "ROC", "2026-03-30", "20:00"],
  // Round 8 — Apr 6
  ["SPR", "CV",  "2026-04-06", "19:00"],
  ["IA",  "ROC", "2026-04-06", "19:30"],
  ["RFD", "TOR", "2026-04-06", "20:00"],
  // Round 9 — Apr 13
  ["SPR", "ROC", "2026-04-13", "19:00"],
  ["CV",  "TOR", "2026-04-13", "19:30"],
  ["IA",  "RFD", "2026-04-13", "20:00"],
  // Round 10 — Apr 20
  ["SPR", "TOR", "2026-04-20", "19:00"],
  ["ROC", "RFD", "2026-04-20", "19:30"],
  ["CV",  "IA",  "2026-04-20", "20:00"],
];

async function seed() {
  const client = await pool.connect();
  try {
    // --- Teams ---
    console.log("Clearing existing teams...");
    await client.query("DELETE FROM teams");

    console.log("Inserting 6 teams...");
    const teamIdMap = {};
    for (const t of teams) {
      const res = await client.query(
        `INSERT INTO teams
          (name, abbreviation, city, division, gm_name, primary_color, secondary_color,
           wins, losses, ot_losses, sol_losses, regulation_wins, row_wins,
           goals_for, goals_against, games_remaining, home_games_remaining, away_games_remaining, streak)
         VALUES ($1,$2,$3,$4,$5,$6,$7, 0,0,0,0,0,0, 0,0,10,5,5,'-')
         RETURNING id`,
        [t.name, t.abbreviation, t.city, t.division, t.gm_name, t.primary_color, t.secondary_color]
      );
      teamIdMap[t.abbreviation] = res.rows[0].id;
      console.log(`  ✓ [${t.abbreviation}] ${t.name} (${t.division}) — GM: ${t.gm_name || "TBD"} — id: ${res.rows[0].id}`);
    }

    // --- Games ---
    console.log("\nClearing existing games...");
    await client.query("DELETE FROM games");

    console.log("Inserting 30 regular season games...");
    for (const [away, home, date, time] of regularSeasonGames) {
      const scheduledAt = new Date(`${date}T${time}:00-05:00`); // EST
      await client.query(
        `INSERT INTO games (home_team_id, away_team_id, home_score, away_score, status, scheduled_at, is_featured)
         VALUES ($1, $2, 0, 0, 'upcoming', $3, false)`,
        [teamIdMap[home], teamIdMap[away], scheduledAt]
      );
      console.log(`  ✓ ${away} @ ${home} — ${date}`);
    }

    const { rows: tCount } = await client.query("SELECT COUNT(*) FROM teams");
    const { rows: gCount } = await client.query("SELECT COUNT(*) FROM games");
    console.log(`\nDone. ${tCount[0].count} teams, ${gCount[0].count} games in database.`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
