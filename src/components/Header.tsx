"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoImage = mounted && theme === "dark" ? "/profile-blk.png" : "/profile.png";

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black">
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo - Profile Image */}
        <a
          href="/"
          className="w-10 h-10 hover:opacity-70 transition-opacity flex items-center justify-center"
        >
          <img
            src={logoImage}
            alt="Logo"
            className="w-8 h-8 object-contain rounded-full transition-opacity duration-300"
          />
        </a>


        {/* Right Controls */}
        <ThemeToggle />
      </div>
    </header>
  );
}