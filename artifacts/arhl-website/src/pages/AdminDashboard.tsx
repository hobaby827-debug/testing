import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
  useGetAdminMe, 
  useListGames, 
  useUpdateGame, 
  useListAnnouncements, 
  useCreateAnnouncement,
  useDeleteAnnouncement,
  useListTeams,
  useCreateTeam,
  useUpdateTeam,
  useListPlayers,
  useCreatePlayer,
  useUpdatePlayer,
  getListGamesQueryKey,
  getListAnnouncementsQueryKey,
  getListTeamsQueryKey,
  getListPlayersQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const { data: adminMe, isLoading: isAdminLoading, isError } = useGetAdminMe({ query: { retry: false } });
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [showGoalAnim, setShowGoalAnim] = useState(false);

  useEffect(() => {
    if (!isAdminLoading && (!adminMe?.isAdmin || isError)) {
      setLocation("/admin/login");
    }
  }, [adminMe, isAdminLoading, isError, setLocation]);

  const { data: games } = useListGames();
  const { data: announcements } = useListAnnouncements();
  const { data: teams } = useListTeams();
  const { data: players } = useListPlayers();
  
  const updateGame = useUpdateGame();
  const createAnn = useCreateAnnouncement();
  const deleteAnn = useDeleteAnnouncement();
  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam();
  const createPlayer = useCreatePlayer();
  const updatePlayer = useUpdatePlayer();

  const handleScoreUpdate = (gameId: number, awayScore: number, homeScore: number, isGoal: boolean = false) => {
    if (isGoal) {
      setShowGoalAnim(true);
      setTimeout(() => setShowGoalAnim(false), 2000);
    }
    
    updateGame.mutate(
      { id: gameId, data: { awayScore, homeScore } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListGamesQueryKey() });
          if (!isGoal) toast({ title: "Score updated" });
        }
      }
    );
  };

  const handleStatusUpdate = (gameId: number, status: "upcoming" | "live" | "completed") => {
    updateGame.mutate(
      { id: gameId, data: { status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListGamesQueryKey() });
          toast({ title: "Status updated" });
        }
      }
    );
  };

  // Ann form state
  const [annTitle, setAnnTitle] = useState("");
  const [annCat, setAnnCat] = useState("LEAGUE");
  const [annContent, setAnnContent] = useState("");

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    createAnn.mutate(
      { data: { title: annTitle, category: annCat, content: annContent } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAnnouncementsQueryKey() });
          toast({ title: "Announcement posted" });
          setAnnTitle("");
          setAnnContent("");
        }
      }
    );
  };

  const handleDeleteAnnouncement = (id: number) => {
    deleteAnn.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListAnnouncementsQueryKey() });
          toast({ title: "Announcement removed" });
        }
      }
    );
  };

  // Team form state
  const [teamName, setTeamName] = useState("");
  const [teamAbbr, setTeamAbbr] = useState("");
  const [teamCity, setTeamCity] = useState("");
  const [teamColor1, setTeamColor1] = useState("#ff2d55");
  const [teamColor2, setTeamColor2] = useState("#000000");

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    createTeam.mutate(
      { data: { name: teamName, abbreviation: teamAbbr, city: teamCity, primaryColor: teamColor1, secondaryColor: teamColor2 } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListTeamsQueryKey() });
          toast({ title: "Team created" });
          setTeamName(""); setTeamAbbr(""); setTeamCity("");
        }
      }
    );
  };

  // Player form state
  const [playerName, setPlayerName] = useState("");
  const [playerTeamId, setPlayerTeamId] = useState<string>("");
  const [playerPos, setPlayerPos] = useState<any>("C");

  const handleCreatePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerTeamId) return;
    createPlayer.mutate(
      { data: { username: playerName, teamId: parseInt(playerTeamId, 10), position: playerPos } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListPlayersQueryKey() });
          toast({ title: "Player created" });
          setPlayerName("");
        }
      }
    );
  };

  // Update Player Stats State
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null);
  const [playerStats, setPlayerStats] = useState<any>({});

  const handleEditPlayer = (p: any) => {
    setEditingPlayer(p.id);
    setPlayerStats({
      goals: p.goals, assists: p.assists, gamesPlayed: p.gamesPlayed,
      saves: p.saves || 0, goalsAgainstAverage: p.goalsAgainstAverage || 0, savePercentage: p.savePercentage || 0
    });
  };

  const handleSavePlayer = () => {
    if (!editingPlayer) return;
    updatePlayer.mutate(
      { id: editingPlayer, data: playerStats },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListPlayersQueryKey() });
          toast({ title: "Stats updated" });
          setEditingPlayer(null);
        }
      }
    );
  };

  if (isAdminLoading || !adminMe?.isAdmin) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-12 relative">
      <AnimatePresence>
        {showGoalAnim && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="text-[150px] md:text-[250px] font-display font-bold text-red-500 tracking-widest drop-shadow-[0_0_50px_rgba(255,0,0,0.8)] uppercase italic">
              GOAL!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-wider text-white uppercase">
            League Office
          </h1>
          <p className="text-muted-foreground text-lg uppercase tracking-widest font-bold mt-2">
            Control Panel
          </p>
        </div>
      </div>

      <Tabs defaultValue="scores" className="w-full">
        <TabsList className="mb-8 bg-card/50 border border-border/50 h-14 w-full justify-start overflow-x-auto flex-nowrap">
          <TabsTrigger value="scores" className="font-display tracking-wide text-lg px-8 h-10 whitespace-nowrap">Live Scores</TabsTrigger>
          <TabsTrigger value="news" className="font-display tracking-wide text-lg px-8 h-10 whitespace-nowrap">Announcements</TabsTrigger>
          <TabsTrigger value="teams" className="font-display tracking-wide text-lg px-8 h-10 whitespace-nowrap">Teams</TabsTrigger>
          <TabsTrigger value="players" className="font-display tracking-wide text-lg px-8 h-10 whitespace-nowrap">Players</TabsTrigger>
        </TabsList>

        <TabsContent value="scores" className="space-y-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="font-display uppercase tracking-wider text-2xl flex items-center justify-between">
                Game Control
                <Button variant="outline" size="sm" onClick={() => queryClient.invalidateQueries({ queryKey: getListGamesQueryKey() })}>
                  <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {games?.map(game => (
                  <div key={game.id} className={`p-4 border rounded-xl flex flex-col lg:flex-row items-center gap-6 ${game.status === 'live' ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 bg-white/5'}`}>
                    
                    <div className="w-full lg:w-1/4">
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{format(new Date(game.scheduledAt), "MMM d, h:mm a")}</div>
                      <Select 
                        value={game.status} 
                        onValueChange={(v: any) => handleStatusUpdate(game.id, v)}
                      >
                        <SelectTrigger className="w-full bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="live">Live (Active)</SelectItem>
                          <SelectItem value="completed">Completed (Final)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1 w-full flex items-center justify-center gap-4">
                      {/* Away Controls */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="font-display text-xl tracking-wider">{game.awayTeamAbbreviation}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleScoreUpdate(game.id, Math.max(0, game.awayScore - 1), game.homeScore)}>-</Button>
                          <span className="text-4xl font-display font-bold w-12 text-center">{game.awayScore}</span>
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="bg-primary text-white"
                            onClick={() => handleScoreUpdate(game.id, game.awayScore + 1, game.homeScore, true)}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="text-sm font-bold text-muted-foreground px-4">VS</div>

                      {/* Home Controls */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="font-display text-xl tracking-wider">{game.homeTeamAbbreviation}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleScoreUpdate(game.id, game.awayScore, Math.max(0, game.homeScore - 1))}>-</Button>
                          <span className="text-4xl font-display font-bold w-12 text-center">{game.homeScore}</span>
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="bg-primary text-white"
                            onClick={() => handleScoreUpdate(game.id, game.awayScore, game.homeScore + 1, true)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 bg-card/40 border-border/50 h-fit">
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-wider text-2xl">New Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input required value={annTitle} onChange={e => setAnnTitle(e.target.value)} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={annCat} onValueChange={setAnnCat}>
                      <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LEAGUE">League News</SelectItem>
                        <SelectItem value="TRANSACTION">Transaction</SelectItem>
                        <SelectItem value="DISCIPLINE">Discipline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea required value={annContent} onChange={e => setAnnContent(e.target.value)} className="min-h-[150px] bg-background" />
                  </div>
                  <Button type="submit" className="w-full bg-accent text-black hover:bg-accent/90 font-display tracking-wider text-lg" disabled={createAnn.isPending}>
                    {createAnn.isPending ? "Posting..." : "Publish Announcement"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-card/40 border-border/50">
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-wider text-2xl">Manage Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements?.map(ann => (
                    <div key={ann.id} className="p-4 border border-border/50 rounded-xl bg-background/50 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">{ann.category}</span>
                          <span className="text-xs text-muted-foreground">{format(new Date(ann.createdAt), "MMM d, yyyy")}</span>
                        </div>
                        <h4 className="font-bold text-lg">{ann.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{ann.content}</p>
                      </div>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteAnnouncement(ann.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 bg-card/40 border-border/50 h-fit">
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-wider text-2xl">New Team</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateTeam} className="space-y-4">
                  <div className="space-y-2">
                    <Label>City / Location</Label>
                    <Input required value={teamCity} onChange={e => setTeamCity(e.target.value)} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label>Team Name</Label>
                    <Input required value={teamName} onChange={e => setTeamName(e.target.value)} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label>Abbreviation</Label>
                    <Input required value={teamAbbr} onChange={e => setTeamAbbr(e.target.value)} maxLength={3} className="bg-background uppercase" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex gap-2">
                        <Input type="color" value={teamColor1} onChange={e => setTeamColor1(e.target.value)} className="w-12 h-10 p-1" />
                        <Input value={teamColor1} onChange={e => setTeamColor1(e.target.value)} className="bg-background" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input type="color" value={teamColor2} onChange={e => setTeamColor2(e.target.value)} className="w-12 h-10 p-1" />
                        <Input value={teamColor2} onChange={e => setTeamColor2(e.target.value)} className="bg-background" />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-accent text-black hover:bg-accent/90 font-display tracking-wider text-lg" disabled={createTeam.isPending}>
                    {createTeam.isPending ? "Creating..." : "Create Team"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-card/40 border-border/50">
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-wider text-2xl">All Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teams?.map(team => (
                    <div key={team.id} className="p-4 border border-border/50 rounded-xl bg-background/50 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center bg-black font-bold shrink-0" style={{ borderColor: team.primaryColor, color: team.primaryColor }}>
                        {team.abbreviation}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg font-display tracking-wider uppercase">{team.name}</h4>
                        <p className="text-sm text-muted-foreground">{team.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="players">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 bg-card/40 border-border/50 h-fit">
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-wider text-2xl">New Player</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePlayer} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input required value={playerName} onChange={e => setPlayerName(e.target.value)} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Select value={playerPos} onValueChange={setPlayerPos}>
                      <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="C">Center</SelectItem>
                        <SelectItem value="LW">Left Wing</SelectItem>
                        <SelectItem value="RW">Right Wing</SelectItem>
                        <SelectItem value="LD">Left Defense</SelectItem>
                        <SelectItem value="RD">Right Defense</SelectItem>
                        <SelectItem value="G">Goalie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Team</Label>
                    <Select value={playerTeamId} onValueChange={setPlayerTeamId}>
                      <SelectTrigger className="bg-background"><SelectValue placeholder="Select Team" /></SelectTrigger>
                      <SelectContent>
                        {teams?.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-accent text-black hover:bg-accent/90 font-display tracking-wider text-lg" disabled={createPlayer.isPending}>
                    {createPlayer.isPending ? "Creating..." : "Add Player"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-card/40 border-border/50">
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-wider text-2xl">Player Roster</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {players?.map(player => (
                    <div key={player.id} className="p-4 border border-border/50 rounded-xl bg-background/50 flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg">{player.username}</span>
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded font-bold">{player.position}</span>
                          <span className="text-muted-foreground text-sm">{player.teamAbbreviation}</span>
                        </div>
                        {editingPlayer !== player.id ? (
                          <Button variant="outline" size="sm" onClick={() => handleEditPlayer(player)}>Edit Stats</Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button variant="default" size="sm" onClick={handleSavePlayer} disabled={updatePlayer.isPending}>Save</Button>
                            <Button variant="ghost" size="sm" onClick={() => setEditingPlayer(null)}>Cancel</Button>
                          </div>
                        )}
                      </div>

                      {editingPlayer === player.id && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-black/20 rounded-lg">
                          <div className="space-y-1">
                            <Label className="text-xs">GP</Label>
                            <Input type="number" value={playerStats.gamesPlayed} onChange={e => setPlayerStats({...playerStats, gamesPlayed: parseInt(e.target.value) || 0})} className="h-8 bg-background" />
                          </div>
                          {player.position === 'G' ? (
                            <>
                              <div className="space-y-1">
                                <Label className="text-xs">Saves</Label>
                                <Input type="number" value={playerStats.saves} onChange={e => setPlayerStats({...playerStats, saves: parseInt(e.target.value) || 0})} className="h-8 bg-background" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">SV%</Label>
                                <Input type="number" step="0.1" value={playerStats.savePercentage} onChange={e => setPlayerStats({...playerStats, savePercentage: parseFloat(e.target.value) || 0})} className="h-8 bg-background" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">GAA</Label>
                                <Input type="number" step="0.1" value={playerStats.goalsAgainstAverage} onChange={e => setPlayerStats({...playerStats, goalsAgainstAverage: parseFloat(e.target.value) || 0})} className="h-8 bg-background" />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="space-y-1">
                                <Label className="text-xs">Goals</Label>
                                <Input type="number" value={playerStats.goals} onChange={e => setPlayerStats({...playerStats, goals: parseInt(e.target.value) || 0})} className="h-8 bg-background" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Assists</Label>
                                <Input type="number" value={playerStats.assists} onChange={e => setPlayerStats({...playerStats, assists: parseInt(e.target.value) || 0})} className="h-8 bg-background" />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
