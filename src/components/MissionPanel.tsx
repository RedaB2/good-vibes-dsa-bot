import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

const MissionPanel = () => {
  return (
    <div className="space-y-6">
      {/* Mission Statement */}
      <Card className="border-2 border-secondary/20 shadow-lg bg-gradient-to-br from-card to-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-secondary">
            <Heart className="h-6 w-6" />
            Why We Built This
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-foreground leading-relaxed">
            Learning Data Structures & Algorithms should feel <span className="font-semibold text-secondary">welcoming</span>, 
            not intimidating. We focus on high-yield problems and teach with clear steps and analogies.
          </p>
          <p className="text-foreground leading-relaxed">
            No gatekeeping. No judgment. Just progress and good vibes. ✨
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="border border-border shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-accent">
            <Sparkles className="h-5 w-5" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-foreground">
            <li className="flex gap-2">
              <span className="text-secondary font-bold">1.</span>
              <span>Pick a topic and problem from the left sidebar</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary font-bold">2.</span>
              <span>Read the problem and try to understand it</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary font-bold">3.</span>
              <span>Click our friendly robot assistant for hints and guidance</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary font-bold">4.</span>
              <span>Select any text to ask specific questions about it</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary font-bold">5.</span>
              <span>Learn at your own pace with step-by-step explanations</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Founders Video Placeholder */}
      <Card className="border border-border shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-foreground">Meet the Founders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground text-center px-4">
              YouTube video will be embedded here
              <br />
              <span className="text-xs">(Coming soon)</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissionPanel;
