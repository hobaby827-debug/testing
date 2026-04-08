import { useGetFeaturedGame, useGetStandingsSummary, useListAnnouncements, useGetStatLeaders } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ChevronRight, Trophy, Users, CalendarDays, Swords } from "lucide-react";

export default function Home() {
  const { data: featuredGame, isLoading: isLoadingFeatured } = useGetFeaturedGame();
  const { data: standings, isLoading: isLoadingStandings } = useGetStandingsSummary();
  const { data: announcements, isLoading: isLoadingAnnouncements } = useListAnnouncements();
  const { data: leaders, isLoading: isLoadingLeaders } = useGetStatLeaders();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Hockey Arena" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,45,85,0.5)] uppercase mb-2">
              ARHL
            </h1>
            <p className="text-xl md:text-3xl font-display tracking-widest text-white/90 uppercase mb-8">
              American Roblox Hockey League
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg font-display tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/teams">View Teams</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg font-display tracking-wider border-white/20 hover:bg-white/10 text-white backdrop-blur-sm">
                <Link href="/join">Join the League</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Game & News Section */}
      <section className="py-16 bg-background relative z-20">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Featured Game */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-display font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Swords className="w-8 h-8 text-primary" />
                  Featured Game
                </h2>
                <Link href="/schedule" className="text-accent hover:text-accent/80 font-medium flex items-center gap-1 transition-colors">
                  Full Schedule <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <Card className="bg-card/50 backdrop-blur border-border/50 overflow-hidden group">
                <CardContent className="p-0">
                  {isLoadingFeatured ? (
                    <div className="h-64 flex items-center justify-center">
                      <Skeleton className="w-full h-full" />
                    </div>
                  ) : featuredGame ? (
                    <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-card to-background">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                      
                      {/* Away Team */}
                      <div className="flex flex-col items-center flex-1 z-10">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-4 bg-background/50 border border-white/10 shadow-lg" style={{ borderColor: featuredGame.awayTeamColor }}>
                          <span className="text-4xl md:text-5xl font-display font-bold" style={{ color: featuredGame.awayTeamColor }}>
                            {featuredGame.awayTeamAbbreviation}
                          </span>
                        </div>
                        <h3 className="text-2xl font-display tracking-wider text-center">{featuredGame.awayTeamName}</h3>
                        <span className="text-5xl md:text-7xl font-display font-bold mt-2">{featuredGame.awayScore}</span>
                      </div>

                      {/* VS & Status */}
                      <div className="flex flex-col items-center justify-center px-4 z-10">
                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">VS</div>
                        {featuredGame.status === 'live' ? (
                          <div className="px-4 py-1.5 bg-red-500/20 border border-red-500/50 text-red-500 font-bold uppercase tracking-wider rounded text-sm animate-pulse mb-4">
                            Live Now
                          </div>
                        ) : (
                          <div className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/70 font-medium uppercase tracking-wider rounded text-xs mb-4">
                            {featuredGame.status}
                          </div>
                        )}
                        <div className="text-center text-sm text-muted-foreground">
                          {format(new Date(featuredGame.scheduledAt), "MMM d, yyyy • h:mm a")}
                        </div>
                      </div>

                      {/* Home Team */}
                      <div className="flex flex-col items-center flex-1 z-10">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-4 bg-background/50 border border-white/10 shadow-lg" style={{ borderColor: featuredGame.homeTeamColor }}>
                          <span className="text-4xl md:text-5xl font-display font-bold" style={{ color: featuredGame.homeTeamColor }}>
                            {featuredGame.homeTeamAbbreviation}
                          </span>
                        </div>
                        <h3 className="text-2xl font-display tracking-wider text-center">{featuredGame.homeTeamName}</h3>
                        <span className="text-5xl md:text-7xl font-display font-bold mt-2">{featuredGame.homeScore}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-muted-foreground">
                      No featured game scheduled.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* League Leaders Quick Look */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" /> Top Scorer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingLeaders ? (
                      <Skeleton className="h-12 w-full" />
                    ) : leaders?.topGoalScorer ? (
                      <div>
                        <div className="text-2xl font-display tracking-wide">{leaders.topGoalScorer.username}</div>
                        <div className="text-accent font-bold">{leaders.topGoalScorer.goals} Goals</div>
                      </div>
                    ) : <div className="text-sm text-muted-foreground">N/A</div>}
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" /> Points Leader
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingLeaders ? (
                      <Skeleton className="h-12 w-full" />
                    ) : leaders?.topPointsLeader ? (
                      <div>
                        <div className="text-2xl font-display tracking-wide">{leaders.topPointsLeader.username}</div>
                        <div className="text-accent font-bold">{leaders.topPointsLeader.points} PTS</div>
                      </div>
                    ) : <div className="text-sm text-muted-foreground">N/A</div>}
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" /> Top Goalie
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingLeaders ? (
                      <Skeleton className="h-12 w-full" />
                    ) : leaders?.topGoalie ? (
                      <div>
                        <div className="text-2xl font-display tracking-wide">{leaders.topGoalie.username}</div>
                        <div className="text-accent font-bold">{leaders.topGoalie.savePercentage}% SV</div>
                      </div>
                    ) : <div className="text-sm text-muted-foreground">N/A</div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar: Standings & Announcements */}
            <div className="space-y-8">
              {/* Standings Preview */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-white">Top Teams</h2>
                  <Link href="/standings" className="text-sm text-accent hover:text-accent/80 font-medium transition-colors">
                    Full Standings
                  </Link>
                </div>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                      {isLoadingStandings ? (
                        [...Array(3)].map((_, i) => (
                          <div key={i} className="p-4"><Skeleton className="h-10 w-full" /></div>
                        ))
                      ) : standings?.map((team, idx) => (
                        <div key={team.teamId} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-4">
                            <span className="font-display text-xl text-muted-foreground w-4">{idx + 1}</span>
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-background/50" style={{ borderColor: team.primaryColor }}>
                              <span className="text-xs font-bold" style={{ color: team.primaryColor }}>{team.teamAbbreviation}</span>
                            </div>
                            <span className="font-display tracking-wide text-lg">{team.teamName}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-accent">{team.points} PTS</div>
                            <div className="text-xs text-muted-foreground">{team.wins}-{team.losses}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Latest News */}
              <div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-white mb-6">Latest News</h2>
                <div className="space-y-4">
                  {isLoadingAnnouncements ? (
                    [...Array(3)].map((_, i) => (
                      <Card key={i} className="bg-card/50 border-border/50"><CardContent className="p-4"><Skeleton className="h-20 w-full" /></CardContent></Card>
                    ))
                  ) : announcements?.slice(0, 3).map((announcement) => (
                    <Card key={announcement.id} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors group cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">{announcement.category}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {format(new Date(announcement.createdAt), "MMM d")}
                          </span>
                        </div>
                        <h3 className="font-display text-xl tracking-wide group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {announcement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {announcement.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
