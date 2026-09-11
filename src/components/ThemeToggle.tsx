"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setTheme("light")}
        className={`text-sm font-medium transition-colors ${
          theme === "light"
            ? "text-black dark:text-white"
            : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        }`}
        aria-label="Light theme"
      >
        Light
      </button>
      <span className="text-zinc-300 dark:text-zinc-700">/</span>
      <button
        onClick={() => setTheme("dark")}
        className={`text-sm font-medium transition-colors ${
          theme === "dark"
            ? "text-black dark:text-white"
            : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        }`}
        aria-label="Dark theme"
      >
        Dark
      </button>
    </div>
  );
}