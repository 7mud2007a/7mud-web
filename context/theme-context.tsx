"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
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

const STYLE_ID = "daniel-theme-transition";

const TRANSITION_STYLE = `
  /*
   * Daniel Theme Transition
   *
   * The NEW theme grows from the theme button.
   * There is NO black/white fullscreen curtain.
   */

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none !important;
    mix-blend-mode: normal !important;
  }

  ::view-transition-old(root) {
    z-index: 1;
  }

  ::view-transition-new(root) {
    z-index: 2;

    animation:
      daniel-theme-reveal
      900ms
      cubic-bezier(0.22, 1, 0.36, 1)
      both;

    clip-path: circle(
      0px at var(--theme-x) var(--theme-y)
    );
  }

  @keyframes daniel-theme-reveal {
    0% {
      clip-path: circle(
        0px at var(--theme-x) var(--theme-y)
      );

      filter: blur(10px);
    }

    12% {
      filter: blur(8px);
    }

    35% {
      filter: blur(4px);
    }

    65% {
      filter: blur(1.5px);
    }

    85% {
      filter: blur(0.5px);
    }

    100% {
      clip-path: circle(
        var(--theme-radius)
        at var(--theme-x)
        var(--theme-y)
      );

      filter: blur(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    ::view-transition-new(root) {
      animation-duration: 1ms !important;
    }
  }
`;

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const animatingRef = useRef(false);

  /*
   * Initial theme
   */
  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme") as Theme | null;

    const initialTheme: Theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : document.documentElement.classList.contains("dark")
          ? "dark"
          : "light";

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setTheme(initialTheme);

    /*
     * Add transition CSS only once.
     */
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");

      style.id = STYLE_ID;
      style.textContent = TRANSITION_STYLE;

      document.head.appendChild(style);
    }
  }, []);

  /*
   * Actually apply the selected theme.
   */
  const applyTheme = (nextTheme: Theme) => {
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  /*
   * Light <-> Dark transition
   */
  const toggleTheme = (rect?: DOMRect) => {
    if (!mounted || animatingRef.current) return;

    const nextTheme: Theme =
      theme === "light" ? "dark" : "light";

    /*
     * Get the exact center of the clicked theme button.
     */
    const x = rect
      ? rect.left + rect.width / 2
      : window.innerWidth / 2;

    const y = rect
      ? rect.top + rect.height / 2
      : window.innerHeight / 2;

    /*
     * Calculate the radius required to reach
     * every corner of the viewport.
     */
    const radius = Math.ceil(
      Math.max(
        Math.hypot(x, y),
        Math.hypot(window.innerWidth - x, y),
        Math.hypot(x, window.innerHeight - y),
        Math.hypot(
          window.innerWidth - x,
          window.innerHeight - y
        )
      )
    );

    animatingRef.current = true;
    setIsAnimating(true);

    /*
     * Give the browser the exact origin of the transition.
     */
    document.documentElement.style.setProperty(
      "--theme-x",
      `${x}px`
    );

    document.documentElement.style.setProperty(
      "--theme-y",
      `${y}px`
    );

    document.documentElement.style.setProperty(
      "--theme-radius",
      `${radius}px`
    );

    /*
     * Modern browsers:
     *
     * The browser captures:
     *
     * OLD PAGE = current theme
     * NEW PAGE = new theme
     *
     * Then CSS reveals the NEW PAGE from the button.
     */
    const doc = document as Document & {
      startViewTransition?: (
        callback: () => void
      ) => {
        finished: Promise<void>;
      };
    };

    if (doc.startViewTransition) {
      const transition = doc.startViewTransition(() => {
        applyTheme(nextTheme);
      });

      transition.finished
        .catch(() => {
          /*
           * Keep the selected theme even if the
           * browser cancels the visual transition.
           */
          applyTheme(nextTheme);
        })
        .finally(() => {
          animatingRef.current = false;
          setIsAnimating(false);

          document.documentElement.style.removeProperty(
            "--theme-x"
          );

          document.documentElement.style.removeProperty(
            "--theme-y"
          );

          document.documentElement.style.removeProperty(
            "--theme-radius"
          );
        });

      return;
    }

    /*
     * Fallback for browsers without View Transitions.
     */
    applyTheme(nextTheme);

    requestAnimationFrame(() => {
      animatingRef.current = false;
      setIsAnimating(false);

      document.documentElement.style.removeProperty(
        "--theme-x"
      );

      document.documentElement.style.removeProperty(
        "--theme-y"
      );

      document.documentElement.style.removeProperty(
        "--theme-radius"
      );
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isAnimating,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
