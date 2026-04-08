import { useListGames } from "@workspace/api-client-react";
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

                  {game.mvp && game.mvp !== "-" && (
                    <div className="hidden md:flex items-center px-6 border-l border-border/50">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent/80">MVP</span>
                        <span className="text-sm font-semibold text-white">{game.mvp}</span>
                      </div>
                    </div>
                  )}

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

function LiveGameCard({ game, idx }: { game: any; idx: number }) {
  return (
    <motion.div
      key={game.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.04 }}
    >
      <Card className={`overflow-hidden border-border/50 transition-colors ${
        game.status === "live"
          ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(255,45,85,0.15)]"
          : game.status === "final" || game.status === "completed"
          ? "bg-card/40"
          : "bg-card/30 hover:bg-card/50"
      }`}>
        <CardContent className="p-0">
          <div className="flex items-stretch">
            <div className={`w-40 shrink-0 p-4 flex flex-col justify-center border-r border-border/50 ${
              game.status === "live" ? "bg-primary/20" : "bg-background/30"
            }`}>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                {format(new Date(game.scheduledAt), "MMM d, yyyy")}
              </div>
              {game.status === "live" ? (
                <div className="text-red-500 font-display text-lg animate-pulse tracking-widest uppercase">Live</div>
              ) : game.status === "final" || game.status === "completed" ? (
                <div className="text-white font-display text-lg tracking-wider">Final</div>
              ) : (
                <div className="text-white font-display text-lg tracking-wider">
                  {format(new Date(game.scheduledAt), "h:mm a")}
                </div>
              )}
              {game.isFeatured && (
                <div className="mt-2 text-xs font-bold text-accent uppercase tracking-widest border border-accent/30 rounded px-2 py-1 self-start">
                  Featured
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center px-4 md:px-8 py-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 md:gap-5 w-[40%] justify-end">
                  <span className="font-display text-lg md:text-3xl tracking-wider text-right leading-tight">{game.awayTeamName}</span>
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 bg-card flex items-center justify-center shrink-0" style={{ borderColor: game.awayTeamColor }}>
                    <span className="text-sm md:text-lg font-bold" style={{ color: game.awayTeamColor }}>{game.awayTeamAbbreviation}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center w-[20%]">
                  {(game.status === "final" || game.status === "completed" || game.status === "live") ? (
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className={`font-display text-2xl md:text-4xl ${game.awayScore > game.homeScore ? "text-white" : "text-white/40"}`}>
                        {game.awayScore}
                      </span>
                      <span className="text-muted-foreground font-bold text-sm">–</span>
                      <span className={`font-display text-2xl md:text-4xl ${game.homeScore > game.awayScore ? "text-white" : "text-white/40"}`}>
                        {game.homeScore}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">VS</span>
                  )}
                </div>

                <div className="flex items-center gap-3 md:gap-5 w-[40%] justify-start">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 bg-card flex items-center justify-center shrink-0" style={{ borderColor: game.homeTeamColor }}>
                    <span className="text-sm md:text-lg font-bold" style={{ color: game.homeTeamColor }}>{game.homeTeamAbbreviation}</span>
                  </div>
                  <span className="font-display text-lg md:text-3xl tracking-wider text-left leading-tight">{game.homeTeamName}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Schedule() {
  const { data: liveGames, isLoading: isLiveLoading } = useListGames({ status: "live" });
  const { data: upcomingGames, isLoading: isUpcomingLoading } = useListGames({ status: "upcoming" });
  const { data: completedGames, isLoading: isCompletedLoading } = useListGames({ status: "completed" });

  const isLoading = isLiveLoading || isUpcomingLoading || isCompletedLoading;

  const allGames = [
    ...(liveGames || []),
    ...(upcomingGames || []),
    ...(completedGames || []).sort(
      (a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
    ),
  ];

  const hasLive = (liveGames?.length ?? 0) > 0;

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(255,45,85,0.3)]">
          Schedule
        </h1>
        <p className="text-muted-foreground text-lg mt-3">
          Preseason, regular season, playoffs, and live scores.
        </p>
      </div>

      <Tabs defaultValue="preseason" className="w-full">
        <TabsList className="mb-8 bg-card/50 border border-border/50 h-auto gap-1 p-1">
          <TabsTrigger value="preseason" className="font-display tracking-wide text-base">Preseason</TabsTrigger>
          <TabsTrigger value="regular" className="font-display tracking-wide text-base">Regular Season</TabsTrigger>
          <TabsTrigger value="playoffs" className="font-display tracking-wide text-base">Playoffs</TabsTrigger>
          <TabsTrigger value="scores" className="font-display tracking-wide text-base relative">
            {hasLive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
            Scores
          </TabsTrigger>
        </TabsList>

        {/* Preseason */}
        <TabsContent value="preseason">
          <div className="mb-6">
            <div className="inline-block bg-primary/10 border border-primary/30 rounded px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              ARHL Pre-Season Schedule
            </div>
          </div>
          {preseasonSchedule.map((section, i) => (
            <StaticScheduleSection key={section.label} section={section} index={i} />
          ))}
        </TabsContent>

        {/* Regular Season */}
        <TabsContent value="regular">
          <div className="mb-6">
            <div className="inline-block bg-accent/10 border border-accent/30 rounded px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
              ARHL Season 2 Schedule
            </div>
          </div>
          {regularSeasonSchedule.map((section, i) => (
            <StaticScheduleSection key={section.label} section={section} index={i} />
          ))}
        </TabsContent>

        {/* Playoffs */}
        <TabsContent value="playoffs">
          <div className="mb-6">
            <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded px-3 py-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
              ARHL Playoffs
            </div>
          </div>
          {playoffSchedule.map((section, i) => (
            <StaticScheduleSection key={section.label} section={section} index={i} />
          ))}
        </TabsContent>

        {/* Scores — live, upcoming, and past results combined */}
        <TabsContent value="scores">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : allGames.length > 0 ? (
            <div className="space-y-3">
              {hasLive && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
                  <span className="text-xs font-bold uppercase tracking-widest text-red-400">Games in progress</span>
                </div>
              )}
              {allGames.map((game, idx) => (
                <LiveGameCard key={game.id} game={game} idx={idx} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-border/50 rounded-xl bg-card/20">
              <h3 className="font-display text-2xl text-muted-foreground">No games found</h3>
              <p className="text-muted-foreground mt-2">Check back later for updates.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
