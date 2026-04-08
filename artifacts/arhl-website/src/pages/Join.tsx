import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Join() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "Join our Discord server to complete the process.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase mb-6 drop-shadow-[0_0_10px_rgba(0,212,255,0.3)]">
            Become a Pro
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The ARHL is always looking for new talent. Whether you're a shutdown defenseman, an elite sniper, or a brick-wall goalie, there's a spot for you in the league.
          </p>
          
          <div className="space-y-6 mb-10">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold font-display text-xl shrink-0">1</div>
              <div>
                <h3 className="font-display text-xl uppercase tracking-wide text-white">Submit Application</h3>
                <p className="text-muted-foreground text-sm">Fill out the form with your details and preferred position.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent font-bold font-display text-xl shrink-0">2</div>
              <div>
                <h3 className="font-display text-xl uppercase tracking-wide text-white">Join the Discord</h3>
                <p className="text-muted-foreground text-sm">Our community hub is where all league operations, scouting, and communications happen.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white font-bold font-display text-xl shrink-0">3</div>
              <div>
                <h3 className="font-display text-xl uppercase tracking-wide text-white">Get Scouted</h3>
                <p className="text-muted-foreground text-sm">Participate in pick-up games (PUGs) to get noticed by franchise General Managers.</p>
              </div>
            </div>
          </div>

          <Button asChild size="lg" className="h-14 px-8 text-lg font-display tracking-wider bg-[#5865F2] hover:bg-[#5865F2]/90 text-white w-full sm:w-auto">
            <a href="https://discord.gg/4aknWMz6rz" target="_blank" rel="noopener noreferrer">
              Join Discord Server
            </a>
          </Button>
        </div>

        <Card className="bg-card/60 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-3xl tracking-wider uppercase">Player Application</CardTitle>
            <CardDescription>Fill this out before joining the Discord to speed up the process.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="roblox">Roblox Username</Label>
                <Input id="roblox" required placeholder="e.g. Builderman123" className="bg-background/50 border-white/10" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discord">Discord Tag</Label>
                <Input id="discord" required placeholder="e.g. user#1234" className="bg-background/50 border-white/10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Primary Position</Label>
                <Select required>
                  <SelectTrigger id="position" className="bg-background/50 border-white/10">
                    <SelectValue placeholder="Select position..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C">Center (C)</SelectItem>
                    <SelectItem value="LW">Left Wing (LW)</SelectItem>
                    <SelectItem value="RW">Right Wing (RW)</SelectItem>
                    <SelectItem value="LD">Left Defense (LD)</SelectItem>
                    <SelectItem value="RD">Right Defense (RD)</SelectItem>
                    <SelectItem value="G">Goaltender (G)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Previous League Experience</Label>
                <Textarea 
                  id="experience" 
                  placeholder="List any other Roblox hockey leagues you've played in, or just put 'None' if this is your first." 
                  className="min-h-[100px] bg-background/50 border-white/10"
                />
              </div>

              <Button type="submit" className="w-full h-12 font-display text-lg tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
