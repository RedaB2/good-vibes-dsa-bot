import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MissionPanel = () => {
  return (
    <div className="space-y-6">
      {/* Mission Statement */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all p-6">
        <h3 className="text-secondary text-xl font-semibold mb-4">
          Why?
        </h3>
        <div className="space-y-3">
          <p className="text-foreground leading-relaxed">
            Because bombing a technical interview hurts. That anxiety before the call, the blank stare at a problem you've never seen, 
            the interviewer's uncomfortable silence—we've been there.
          </p>
          <p className="text-foreground leading-relaxed">
            Too many talented people give up on their dream jobs because DSA feels like a <span className="font-semibold text-secondary">gatekeeping nightmare</span>. 
            CS students pull all-nighters cramming 200 LeetCode problems, only to freeze when the patterns don't click.
          </p>
          <p className="text-foreground leading-relaxed">
            We built this because learning algorithms shouldn't feel like hazing. No gatekeeping. No judgment. 
            Just the high-yield patterns that actually show up, explained like a friend would—with clear steps, real analogies, and good vibes. ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionPanel;
