import { useState, useEffect } from "react";
import { GeneratorCard } from "@/components/GeneratorCard";
import { ColorPaletteCard } from "@/components/ColorPaletteCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { generators } from "@/lib/generators";
import { 
  User, 
  IdCard, 
  MessageSquare, 
  MapPin, 
  AlertCircle, 
  Heart, 
  FileText, 
  Users,
  Sparkles,
  Download,
  Trash2,
  Wand2,
  Shield,
  Type,
  Mail,
  Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface HistoryItem {
  id: string;
  type: string;
  result: string;
  timestamp: number;
}

const Index = () => {
    const navigate = useNavigate();
  const [aiMode, setAiMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedHistory = localStorage.getItem("genzone-history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (type: string, result: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      type,
      result,
      timestamp: Date.now()
    };
    const updatedHistory = [newItem, ...history].slice(0, 20);
    setHistory(updatedHistory);
    localStorage.setItem("genzone-history", JSON.stringify(updatedHistory));
  };

  const createGenerator = (type: string, generatorFn: (aiMode: boolean) => Promise<string>) => {
    return async (aiMode: boolean) => {
      const result = await generatorFn(aiMode);
      saveToHistory(type, result);
      return result;
    };
  };

  const handleGenerateAll = async () => {
    for (const [type, generatorFn] of Object.entries(generators)) {
      const result = await generatorFn(aiMode);
      saveToHistory(type, result);
    }
    toast({ 
      title: "Generated All!", 
      description: "All generators have been run successfully" 
    });
  };

  const handleExportJSON = () => {
    const data = JSON.stringify(history, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `genzone-history-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported!", description: "History exported as JSON" });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("genzone-history");
    toast({ title: "Cleared!", description: "History has been cleared" });
  };

  return (
    <div className="min-h-screen">
      {/* Dynamic Island Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div className="glass rounded-full px-6 py-3 shadow-2xl border border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10">
                <Wand2 className="w-5 h-5 text-accent" />
              </div>
              <h1 className="text-xl font-bold hidden sm:block">GenZone</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10">
                <Label htmlFor="ai-mode" className="text-xs font-medium cursor-pointer whitespace-nowrap">
                  AI Mode
                </Label>
                <Switch
                  id="ai-mode"
                  checked={aiMode}
                  onCheckedChange={setAiMode}
                />
                {aiMode && <Sparkles className="w-4 h-4 text-accent" />}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-1 text-card-dark-foreground">Quick Actions</h2>
                  <p className="text-sm text-card-dark-foreground/70">Generate all at once or export your history</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerateAll}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate All
                  </Button>
                  <Button 
                    onClick={handleExportJSON}
                    variant="outline"
                    className="border-card-dark-foreground/20 text-card-dark-foreground"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                </div>
              </div>
            </Card>

            {/* Generators Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            <Card className="p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => navigate('/comics')}>
                              <Wand2 className="w-8 h-8 mb-2 text-accent" />
                              <h3 className="font-semibold text-lg mb-1">Generate Comics</h3>
                              <p className="text-sm text-muted-foreground text-center">Create comics using OpenRouter's free generator model</p>
                              <Button className="mt-4 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium">Go to Comics</Button>
                            </Card>
              <GeneratorCard
                title="Username"
                icon={<User className="w-5 h-5" />}
                onGenerate={createGenerator("username", generators.username as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Fake Identity"
                icon={<IdCard className="w-5 h-5" />}
                onGenerate={createGenerator("identity", generators.identity as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Password"
                icon={<Shield className="w-5 h-5" />}
                onGenerate={createGenerator("password", generators.password as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Team Name"
                icon={<Users className="w-5 h-5" />}
                onGenerate={createGenerator("teamName", generators.teamName as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <ColorPaletteCard
                onGenerate={createGenerator("colorPalette", generators.colorPalette as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Lorem Ipsum"
                icon={<Type className="w-5 h-5" />}
                onGenerate={createGenerator("lorem", generators.lorem as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Random Message"
                icon={<MessageSquare className="w-5 h-5" />}
                onGenerate={createGenerator("message", generators.message as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Email Template"
                icon={<Mail className="w-5 h-5" />}
                onGenerate={createGenerator("emailTemplate", generators.emailTemplate as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Random Place"
                icon={<MapPin className="w-5 h-5" />}
                onGenerate={createGenerator("place", generators.place as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Random Excuse"
                icon={<AlertCircle className="w-5 h-5" />}
                onGenerate={createGenerator("excuse", generators.excuse as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Pickup Line"
                icon={<Heart className="w-5 h-5" />}
                onGenerate={createGenerator("pickupLine", generators.pickupLine as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Bio Generator"
                icon={<FileText className="w-5 h-5" />}
                onGenerate={createGenerator("bio", generators.bio as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
              <GeneratorCard
                title="Story Character"
                icon={<Palette className="w-5 h-5" />}
                onGenerate={createGenerator("character", generators.character as (aiMode: boolean) => Promise<string>)}
                aiMode={aiMode}
              />
            </div>
          </div>

          {/* History Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-card-dark-foreground">History</h2>
                {history.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearHistory}
                    className="text-card-dark-foreground/70 hover:text-card-dark-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {history.length === 0 ? (
                  <p className="text-sm text-card-dark-foreground/50 text-center py-8">
                    No history yet. Start generating!
                  </p>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg bg-background/10 border border-card-dark-foreground/10"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-accent capitalize">
                          {item.type}
                        </span>
                        <span className="text-xs text-card-dark-foreground/50">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-card-dark-foreground/90 line-clamp-2">
                        {item.result}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
