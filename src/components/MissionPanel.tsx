import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import leetcodeLogo from "@/assets/leetcode-logo.png";

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
            We all <span className="font-semibold text-destructive">dread LeetCode</span>. Too many talented people give up on their dream jobs because DSA feels like a <span className="font-semibold text-secondary">gatekeeping nightmare</span>. 
            CS students pull all-nighters cramming 200 problems, only to freeze when the patterns don't click.
          </p>
          
          {/* LeetCode with X */}
          <div className="flex items-center gap-3 my-4">
            <div className="relative inline-block">
              <img src={leetcodeLogo} alt="LeetCode" className="h-8 w-auto opacity-50 grayscale" />
              <X className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-destructive stroke-[3]" />
            </div>
            <span className="text-sm text-muted-foreground italic">We're not grinding here</span>
          </div>

          <p className="text-foreground leading-relaxed">
            Let's be real—we've all been tempted to use <span className="font-semibold">Cluely</span> or other "interview helpers" out of desperation. 
            But that's not learning, that's survival mode.
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
