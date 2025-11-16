import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Copy, Check, Palette, Settings } from "lucide-react";
import { GeneratorSettings } from "./GeneratorSettings";
import { useToast } from "@/hooks/use-toast";

interface ColorPaletteCardProps {
  onGenerate: (aiMode: boolean) => Promise<string>;
  aiMode: boolean;
}

export const ColorPaletteCard = ({ onGenerate, aiMode }: ColorPaletteCardProps) => {
  const [colors, setColors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleGenerate = async () => {
    // Pass settings to generator if needed in future
    const result = await onGenerate(aiMode);
    const colorArray = result.split(" • ");
    setColors(colorArray);
  };

  const handleApplySettings = (newSettings: Record<string, any>) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  const handleCopy = async () => {
    if (colors.length > 0) {
      await navigator.clipboard.writeText(colors.join(", "));
      setCopied(true);
      toast({ title: "Copied!", description: "Colors copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-accent/10 text-accent">
          <Palette className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-lg">Color Palette</h3>
        <Button size="icon" variant="outline" className="ml-auto" onClick={() => setShowSettings(s => !s)}>
          <Settings className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="min-h-[80px] mb-4 rounded-xl overflow-hidden border border-border/50">
        {colors.length > 0 ? (
          <div className="space-y-2 p-2">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-border shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="font-mono text-sm font-medium">{color}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-4">
            <p className="text-sm text-muted-foreground italic">Click generate to create a palette...</p>
          </div>
        )}
      </div>
      {showSettings && (
        <GeneratorSettings type="colorPalette" onApply={handleApplySettings} />
      )}

      <div className="flex gap-2">
        <Button 
          onClick={handleGenerate}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate
        </Button>
        {colors.length > 0 && (
          <Button 
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className="border-border/50"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        )}
      </div>
    </Card>
  );
};
