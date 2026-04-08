import { useState } from "react";
import { useAdminLogin } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const login = useAdminLogin();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { data: { password } },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast({ title: "Authenticated", description: "Welcome to the admin panel." });
            window.location.href = "/admin"; // Force reload to ensure auth state updates globally
          } else {
            toast({ variant: "destructive", title: "Error", description: data.message });
          }
        },
        onError: () => {
          toast({ variant: "destructive", title: "Error", description: "Invalid password" });
        }
      }
    );
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,45,85,0.15),transparent_50%)]" />
      
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-white/10 shadow-2xl relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="font-display text-4xl tracking-widest uppercase">League Office</CardTitle>
          <p className="text-sm text-muted-foreground mt-2 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="uppercase tracking-widest text-xs text-muted-foreground">Access Code</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="bg-background/50 border-white/10 h-12 text-center text-xl tracking-widest" 
                placeholder="••••••••"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 font-display text-xl tracking-widest bg-white text-black hover:bg-white/90"
              disabled={login.isPending}
            >
              {login.isPending ? "Verifying..." : "Authenticate"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
