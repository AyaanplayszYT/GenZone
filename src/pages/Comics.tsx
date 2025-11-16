import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Wand2 } from "lucide-react";
import { openrouterGenerateComic } from "@/lib/generateComic";
import { generateGeminiImage } from "@/lib/geminiImage";

const Comics = () => {
  const [prompt, setPrompt] = useState("");
  const [comic, setComic] = useState<string>("");
  const [panels, setPanels] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setComic("");
    setPanels([]);
    setImages([]);
    try {
      const result = await openrouterGenerateComic(prompt);
      setComic(result);
      // Split result into panels by lines or markers (customize as needed)
      const splitPanels = result.split(/\n\n|Panel \d+:/).filter(Boolean);
      setPanels(splitPanels);
      // Generate images for each panel using Gemini
      const imgResults: string[] = [];
      for (const panel of splitPanels) {
        const img = await generateGeminiImage(panel);
        imgResults.push(img);
      }
      setImages(imgResults);
      toast({ title: "Comic generated!" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to generate comic." });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <Card className="p-8 max-w-2xl w-full shadow-2xl rounded-2xl bg-gradient-to-br from-card-dark/80 to-background/80 border border-border/60">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-accent">under dev..</h2>
        <p className="mb-6 text-center text-muted-foreground">Describe your comic idea and let AI create panels and images for you!</p>
        <input
          type="text"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-accent text-lg text-black bg-white placeholder:text-gray-500"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g. A superhero cat saves the city"
        />
        <Button onClick={handleGenerate} disabled={loading || !prompt} className="w-full mb-6 text-lg py-3 bg-accent hover:bg-accent/90">
          <Wand2 className="w-5 h-5 mr-2" />
          {loading ? "Generating Comic..." : "Generate Comic"}
        </Button>
        {comic && (
          <div className="mt-6">
            <h3 className="font-bold text-xl mb-4 text-accent">Comic Panels</h3>
            <div className="grid gap-8">
              {panels.map((panel, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl bg-background/80 border border-border/40 shadow">
                  {images[idx] && images[idx].startsWith("data:image") ? (
                    <img src={images[idx]} alt={`Panel ${idx+1}`} className="w-64 h-64 object-contain rounded-lg border border-border/30 bg-card-dark/10" />
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center rounded-lg border border-border/30 bg-card-dark/10 text-muted-foreground">No image</div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Panel {idx+1}</h4>
                    <p className="text-base whitespace-pre-line">{panel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Comics;
