export default function Rulebook() {
  return (
    <div className="container max-w-screen-md mx-auto px-4 py-16">
      <div className="mb-12 border-b border-border/50 pb-8">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          League Rulebook
        </h1>
        <p className="text-muted-foreground text-lg mt-4 font-bold tracking-wide">
          OFFICIAL RULES AND REGULATIONS OF THE ARHL
        </p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:tracking-wider prose-headings:uppercase prose-h2:text-primary prose-a:text-accent hover:prose-a:text-accent/80">
        <h2>1. League Structure</h2>
        <p>The American Roblox Hockey League (ARHL) is a professional Roblox hockey league. The season consists of a regular season followed by a playoff tournament to determine the league champion.</p>
        <ul>
          <li>Teams play a balanced schedule against all other franchises.</li>
          <li>Top 8 teams advance to the playoffs.</li>
          <li>Playoff series are Best-of-3, with the Finals being Best-of-5.</li>
        </ul>

        <h2>2. Roster Rules</h2>
        <p>Franchises must adhere to strict roster limits to ensure competitive balance.</p>
        <ul>
          <li><strong>Maximum Roster Size:</strong> 12 players</li>
          <li><strong>Minimum Roster Size:</strong> 8 players</li>
          <li><strong>Goalies:</strong> Each team must carry at least 1, and no more than 2 dedicated goaltenders.</li>
          <li><strong>Free Agency:</strong> Players not signed to a roster may be picked up during the designated Free Agency windows.</li>
        </ul>

        <h2>3. Game Day Operations</h2>
        <p>All games must be played on official ARHL servers with league-approved scripts and referee supervision.</p>
        <ul>
          <li><strong>Format:</strong> 5v5 (4 Skaters + 1 Goalie per team)</li>
          <li><strong>Periods:</strong> Three 5-minute periods.</li>
          <li><strong>Overtime:</strong> If tied after regulation, a 3-minute sudden-death OT period (3v3) is played. If still tied, a shootout will commence.</li>
          <li><strong>Forfeits:</strong> A team must have at least 3 skaters and 1 goalie to start a game. Failure to field a minimum roster within 10 minutes of scheduled puck drop results in a forfeit (recorded as a 3-0 loss).</li>
        </ul>

        <h2>4. Conduct & Sportsmanship</h2>
        <p>The ARHL maintains a zero-tolerance policy for exploiting, exploiting-adjacent behavior, and extreme toxicity.</p>
        <ul>
          <li><strong>Exploiting:</strong> Any use of third-party software to gain an advantage results in an immediate permanent ban from the league.</li>
          <li><strong>Toxicity:</strong> Trash talk is part of hockey, but targeted harassment, slurs, or real-life threats will result in severe suspensions.</li>
          <li><strong>Lag Switching:</strong> Intentional manipulation of network connections is strictly prohibited.</li>
        </ul>

        <h2>5. Disciplinary Action</h2>
        <p>The League Office reviews all incidents. Suspensions may be handed out for:</p>
        <ul>
          <li>Unsportsmanlike conduct during games.</li>
          <li>Discord server violations.</li>
          <li>Failure to adhere to roster rules.</li>
        </ul>
        <p><em>The Commissioner's ruling on all disciplinary matters is final.</em></p>
      </div>
    </div>
  );
}
