import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme("dark")}
      className="rounded-full hover:bg-accent/20"
    >
      <Moon className="h-5 w-5" />
      <span className="sr-only">Dark mode only</span>
    </Button>
  );
}
