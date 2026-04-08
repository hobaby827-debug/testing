import { useGetStandings } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";

export default function Standings() {
  const { data: standings, isLoading } = useGetStandings();

  const eastern = standings?.filter((t) => t.division === "Eastern") ?? [];
  const western = standings?.filter((t) => t.division === "Western") ?? [];
  const other = standings?.filter((t) => t.division !== "Eastern" && t.division !== "Western") ?? [];

  const divisionSections =
    eastern.length > 0 || western.length > 0
      ? [
          { label: "Eastern Division", teams: eastern },
          { label: "Western Division", teams: western },
          ...(other.length > 0 ? [{ label: "Other", teams: other }] : []),
        ]
      : [{ label: null, teams: standings ?? [] }];

  const headers = (
    <TableRow className="border-border/50 hover:bg-transparent bg-muted/20">
      <TableHead className="w-16 text-center text-muted-foreground font-bold uppercase tracking-wider">Rank</TableHead>
      <TableHead className="text-muted-foreground font-bold uppercase tracking-wider">Team</TableHead>
      <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider">GP</TableHead>
      <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider">W</TableHead>
      <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider">L</TableHead>
      <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider">OTL</TableHead>
      <TableHead className="text-center text-accent font-bold uppercase tracking-wider text-lg">PTS</TableHead>
      <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider">GF</TableHead>
      <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider">GA</TableHead>
      <TableHead className="text-center text-muted-foreground font-bold uppercase tracking-wider">DIFF</TableHead>
    </TableRow>
  );

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(255,45,85,0.3)]">
          League Standings
        </h1>
        <p className="text-muted-foreground text-lg mt-4">
          Current regular season standings.
        </p>
      </div>

      {isLoading ? (
        <Card className="bg-card/40 border-border/50">
          <CardContent className="p-0">
            <Table>
              <TableHeader>{headers}</TableHeader>
              <TableBody>
                {[...Array(6)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={10}><Skeleton className="h-12 w-full" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-8">
          {divisionSections.map(({ label, teams }) => (
            <div key={label ?? "all"}>
              {label && (
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest text-accent mb-4">
                  {label}
                </h2>
              )}
              <Card className="bg-card/40 border-border/50">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>{headers}</TableHeader>
                    <TableBody>
                      {teams.map((team, idx) => (
                        <TableRow key={team.teamId} className="border-border/50 hover:bg-white/5 transition-colors">
                          <TableCell className="text-center font-display text-2xl text-muted-foreground">{idx + 1}</TableCell>
                          <TableCell>
                            <Link href={`/teams/${team.teamId}`} className="flex items-center gap-4 group">
                              <div
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-background/50 group-hover:scale-110 transition-transform"
                                style={{ borderColor: team.primaryColor }}
                              >
                                <span className="text-sm font-bold" style={{ color: team.primaryColor }}>
                                  {team.teamAbbreviation}
                                </span>
                              </div>
                              <span className="font-display tracking-wide text-xl group-hover:text-primary transition-colors">
                                {team.teamName}
                              </span>
                            </Link>
                          </TableCell>
                          <TableCell className="text-center text-lg">{team.wins + team.losses + team.otLosses}</TableCell>
                          <TableCell className="text-center text-lg">{team.wins}</TableCell>
                          <TableCell className="text-center text-lg">{team.losses}</TableCell>
                          <TableCell className="text-center text-lg">{team.otLosses}</TableCell>
                          <TableCell className="text-center font-display font-bold text-2xl text-accent">{team.points}</TableCell>
                          <TableCell className="text-center text-lg text-muted-foreground">{team.goalsFor}</TableCell>
                          <TableCell className="text-center text-lg text-muted-foreground">{team.goalsAgainst}</TableCell>
                          <TableCell
                            className={`text-center font-bold text-lg ${
                              team.goalDifferential > 0
                                ? "text-green-500"
                                : team.goalDifferential < 0
                                  ? "text-red-500"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {team.goalDifferential > 0 ? "+" : ""}
                            {team.goalDifferential}
                          </TableCell>
                        </TableRow>
                      ))}
                      {teams.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={10} className="text-center text-muted-foreground py-12">
                            No standings available.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
