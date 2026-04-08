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

// 6-team double round-robin (balanced: each team plays each opponent twice, 5H 5A)
export const regularSeasonSchedule: ScheduleSection[] = [
  {
    label: "Round 1 — Feb 16",
    games: [
      { gameNum: 1, date: "2/16/2026", time: "7:00 PM EST", away: "RFD", home: "SPR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "2/16/2026", time: "7:30 PM EST", away: "IA",  home: "TOR", finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "2/16/2026", time: "8:00 PM EST", away: "CV",  home: "ROC", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 2 — Feb 23",
    games: [
      { gameNum: 1, date: "2/23/2026", time: "7:00 PM EST", away: "IA",  home: "SPR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "2/23/2026", time: "7:30 PM EST", away: "CV",  home: "RFD", finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "2/23/2026", time: "8:00 PM EST", away: "ROC", home: "TOR", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 3 — Mar 2",
    games: [
      { gameNum: 1, date: "3/2/2026",  time: "7:00 PM EST", away: "CV",  home: "SPR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "3/2/2026",  time: "7:30 PM EST", away: "ROC", home: "IA",  finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "3/2/2026",  time: "8:00 PM EST", away: "TOR", home: "RFD", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 4 — Mar 9",
    games: [
      { gameNum: 1, date: "3/9/2026",  time: "7:00 PM EST", away: "ROC", home: "SPR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "3/9/2026",  time: "7:30 PM EST", away: "TOR", home: "CV",  finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "3/9/2026",  time: "8:00 PM EST", away: "RFD", home: "IA",  finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 5 — Mar 16",
    games: [
      { gameNum: 1, date: "3/16/2026", time: "7:00 PM EST", away: "TOR", home: "SPR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "3/16/2026", time: "7:30 PM EST", away: "RFD", home: "ROC", finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "3/16/2026", time: "8:00 PM EST", away: "IA",  home: "CV",  finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 6 — Mar 23",
    games: [
      { gameNum: 1, date: "3/23/2026", time: "7:00 PM EST", away: "SPR", home: "RFD", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "3/23/2026", time: "7:30 PM EST", away: "TOR", home: "IA",  finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "3/23/2026", time: "8:00 PM EST", away: "ROC", home: "CV",  finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 7 — Mar 30",
    games: [
      { gameNum: 1, date: "3/30/2026", time: "7:00 PM EST", away: "SPR", home: "IA",  finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "3/30/2026", time: "7:30 PM EST", away: "RFD", home: "CV",  finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "3/30/2026", time: "8:00 PM EST", away: "TOR", home: "ROC", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 8 — Apr 6",
    games: [
      { gameNum: 1, date: "4/6/2026",  time: "7:00 PM EST", away: "SPR", home: "CV",  finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "4/6/2026",  time: "7:30 PM EST", away: "IA",  home: "ROC", finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "4/6/2026",  time: "8:00 PM EST", away: "RFD", home: "TOR", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 9 — Apr 13",
    games: [
      { gameNum: 1, date: "4/13/2026", time: "7:00 PM EST", away: "SPR", home: "ROC", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "4/13/2026", time: "7:30 PM EST", away: "CV",  home: "TOR", finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "4/13/2026", time: "8:00 PM EST", away: "IA",  home: "RFD", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 10 — Apr 20",
    games: [
      { gameNum: 1, date: "4/20/2026", time: "7:00 PM EST", away: "SPR", home: "TOR", finalScore: null, mvp: null, notes: null },
      { gameNum: 2, date: "4/20/2026", time: "7:30 PM EST", away: "ROC", home: "RFD", finalScore: null, mvp: null, notes: null },
      { gameNum: 3, date: "4/20/2026", time: "8:00 PM EST", away: "CV",  home: "IA",  finalScore: null, mvp: null, notes: null },
    ],
  },
];

export const preseasonSchedule: ScheduleSection[] = [
  {
    label: "Round 1",
    games: [
      { gameNum: 1, date: "4/6/2026",  time: "7:05 PM EST", away: null,  home: null,  finalScore: "3 - 1 SPR", mvp: null, notes: null },
      { gameNum: 2, date: "4/6/2026",  time: "8:00 PM EST", away: null,  home: null,  finalScore: "4 - 1 TOR", mvp: null, notes: null },
      { gameNum: 3, date: "4/7/2026",  time: "7:05 PM EST", away: null,  home: null,  finalScore: "3 - 2 RFD", mvp: null, notes: null },
      { gameNum: 4, date: "4/8/2026",  time: "7:00 PM EST", away: "CV",  home: "RFD", finalScore: "2 - 0 CV", mvp: null, notes: null },
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

export const playoffSchedule: ScheduleSection[] = [
  {
    label: "Conference Semifinals — Best of 7",
    games: Array.from({ length: 7 }, (_, i) => ({
      gameNum: i + 1, date: "TBD", time: "TBD", away: null, home: null, finalScore: null, mvp: null, notes: null,
    })),
  },
  {
    label: "Conference Finals — Best of 7",
    games: Array.from({ length: 7 }, (_, i) => ({
      gameNum: i + 1, date: "TBD", time: "TBD", away: null, home: null, finalScore: null, mvp: null, notes: null,
    })),
  },
  {
    label: "Calder Cup Finals — Best of 7",
    games: Array.from({ length: 7 }, (_, i) => ({
      gameNum: i + 1,
      date: "TBD",
      time: "9:15 PM EST",
      away: null,
      home: null,
      finalScore: null,
      mvp: null,
      notes: i >= 4 ? "*IF NECESSARY*" : null,
    })),
  },
];
