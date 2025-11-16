import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Copy, Check, Settings } from "lucide-react";
import { GeneratorSettings } from "./GeneratorSettings";
import { useToast } from "@/hooks/use-toast";

interface GeneratorCardProps {
  title: string;
  icon: React.ReactNode;
  onGenerate: (aiMode: boolean) => Promise<string>;
  aiMode: boolean;
}

export const GeneratorCard = ({ title, icon, onGenerate, aiMode }: GeneratorCardProps) => {
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleGenerate = async () => {
    // Pass settings to generator if needed in future
    const newResult = await onGenerate(aiMode);
    setResult(newResult);
  };

  const handleApplySettings = (newSettings: Record<string, any>) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast({ title: "Copied!", description: "Result copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-accent/10 text-accent">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <Button size="icon" variant="outline" className="ml-auto" onClick={() => setShowSettings(s => !s)}>
          <Settings className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="min-h-[80px] mb-4 p-4 rounded-xl bg-card-dark/5 border border-border/50">
        {result ? (
          <p className="text-sm leading-relaxed">{result}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">Click generate to create...</p>
        )}
      </div>
      {showSettings && (
        <GeneratorSettings type={title.toLowerCase().replace(/ /g,"")} onApply={handleApplySettings} />
      )}

      <div className="flex gap-2">
        <Button 
          onClick={handleGenerate}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate
        </Button>
        {result && (
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
