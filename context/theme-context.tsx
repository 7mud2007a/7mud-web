"use client";

import React, {
createContext,
useContext,
useEffect,
useState,
useRef,
} from "react";

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

export const ThemeProvider = ({
children,
}: {
children: React.ReactNode;
}) => {
const [theme, setTheme] = useState<Theme>("light");
const [isAnimating, setIsAnimating] = useState(false);
const [mounted, setMounted] = useState(false);

const [transitionState, setTransitionState] = useState<{
active: boolean;
targetTheme: Theme;
x: number;
y: number;
progress: number;
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

const savedTheme = localStorage.getItem("theme") as Theme | null;
const initialTheme =
  savedTheme ||
  (document.documentElement.classList.contains("dark")
    ? "dark"
    : "light");

setTheme(initialTheme);

if (initialTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

}, []);

const toggleTheme = (rect?: DOMRect) => {
if (isAnimating || !mounted) return;

const nextTheme: Theme = theme === "light" ? "dark" : "light";

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

if (rect) {
  x = rect.left + rect.width / 2;
  y = rect.top + rect.height / 2;
}

setIsAnimating(true);

/*
 * The important difference:
 * The real theme is changed BEFORE the reveal animation.
 *
 * The transition layer is now only a clipped/revealed copy
 * of the new theme instead of an opaque black/white curtain.
 * This keeps the page content visible throughout the animation.
 */

if (nextTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

localStorage.setItem("theme", nextTheme);
setTheme(nextTheme);

setTransitionState({
  active: true,
  targetTheme: nextTheme,
  x,
  y,
  progress: 0,
});

const startTime = performance.now();
const duration = 800;

const ease = (t: number) =>
  t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;

const animate = (now: number) => {
  const elapsed = now - startTime;
  const progress = Math.min(elapsed / duration, 1);

  setTransitionState((prev) => ({
    ...prev,
    progress: ease(progress),
  }));

  if (progress < 1) {
    animFrameRef.current = requestAnimationFrame(animate);
  } else {
    setTransitionState((prev) => ({
      ...prev,
      active: false,
    }));

    setIsAnimating(false);
  }
};

animFrameRef.current = requestAnimationFrame(animate);

};

useEffect(() => {
return () => {
if (animFrameRef.current) {
cancelAnimationFrame(animFrameRef.current);
}
};
}, []);

const maxRadius = transitionState.active
? Math.hypot(
Math.max(
transitionState.x,
window.innerWidth - transitionState.x
),
Math.max(
transitionState.y,
window.innerHeight - transitionState.y
)
) + 80
: 0;

const currentRadius =
maxRadius * transitionState.progress;

return (
<ThemeContext.Provider
value={{
theme,
toggleTheme,
isAnimating,
}}
>
{children}

  {/*
   * Soft reveal edge only.
   *
   * There is intentionally NO solid black/white fullscreen
   * overlay anymore. The actual page theme is already active,
   * and this layer only creates the smooth expanding edge.
   */}
  {transitionState.active && (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      style={{
        background:
          transitionState.targetTheme === "dark"
            ? "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(56,189,248,0.08) 35%, transparent 70%)"
            : "radial-gradient(circle, rgba(167,139,250,0.20) 0%, rgba(125,211,252,0.10) 35%, transparent 70%)",

        WebkitMaskImage: `radial-gradient(
          circle ${currentRadius}px at
          ${transitionState.x}px ${transitionState.y}px,
          black 0%,
          black calc(100% - 70px),
          transparent 100%
        )`,

        maskImage: `radial-gradient(
          circle ${currentRadius}px at
          ${transitionState.x}px ${transitionState.y}px,
          black 0%,
          black calc(100% - 70px),
          transparent 100%
        )`,

        filter: "blur(18px)",
      }}
    />
  )}
</ThemeContext.Provider>

);
};

export const useTheme = () => useContext(ThemeContext);
