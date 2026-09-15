"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (rect?: DOMRect) => void;
  isAnimating: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  isAnimating: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Animation state for radial expansion overlay
  const [transitionState, setTransitionState] = useState<{
    active: boolean;
    targetTheme: Theme;
    x: number;
    y: number;
    progress: number; // 0 to 1
  }>({
    active: false,
    targetTheme: "dark",
    x: 0,
    y: 0,
    progress: 0,
  });

  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const initialTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(initialTheme);
  }, []);

  const toggleTheme = (rect?: DOMRect) => {
    if (isAnimating) return;

    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setIsAnimating(true);

    // Calculate center coordinates of origin
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (rect) {
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    setTransitionState({
      active: true,
      targetTheme: nextTheme,
      x,
      y,
      progress: 0,
    });

    const startTime = performance.now();
    const duration = 750; // ms

    // Custom cubic-bezier easing: cubic-bezier(0.4, 0, 0.2, 1)
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let themeApplied = false;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(linearProgress);

      // Apply actual DOM theme class at ~70% progress so underlayer is ready
      if (linearProgress >= 0.7 && !themeApplied) {
        themeApplied = true;
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", nextTheme);
        setTheme(nextTheme);
      }

      setTransitionState((prev) => ({
        ...prev,
        progress: easedProgress,
      }));

      if (linearProgress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Complete transition
        setTimeout(() => {
          setTransitionState((prev) => ({ ...prev, active: false }));
          setIsAnimating(false);
        }, 50);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Calculate max distance to screen corners from (x, y)
  const maxRadius = transitionState.active
    ? Math.hypot(
        Math.max(transitionState.x, window.innerWidth - transitionState.x),
        Math.max(transitionState.y, window.innerHeight - transitionState.y)
      ) + 100
    : 0;

  const currentRadius = maxRadius * transitionState.progress;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
      {children}

      {/* Radial Theme Transition Overlay */}
      {transitionState.active && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          style={{
            background:
              transitionState.targetTheme === "dark"
                ? "radial-gradient(circle at 50% 50%, #0b0f19 0%, #030712 100%)"
                : "radial-gradient(circle at 50% 50%, #f8fafc 0%, #edf2f7 100%)",
            WebkitMaskImage: `radial-gradient(circle ${currentRadius}px at ${transitionState.x}px ${transitionState.y}px, black 0%, black calc(100% - 40px), transparent 100%)`,
            maskImage: `radial-gradient(circle ${currentRadius}px at ${transitionState.x}px ${transitionState.y}px, black 0%, black calc(100% - 40px), transparent 100%)`,
          }}
        >
          {/* Subtle blurred aura particle layer inside overlay */}
          <div
            className={`absolute inset-0 opacity-40 transition-opacity ${
              transitionState.targetTheme === "dark"
                ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-sky-900/20 to-transparent"
                : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200/50 via-sky-100/40 to-transparent"
            }`}
          />
        </div>
      )}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
