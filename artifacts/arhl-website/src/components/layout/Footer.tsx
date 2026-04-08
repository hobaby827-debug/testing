import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card py-8 pb-16">
      <div className="container max-w-screen-2xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl tracking-wider font-bold text-primary mb-4">
              ARHL
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              The American Roblox Hockey League. The premier competitive hockey experience on Roblox. Intense, fast-paced, and electric.
            </p>
            <a 
              href="https://discord.gg/arhl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-[#5865F2] text-white hover:bg-[#5865F2]/90 h-9 px-4 py-2"
            >
              Join our Discord
            </a>
          </div>
          
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">League</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/teams" className="hover:text-primary transition-colors">Teams</Link></li>
              <li><Link href="/standings" className="hover:text-primary transition-colors">Standings</Link></li>
              <li><Link href="/stats" className="hover:text-primary transition-colors">Stats</Link></li>
              <li><Link href="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">Info</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/rulebook" className="hover:text-primary transition-colors">Rulebook</Link></li>
              <li><Link href="/join" className="hover:text-primary transition-colors">Join the League</Link></li>
              <li><Link href="/admin/login" className="hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} American Roblox Hockey League. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
