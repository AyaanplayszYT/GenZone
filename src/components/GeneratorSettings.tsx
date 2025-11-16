import { useState } from "react";
import { Button } from "@/components/ui/button";

interface GeneratorSettingsProps {
  type: string;
  onApply: (settings: Record<string, any>) => void;
}

export const GeneratorSettings = ({ type, onApply }: GeneratorSettingsProps) => {
  const [settings, setSettings] = useState<Record<string, any>>({});

  const renderFields = () => {
    switch (type) {
      case "username":
        return (
          <>
            <label className="block text-sm mb-1">Prefix</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.prefix || ""} onChange={e => setSettings(s => ({ ...s, prefix: e.target.value }))} placeholder="e.g. Cool, Super" />
            <label className="block text-sm mb-1">Suffix</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.suffix || ""} onChange={e => setSettings(s => ({ ...s, suffix: e.target.value }))} placeholder="e.g. Wolf, Hawk" />
          </>
        );
      case "identity":
        return (
          <>
            <label className="block text-sm mb-1">First Name</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.firstName || ""} onChange={e => setSettings(s => ({ ...s, firstName: e.target.value }))} placeholder="e.g. Alex" />
            <label className="block text-sm mb-1">Last Name</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.lastName || ""} onChange={e => setSettings(s => ({ ...s, lastName: e.target.value }))} placeholder="e.g. Smith" />
          </>
        );
      case "message":
        return (
          <>
            <label className="block text-sm mb-1">Custom Message</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.message || ""} onChange={e => setSettings(s => ({ ...s, message: e.target.value }))} placeholder="e.g. Have a great day!" />
          </>
        );
      case "place":
        return (
          <>
            <label className="block text-sm mb-1">City</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.city || ""} onChange={e => setSettings(s => ({ ...s, city: e.target.value }))} placeholder="e.g. Tokyo" />
            <label className="block text-sm mb-1">Country</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.country || ""} onChange={e => setSettings(s => ({ ...s, country: e.target.value }))} placeholder="e.g. Japan" />
          </>
        );
      case "excuse":
        return (
          <>
            <label className="block text-sm mb-1">Custom Excuse</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.excuse || ""} onChange={e => setSettings(s => ({ ...s, excuse: e.target.value }))} placeholder="e.g. My alarm didn't go off" />
          </>
        );
      case "pickupLine":
        return (
          <>
            <label className="block text-sm mb-1">Custom Pickup Line</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.pickupLine || ""} onChange={e => setSettings(s => ({ ...s, pickupLine: e.target.value }))} placeholder="e.g. Are you a magician?" />
          </>
        );
      case "bio":
        return (
          <>
            <label className="block text-sm mb-1">Custom Bio</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.bio || ""} onChange={e => setSettings(s => ({ ...s, bio: e.target.value }))} placeholder="e.g. Adventure seeker" />
          </>
        );
      case "character":
        return (
          <>
            <label className="block text-sm mb-1">Trait</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.trait || ""} onChange={e => setSettings(s => ({ ...s, trait: e.target.value }))} placeholder="e.g. brave" />
            <label className="block text-sm mb-1">Occupation</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.occupation || ""} onChange={e => setSettings(s => ({ ...s, occupation: e.target.value }))} placeholder="e.g. detective" />
          </>
        );
      case "password":
        return (
          <>
            <label className="block text-sm mb-1">Length</label>
            <input type="number" min={6} max={32} className="w-full mb-2 p-2 border rounded" value={settings.length || 12} onChange={e => setSettings(s => ({ ...s, length: Number(e.target.value) }))} placeholder="e.g. 12" />
            <label className="block text-sm mb-1">Include Symbols</label>
            <input type="checkbox" checked={settings.includeSymbols || false} onChange={e => setSettings(s => ({ ...s, includeSymbols: e.target.checked }))} />
          </>
        );
      case "lorem":
        return (
          <>
            <label className="block text-sm mb-1">Sentence Count</label>
            <input type="number" min={1} max={10} className="w-full mb-2 p-2 border rounded" value={settings.sentenceCount || 2} onChange={e => setSettings(s => ({ ...s, sentenceCount: Number(e.target.value) }))} placeholder="e.g. 2" />
          </>
        );
      case "colorPalette":
        return (
          <>
            <label className="block text-sm mb-1">Number of Colors</label>
            <input type="number" min={1} max={10} className="w-full mb-2 p-2 border rounded" value={settings.colorCount || 3} onChange={e => setSettings(s => ({ ...s, colorCount: Number(e.target.value) }))} placeholder="e.g. 3" />
          </>
        );
      case "teamName":
        return (
          <>
            <label className="block text-sm mb-1">Prefix</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.prefix || ""} onChange={e => setSettings(s => ({ ...s, prefix: e.target.value }))} placeholder="e.g. Thunder" />
            <label className="block text-sm mb-1">Suffix</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.suffix || ""} onChange={e => setSettings(s => ({ ...s, suffix: e.target.value }))} placeholder="e.g. Strikers" />
          </>
        );
      case "emailTemplate":
        return (
          <>
            <label className="block text-sm mb-1">Subject</label>
            <input type="text" className="w-full mb-2 p-2 border rounded" value={settings.subject || ""} onChange={e => setSettings(s => ({ ...s, subject: e.target.value }))} placeholder="Project Update" />
            <label className="block text-sm mb-1">Body</label>
            <textarea className="w-full mb-2 p-2 border rounded" value={settings.body || ""} onChange={e => setSettings(s => ({ ...s, body: e.target.value }))} placeholder="Email body..." />
          </>
        );
      default:
        return <p className="text-sm text-muted-foreground">No settings available for this type.</p>;
    }
  };

  return (
    <div className="p-4 bg-background rounded-lg border border-border/50">
      <h4 className="font-semibold mb-2">Settings</h4>
      {renderFields()}
      <Button className="mt-2" onClick={() => onApply(settings)}>
        Apply
      </Button>
    </div>
  );
}
