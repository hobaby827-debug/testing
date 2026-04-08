import { useListTeams } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Teams() {
  const { data: teams, isLoading } = useListTeams();

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(0,212,255,0.3)]">
          ARHL Teams
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mt-4">
          The franchises that make up the American Roblox Hockey League. Explore team rosters, schedules, and stats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))
        ) : (
          teams?.map((team, idx) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/teams/${team.id}`}>
                <Card className="h-full bg-card/40 border-border/50 hover:bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden group">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Header Banner */}
                    <div 
                      className="h-24 w-full relative" 
                      style={{ 
                        background: `linear-gradient(135deg, ${team.primaryColor} 0%, ${team.secondaryColor || 'rgba(0,0,0,0)'} 100%)`,
                        opacity: 0.8
                      }}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative px-6 pb-6 pt-12 flex-1 flex flex-col items-center text-center">
                      {/* Logo (Floating) */}
                      <div 
                        className="absolute -top-12 w-24 h-24 rounded-full border-4 border-background bg-card flex items-center justify-center shadow-xl overflow-hidden"
                        style={{ borderColor: team.primaryColor }}
                      >
                        {team.logoUrl ? (
                          <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
                        ) : (
                          <img src="/team-logo-placeholder.png" alt="Placeholder" className="w-full h-full object-cover opacity-80" />
                        )}
                      </div>

                      <h2 className="text-3xl font-display font-bold tracking-wider uppercase mb-1">
                        {team.name}
                      </h2>
                      <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-6">
                        {team.city}
                      </div>

                      <div className="grid grid-cols-3 gap-4 w-full mt-auto pt-6 border-t border-border/40">
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Wins</div>
                          <div className="text-2xl font-display font-bold text-white">{team.wins}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Losses</div>
                          <div className="text-2xl font-display font-bold text-white">{team.losses}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Points</div>
                          <div className="text-2xl font-display font-bold text-accent">{team.points}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
