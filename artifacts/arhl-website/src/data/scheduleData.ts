export interface ScheduleGame {
  gameNum: number | string;
  date: string;
  time: string;
  away: string | null;
  home: string | null;
  finalScore: string | null;
  mvp: string | null;
  notes: string | null;
}

export interface ScheduleSection {
  label: string;
  games: ScheduleGame[];
}

export const preseasonSchedule: ScheduleSection[] = [
  {
    label: "Round 1",
    games: [
      { gameNum: 1, date: "4/6/2026",  time: "7:05 PM EST", away: null, home: null, finalScore: "3 - 1 SPR", mvp: null, notes: null },
      { gameNum: 2, date: "4/6/2026",  time: "8:00 PM EST", away: null, home: null, finalScore: "4 - 1 TOR", mvp: null, notes: null },
      { gameNum: 3, date: "4/7/2026",  time: "7:05 PM EST", away: null, home: null, finalScore: "3 - 2 RFD", mvp: null, notes: null },
      { gameNum: 4, date: "4/8/2026",  time: "7:00 PM EST", away: null, home: null, finalScore: null,         mvp: null, notes: null },
    ],
  },
  {
    label: "Round 2",
    games: [
      { gameNum: 1, date: "4/9/2026",  time: "6:45 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "4/12/2026", time: "5:00 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "4/12/2026", time: "6:00 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 4, date: "4/12/2026", time: "7:00 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
    ],
  },
];

export const regularSeasonSchedule: ScheduleSection[] = [
  {
    label: "Round 1",
    games: [
      { gameNum: 1, date: "2/16/2026", time: "6:35 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "2/16/2026", time: "7:30 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "2/16/2026", time: "6:35 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 2",
    games: [
      { gameNum: 1, date: "TBD", time: "7:05 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "8:00 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "6:30 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 3",
    games: [
      { gameNum: 1, date: "TBD", time: "7:00 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "8:05 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "7:05 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 4",
    games: [
      { gameNum: 1, date: "TBD", time: "7:00 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "6:30 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "7:30 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 5",
    games: [
      { gameNum: 1, date: "TBD", time: "7:05 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "7:45 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "6:30 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 6",
    games: [
      { gameNum: 1, date: "TBD", time: "TBD", away: "ROC", home: "TOR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "TBD", away: "RFD", home: "IA",  finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "TBD", away: null,  home: null,  finalScore: null, mvp: null, notes: "Matchup TBD" },
    ],
  },
  {
    label: "Round 7",
    games: [
      { gameNum: 1, date: "TBD", time: "TBD", away: "SPR", home: "RFD", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "TBD", away: "TOR", home: "CV",  finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "TBD", away: null,  home: null,  finalScore: null, mvp: null, notes: "Matchup TBD" },
    ],
  },
  {
    label: "Round 8",
    games: [
      { gameNum: 1, date: "TBD", time: "TBD", away: "CV",  home: "SPR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "TBD", away: "IA",  home: "ROC", finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "TBD", away: null,  home: null,  finalScore: null, mvp: null, notes: "Matchup TBD" },
    ],
  },
  {
    label: "Round 9",
    games: [
      { gameNum: 1, date: "TBD", time: "TBD", away: "ROC", home: "SPR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "TBD", away: "IA",  home: "CV",  finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "TBD", away: null,  home: null,  finalScore: null, mvp: null, notes: "Matchup TBD" },
    ],
  },
  {
    label: "Round 10",
    games: [
      { gameNum: 1, date: "TBD", time: "TBD", away: "TOR", home: "SPR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "TBD", away: "CV",  home: "RFD", finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "TBD", away: null,  home: null,  finalScore: null, mvp: null, notes: "Matchup TBD" },
    ],
  },
];

export const playoffSchedule: ScheduleSection[] = [
  {
    label: "Round 1 — Best of 7",
    games: Array.from({ length: 7 }, (_, i) => ({
      gameNum: i + 1,
      date: "TBD",
      time: "TBD",
      away: null,
      home: null,
      finalScore: null,
      mvp: null,
      notes: null,
    })),
  },
  {
    label: "Conference Finals — Best of 7",
    games: Array.from({ length: 7 }, (_, i) => ({
      gameNum: i + 1,
      date: "TBD",
      time: "TBD",
      away: null,
      home: null,
      finalScore: null,
      mvp: null,
      notes: null,
    })),
  },
  {
    label: "Calder Cup Finals — Best of 7",
    games: [
      { gameNum: 1, date: "TBD", time: "9:15 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "TBD", time: "9:15 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "TBD", time: "9:15 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 4, date: "TBD", time: "9:15 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: null },
      { gameNum: 5, date: "TBD", time: "9:15 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: "*IF NECESSARY*" },
      { gameNum: 6, date: "TBD", time: "9:15 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: "*IF NECESSARY*" },
      { gameNum: 7, date: "TBD", time: "9:15 PM EST", away: null, home: null, finalScore: null, mvp: null, notes: "*IF NECESSARY*" },
    ],
  },
];
