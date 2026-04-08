import { useListGames } from "@workspace/api-client-react";
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function Schedule() {
  const [status, setStatus] = useState<"upcoming" | "completed">("upcoming");
  // Also fetch live games
  const { data: upcomingGames, isLoading: isUpcomingLoading } = useListGames({ status: "upcoming" });
  const { data: completedGames, isLoading: isCompletedLoading } = useListGames({ status: "completed" });
  const { data: liveGames, isLoading: isLiveLoading } = useListGames({ status: "live" });

  const activeGames = status === "upcoming" ? [...(liveGames || []), ...(upcomingGames || [])] : completedGames;
  const isLoading = status === "upcoming" ? (isUpcomingLoading || isLiveLoading) : isCompletedLoading;

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(255,45,85,0.3)]">
          Schedule
        </h1>
        <p className="text-muted-foreground text-lg mt-4">
          Upcoming matchups, live scores, and past results.
        </p>
      </div>

      <Tabs defaultValue="upcoming" onValueChange={(v) => setStatus(v as any)} className="w-full">
        <TabsList className="mb-8 bg-card/50 border border-border/50">
          <TabsTrigger value="upcoming" className="font-display tracking-wide text-lg">Upcoming & Live</TabsTrigger>
          <TabsTrigger value="completed" className="font-display tracking-wide text-lg">Past Results</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))
          ) : activeGames && activeGames.length > 0 ? (
            activeGames.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={`overflow-hidden border-border/50 transition-colors ${game.status === 'live' ? 'bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(255,45,85,0.15)]' : 'bg-card/40 hover:bg-card'}`}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Date/Time/Status Sidebar */}
                      <div className={`md:w-48 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/50 ${game.status === 'live' ? 'bg-primary/20' : 'bg-background/50'}`}>
                        <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          {format(new Date(game.scheduledAt), "MMM d, yyyy")}
                        </div>
                        {game.status === 'live' ? (
                          <div className="text-red-500 font-display text-2xl animate-pulse tracking-widest uppercase">Live Now</div>
                        ) : game.status === 'completed' ? (
                          <div className="text-white font-display text-xl tracking-wider">Final</div>
                        ) : (
                          <div className="text-white font-display text-2xl tracking-wider">{format(new Date(game.scheduledAt), "h:mm a")}</div>
                        )}
                        {game.isFeatured && (
                          <div className="mt-2 text-xs font-bold text-accent uppercase tracking-widest border border-accent/30 rounded px-2 py-1 self-start inline-block">
                            Featured
                          </div>
                        )}
                      </div>
                      
                      {/* Matchup */}
                      <div className="flex-1 flex flex-col justify-center p-6 md:p-8 relative">
                        <div className="flex items-center justify-between w-full relative z-10">
                          
                          {/* Away */}
                          <div className="flex items-center gap-6 w-[40%] justify-end">
                            <span className="font-display text-2xl md:text-4xl tracking-wider text-right">{game.awayTeamName}</span>
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 bg-card flex items-center justify-center shrink-0" style={{ borderColor: game.awayTeamColor }}>
                              <span className="text-xl font-bold" style={{ color: game.awayTeamColor }}>{game.awayTeamAbbreviation}</span>
                            </div>
                          </div>

                          {/* Score / VS */}
                          <div className="flex flex-col items-center justify-center w-[20%]">
                            {(game.status === 'completed' || game.status === 'live') ? (
                              <div className="flex items-center gap-2 md:gap-4">
                                <span className={`font-display text-3xl md:text-5xl ${game.awayScore > game.homeScore ? 'text-white' : 'text-white/50'}`}>{game.awayScore}</span>
                                <span className="text-muted-foreground font-bold">-</span>
                                <span className={`font-display text-3xl md:text-5xl ${game.homeScore > game.awayScore ? 'text-white' : 'text-white/50'}`}>{game.homeScore}</span>
                              </div>
                            ) : (
                              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">VS</span>
                            )}
                          </div>

                          {/* Home */}
                          <div className="flex items-center gap-6 w-[40%] justify-start">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 bg-card flex items-center justify-center shrink-0" style={{ borderColor: game.homeTeamColor }}>
                              <span className="text-xl font-bold" style={{ color: game.homeTeamColor }}>{game.homeTeamAbbreviation}</span>
                            </div>
                            <span className="font-display text-2xl md:text-4xl tracking-wider text-left">{game.homeTeamName}</span>
                          </div>

                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="py-24 text-center border border-border/50 rounded-xl bg-card/20">
              <h3 className="font-display text-2xl text-muted-foreground">No games found</h3>
              <p className="text-muted-foreground mt-2">Check back later for updates to the schedule.</p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
