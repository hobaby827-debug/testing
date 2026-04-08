import { useListGames } from "@workspace/api-client-react";
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { preseasonSchedule, regularSeasonSchedule, playoffSchedule, type ScheduleSection } from "@/data/scheduleData";

function StaticScheduleSection({ section, index }: { section: ScheduleSection; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="mb-8"
    >
      <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-l-2 border-primary pl-3">
        {section.label}
      </h2>
      <div className="space-y-2">
        {section.games.map((game, gi) => {
          const isCompleted = !!game.finalScore && game.finalScore !== "-";
          const hasMatchup = game.away && game.home;
          return (
            <Card
              key={gi}
              className={`overflow-hidden border-border/50 ${isCompleted ? "bg-card/60" : "bg-card/30 hover:bg-card/50"} transition-colors`}
            >
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  {/* Date/Time sidebar */}
                  <div className={`w-40 shrink-0 p-4 flex flex-col justify-center border-r border-border/50 ${isCompleted ? "bg-background/40" : "bg-background/20"}`}>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Game {game.gameNum}
                    </div>
                    <div className="text-sm font-semibold text-white/80">
                      {game.date !== "TBD" ? game.date : <span className="text-muted-foreground">TBD</span>}
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">
                      {game.time !== "TBD" ? game.time : ""}
                    </div>
                  </div>

                  {/* Matchup / Score */}
                  <div className="flex-1 flex items-center px-6 py-4">
                    {hasMatchup ? (
                      <div className="flex items-center gap-4 w-full">
                        <span className="font-display text-xl md:text-2xl tracking-wider text-white/90 text-right flex-1">{game.away}</span>
                        {isCompleted ? (
                          <div className="flex flex-col items-center shrink-0">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Final</span>
                            <span className="font-display text-xl md:text-2xl tracking-wider text-white">{game.finalScore}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-muted-foreground shrink-0 px-2">@</span>
                        )}
                        <span className="font-display text-xl md:text-2xl tracking-wider text-white/90 flex-1">{game.home}</span>
                      </div>
                    ) : isCompleted ? (
                      <div className="flex flex-col items-center gap-1 w-full">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Final</span>
                        <span className="font-display text-2xl md:text-3xl tracking-wider text-white">{game.finalScore}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        {game.notes === "Matchup TBD" ? "Matchup TBD" : "Scheduled"}
                      </span>
                    )}
                  </div>

                  {/* MVP */}
                  {game.mvp && game.mvp !== "-" && (
                    <div className="hidden md:flex items-center px-6 border-l border-border/50">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent/80">MVP</span>
                        <span className="text-sm font-semibold text-white">{game.mvp}</span>
                      </div>
                    </div>
                  )}

                  {/* Notes (non-TBD) */}
                  {game.notes && game.notes !== "-" && game.notes !== "Matchup TBD" && (
                    <div className="hidden md:flex items-center px-6 border-l border-border/50">
                      <span className="text-xs text-muted-foreground italic">{game.notes}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  const [liveStatus, setLiveStatus] = useState<"upcoming" | "completed">("upcoming");
  const { data: upcomingGames, isLoading: isUpcomingLoading } = useListGames({ status: "upcoming" });
  const { data: completedGames, isLoading: isCompletedLoading } = useListGames({ status: "completed" });
  const { data: liveGames, isLoading: isLiveLoading } = useListGames({ status: "live" });

  const activeGames = liveStatus === "upcoming" ? [...(liveGames || []), ...(upcomingGames || [])] : completedGames;
  const isLoading = liveStatus === "upcoming" ? (isUpcomingLoading || isLiveLoading) : isCompletedLoading;

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(255,45,85,0.3)]">
          Schedule
        </h1>
        <p className="text-muted-foreground text-lg mt-4">
          Preseason, regular season, playoffs, and live scores.
        </p>
      </div>

      <Tabs defaultValue="preseason" className="w-full">
        <TabsList className="mb-8 bg-card/50 border border-border/50 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="preseason" className="font-display tracking-wide text-base">Preseason</TabsTrigger>
          <TabsTrigger value="regular" className="font-display tracking-wide text-base">Regular Season</TabsTrigger>
          <TabsTrigger value="playoffs" className="font-display tracking-wide text-base">Playoffs</TabsTrigger>
          <TabsTrigger value="live" className="font-display tracking-wide text-base">Live / Upcoming</TabsTrigger>
          <TabsTrigger value="results" className="font-display tracking-wide text-base">Past Results</TabsTrigger>
        </TabsList>

        {/* Preseason Tab */}
        <TabsContent value="preseason">
          <div className="mb-6">
            <div className="inline-block bg-primary/10 border border-primary/30 rounded px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-4">
              ARHL Pre-Season Schedule
            </div>
          </div>
          {preseasonSchedule.map((section, i) => (
            <StaticScheduleSection key={section.label} section={section} index={i} />
          ))}
        </TabsContent>

        {/* Regular Season Tab */}
        <TabsContent value="regular">
          <div className="mb-6">
            <div className="inline-block bg-accent/10 border border-accent/30 rounded px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent mb-4">
              ARHL Season 2 Schedule
            </div>
          </div>
          {regularSeasonSchedule.map((section, i) => (
            <StaticScheduleSection key={section.label} section={section} index={i} />
          ))}
        </TabsContent>

        {/* Playoffs Tab */}
        <TabsContent value="playoffs">
          <div className="mb-6">
            <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded px-3 py-1 text-xs font-bold uppercase tracking-widest text-yellow-400 mb-4">
              ARHL Playoffs
            </div>
          </div>
          {playoffSchedule.map((section, i) => (
            <StaticScheduleSection key={section.label} section={section} index={i} />
          ))}
        </TabsContent>

        {/* Live / Upcoming Tab */}
        <TabsContent value="live">
          <Tabs defaultValue="upcoming" onValueChange={(v) => setLiveStatus(v as any)} className="w-full">
            <TabsList className="mb-6 bg-card/30 border border-border/40">
              <TabsTrigger value="upcoming" className="font-display tracking-wide">Upcoming & Live</TabsTrigger>
              <TabsTrigger value="completed" className="font-display tracking-wide">Past Results</TabsTrigger>
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
                    <Card className={`overflow-hidden border-border/50 transition-colors ${game.status === "live" ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(255,45,85,0.15)]" : "bg-card/40 hover:bg-card"}`}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className={`md:w-48 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/50 ${game.status === "live" ? "bg-primary/20" : "bg-background/50"}`}>
                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">
                              {format(new Date(game.scheduledAt), "MMM d, yyyy")}
                            </div>
                            {game.status === "live" ? (
                              <div className="text-red-500 font-display text-2xl animate-pulse tracking-widest uppercase">Live Now</div>
                            ) : game.status === "completed" ? (
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
                          <div className="flex-1 flex flex-col justify-center p-6 md:p-8 relative">
                            <div className="flex items-center justify-between w-full relative z-10">
                              <div className="flex items-center gap-6 w-[40%] justify-end">
                                <span className="font-display text-2xl md:text-4xl tracking-wider text-right">{game.awayTeamName}</span>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 bg-card flex items-center justify-center shrink-0" style={{ borderColor: game.awayTeamColor }}>
                                  <span className="text-xl font-bold" style={{ color: game.awayTeamColor }}>{game.awayTeamAbbreviation}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-center justify-center w-[20%]">
                                {(game.status === "completed" || game.status === "live") ? (
                                  <div className="flex items-center gap-2 md:gap-4">
                                    <span className={`font-display text-3xl md:text-5xl ${game.awayScore > game.homeScore ? "text-white" : "text-white/50"}`}>{game.awayScore}</span>
                                    <span className="text-muted-foreground font-bold">-</span>
                                    <span className={`font-display text-3xl md:text-5xl ${game.homeScore > game.awayScore ? "text-white" : "text-white/50"}`}>{game.homeScore}</span>
                                  </div>
                                ) : (
                                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">VS</span>
                                )}
                              </div>
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
        </TabsContent>

        {/* Past Results shortcut tab */}
        <TabsContent value="results">
          <div className="space-y-4">
            {isCompletedLoading ? (
              [...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))
            ) : completedGames && completedGames.length > 0 ? (
              completedGames.map((game, idx) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="overflow-hidden border-border/50 bg-card/40 hover:bg-card transition-colors">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/50 bg-background/50">
                          <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">
                            {format(new Date(game.scheduledAt), "MMM d, yyyy")}
                          </div>
                          <div className="text-white font-display text-xl tracking-wider">Final</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center p-6 md:p-8">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-6 w-[40%] justify-end">
                              <span className="font-display text-2xl md:text-4xl tracking-wider text-right">{game.awayTeamName}</span>
                              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 bg-card flex items-center justify-center shrink-0" style={{ borderColor: game.awayTeamColor }}>
                                <span className="text-xl font-bold" style={{ color: game.awayTeamColor }}>{game.awayTeamAbbreviation}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 w-[20%] justify-center">
                              <span className={`font-display text-3xl md:text-5xl ${game.awayScore > game.homeScore ? "text-white" : "text-white/50"}`}>{game.awayScore}</span>
                              <span className="text-muted-foreground font-bold">-</span>
                              <span className={`font-display text-3xl md:text-5xl ${game.homeScore > game.awayScore ? "text-white" : "text-white/50"}`}>{game.homeScore}</span>
                            </div>
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
                <h3 className="font-display text-2xl text-muted-foreground">No past results</h3>
                <p className="text-muted-foreground mt-2">Check back after games have been played.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
