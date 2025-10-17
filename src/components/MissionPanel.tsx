import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

const MissionPanel = () => {
  return (
    <div className="space-y-6">
      {/* Mission Statement */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all p-6">
        <h3 className="flex items-center gap-2 text-secondary text-xl font-semibold mb-4">
          <Heart className="h-6 w-6" />
          Why We Built This
        </h3>
        <div className="space-y-3">
          <p className="text-foreground leading-relaxed">
            Learning Data Structures & Algorithms should feel <span className="font-semibold text-secondary">welcoming</span>, 
            not intimidating. We focus on high-yield problems and teach with clear steps and analogies.
          </p>
          <p className="text-foreground leading-relaxed">
            No gatekeeping. No judgment. Just progress and good vibes. ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionPanel;
