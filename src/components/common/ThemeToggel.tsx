import { useEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "../landing/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

const ThemeToggle = () => {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitionRef = useRef<ViewTransition | null>(null);

  const isDark = (resolvedTheme ?? theme) === "dark";

  const playSound = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const toggleTheme = useCallback(async () => {
    if (transitionRef.current) return;

    playSound();
    const nextTheme = isDark ? "light" : "dark";
    const button = buttonRef.current;
    const supportsMask =
      CSS.supports("mask", 'url("data:image/svg+xml,<svg/>") 0px 0px / 0px 0px no-repeat') ||
      CSS.supports("-webkit-mask", 'url("data:image/svg+xml,<svg/>") 0px 0px / 0px 0px no-repeat');

    if (
      !button ||
      typeof document.startViewTransition !== "function" ||
      !supportsMask ||
      !CSS.supports("selector(::view-transition-new(root))") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    const root = document.documentElement;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    // The SVG's opaque core is r=18 minus three blur deviations (3 * 2).
    const size = Math.ceil((radius * 40) / (18 - 3 * 2));
    root.style.setProperty("--theme-reveal-x", `${x}px`);
    root.style.setProperty("--theme-reveal-y", `${y}px`);
    root.style.setProperty("--theme-reveal-size", `${size}px`);
    root.classList.add("theme-circle-blur");

    const skipTransition = () => transitionRef.current?.skipTransition();
    window.addEventListener("resize", skipTransition, { once: true });

    try {
      const transition = document.startViewTransition(() => {
        // Commit the provider's state, DOM classes and icon before the NEW snapshot.
        flushSync(() => setTheme(nextTheme));
      });
      transitionRef.current = transition;
      // A hidden document or interrupted capture may skip the animation.
      void transition.ready.catch(() => {});
      await transition.finished;
    } catch {
      setTheme(nextTheme);
    } finally {
      window.removeEventListener("resize", skipTransition);
      root.classList.remove("theme-circle-blur");
      root.style.removeProperty("--theme-reveal-x");
      root.style.removeProperty("--theme-reveal-y");
      root.style.removeProperty("--theme-reveal-size");
      transitionRef.current = null;
    }
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

  useEffect(() => () => transitionRef.current?.skipTransition(), []);

  return (
    <>
      <audio ref={audioRef} src="/newsound.wav" preload="auto" />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={buttonRef}
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
