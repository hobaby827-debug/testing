import { Button } from "@/components/ui/button";

export default function Join() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-10">
      <div>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase mb-6 drop-shadow-[0_0_10px_rgba(0,212,255,0.3)]">
          Join the ARHL
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          The American Roblox Hockey League is always looking for new talent. Join our Discord server to get started — all sign-ups, scouting, and league operations happen there.
        </p>
      </div>

      <Button asChild size="lg" className="h-16 px-12 text-xl font-display tracking-wider bg-[#5865F2] hover:bg-[#5865F2]/90 text-white">
        <a href="https://discord.gg/4aknWMz6rz" target="_blank" rel="noopener noreferrer">
          Join our Discord Server
        </a>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 max-w-3xl w-full">
        {[
          { step: "1", title: "Join the Discord", desc: "All league operations, scouting, and communication happen in our Discord server." },
          { step: "2", title: "Get Scouted", desc: "Participate in pick-up games (PUGs) to get noticed by franchise General Managers." },
          { step: "3", title: "Hit the Ice", desc: "Get drafted to a team and compete in the premier Roblox hockey experience." },
        ].map(({ step, title, desc }) => (
          <div key={step} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/40 border border-border/40">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold font-display text-2xl">
              {step}
            </div>
            <h3 className="font-display text-lg uppercase tracking-wide text-white">{title}</h3>
            <p className="text-muted-foreground text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
