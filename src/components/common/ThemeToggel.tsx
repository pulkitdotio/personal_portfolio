import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "../landing/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

const ThemeToggle = () => {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);

  const isDark = (resolvedTheme ?? theme) === "dark";

  const playSound = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const toggleTheme = useCallback(() => {
    playSound();
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const key = typeof e.key === "string" ? e.key.toLowerCase() : "";
      if (!key) return;
      const target = e.target;
      if (target instanceof HTMLElement &&
        (target.matches('input, textarea, select') || target.isContentEditable || target.closest('[role="dialog"]')))
        return;
      if (key === "d") toggleTheme();
    },
    [toggleTheme],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <audio ref={audioRef} src="/newsound.wav" preload="auto" />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="cursor-pointer "
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            aria-pressed={isDark}
          >
            {isDark ? <Moon size={18} /> : <Sun size={16} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className={"text-sm"}>Toggle theme (D)</TooltipContent>
      </Tooltip>
    </>
  );
};

export default ThemeToggle;
