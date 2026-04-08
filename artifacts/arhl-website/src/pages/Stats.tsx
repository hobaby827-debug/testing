import { useListPlayers, getListPlayersQueryKey } from "@workspace/api-client-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";

export default function Stats() {
  const [skaterSort, setSkaterSort] = useState<"points" | "goals" | "assists">("points");
  const [goalieSort, setGoalieSort] = useState<"saves" | "gaa">("saves");

  const { data: skaters, isLoading: isLoadingSkaters } = useListPlayers({ sortBy: skaterSort }, { query: { queryKey: getListPlayersQueryKey({ sortBy: skaterSort }) } });
  const { data: goalies, isLoading: isLoadingGoalies } = useListPlayers({ sortBy: goalieSort }, { query: { queryKey: getListPlayersQueryKey({ sortBy: goalieSort }) } });

  const filteredSkaters = skaters?.filter(p => p.position !== 'G');
  const filteredGoalies = goalies?.filter(p => p.position === 'G');

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(0,212,255,0.3)]">
          League Leaders
        </h1>
        <p className="text-muted-foreground text-lg mt-4">
          Player statistics across the entire ARHL.
        </p>
      </div>

      <Tabs defaultValue="skaters" className="w-full">
        <TabsList className="mb-8 w-full max-w-md bg-card/50 border border-border/50">
          <TabsTrigger value="skaters" className="flex-1 font-display tracking-wide text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Skaters</TabsTrigger>
          <TabsTrigger value="goalies" className="flex-1 font-display tracking-wide text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Goaltenders</TabsTrigger>
        </TabsList>

        <TabsContent value="skaters">
          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent bg-muted/20">
                    <TableHead className="w-16 text-center text-muted-foreground font-bold uppercase">#</TableHead>
                    <TableHead className="text-muted-foreground font-bold uppercase tracking-wider">Player</TableHead>
                    <TableHead className="text-muted-foreground font-bold uppercase tracking-wider">Team</TableHead>
                    <TableHead className="w-16 text-center text-muted-foreground font-bold uppercase">POS</TableHead>
                    <TableHead className="w-20 text-center text-muted-foreground font-bold uppercase">GP</TableHead>
                    <TableHead 
                      className={`w-24 text-center font-bold uppercase cursor-pointer hover:text-white transition-colors ${skaterSort === 'goals' ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={() => setSkaterSort("goals")}
                    >
                      G
                    </TableHead>
                    <TableHead 
                      className={`w-24 text-center font-bold uppercase cursor-pointer hover:text-white transition-colors ${skaterSort === 'assists' ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={() => setSkaterSort("assists")}
                    >
                      A
                    </TableHead>
                    <TableHead 
                      className={`w-24 text-center font-bold uppercase cursor-pointer hover:text-white transition-colors text-lg ${skaterSort === 'points' ? 'text-accent' : 'text-muted-foreground'}`}
                      onClick={() => setSkaterSort("points")}
                    >
                      PTS
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingSkaters ? (
                    [...Array(10)].map((_, i) => (
                      <TableRow key={i}><TableCell colSpan={8}><Skeleton className="h-12 w-full" /></TableCell></TableRow>
                    ))
                  ) : filteredSkaters?.map((player, idx) => (
                    <TableRow key={player.id} className="border-border/50 hover:bg-white/5 transition-colors">
                      <TableCell className="text-center font-display text-2xl text-muted-foreground">{idx + 1}</TableCell>
                      <TableCell className="font-display tracking-wide text-xl text-white">{player.username}</TableCell>
                      <TableCell>
                        <Link href={`/teams/${player.teamId}`} className="text-muted-foreground hover:text-primary transition-colors font-bold uppercase">
                          {player.teamAbbreviation}
                        </Link>
                      </TableCell>
                      <TableCell className="text-center font-bold text-muted-foreground">{player.position}</TableCell>
                      <TableCell className="text-center text-lg">{player.gamesPlayed}</TableCell>
                      <TableCell className={`text-center text-lg ${skaterSort === 'goals' ? 'font-bold text-primary' : ''}`}>{player.goals}</TableCell>
                      <TableCell className={`text-center text-lg ${skaterSort === 'assists' ? 'font-bold text-primary' : ''}`}>{player.assists}</TableCell>
                      <TableCell className={`text-center font-display text-2xl ${skaterSort === 'points' ? 'font-bold text-accent' : ''}`}>{player.points}</TableCell>
                    </TableRow>
                  ))}
                  {filteredSkaters?.length === 0 && (
                    <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-12">No skaters found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goalies">
          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent bg-muted/20">
                    <TableHead className="w-16 text-center text-muted-foreground font-bold uppercase">#</TableHead>
                    <TableHead className="text-muted-foreground font-bold uppercase tracking-wider">Player</TableHead>
                    <TableHead className="text-muted-foreground font-bold uppercase tracking-wider">Team</TableHead>
                    <TableHead className="w-20 text-center text-muted-foreground font-bold uppercase">GP</TableHead>
                    <TableHead 
                      className={`w-24 text-center font-bold uppercase cursor-pointer hover:text-white transition-colors ${goalieSort === 'saves' ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={() => setGoalieSort("saves")}
                    >
                      SV
                    </TableHead>
                    <TableHead className="w-24 text-center text-muted-foreground font-bold uppercase">SV%</TableHead>
                    <TableHead 
                      className={`w-24 text-center font-bold uppercase cursor-pointer hover:text-white transition-colors text-lg ${goalieSort === 'gaa' ? 'text-accent' : 'text-muted-foreground'}`}
                      onClick={() => setGoalieSort("gaa")}
                    >
                      GAA
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingGoalies ? (
                    [...Array(10)].map((_, i) => (
                      <TableRow key={i}><TableCell colSpan={7}><Skeleton className="h-12 w-full" /></TableCell></TableRow>
                    ))
                  ) : filteredGoalies?.map((player, idx) => (
                    <TableRow key={player.id} className="border-border/50 hover:bg-white/5 transition-colors">
                      <TableCell className="text-center font-display text-2xl text-muted-foreground">{idx + 1}</TableCell>
                      <TableCell className="font-display tracking-wide text-xl text-white">{player.username}</TableCell>
                      <TableCell>
                        <Link href={`/teams/${player.teamId}`} className="text-muted-foreground hover:text-primary transition-colors font-bold uppercase">
                          {player.teamAbbreviation}
                        </Link>
                      </TableCell>
                      <TableCell className="text-center text-lg">{player.gamesPlayed}</TableCell>
                      <TableCell className={`text-center text-lg ${goalieSort === 'saves' ? 'font-bold text-primary' : ''}`}>{player.saves}</TableCell>
                      <TableCell className="text-center text-lg">{player.savePercentage}%</TableCell>
                      <TableCell className={`text-center font-display text-2xl ${goalieSort === 'gaa' ? 'font-bold text-accent' : ''}`}>{player.goalsAgainstAverage}</TableCell>
                    </TableRow>
                  ))}
                  {filteredGoalies?.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-12">No goalies found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
