import { useGetTickerGames } from "@workspace/api-client-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Ticker() {
  const { data: tickerGames } = useGetTickerGames({
    query: {
      refetchInterval: 30000, // Refetch every 30s
    },
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !tickerGames || tickerGames.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-10 bg-card border-t border-border overflow-hidden flex items-center">
      <div className="bg-primary text-primary-foreground h-full flex items-center px-4 font-display tracking-wider text-lg z-10 shrink-0 uppercase shadow-[2px_0_10px_rgba(0,0,0,0.5)]">
        Live Scores
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-ticker flex whitespace-nowrap items-center h-full">
          {[...tickerGames, ...tickerGames, ...tickerGames].map((game, i) => (
            <div
              key={`${game.id}-${i}`}
              className="flex items-center space-x-3 px-8 border-r border-border/50 h-full text-sm font-medium"
            >
              <div className="flex items-center space-x-2">
                <span className="font-display tracking-wide text-lg text-muted-foreground">{game.awayTeamAbbreviation}</span>
                <span className="font-bold text-lg">{game.awayScore}</span>
              </div>
              <span className="text-muted-foreground text-xs">@</span>
              <div className="flex items-center space-x-2">
                <span className="font-display tracking-wide text-lg text-muted-foreground">{game.homeTeamAbbreviation}</span>
                <span className="font-bold text-lg">{game.homeScore}</span>
              </div>
              <div className={cn(
                "ml-3 px-1.5 py-0.5 text-[10px] rounded font-bold uppercase",
                game.status === "live" ? "bg-red-500/20 text-red-500 animate-pulse" : "bg-muted text-muted-foreground"
              )}>
                {game.status}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
