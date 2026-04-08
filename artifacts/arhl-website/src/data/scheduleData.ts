export interface ScheduleGame {
  round: number | string;
  date: string;
  time: string;
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
      { round: 1, date: "4/6/2026", time: "7:05 PM EST", finalScore: "3 - 1 SPR", mvp: null, notes: null },
      { round: 1, date: "4/6/2026", time: "8:00 PM EST", finalScore: "4 - 1 TOR", mvp: null, notes: null },
      { round: 1, date: "4/7/2026", time: "7:05 PM EST", finalScore: "3 - 2 RFD", mvp: null, notes: null },
      { round: 1, date: "4/8/2026", time: "7:00 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 2",
    games: [
      { round: 2, date: "4/9/2026",  time: "6:45 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "4/12/2026", time: "5:00 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "4/12/2026", time: "6:00 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "4/12/2026", time: "7:00 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
];

export const regularSeasonSchedule: ScheduleSection[] = [
  {
    label: "Round 1",
    games: [
      { round: 1, date: "2/16/2026", time: "6:35 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 1, date: "2/16/2026", time: "7:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 1, date: "2/16/2026", time: "6:35 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 1, date: "2/16/2026", time: "7:00 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 2",
    games: [
      { round: 2, date: "TBD", time: "7:05 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "TBD", time: "8:00 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "TBD", time: "7:35 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 3",
    games: [
      { round: 3, date: "TBD", time: "7:00 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 3, date: "TBD", time: "8:05 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 3, date: "TBD", time: "7:05 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 3, date: "TBD", time: "8:00 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 4",
    games: [
      { round: 4, date: "TBD", time: "7:00 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 4, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 4, date: "TBD", time: "7:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 4, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 5",
    games: [
      { round: 5, date: "TBD", time: "7:05 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 5, date: "TBD", time: "7:45 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 5, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 5, date: "TBD", time: "7:05 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 6",
    games: [
      { round: 6, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 6, date: "TBD", time: "7:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 6, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 6, date: "TBD", time: "7:35 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 7",
    games: [
      { round: 7, date: "TBD", time: "7:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 7, date: "TBD", time: "7:45 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 7, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 7, date: "TBD", time: "7:35 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 8",
    games: [
      { round: 8, date: "TBD", time: "7:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 8, date: "TBD", time: "7:45 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 8, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 8, date: "TBD", time: "7:35 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 9",
    games: [
      { round: 9, date: "TBD", time: "7:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 9, date: "TBD", time: "7:45 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 9, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 9, date: "TBD", time: "7:35 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Round 10",
    games: [
      { round: 10, date: "TBD", time: "7:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 10, date: "TBD", time: "7:45 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 10, date: "TBD", time: "6:30 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 10, date: "TBD", time: "7:35 PM EST", finalScore: null, mvp: null, notes: null },
    ],
  },
];

export const playoffSchedule: ScheduleSection[] = [
  {
    label: "Round 1 — Best of 7",
    games: [
      { round: 1, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 1, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 3, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 3, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 4, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 4, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 5, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 5, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 6, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 6, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 7, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 7, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Conference Finals — Best of 7",
    games: [
      { round: 1, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 1, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 3, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 3, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 4, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 4, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 5, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 5, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 6, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 6, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 7, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
      { round: 7, date: "TBD", time: "TBD", finalScore: null, mvp: null, notes: null },
    ],
  },
  {
    label: "Calder Cup Finals — Best of 7",
    games: [
      { round: 1, date: "TBD", time: "9:15 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 2, date: "TBD", time: "9:15 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 3, date: "TBD", time: "9:15 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 4, date: "TBD", time: "9:15 PM EST", finalScore: null, mvp: null, notes: null },
      { round: 5, date: "TBD", time: "9:15 PM EST", finalScore: null, mvp: null, notes: "*IF NECESSARY*" },
      { round: 6, date: "TBD", time: "9:15 PM EST", finalScore: null, mvp: null, notes: "*IF NECESSARY*" },
      { round: 7, date: "TBD", time: "9:15 PM EST", finalScore: null, mvp: null, notes: "*IF NECESSARY*" },
    ],
  },
];
