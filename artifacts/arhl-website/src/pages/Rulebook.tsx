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
        <p className="text-muted-foreground text-sm mt-2 italic">
          This rulebook is subject to change with appropriate reason.
        </p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:tracking-wider prose-headings:uppercase prose-h2:text-primary prose-a:text-accent hover:prose-a:text-accent/80">

        <h2>1. Main Gameflow</h2>
        <ul>
          <li>A game will consist of three 5-minute periods. If the score is tied at the end of regulation, there will be one 5-minute overtime period. If the score is still tied at the end of overtime, there will be a shootout until a winner is decided. The Home Team will shoot first. Overtime periods will be even strength — 3v3 or 2v2.</li>
          <li>Regular gameplay is <strong>3v3 with goalies</strong>. The minimum a team can start with is 2 skaters and 1 goalie.</li>
          <li>There are <strong>no forfeits</strong> whatsoever. The only way a forfeit can occur is if a team intentionally does not show and proof is provided to a Commissioner or Staff Member. If a team, or both teams, legitimately cannot show, the game will be automatically postponed to a later date.</li>
          <li>An automatic postpone will be determined <strong>10 minutes</strong> after the posted game start time.</li>
          <li>Substitute players are allowed in <strong>pre-season games only</strong>. If subs are used and the team wins, they will only be awarded 1 point instead of 2. No subs are allowed in the playoffs under any circumstances.</li>
          <li>Each team has <strong>one (1) one-minute timeout</strong>. If a team reviews and fails, they lose their timeout. If they win the review, they keep their timeout and may review again later if necessary.</li>
        </ul>

        <h2>2. Playoff Rules</h2>
        <ul>
          <li>Each playoff matchup will be determined by a <strong>Best of 7</strong> series.</li>
          <li>Each team is awarded <strong>one (1) series postpone per round</strong>. Postpones do not carry over to the next round if unused.</li>
        </ul>

        <h2>3. Transactions</h2>
        <ul>
          <li>All final transactions must be posted into the <strong>#transactions</strong> channel in the Discord. They may be forgotten or ignored if not posted there.</li>
          <li>The current <strong>player cap is 9 players</strong>.</li>
          <li>If a team owner is a non-playing owner, they will be granted an extra pre-sign and the team owner will not be counted against their player cap (cap of 10).</li>
          <li>If a player is signed before a game, they must be signed before the posted game start time in <strong>#offers</strong> and finalized in <strong>#transactions</strong>. They will not be allowed to play if not properly signed beforehand.</li>
        </ul>

        <h2>4. Suspensions</h2>
        <p>Although there are no penalties within ARHL games, suspensions can occur for a variety of infractions. The length may be subject to change for each suspension depending on severity and frequency.</p>

        <div className="not-prose overflow-x-auto mt-6 mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-display uppercase tracking-wider text-primary text-xs">Suspension</th>
                <th className="text-left py-3 px-4 font-display uppercase tracking-wider text-primary text-xs">Explanation</th>
                <th className="text-left py-3 px-4 font-display uppercase tracking-wider text-primary text-xs">Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                { offense: "Throwing", explanation: "Intentionally playing poorly to hurt the team or purposely lose a game.", length: "2 Games" },
                { offense: "Admin Abuse", explanation: "Using admin commands within the game to disrupt the game in any way. This includes post-game before stats are recorded.", length: "2 Games in each league" },
                { offense: "Team Dropping (Ownership Change)", explanation: "Dropping a team while finding a replacement owner.", length: "2 Games" },
                { offense: "Team Abandonment", explanation: "Dropping a team without finding a replacement owner.", length: "4 Games" },
                { offense: "Alting", explanation: "Using someone else's account that isn't your own, or letting someone use your account, to play in a game.", length: "Full Season Suspension + removal from current season playoffs" },
                { offense: "Exploiting / Cheating", explanation: "Disrupting a game by exploiting or cheating, whether playing or not.", length: "6 Games" },
                { offense: "Force Release", explanation: "Demanding to be released from your team.", length: "5 Games" },
              ].map((row) => (
                <tr key={row.offense} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white/90">{row.offense}</td>
                  <td className="py-3 px-4 text-muted-foreground">{row.explanation}</td>
                  <td className="py-3 px-4 font-bold text-primary whitespace-nowrap">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>5. Reviewable Terms</h2>
        <p>Each team has one (1) one-minute timeout. If a team reviews and fails, they lose their timeout. If they win the review, they keep their timeout and may review again later if necessary. The following are reviewable scenarios:</p>

        <div className="not-prose overflow-x-auto mt-6 mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-display uppercase tracking-wider text-primary text-xs">Scenario</th>
                <th className="text-left py-3 px-4 font-display uppercase tracking-wider text-primary text-xs">Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                { scenario: "Lag", explanation: "If lag directly impacts the goal, whether it be the goal scorer, the defending team, or the goaltender." },
                { scenario: "Glove Glitch", explanation: "If the puck is caught clearly after it has entered the net, within 1 second, and without touching the back of the net." },
                { scenario: "Fling", explanation: "The puck clearly propelled into the net not caused by a slapshot or a player shooting." },
                { scenario: "Goaltender Interference", explanation: "If a goalie is directly interfered with in their own crease, causing them to not be able to play their position properly." },
                { scenario: "Lag Save", explanation: "If a goal is scored and it is clearly saved by the goalie's ownership. The goal will stand if the puck clearly hits the back of the net, similar to Glove Glitch." },
              ].map((row) => (
                <tr key={row.scenario} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white/90 whitespace-nowrap">{row.scenario}</td>
                  <td className="py-3 px-4 text-muted-foreground">{row.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground text-sm italic border-t border-border/50 pt-6 mt-6">
          The Commissioner's ruling on all disciplinary matters is final.
        </p>
      </div>
    </div>
  );
}
