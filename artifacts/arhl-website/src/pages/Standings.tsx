import { useGetStandings } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";

type Standing = NonNullable<ReturnType<typeof useGetStandings>["data"]>[number];

const CLINCH_LABELS: Record<string, string> = {
  P: "Clinched Kilpatrick Trophy",
  Y: "Clinched Conference",
  X: "Clinched Playoffs",
  E: "Eliminated",
};

function ClinchBadge({ status }: { status: string | null | undefined }) {
  if (!status || status === "-") return <span className="text-muted-foreground">-</span>;
  return (
    <span
      title={CLINCH_LABELS[status] ?? status}
      className="inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold bg-accent/20 text-accent border border-accent/40 cursor-help"
    >
      {status}
    </span>
  );
}

function StandingsTable({ teams }: { teams: Standing[] }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1100px]">
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent bg-muted/20">
            <TableHead className="w-10 text-center text-muted-foreground font-bold uppercase tracking-wider sticky left-0 bg-card/90 z-10">#</TableHead>
            <TableHead className="text-muted-foreground font-bold uppercase tracking-wider sticky left-10 bg-card/90 z-10 min-w-[180px]">Team</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Games Played">GP</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Games Remaining">GR</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Wins">W</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Losses">L</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Overtime Losses">OTL</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Shootout Losses">SOL</TableHead>
            <TableHead className="text-center text-accent font-bold uppercase tracking-wider text-base" title="Points">PTS</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Goals For">GF</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Goals Against">GA</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Regulation Wins">RW</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Regulation + Overtime Wins">ROW</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Points Percentage">PTS%</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Goal Differential">GD</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Max Points Possible">MAX</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Home Games Remaining">HR</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Away Games Remaining">AR</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Current Streak">STRK</TableHead>
            <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider" title="Clinch Status">KEY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={20} className="text-center text-muted-foreground py-12">
                No standings available.
              </TableCell>
            </TableRow>
          ) : (
            teams.map((team, idx) => {
              const gd = team.goalDifferential;
              const gdColor = gd > 0 ? "text-green-400" : gd < 0 ? "text-red-400" : "text-muted-foreground";
              const streakColor = team.streak.startsWith("W")
                ? "text-green-400"
                : team.streak.startsWith("L")
                  ? "text-red-400"
                  : "text-muted-foreground";

              return (
                <TableRow key={team.teamId} className="border-border/50 hover:bg-white/5 transition-colors">
                  <TableCell className="text-center font-display text-lg text-muted-foreground sticky left-0 bg-card/80 z-10">{idx + 1}</TableCell>
                  <TableCell className="sticky left-10 bg-card/80 z-10">
                    <Link href={`/teams/${team.teamId}`} className="flex items-center gap-3 group">
                      <div
                        className="w-9 h-9 rounded-full border flex items-center justify-center bg-background/50 group-hover:scale-110 transition-transform shrink-0"
                        style={{ borderColor: team.primaryColor }}
                      >
                        <span className="text-xs font-bold" style={{ color: team.primaryColor }}>
                          {team.teamAbbreviation}
                        </span>
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="font-display tracking-wide text-base group-hover:text-primary transition-colors whitespace-nowrap">
                          {team.teamName}
                        </span>
                        {team.gmName && (
                          <span className="text-xs text-muted-foreground">GM: {team.gmName}</span>
                        )}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center text-sm">{team.gamesPlayed}</TableCell>
                  <TableCell className="text-center text-sm">{team.gamesRemaining}</TableCell>
                  <TableCell className="text-center text-sm font-semibold">{team.wins}</TableCell>
                  <TableCell className="text-center text-sm">{team.losses}</TableCell>
                  <TableCell className="text-center text-sm">{team.otLosses}</TableCell>
                  <TableCell className="text-center text-sm">{team.solLosses}</TableCell>
                  <TableCell className="text-center font-display font-bold text-xl text-accent">{team.points}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{team.goalsFor}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{team.goalsAgainst}</TableCell>
                  <TableCell className="text-center text-sm">{team.regulationWins}</TableCell>
                  <TableCell className="text-center text-sm">{team.rowWins}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {team.pointsPercentage.toFixed(3)}
                  </TableCell>
                  <TableCell className={`text-center text-sm font-semibold ${gdColor}`}>
                    {gd > 0 ? "+" : ""}{gd}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{team.maxPoints}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{team.homeGamesRemaining}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{team.awayGamesRemaining}</TableCell>
                  <TableCell className={`text-center text-sm font-bold ${streakColor}`}>{team.streak}</TableCell>
                  <TableCell className="text-center"><ClinchBadge status={team.clinchStatus} /></TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Standings() {
  const { data: standings, isLoading } = useGetStandings();

  const eastern = standings?.filter((t) => t.division === "Eastern") ?? [];
  const western = standings?.filter((t) => t.division === "Western") ?? [];
  const other = standings?.filter((t) => t.division !== "Eastern" && t.division !== "Western") ?? [];

  return (
    <div className="container max-w-screen-2xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(255,45,85,0.3)]">
          League Standings
        </h1>
        <p className="text-muted-foreground text-lg mt-4">
          Current regular season standings.
        </p>
      </div>

      {/* Clinch key legend */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
        {Object.entries(CLINCH_LABELS).map(([k, v]) => (
          <span key={k} className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold bg-accent/20 text-accent border border-accent/40">{k}</span>
            {v}
          </span>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-8">
          {[0, 1].map((i) => (
            <div key={i}>
              <Skeleton className="h-8 w-48 mb-4" />
              <Card className="bg-card/40 border-border/50">
                <CardContent className="p-4">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-14 w-full mb-2" />
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {/* Division standings */}
          {[
            { label: "Eastern Division", teams: eastern },
            { label: "Western Division", teams: western },
            ...(other.length > 0 ? [{ label: "Other", teams: other }] : []),
          ].map(({ label, teams }) => (
            <div key={label}>
              <h2 className="text-2xl font-display font-bold uppercase tracking-widest text-accent mb-4">
                {label}
              </h2>
              <Card className="bg-card/40 border-border/50">
                <CardContent className="p-0">
                  <StandingsTable teams={teams} />
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Full league standings */}
          {(eastern.length > 0 || western.length > 0) && (
            <div>
              <h2 className="text-2xl font-display font-bold uppercase tracking-widest text-accent mb-4">
                League Standings
              </h2>
              <Card className="bg-card/40 border-border/50">
                <CardContent className="p-0">
                  <StandingsTable teams={standings ?? []} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
