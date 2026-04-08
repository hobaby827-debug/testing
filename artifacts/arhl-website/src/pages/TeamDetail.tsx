import { useGetTeam, getGetTeamQueryKey } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export default function TeamDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  const { data: team, isLoading } = useGetTeam(id, { query: { enabled: !!id, queryKey: getGetTeamQueryKey(id) } });

  if (isLoading) {
    return (
      <div className="container max-w-screen-xl mx-auto px-4 py-12 space-y-8">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-96 md:col-span-2 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!team) return <div className="p-12 text-center">Team not found.</div>;

  return (
    <div className="min-h-screen pb-12">
      {/* Header Banner */}
      <div 
        className="h-[300px] w-full relative flex items-end pb-8" 
        style={{ 
          background: `linear-gradient(to top, var(--background), transparent), linear-gradient(135deg, ${team.primaryColor}20 0%, var(--background) 100%)` 
        }}
      >
        <div className="container max-w-screen-xl mx-auto px-4 relative z-10 flex items-center gap-8">
          <div 
            className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 shadow-2xl flex items-center justify-center bg-card overflow-hidden shrink-0"
            style={{ borderColor: team.primaryColor }}
          >
            {team.logoUrl ? (
              <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
            ) : (
              <img src="/team-logo-placeholder.png" alt="Placeholder" className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <div className="text-xl font-bold tracking-widest text-muted-foreground uppercase mb-2" style={{ color: team.secondaryColor || team.primaryColor }}>
              {team.city}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase drop-shadow-md">
              {team.name}
            </h1>
            <div className="flex gap-6 mt-4">
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Record: <span className="text-white text-lg ml-1">{team.wins}-{team.losses}</span>
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Points: <span className="text-accent text-lg ml-1">{team.points}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Roster & Stats */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-display uppercase tracking-wider">Team Roster</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="w-12 text-muted-foreground font-bold">POS</TableHead>
                    <TableHead className="text-muted-foreground font-bold">Player</TableHead>
                    <TableHead className="text-right text-muted-foreground font-bold">GP</TableHead>
                    <TableHead className="text-right text-muted-foreground font-bold">G</TableHead>
                    <TableHead className="text-right text-muted-foreground font-bold">A</TableHead>
                    <TableHead className="text-right text-accent font-bold">PTS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.players?.filter(p => p.position !== 'G').map((player) => (
                    <TableRow key={player.id} className="border-border/50">
                      <TableCell className="font-bold text-muted-foreground">{player.position}</TableCell>
                      <TableCell className="font-display text-lg tracking-wide">{player.username}</TableCell>
                      <TableCell className="text-right">{player.gamesPlayed}</TableCell>
                      <TableCell className="text-right">{player.goals}</TableCell>
                      <TableCell className="text-right">{player.assists}</TableCell>
                      <TableCell className="text-right font-bold text-accent">{player.points}</TableCell>
                    </TableRow>
                  ))}
                  {team.players?.filter(p => p.position !== 'G').length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No skaters on roster.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-display uppercase tracking-wider">Goaltenders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-bold">Player</TableHead>
                    <TableHead className="text-right text-muted-foreground font-bold">GP</TableHead>
                    <TableHead className="text-right text-muted-foreground font-bold">SV</TableHead>
                    <TableHead className="text-right text-muted-foreground font-bold">SV%</TableHead>
                    <TableHead className="text-right text-accent font-bold">GAA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.players?.filter(p => p.position === 'G').map((player) => (
                    <TableRow key={player.id} className="border-border/50">
                      <TableCell className="font-display text-lg tracking-wide">{player.username}</TableCell>
                      <TableCell className="text-right">{player.gamesPlayed}</TableCell>
                      <TableCell className="text-right">{player.saves}</TableCell>
                      <TableCell className="text-right">{player.savePercentage}%</TableCell>
                      <TableCell className="text-right font-bold text-accent">{player.goalsAgainstAverage}</TableCell>
                    </TableRow>
                  ))}
                  {team.players?.filter(p => p.position === 'G').length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No goalies on roster.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Schedule */}
        <div className="space-y-8">
          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-display uppercase tracking-wider">Team Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {team.schedule?.map((game) => {
                  const isHome = game.homeTeamId === team.id;
                  const opponent = isHome ? game.awayTeamAbbreviation : game.homeTeamAbbreviation;
                  const isWin = game.status === 'completed' && 
                    ((isHome && game.homeScore > game.awayScore) || (!isHome && game.awayScore > game.homeScore));
                  const isLoss = game.status === 'completed' && !isWin;

                  return (
                    <div key={game.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          {format(new Date(game.scheduledAt), "MMM d")} • {isHome ? 'VS' : '@'}
                        </div>
                        <div className="font-display text-xl tracking-wide">{opponent}</div>
                      </div>
                      <div className="text-right">
                        {game.status === 'completed' ? (
                          <>
                            <div className="font-bold text-lg">
                              {isHome ? `${game.homeScore} - ${game.awayScore}` : `${game.awayScore} - ${game.homeScore}`}
                            </div>
                            <div className={`text-xs font-bold uppercase ${isWin ? 'text-green-500' : 'text-red-500'}`}>
                              {isWin ? 'W' : 'L'}
                            </div>
                          </>
                        ) : game.status === 'live' ? (
                          <div className="text-sm font-bold text-red-500 uppercase animate-pulse">Live</div>
                        ) : (
                          <div className="text-sm text-muted-foreground">{format(new Date(game.scheduledAt), "h:mm a")}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {(!team.schedule || team.schedule.length === 0) && (
                  <div className="p-8 text-center text-muted-foreground">No games scheduled.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
