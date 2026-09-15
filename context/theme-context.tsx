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

const TRANSITION_STYLE_ID = "daniel-theme-view-transition-style";

const TRANSITION_CSS = `
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
    animation: daniel-theme-reveal 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
    clip-path: circle(
      0px at var(--theme-x) var(--theme-y)
    );
  }

  @keyframes daniel-theme-reveal {
    from {
      clip-path: circle(
        0px at var(--theme-x) var(--theme-y)
      );
      filter: blur(7px);
    }

    55% {
      filter: blur(1.5px);
    }

    to {
      clip-path: circle(
        var(--theme-radius) at var(--theme-x) var(--theme-y)
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

    if (!document.getElementById(TRANSITION_STYLE_ID)) {
      const style = document.createElement("style");

      style.id = TRANSITION_STYLE_ID;
      style.textContent = TRANSITION_CSS;

      document.head.appendChild(style);
    }
  }, []);

  const applyTheme = (nextTheme: Theme) => {
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  const toggleTheme = (rect?: DOMRect) => {
    if (!mounted || animatingRef.current) return;

    const nextTheme: Theme =
      theme === "light" ? "dark" : "light";

    const x = rect
      ? rect.left + rect.width / 2
      : window.innerWidth / 2;

    const y = rect
      ? rect.top + rect.height / 2
      : window.innerHeight / 2;

    const radius =
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      ) + 40;

    animatingRef.current = true;
    setIsAnimating(true);

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

    const documentWithTransition = document as Document & {
      startViewTransition?: (
        updateCallback: () => void | Promise<void>
      ) => {
        finished: Promise<void>;
        ready: Promise<void>;
        updateCallbackDone: Promise<void>;
      };
    };

    if (documentWithTransition.startViewTransition) {
      const transition =
        documentWithTransition.startViewTransition(() => {
          applyTheme(nextTheme);
        });

      transition.finished
        .catch(() => {
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

    applyTheme(nextTheme);

    window.setTimeout(() => {
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
    }, 50);
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
